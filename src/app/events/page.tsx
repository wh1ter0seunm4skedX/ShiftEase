import { supabase } from "../../../utils/supabaseClient";
import { Event } from "@/types";

export default async function EventsPage() {
    const { data: events, error } = await supabase
        .from("events")
        .select("*")
        .order("event_date", { ascending: true });

    if (error) {
        return <p className="text-red-500">Error fetching events: {error.message}</p>;
    }

    return (
        <div className="max-w-3xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Events</h1>
            <ul>
                {events?.map((event: Event) => (
                    <li key={event.event_id} className="p-4 border rounded mb-4">
                        <p><strong>Title:</strong> {event.title}</p>
                        <p><strong>Date:</strong> {event.event_date}</p>
                        <p><strong>Location:</strong> {event.location}</p>
                        <p><strong>Start:</strong> {event.start_time}</p>
                        <p><strong>End:</strong> {event.end_time}</p>
                        <p><strong>Required Workers:</strong> {event.required_workers}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}
