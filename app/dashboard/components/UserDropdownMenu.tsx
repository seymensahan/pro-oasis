"use client"

import { useEffect, useState } from 'react';
import { ChevronDown, Users, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogoutButton } from '../../(auth)/Hooks/LogoutButton';
import useAuth from '@/app/(auth)/Hooks/useAuth';
import Link from 'next/link';

const UserDropdownMenu = () => {
    const { user, loading } = useAuth();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center space-x-2">
                    <img
                        src={user?.photoURL || "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"}
                        alt={user?.displayName || "User profile"}
                        className="h-8 w-8 rounded-full"
                    />
                    <div className="text-left">
                        <div className="text-sm font-medium">{user?.displayName}</div>
                    </div>
                    <ChevronDown className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem>
                    <Link href="/dashboard/profile">
                        <Button variant="ghost" className="w-full justify-start">
                            <Users className="mr-2 h-4 w-4" />
                            <span>My Profile</span>
                        </Button>
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <Link href="/dashboard/settings">
                        <Button variant="ghost" className="w-full justify-start">
                            <Settings className="mr-2 h-4 w-4" />
                            <span>Settings</span>
                        </Button>
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <LogoutButton />
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default UserDropdownMenu;
