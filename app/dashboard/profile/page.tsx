'use client'

import { useState } from 'react'
import { Save, Upload } from 'lucide-react'

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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { toast } from 'react-toastify'
import useAuth from '@/app/(auth)/Hooks/useAuth'
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage'
import { updateProfile } from 'firebase/auth'

interface ProfileData {
    displayName: string
    email?: string
    phoneNumber?: string
    photoURL: string
}

export default function ProfilePage() {
    const { user } = useAuth()
    const [profile, setProfile] = useState<ProfileData>({
        displayName: user?.displayName || "",
        photoURL: user?.photoURL || "",
    });

    


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setProfile(prev => ({ ...prev, [name]: value }))
    }

    const handleSelectChange = (name: string) => (value: string) => {
        setProfile(prev => ({ ...prev, [name]: value }))
    }

    const handleSwitchChange = (name: string) => (checked: boolean) => {
        setProfile(prev => ({ ...prev, [name]: checked }))
    }

    const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (file) {
            try {
                const storage = getStorage(); // Initialize Firebase Storage
                const storageRef = ref(storage, `profile_photos/${file.name}`); // Create a reference to the file

                // Upload the file to Firebase Storage
                const snapshot = await uploadBytes(storageRef, file);

                // Get the download URL
                const downloadURL = await getDownloadURL(snapshot.ref);

                // Update the profile with the photo URL
                setProfile(prev => ({ ...prev, photoURL: downloadURL }));

                console.log("File uploaded successfully!", downloadURL);
            } catch (error) {
                console.error("Error uploading file:", error);
            }
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            if (!user) {
                throw new Error("No user is logged in.");
            }

            // Update the Firebase Auth user profile
            await updateProfile(user, {
                displayName: profile.displayName,
                photoURL: profile.photoURL,
            });

            console.log("Updated profile:", profile);
            toast.success("Your profile has been successfully saved.");
        } catch (error) {
            console.error("Error updating profile:", error);
            toast.error("Failed to update profile. Please try again.");
        }
    };

    return (
        <div className="container mx-auto py-5 px-2">
            <form onSubmit={handleSubmit}>
                <div className="grid gap-6 mb-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Personal Information</CardTitle>
                            <CardDescription>Update your personal details</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center space-x-4">
                                <Avatar className="w-20 h-20">
                                    <AvatarImage src={profile.photoURL} alt={profile.displayName} />
                                    <AvatarFallback>{profile.displayName.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <Label htmlFor="photo" className="cursor-pointer">
                                        <div className="flex items-center space-x-2">
                                            <Upload className="w-4 h-4" />
                                            <span>Change Photo</span>
                                        </div>
                                    </Label>
                                    <Input
                                        id="photo"
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={handlePhotoUpload}
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="displayName">Display Name</Label>
                                <Input
                                    id="displayName"
                                    name="displayName"
                                    value={profile.displayName || ''}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={user?.email || ''}
                                    // onChange={handleInputChange}
                                    readOnly
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="phoneNumber">Phone Number</Label>
                                <Input
                                    id="phoneNumber"
                                    name="phoneNumber"
                                    value={user?.phoneNumber || ''}
                                    onChange={handleInputChange}
                                />
                            </div>
                            {/* <div className="space-y-2">
                                <Label htmlFor="bio">Bio</Label>
                                <Textarea
                                    id="bio"
                                    name="bio"
                                    value={profile.bio}
                                    onChange={handleInputChange}
                                    rows={3}
                                />
                            </div> */}
                        </CardContent>
                    </Card>

                </div>

                <Button type="submit" className="w-full">
                    <Save className="mr-2 h-4 w-4" /> Save Profile
                </Button>
            </form>
        </div>
    )
}