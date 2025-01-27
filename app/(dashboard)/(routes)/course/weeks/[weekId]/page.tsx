"use client";

import { useRouter } from "next/navigation";

const WeekDetail = () => {
    const router = useRouter();

    const navigateTo = (path: string) => {
        router.push(path);
    };

    return (
        <div className="flex h-screen">
            {/* Navigation Menu */}
            <div className="w-1/5 bg-gray-800 text-white p-4 flex flex-col gap-4">
                <h1 className="text-xl font-bold mb-6">Navigation</h1>
                <button
                    onClick={() => navigateTo("/home")}
                    className="bg-gray-700 hover:bg-gray-600 rounded-md px-4 py-2 text-left"
                >
                    Home
                </button>
                <button
                    onClick={() => navigateTo("/weeks")}
                    className="bg-gray-700 hover:bg-gray-600 rounded-md px-4 py-2 text-left"
                >
                    Weeks
                </button>
                <button
                    onClick={() => navigateTo("/about")}
                    className="bg-gray-700 hover:bg-gray-600 rounded-md px-4 py-2 text-left"
                >
                    About
                </button>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-6">
                <h2 className="text-2xl font-semibold mb-4">Week Details</h2>
                <p>Content for the selected week will go here.</p>
            </div>
        </div>
    );
};

export default WeekDetail;
