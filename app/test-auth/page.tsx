"use client"
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../../lib/Firebase";

export default function TestAuthPage() {
    const login = async () => {
        const provider = new GoogleAuthProvider();
        const result = await signInWithPopup(auth, provider);
        console.log("POPUP USER:", result.user);
    };
    return (
        <div className="flex min-h-screen items-center justify-center">
            <button
                onClick={login}
                className="rounded bg-black px-6 py-3 text-white"
            >
                Test Auth Popup
            </button>
        </div>
    );
}   
