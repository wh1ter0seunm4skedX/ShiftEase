"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "./ModeToggle";

const Header = () => {
    const pathname = usePathname();

    return (
        <header className="bg-background border-b">
            <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
                <Link href="/" className="text-2xl font-bold">
                    ShiftEase
                </Link>
                <div className="flex items-center space-x-4">
                    <Link href="/" passHref>
                        <Button variant={pathname === "/" ? "default" : "ghost"}>Home</Button>
                    </Link>
                    <Link href="/events" passHref>
                        <Button variant={pathname === "/events" ? "default" : "ghost"}>Events</Button>
                    </Link>
                    <Link href="/statistics" passHref>
                        <Button variant={pathname === "/statistics" ? "default" : "ghost"}>Statistics</Button>
                    </Link>
                    <Link href="/manager" passHref>
                        <Button variant={pathname === "/manager" ? "default" : "ghost"}>Manager</Button>
                    </Link>
                    <Link href="/profile" passHref>
                        <Button variant={pathname === "/profile" ? "default" : "ghost"}>Profile</Button>
                    </Link>
                    <ModeToggle />
                </div>
            </nav>
        </header>
    );
};

export default Header;
