import Link from "next/link";

export default function HomePage() {
    return (
        <div className="flex h-screen items-center justify-center">
            <Link
                href="/signup"
                className="rounded bg-black px-6 py-3 text-white"
            >
                Go to Signup
            </Link>
        </div>
    );
}
