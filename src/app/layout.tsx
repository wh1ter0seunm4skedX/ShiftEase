import Link from "next/link";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "ShiftEase - Manage Shifts Effectively",
    description: "An app to manage shift registrations and notifications for youth workers.",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} bg-gray-100`}>
        {/* Navigation Bar */}
        <header className="bg-white shadow-md">
            <div className="container mx-auto flex justify-between items-center p-4">
                <Link href="/" className="text-lg font-bold hover:underline">
                    ShiftEase
                </Link>
                <nav className="space-x-4">
                    <Link href="/" className="hover:underline">
                        Home
                    </Link>
                    <Link href="/login" className="hover:underline">
                        Login
                    </Link>
                    <Link href="/users" className="hover:underline">
                        Users
                    </Link>
                    <Link href="/shifts" className="hover:underline">
                        Shifts
                    </Link>
                    <Link href="/profile" className="hover:underline">
                        Profile
                    </Link>
                </nav>
            </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto p-4">{children}</main>

        {/* Footer */}
        <footer className="bg-gray-800 text-white py-4">
            <div className="container mx-auto text-center">
                © {new Date().getFullYear()} ShiftEase. All rights reserved.
            </div>
        </footer>
        </body>
        </html>
    );
}
