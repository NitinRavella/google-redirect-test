"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import {
    GoogleAuthProvider,
    signInWithPopup,
    signInWithRedirect,
    onAuthStateChanged,
    getRedirectResult
} from "firebase/auth";
import { auth } from "../../lib/Firebase";
import Image from "next/image";

export default function SignupPage() {
    const router = useRouter();
    const handled = useRef(false);

    useEffect(() => {

        getRedirectResult(auth)

            .then((result) => {
                console.log("REDIRECT RESULT:", result);
                if (result?.user) {

                    // User signed in successfully

                }

            })

            .catch((error) => console.error("Redirect error:", error));

    }, []);
    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user) => {
            if (user && !handled.current) {
                handled.current = true;
                router.replace("/dashboard");
            }
        });

        return () => unsub();
    }, [router]);

    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });

    const signInPopup = async () => {
        try {
            await signInWithPopup(auth, provider);
        } catch (err) {
            console.error("Popup login failed", err);
        }
    };

    const signInRedirect = async () => {
        try {
            await signInWithRedirect(auth, provider);
        } catch (err) {
            console.error("Redirect login failed", err);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 px-4">
            <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
                <h1 className="mb-2 text-center text-2xl font-bold">
                    Create your account
                </h1>
                <p className="mb-8 text-center text-sm text-gray-500">
                    Sign up using Google to continue
                </p>

                {/* Popup Button */}
                <button
                    onClick={signInPopup}
                    className="mb-4 flex w-full items-center justify-center gap-3 rounded-lg border border-gray-300 bg-white py-3 font-medium text-gray-800 transition hover:bg-gray-50"
                >
                    <Image
                        width={24}
                        height={24}
                        src="https://www.svgrepo.com/show/475656/google-color.svg"
                        alt="Google"
                        className="h-5 w-5"
                    />
                    Continue with Google (Popup)
                </button>

                {/* Divider */}
                <div className="my-6 flex items-center">
                    <div className="h-px flex-1 bg-gray-300" />
                    <span className="mx-3 text-xs text-gray-400">OR</span>
                    <div className="h-px flex-1 bg-gray-300" />
                </div>

                {/* Redirect Button */}
                <button
                    onClick={signInRedirect}
                    className="flex w-full items-center justify-center gap-3 rounded-lg bg-black py-3 font-medium text-white transition hover:bg-gray-900"
                >
                    <Image
                        width={24}
                        height={24}
                        src="https://www.svgrepo.com/show/475656/google-color.svg"
                        alt="Google"
                        className="h-5 w-5 invert"
                    />
                    Continue with Google (Redirect)
                </button>

                <p className="mt-6 text-center text-xs text-gray-400">
                    Popup is recommended for local testing.
                    Redirect is recommended for production.
                </p>
            </div>
        </div>
    );
}
