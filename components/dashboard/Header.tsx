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
                        <Button variant="ghost" size="icon">
                            <Maximize2 className="h-5 w-5" />
                        </Button>
                        <Button variant="ghost" size="icon">
                            <Bell className="h-5 w-5" />
                        </Button>
                        <UserDropdownMenu />
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header
