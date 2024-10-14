"use client";

import ModalInputs from "@/components/Project/ModalInputs";
import React, { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function page() {
    const [switchForm, setSwitchForm] = useState(false);

    return (
        <div className="flex p-3 h-full justify-center items-center">
            {switchForm ? (
                <Register setSwitchForm={setSwitchForm} />
            ) : (
                <Login setSwitchForm={setSwitchForm} />
            )}
        </div>
    );
}

export function Login({ setSwitchForm }: any) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { data: session, status } = useSession();

    const handleLogin = async () => {
        const result = await signIn("credentials", {
            redirect: false,
            email,
            password,
        });

        if (result?.error) {
            console.log(result.error);
        } else {
            console.log(result, session?.user);
        }

        // try {
        //     const response = await fetch("api/auth/login", {
        //         method: "POST",
        //         headers: {
        //             "Content-Type": "application/json"
        //         },
        //         body: JSON.stringify({ email, password })
        //     })
        //     if (!response.ok) {
        //         throw new Error("Login failed")
        //     }
        //     const data = await response.json()
        //     localStorage.setItem("token", JSON.stringify(data))
        //     console.log(data)
        // } catch (error) {
        //     console.log(error)
        // }
    };

    return (
        <div className="bg-white max-w-[500px] w-full p-6 rounded-xl shadow-2xl">
            <div>
                <h1 className="text-3xl mb-5 font-bold">Anmelden</h1>
                <div className="space-y-3">
                    <ModalInputs
                        input_name="email"
                        label_name="Email"
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        type="email"
                        className="py-3"
                    />
                    <ModalInputs
                        input_name="password"
                        label_name="Passwort"
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Passwort"
                        type="password"
                        className="py-3"
                    />
                    <div>
                        <p>
                            Du hast noch kein Konto?{" "}
                            <span
                                onClick={() => setSwitchForm(true)}
                                className="text-primary cursor-pointer"
                            >
                                Registrieren
                            </span>
                        </p>
                    </div>
                    <button
                        onClick={handleLogin}
                        className="w-full bg-primary hover:bg-hoverPrimary transition-all duration-200 mt-3 text-white font-bold py-3 px-4 rounded-xl shadow-lg shadow-primary/50"
                    >
                        Anmelden
                    </button>
                </div>
            </div>
        </div>
    );
}

export function Register({ setSwitchForm }: any) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === "authenticated") {
            // Benutzer ist bereits eingeloggt, Umleitung zur Startseite
            router.push("/");
        }
    }, [status, router]);

    const handleRegister = async () => {
        try {
            const response = await fetch("/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                }),
            });
            if (!response.ok) {
                throw new Error("Failed to register user");
            }
            const data = await response.json();
            console.log("User registered:", data);
            setSwitchForm(false);
        } catch (error) {
            console.error("Error registering user:", error);
        }
    };

    return (
        <div className="bg-white max-w-[500px] w-full p-4 rounded-xl shadow-2xl">
            <div>
                <h1 className="text-3xl mb-5 font-bold">Registrieren</h1>
                <div className="space-y-3">
                    <ModalInputs
                        input_name="email"
                        label_name="Email"
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        type="email"
                    />
                    <ModalInputs
                        input_name="password"
                        label_name="Passwort"
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Passwort"
                        type="password"
                    />
                    <ModalInputs
                        input_name="password"
                        label_name="Passwort bestätigen"
                        onChange={() => {}}
                        placeholder="Passwort bestätigen"
                        type="password"
                    />
                    <div>
                        <p>
                            Du hast schon ein Konto?{" "}
                            <span
                                onClick={() => setSwitchForm(false)}
                                className="text-primary cursor-pointer"
                            >
                                Anmelden
                            </span>
                        </p>
                    </div>
                    <button
                        onClick={handleRegister}
                        className="w-full bg-primary hover:bg-hoverPrimary mt-3 text-white font-bold py-3 px-4 rounded-xl"
                    >
                        Registrieren
                    </button>
                </div>
            </div>
        </div>
    );
}
