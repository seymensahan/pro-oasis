import {
    Package,
    ChevronDown,
    Flag,
    Search,
    Maximize2,
    Bell,
    Users,
    Settings,
    LogOut,
    Mail,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import UserDropdownMenu from "./UserDropdownMenu";
import LanguageSelector from './LanguageSelector';


const Header = () => {


    return (
        <header className="bg-white shadow-sm z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-4">
                    <div className="flex items-center space-x-4 flex-1">
                        <Button variant="ghost" size="icon" className="lg:hidden">
                            <Package className="h-5 w-5" />
                        </Button>
                        <div
                            className="relative flex-1  max-w-xl"
                        >
                            <Input
                                type="search"
                                placeholder="Search"
                                className="pl-10 pr-4 py-2 w-full rounded-md border border-gray-300 focus:ring-orange-500 focus:border-orange-500"
                            />
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        </div>
                    </div>
                    <div className="flex items-center space-x-4">
                        <LanguageSelector />
                        <Button variant="outline" size="icon" className="relative">
                            <Mail className="h-5 w-5" />
                            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">3</span>
                        </Button>
                        <Button variant="outline" size="icon" className="relative">
                            <Bell className="h-5 w-5" />
                            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">7</span>
                        </Button>
                        <UserDropdownMenu />
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header
