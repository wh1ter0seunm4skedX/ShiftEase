import { supabase } from "../../../utils/supabaseClient";
import { User } from "@/types";

export default async function UsersPage() {
    const { data: users, error } = await supabase
        .from("users")
        .select("*")
        .order("full_name", { ascending: true });

    if (error) {
        return <p className="text-red-500">Error fetching users: {error.message}</p>;
    }

    return (
        <div className="max-w-3xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Users</h1>
            <ul>
                {users?.map((user: User) => (
                    <li key={user.user_id} className="p-4 border rounded mb-4">
                        <p><strong>Name:</strong> {user.full_name}</p>
                        <p><strong>Email:</strong> {user.email}</p>
                        <p><strong>Role:</strong> {user.role}</p>
                        <p><strong>Status:</strong> {user.status}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}
