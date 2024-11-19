import type { Metadata } from "next";
import "./globals.css";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from "@/context/AuthContext";
import ProtectedRoute from "@/components/protectedRoutes";



export const metadata: Metadata = {
  title: "Pro Oasis",
  description: "The super manager you always wanted",
  icons: {
    icon: "/ProOasis-logo.webp",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body>
        {/* <PrivateRoute> */}
        <AuthProvider>
          <ProtectedRoute>
            <ToastContainer />
            {children}
          </ProtectedRoute>
        </AuthProvider>
        {/* </PrivateRoute> */}
      </body>
    </html>
  );
}
