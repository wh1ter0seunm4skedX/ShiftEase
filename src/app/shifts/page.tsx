import { supabase } from "../../../utils/supabaseClient";

export default async function ShiftsPage() {
    const { data: shifts, error } = await supabase.from("shifts").select("*");

    if (error) {
        return <p className="text-red-500 text-center mt-8">Error fetching shifts: {error.message}</p>;
    }

    return (
        <div className="max-w-4xl mx-auto mt-8 p-4">
            <h1 className="text-2xl font-bold text-center mb-6">Shifts</h1>
            <ul className="space-y-4">
                {shifts?.map((shift) => (
                    <li
                        key={shift.id}
                        className="p-4 border border-gray-300 rounded-lg shadow-sm bg-white"
                    >
                        <strong className="text-lg font-semibold">{shift.title}</strong>
                        <p className="text-gray-600">{shift.description}</p>
                        <div className="text-sm text-gray-500 mt-2">
                            <span>Event Date: {shift.event_date}</span> <br />
                            <span>Start Time: {shift.start_time}</span> <br />
                            <span>End Time: {shift.end_time}</span>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
