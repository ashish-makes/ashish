"use client";

import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

export default function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        try {
            const result = await signIn("credentials", {
                username,
                password,
                redirect: false,
            });

            if (result?.error) {
                setError("Incorrect credentials");
            } else {
                router.push("/dashboard");
                router.refresh();
            }
        } catch (err) {
            setError("Error");
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-white flex flex-col items-center justify-center p-6 font-bricolage selection:bg-neutral-950 selection:text-white">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="w-full max-w-[300px]"
            >
                <div className="mb-12 text-center">
                    <h1 className="text-[10px] font-black uppercase tracking-[0.4em] text-neutral-950">
                        Admin Access
                    </h1>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <input
                            type="text"
                            required
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full px-5 py-4 bg-neutral-50 border border-neutral-100 rounded-xl text-sm transition-all outline-none focus:border-neutral-950 placeholder:text-neutral-300"
                            placeholder="Username"
                        />
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-5 py-4 bg-neutral-50 border border-neutral-100 rounded-xl text-sm transition-all outline-none focus:border-neutral-950 placeholder:text-neutral-300"
                            placeholder="Password"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-4 bg-neutral-950 text-white rounded-xl font-bold text-[10px] tracking-[0.3em] uppercase hover:bg-neutral-800 transition-all disabled:opacity-50 flex items-center justify-center"
                    >
                        {isLoading ? (
                            <Loader2 className="w-4 h-4 animate-spin opacity-50" />
                        ) : (
                            "Log In"
                        )}
                    </button>

                    {error && (
                        <p className="text-[9px] font-bold text-red-500 text-center uppercase tracking-widest pt-2">
                            {error}
                        </p>
                    )}
                </form>

                <div className="mt-16 text-center">
                    <a href="/" className="text-[10px] font-bold text-neutral-300 hover:text-neutral-950 transition-colors uppercase tracking-widest">
                        Cancel
                    </a>
                </div>
            </motion.div>
        </main>
    );
}
