import Link from "next/link";

export default function Home() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)]">
            <h1 className="text-4xl font-bold mb-8">Welcome to ShiftEase</h1>
            <p className="text-xl mb-8 text-center max-w-2xl">
                Manage and track shift registrations, attendance, and notifications for youth workers in your community center.
            </p>


    <div className="flex space-x-4">
                <Link href="/users" passHref>
                    <button className="px-4 py-2 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600">
                        View Users
                    </button>
                </Link>
                <Link href="/events" passHref>
                    <button className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600">
                        View Events
                    </button>
                </Link>
                <Link href="/profile" passHref>
                    <button className="px-4 py-2 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-100">
                        My Profile
                    </button>
                </Link>
            </div>
        </div>
    );
}
