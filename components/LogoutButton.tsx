import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

export function LogoutButton() {
    const { logout } = useAuth();

    return (
        <Button variant="ghost" onClick={logout} className="w-full justify-start">
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
        </Button>
    );
}
