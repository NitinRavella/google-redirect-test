"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { auth } from "../../lib/Firebase";
import Image from "next/image";

export default function DashboardPage() {
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (currentUser) => {
            if (!currentUser) {
                router.replace("/signup");
            } else {
                setUser(currentUser);
            }
        });

        return () => unsub();
    }, [router]);

    const logout = async () => {
        await signOut(auth);
        router.replace("/signup");
    };

    if (!user) {
        return (
            <div className="flex min-h-screen items-center justify-center text-gray-500">
                Loading dashboard...
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Top Bar */}
            <header className="flex items-center justify-between bg-white px-6 py-4 shadow">
                <h1 className="text-xl font-semibold">Dashboard</h1>

                <div className="flex items-center gap-4">
                    <div className="text-right">
                        <p className="text-sm font-medium">{user.displayName}</p>
                        <p className="text-xs text-gray-500">{user.email}</p>
                    </div>

                    {user.photoURL && (
                        <Image
                            width={40}
                            height={40}
                            src={user.photoURL}
                            alt="User"
                            className="h-10 w-10 rounded-full border"
                        />
                    )}

                    <button
                        onClick={logout}
                        className="rounded-lg bg-black px-4 py-2 text-sm text-white hover:bg-gray-900"
                    >
                        Logout
                    </button>
                </div>
            </header>

            {/* Main Content */}
            <main className="p-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    {/* Card 1 */}
                    <div className="rounded-xl bg-white p-6 shadow">
                        <h2 className="mb-2 text-sm font-medium text-gray-500">
                            Account Status
                        </h2>
                        <p className="text-lg font-semibold text-green-600">
                            Active
                        </p>
                    </div>

                    {/* Card 2 */}
                    <div className="rounded-xl bg-white p-6 shadow">
                        <h2 className="mb-2 text-sm font-medium text-gray-500">
                            Auth Provider
                        </h2>
                        <p className="text-lg font-semibold">
                            Google
                        </p>
                    </div>

                    {/* Card 3 */}
                    <div className="rounded-xl bg-white p-6 shadow">
                        <h2 className="mb-2 text-sm font-medium text-gray-500">
                            User ID
                        </h2>
                        <p className="truncate text-sm font-mono text-gray-700">
                            {user.uid}
                        </p>
                    </div>
                </div>

                {/* Welcome Section */}
                <div className="mt-8 rounded-xl bg-white p-6 shadow">
                    <h2 className="mb-2 text-xl font-semibold">
                        Welcome back 👋
                    </h2>
                    <p className="text-gray-600">
                        You have successfully signed in using Google authentication.
                        This dashboard is protected and only visible to logged-in users.
                    </p>
                </div>
            </main>
        </div>
    );
}
