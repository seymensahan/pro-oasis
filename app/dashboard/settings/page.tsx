'use client';

import { useState, useEffect } from 'react';
import { Loader2, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'react-toastify';
import { firestore } from '@/firebase/config';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import useAuth from '@/app/(auth)/Hooks/useAuth';
import Loading from '../loading';

interface SettingsData {
    taxRate: number;
    currency: string;
    language: string;
    timeZone: string;
    notificationsEnabled: boolean;
    emailNotifications: boolean;
    smsNotifications: boolean;
    termsAndConditions: string;
}

const defaultSettings: SettingsData = {
    taxRate: 10,
    currency: 'XAF',
    language: 'en',
    timeZone: 'UTC',
    notificationsEnabled: true,
    emailNotifications: true,
    smsNotifications: false,
    termsAndConditions: 'Default terms and conditions...',
};

async function fetchUserSettings(userId: string | undefined): Promise<SettingsData> {
    const userDocRef = doc(firestore, 'users', userId || '');
    const docSnap = await getDoc(userDocRef);

    if (docSnap.exists()) {
        return docSnap.data() as SettingsData;
    } else {
        console.log('No user settings found. Returning default settings.');
        return defaultSettings;
    }
}

async function updateUserSettings(userId: string | undefined, settings: Partial<SettingsData>) {
    const userDocRef = doc(firestore, 'users', userId || '');

    try {
        await updateDoc(userDocRef, settings);
        console.log('Settings updated successfully!');
    } catch (error) {
        console.error('Error updating settings:', error);
        throw new Error('Failed to update settings.');
    }
}

export default function SettingsPage() {
    const [settings, setSettings] = useState<SettingsData>(defaultSettings);
    const [loading, setLoading] = useState(true);
    const [loadingSave, setLoadingSave] = useState(false);
    const { user } = useAuth();

    useEffect(() => {
        if (user?.uid) {
            fetchUserSettings(user.uid)
                .then((fetchedSettings) => {
                    setSettings(fetchedSettings);
                })
                .catch((error) => {
                    console.error('Failed to fetch user settings:', error);
                    toast.error('Error loading settings. Using default values.');
                })
                .finally(() => setLoading(false));
        }
    }, [user?.uid]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setSettings((prev) => ({ ...prev, [name]: value }));
    };

    const handleSelectChange = (name: string) => (value: string) => {
        setSettings((prev) => ({ ...prev, [name]: value }));
    };

    const handleSwitchChange = (name: string) => (checked: boolean) => {
        setSettings((prev) => ({ ...prev, [name]: checked }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoadingSave(true);

        try {
            const currentUserId = user?.uid;
            await updateUserSettings(currentUserId, settings);
            toast.success('Your settings have been successfully saved.');
        } catch (error) {
            toast.error('Failed to save settings. Please try again.');
            console.error(error);
        } finally {
            setLoadingSave(false);
        }
    };

    if (loading) {
        return <Loading />;
    }

    return (
        <div className="container mx-auto py-3 px-4">
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
                                        <SelectItem value="XAF">Franc CFA (XAF)</SelectItem>
                                        <SelectItem value="USD">US Dollar (USD)</SelectItem>
                                        <SelectItem value="EUR">Euro (EUR)</SelectItem>
                                        <SelectItem value="GBP">British Pound (GBP)</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
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
                                            className="data-[state=checked]:bg-blue-500 data-[state=unchecked]:bg-gray-400"
                                            checked={settings.notificationsEnabled}
                                            onCheckedChange={handleSwitchChange('notificationsEnabled')}
                                        />
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <Label htmlFor="emailNotifications">Email Notifications</Label>
                                        <Switch
                                            id="emailNotifications"
                                            className="data-[state=checked]:bg-blue-500 data-[state=unchecked]:bg-gray-400"
                                            checked={settings.emailNotifications}
                                            onCheckedChange={handleSwitchChange('emailNotifications')}
                                            disabled={!settings.notificationsEnabled}
                                        />
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <Label htmlFor="smsNotifications">SMS Notifications</Label>
                                        <Switch
                                            id="smsNotifications"
                                            className="data-[state=checked]:bg-blue-500 data-[state=unchecked]:bg-gray-400"
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
                        </CardContent>
                    </Card>
                </div>

                <Button
                    type="submit"
                    className="w-full bg-blue-500 hover:bg-blue-400 text-white"
                >
                    {loadingSave ? (
                        <>
                            <Loader2 className="animate-spin mr-2 h-4 w-4" /> Saving...
                        </>
                    ) : (
                        <>
                            <Save className="mr-2 h-4 w-4" /> Save Settings
                        </>
                    )}
                </Button>
            </form>
        </div>
    );
}
