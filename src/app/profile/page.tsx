"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../../utils/supabaseClient";
import { User } from "@/types";

export default function ProfilePage() {
    const [user, setUser] = useState<User | null>(null);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        const fetchProfile = async () => {
            const {
                data: { session },
            } = await supabase.auth.getSession();

            if (!session) {
                router.push("/login"); // Redirect to login if no session
                return;
            }

            try {
                const { data: profile, error: profileError } = await supabase
                    .from("users")
                    .select("*")
                    .eq("email", session.user.email)
                    .single();

                if (profileError || !profile) {
                    setError("Failed to fetch profile.");
                } else {
                    setUser(profile);
                }
            } catch (err) {
                console.error("Unexpected error:", err);
                setError("An unexpected error occurred. Please try again.");
            }
        };

        fetchProfile();
    }, [router]);

    if (error) {
        return <p className="text-red-500 text-center mt-8">{error}</p>;
    }

    if (!user) {
        return <p className="text-center mt-8">Loading...</p>;
    }

    return (
        <div className="max-w-md mx-auto mt-8 p-4">
            <h1 className="text-2xl font-bold text-center mb-6">My Profile</h1>
            <div className="p-4 border border-gray-300 rounded-lg shadow-sm bg-white">
                <p>
                    <strong>Name:</strong> {user.name}
                </p>
                <p>
                    <strong>Email:</strong> {user.email}
                </p>
                <p>
                    <strong>Role:</strong> {user.role}
                </p>
            </div>
        </div>
    );
}
