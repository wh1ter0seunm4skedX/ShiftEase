"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../../utils/supabaseClient";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        const checkSession = async () => {
            const {
                data: { session },
            } = await supabase.auth.getSession();

            if (session) {
                // If the user is already logged in, redirect to "My Profile"
                router.push("/profile");
            }
        };

        checkSession();
    }, [router]);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        const { data: session, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            setError("Login failed. Please check your credentials.");
        } else {
            router.push("/profile"); // Redirect to "My Profile" after login
        }
    };

    return (
        <div className="max-w-md mx-auto mt-8 p-4">
            <h1 className="text-2xl font-bold text-center mb-6">Login</h1>
            <form onSubmit={handleLogin} className="space-y-4">
                {error && <p className="text-red-500">{error}</p>}
                <input
                    type="email"
                    placeholder="Email"
                    className="w-full p-2 border border-gray-300 rounded"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="w-full p-2 border border-gray-300 rounded"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button
                    type="submit"
                    className="w-full py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-600"
                >
                    Login
                </button>
            </form>
        </div>
    );
}
