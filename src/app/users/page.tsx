import { supabase } from "../../../utils/supabaseClient";

export default async function UsersPage() {
    const { data: users, error } = await supabase.from("users").select("*");

    if (error) {
        return <p className="text-red-500 text-center mt-8">Error fetching users: {error.message}</p>;
    }

    return (
        <div className="max-w-2xl mx-auto mt-8 p-4 text-center">
            <h1 className="text-2xl font-bold mb-6">Users</h1>
            <ul className="space-y-4">
                {users?.map((user) => (
                    <li
                        key={user.id}
                        className="p-4 border border-gray-300 rounded-lg shadow-sm bg-white text-left"
                    >
                        <strong className="block text-lg font-semibold">{user.name}</strong>
                        <span className="block text-sm text-gray-600">{user.role}</span>
                        <a href={`mailto:${user.email}`} className="text-blue-500 hover:underline">
                            {user.email}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
}
