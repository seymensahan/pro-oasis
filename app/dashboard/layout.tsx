import Header from "@/app/dashboard/components/Header";
import Sidebar from "@/app/dashboard/components/Sidebar";
import { Suspense } from "react";
import Loading from "./loading";

interface AdminLayoutProps {
    children: React.ReactNode;
}


export default function DashboardLayout({ children }: AdminLayoutProps) {

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Header */}
                <Header />
                <Suspense fallback={<Loading />} >
                    {/* Page Content */}
                    <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
                        <div className="container mx-auto px-6 py-8">{children}</div>
                    </main>
                </Suspense>
            </div>
        </div>
    );
}
