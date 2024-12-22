"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../../utils/supabaseClient";
import { User, Event } from "@/types";

export default function ProfilePage() {
    const [user, setUser] = useState<User | null>(null);
    const [events, setEvents] = useState<Event[]>([]);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        const fetchProfile = async () => {
            const {
                data: { session },
                error: sessionError,
            } = await supabase.auth.getSession();

            if (sessionError || !session) {
                router.push("/login");
                return;
            }

            const { data: profile, error: profileError } = await supabase
                .from("users")
                .select("*")
                .eq("email", session.user.email)
                .single();

            if (profileError || !profile) {
                setError("Failed to fetch profile.");
                return;
            }

            setUser(profile);

            const { data: eventsData, error: eventsError } = await supabase
                .from("events")
                .select("*")
                .in(
                    "event_id",
                    (await supabase
                            .from("registrations")
                            .select("event_id")
                            .eq("user_id", profile.user_id)
                    ).data?.map((reg) => reg.event_id) || []
                );

            if (eventsError) {
                setError("Failed to fetch events.");
                return;
            }

            setEvents(eventsData);
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
        <div className="max-w-3xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">My Profile</h1>
            <div className="p-4 border rounded mb-4">
                <p><strong>Name:</strong> {user.full_name}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Role:</strong> {user.role}</p>
                <p><strong>Status:</strong> {user.status}</p>
            </div>
            <h2 className="text-xl font-bold mb-4">My Events</h2>
            <ul>
                {events.map((event) => (
                    <li key={event.event_id} className="p-4 border rounded mb-4">
                        <p><strong>Title:</strong> {event.title}</p>
                        <p><strong>Date:</strong> {event.event_date}</p>
                        <p><strong>Location:</strong> {event.location}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}