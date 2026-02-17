import { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";

export default function Auth() {
    const [active, setActive] = useState("signup");

    return (
        <div
            className="min-h-screen flex items-center justify-center px-6"
            style={{ background: "var(--surface)" }}
        >
            <div
                className="w-full max-w-md p-8 rounded-2xl border shadow-sm"
                style={{
                    background: "var(--card)",
                    borderColor: "var(--border)",
                }}
            >
                {/* Toggle Tabs */}
                <div className="flex mb-8 border-b"
                    style={{ borderColor: "var(--border)" }}>

                    <button
                        onClick={() => setActive("signup")}
                        className={`flex-1 pb-3 text-sm font-medium transition-colors
              ${active === "signup"
                                ? "text-[var(--accent)] border-b-2 border-[var(--accent)]"
                                : "text-[var(--text-secondary)]"}`}
                    >
                        Create Account
                    </button>

                    <button
                        onClick={() => setActive("login")}
                        className={`flex-1 pb-3 text-sm font-medium transition-colors
              ${active === "login"
                                ? "text-[var(--accent)] border-b-2 border-[var(--accent)]"
                                : "text-[var(--text-secondary)]"}`}
                    >
                        Sign In
                    </button>
                </div>

                {/* Forms */}
                {active === "signup" ? <Signup /> : <Login />}
            </div>
        </div>
    );
}
