import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { useLogout } from "@/hooks/useLogout";

export function LogoutButton() {
    const { logout } = useLogout();

    return (
        <Button variant="ghost" onClick={logout} className="w-full justify-start">
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
        </Button>
    );
}
