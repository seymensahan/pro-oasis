'use client'

import { useState } from 'react'
import { Save } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from 'react-toastify'

interface SettingsData {
    taxRate: number
    currency: string
    language: string
    timeZone: string
    notificationsEnabled: boolean
    emailNotifications: boolean
    smsNotifications: boolean
    termsAndConditions: string
}

const initialSettings: SettingsData = {
    taxRate: 10,
    currency: 'USD',
    language: 'en',
    timeZone: 'UTC',
    notificationsEnabled: true,
    emailNotifications: true,
    smsNotifications: false,
    termsAndConditions: 'Default terms and conditions...',
}

export default function SettingsPage() {
    const [settings, setSettings] = useState<SettingsData>(initialSettings)

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setSettings(prev => ({ ...prev, [name]: value }))
    }

    const handleSelectChange = (name: string) => (value: string) => {
        setSettings(prev => ({ ...prev, [name]: value }))
    }

    const handleSwitchChange = (name: string) => (checked: boolean) => {
        setSettings(prev => ({ ...prev, [name]: checked }))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // Here you would typically send the updated settings to your backend
        console.log('Updated settings:', settings)
        toast.success("our settings have been successfully saved.")
    }

    return (
        <div className="container mx-auto py-10 px-4">
            <h1 className="text-3xl font-bold mb-6">Settings</h1>
            <form onSubmit={handleSubmit}>
                <div className="grid gap-6 mb-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>General Settings</CardTitle>
                            <CardDescription>Manage your general application settings</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="taxRate">Tax Rate (%)</Label>
                                <Input
                                    id="taxRate"
                                    name="taxRate"
                                    type="number"
                                    value={settings.taxRate}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="currency">Currency</Label>
                                <Select
                                    value={settings.currency}
                                    onValueChange={handleSelectChange('currency')}
                                >
                                    <SelectTrigger id="currency">
                                        <SelectValue placeholder="Select currency" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="USD">US Dollar (USD)</SelectItem>
                                        <SelectItem value="EUR">Euro (EUR)</SelectItem>
                                        <SelectItem value="GBP">British Pound (GBP)</SelectItem>
                                        <SelectItem value="JPY">Japanese Yen (JPY)</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="language">Language</Label>
                                <Select
                                    value={settings.language}
                                    onValueChange={handleSelectChange('language')}
                                >
                                    <SelectTrigger id="language">
                                        <SelectValue placeholder="Select language" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="en">English</SelectItem>
                                        <SelectItem value="es">Español</SelectItem>
                                        <SelectItem value="fr">Français</SelectItem>
                                        <SelectItem value="de">Deutsch</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="timeZone">Time Zone</Label>
                                <Select
                                    value={settings.timeZone}
                                    onValueChange={handleSelectChange('timeZone')}
                                >
                                    <SelectTrigger id="timeZone">
                                        <SelectValue placeholder="Select time zone" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="UTC">UTC</SelectItem>
                                        <SelectItem value="EST">Eastern Time (EST)</SelectItem>
                                        <SelectItem value="CST">Central Time (CST)</SelectItem>
                                        <SelectItem value="PST">Pacific Time (PST)</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Notifications</CardTitle>
                            <CardDescription>Manage your notification preferences</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="notificationsEnabled">Enable Notifications</Label>
                                <Switch
                                    id="notificationsEnabled"
                                    checked={settings.notificationsEnabled}
                                    onCheckedChange={handleSwitchChange('notificationsEnabled')}
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <Label htmlFor="emailNotifications">Email Notifications</Label>
                                <Switch
                                    id="emailNotifications"
                                    checked={settings.emailNotifications}
                                    onCheckedChange={handleSwitchChange('emailNotifications')}
                                    disabled={!settings.notificationsEnabled}
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <Label htmlFor="smsNotifications">SMS Notifications</Label>
                                <Switch
                                    id="smsNotifications"
                                    checked={settings.smsNotifications}
                                    onCheckedChange={handleSwitchChange('smsNotifications')}
                                    disabled={!settings.notificationsEnabled}
                                />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Terms and Conditions</CardTitle>
                            <CardDescription>Update your application's terms and conditions</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Textarea
                                id="termsAndConditions"
                                name="termsAndConditions"
                                value={settings.termsAndConditions}
                                onChange={handleInputChange}
                                rows={5}
                            />
                        </CardContent>
                    </Card>
                </div>

                <Button type="submit" className="w-full">
                    <Save className="mr-2 h-4 w-4" /> Save Settings
                </Button>
            </form>
        </div>
    )
}