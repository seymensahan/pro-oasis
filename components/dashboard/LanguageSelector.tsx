"use client"

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

// Define the Language type
type Language = {
    code: string;
    name: string;
    flag: string;
};

// Define the list of languages
const languages: Language[] = [
    { code: 'en', name: 'English', flag: 'https://flagcdn.com/w20/gb.png' },
    { code: 'fr', name: 'Français', flag: 'https://flagcdn.com/w20/fr.png' },
];

const LanguageSelector = () => {
    const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                    <img
                        src={selectedLanguage.flag}
                        alt={selectedLanguage.name}
                        className="h-5 w-7"
                    />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                {languages.map((lang) => (
                    <DropdownMenuItem key={lang.code} onSelect={() => setSelectedLanguage(lang)}>
                        <img src={lang.flag} alt={lang.name} className="h-4 w-6 mr-2" />
                        {lang.name}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default LanguageSelector;
