"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const roles = [
  "Software Engineer", "Product Manager", "Designer", "Marketing",
  "Sales", "Data Scientist", "Finance", "Operations", "Executive", "Other",
];

export default function SignupPage() {
  const [step, setStep] = useState(1); // 1 = account, 2 = role selection
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleStep1 = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      if (!res.ok) throw new Error(await res.text());
      
      const signInRes = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (signInRes?.error) throw new Error(signInRes.error);
      
      setStep(2);
    } catch (err) {
      alert(err instanceof Error ? err.message : "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const handleStep2 = async () => {
    if (!selectedRole) return;
    setLoading(true);
    await new Promise(r => setTimeout(r, 1000));
    // In production: redirect to onboarding
    setLoading(false);
    setStep(3);
  };

  return (
    <div style={{
      minHeight: "100vh", display: "flex",
      background: "linear-gradient(135deg, #F0EEFB 0%, #E4E0F4 50%, #DDD8F0 100%)",
    }}>
      {/* Left brand panel — same as login */}
      <div style={{
        flex: "0 0 44%", background: "#100030",
        display: "flex", flexDirection: "column",
        justifyContent: "space-between", padding: "3rem",
        position: "relative", overflow: "hidden",
      }} className="auth-left">
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
          <div style={{ position: "absolute", top: -80, right: -80, width: 320, height: 320, borderRadius: "50%", background: "rgba(99,97,184,0.18)" }} />
          <div style={{ position: "absolute", bottom: -60, left: -60, width: 260, height: 260, borderRadius: "50%", background: "rgba(232,53,90,0.12)" }} />
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", position: "relative", zIndex: 2 }}>
          <svg width="28" height="28" viewBox="0 0 30 30" fill="none"><circle cx="15" cy="15" r="13" stroke="#E8355A" strokeWidth="2"/><circle cx="15" cy="15" r="8" stroke="#E8355A" strokeWidth="1.5" strokeOpacity="0.35"/><circle cx="15" cy="15" r="3.5" fill="#E8355A"/></svg>
          <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.2rem", color: "white" }}>1IMP</span>
        </div>

        <div style={{ position: "relative", zIndex: 2 }}>
          <p style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#E8355A", marginBottom: "1rem" }}>
            GET STARTED FREE
          </p>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(1.5rem, 2.5vw, 2rem)", color: "white", lineHeight: 1.2, marginBottom: "2rem" }}>
            Your first impression<br />is 3 minutes away.
          </h2>

          {/* Step indicators */}
          {[
            { num: "01", label: "Create your account" },
            { num: "02", label: "Tell us your role" },
            { num: "03", label: "Upload your resume" },
            { num: "04", label: "Share your impression" },
          ].map((s, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.875rem", marginBottom: "1rem" }}>
              <div style={{
                width: 32, height: 32, borderRadius: "50%", flexShrink: 0,
                background: step > i + 1 ? "#E8355A" : step === i + 1 ? "rgba(232,53,90,0.2)" : "rgba(255,255,255,0.07)",
                border: step === i + 1 ? "1.5px solid #E8355A" : "1.5px solid transparent",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "0.75rem",
                color: step > i + 1 ? "white" : step === i + 1 ? "#E8355A" : "rgba(255,255,255,0.3)",
                transition: "all 300ms",
              }}>
                {step > i + 1 ? "✓" : s.num}
              </div>
              <span style={{ fontSize: "0.875rem", color: step === i + 1 ? "white" : "rgba(255,255,255,0.35)", fontWeight: step === i + 1 ? 600 : 400, transition: "all 300ms" }}>
                {s.label}
              </span>
            </div>
          ))}
        </div>

        <div style={{ position: "relative", zIndex: 2, fontSize: "0.8rem", color: "rgba(255,255,255,0.3)" }}>
          © 2025 1IMP Inc. · <Link href="/privacy" style={{ color: "rgba(255,255,255,0.3)", textDecoration: "none" }}>Privacy</Link>
        </div>
      </div>

      {/* Right — step form */}
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem" }}>
        <div style={{ width: "100%", maxWidth: 420 }}>
          <AnimatePresence mode="wait">

            {/* Step 1: Account details */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(1.5rem, 3vw, 2rem)", color: "#100030", letterSpacing: "-0.02em", marginBottom: "0.5rem" }}>
                  Create your account
                </h1>
                <p style={{ fontSize: "0.9375rem", color: "#555570", marginBottom: "2rem" }}>
                  Already have one?{" "}
                  <Link href="/login" style={{ color: "#6361B8", fontWeight: 600, textDecoration: "none" }}>Sign in →</Link>
                </p>

                {/* Google */}
                <button 
                  onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
                  style={{
                  width: "100%", display: "flex", alignItems: "center", justifyContent: "center",
                  gap: "0.75rem", padding: "0.8rem 1.5rem",
                  background: "white", border: "1.5px solid rgba(16,0,48,0.15)",
                  borderRadius: 12, fontSize: "0.9375rem", fontWeight: 600,
                  color: "#100030", cursor: "pointer", fontFamily: "var(--font-body)",
                  boxShadow: "0 2px 8px rgba(16,0,48,0.06)", transition: "all 150ms", marginBottom: "1.25rem",
                }}>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M19.6 10.23c0-.68-.06-1.36-.18-2H10v3.79h5.4a4.62 4.62 0 0 1-2 3.03v2.52h3.22c1.89-1.74 2.98-4.3 2.98-7.34z" fill="#4285F4"/>
                    <path d="M10 20c2.7 0 4.97-.9 6.62-2.43l-3.22-2.52c-.9.6-2.04.95-3.4.95-2.61 0-4.82-1.76-5.61-4.13H1.08v2.6A10 10 0 0 0 10 20z" fill="#34A853"/>
                    <path d="M4.39 11.87A5.98 5.98 0 0 1 4.08 10c0-.65.11-1.28.31-1.87V5.53H1.08A10 10 0 0 0 0 10c0 1.61.38 3.13 1.08 4.47l3.31-2.6z" fill="#FBBC05"/>
                    <path d="M10 3.97c1.47 0 2.79.51 3.83 1.5l2.86-2.86C14.96.99 12.69 0 10 0A10 10 0 0 0 1.08 5.53l3.31 2.6C5.18 5.73 7.39 3.97 10 3.97z" fill="#EA4335"/>
                  </svg>
                  Sign up with Google
                </button>

                <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.25rem" }}>
                  <div style={{ flex: 1, height: 1, background: "rgba(99,82,138,0.15)" }} />
                  <span style={{ fontSize: "0.8rem", color: "#9999AA" }}>or with email</span>
                  <div style={{ flex: 1, height: 1, background: "rgba(99,82,138,0.15)" }} />
                </div>

                <form onSubmit={handleStep1}>
                  {[
                    { label: "Full name", value: name, set: setName, type: "text", placeholder: "Alex Johnson" },
                    { label: "Work email", value: email, set: setEmail, type: "email", placeholder: "alex@company.com" },
                    { label: "Password", value: password, set: setPassword, type: "password", placeholder: "••••••••" },
                  ].map(field => (
                    <div key={field.label} style={{ marginBottom: "1rem" }}>
                      <label style={{ display: "block", fontSize: "0.8125rem", fontWeight: 600, color: "#100030", marginBottom: "0.4rem" }}>
                        {field.label}
                      </label>
                      <input
                        type={field.type}
                        value={field.value}
                        onChange={e => field.set(e.target.value)}
                        placeholder={field.placeholder}
                        required
                        style={{
                          width: "100%", padding: "0.75rem 1rem",
                          border: "1.5px solid rgba(99,82,138,0.2)", borderRadius: 10,
                          fontSize: "0.9375rem", fontFamily: "var(--font-body)", color: "#100030",
                          background: "white", outline: "none", transition: "border-color 150ms",
                          boxSizing: "border-box",
                        }}
                        onFocus={e => { e.currentTarget.style.borderColor = "#6361B8"; }}
                        onBlur={e => { e.currentTarget.style.borderColor = "rgba(99,82,138,0.2)"; }}
                      />
                    </div>
                  ))}

                  <button type="submit" disabled={loading} style={{
                    width: "100%", padding: "0.8rem 1.5rem",
                    background: loading ? "#ccc" : "#100030", color: "white", borderRadius: 10, border: "none",
                    fontSize: "0.9375rem", fontWeight: 600, fontFamily: "var(--font-body)", cursor: loading ? "not-allowed" : "pointer",
                    transition: "opacity 150ms",
                  }}>
                    {loading ? "Creating account..." : "Continue →"}
                  </button>
                </form>

                <p style={{ fontSize: "0.78rem", color: "#9999AA", textAlign: "center", marginTop: "1.25rem" }}>
                  By signing up you agree to our{" "}
                  <Link href="/terms" style={{ color: "#6361B8", textDecoration: "none" }}>Terms</Link>{" "}and{" "}
                  <Link href="/privacy" style={{ color: "#6361B8", textDecoration: "none" }}>Privacy Policy</Link>.
                </p>
              </motion.div>
            )}

            {/* Step 2: Role selection */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(1.5rem, 3vw, 2rem)", color: "#100030", letterSpacing: "-0.02em", marginBottom: "0.5rem" }}>
                  What&apos;s your role?
                </h1>
                <p style={{ fontSize: "0.9375rem", color: "#555570", marginBottom: "2rem" }}>
                  This helps us personalize your first impression.
                </p>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.625rem", marginBottom: "1.5rem" }}>
                  {roles.map(role => (
                    <button
                      key={role}
                      onClick={() => setSelectedRole(role)}
                      style={{
                        padding: "0.75rem 1rem", borderRadius: 10, cursor: "pointer",
                        border: selectedRole === role ? "1.5px solid #6361B8" : "1.5px solid rgba(99,82,138,0.2)",
                        background: selectedRole === role ? "rgba(99,97,184,0.08)" : "white",
                        color: selectedRole === role ? "#6361B8" : "#444466",
                        fontFamily: "var(--font-body)", fontSize: "0.875rem", fontWeight: selectedRole === role ? 600 : 400,
                        textAlign: "left", transition: "all 150ms",
                      }}
                    >
                      {role}
                    </button>
                  ))}
                </div>

                <button
                  onClick={handleStep2}
                  disabled={!selectedRole || loading}
                  style={{
                    width: "100%", padding: "0.8rem 1.5rem",
                    background: !selectedRole ? "#ccc" : "#100030",
                    color: "white", borderRadius: 10, border: "none",
                    fontSize: "0.9375rem", fontWeight: 600, fontFamily: "var(--font-body)",
                    cursor: !selectedRole ? "not-allowed" : "pointer", transition: "all 160ms",
                    display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem",
                  }}
                >
                  {loading ? (
                    <><span style={{ width: 16, height: 16, borderRadius: "50%", border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "white", animation: "spin 0.7s linear infinite", display: "inline-block" }} />Setting up...</>
                  ) : "Continue →"}
                </button>
              </motion.div>
            )}

            {/* Step 3: Go to onboarding */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                style={{ textAlign: "center" }}
              >
                <motion.div
                  initial={{ scale: 0 }} animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 260, damping: 20 }}
                  style={{ fontSize: "4rem", marginBottom: "1.5rem" }}
                >🎉</motion.div>
                <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.75rem", color: "#100030", letterSpacing: "-0.02em", marginBottom: "0.75rem" }}>
                  Account created!
                </h1>
                <p style={{ fontSize: "0.9375rem", color: "#555570", marginBottom: "2rem", lineHeight: 1.6 }}>
                  Welcome, {name || "there"}! Your journey to a better first impression starts now.
                </p>
                <Link href="/onboarding" style={{
                  display: "inline-flex", alignItems: "center", gap: "0.5rem",
                  padding: "0.8rem 2rem", background: "#E8355A", color: "white",
                  borderRadius: 9999, fontSize: "0.9375rem", fontWeight: 600,
                  textDecoration: "none", fontFamily: "var(--font-body)",
                  boxShadow: "0 4px 20px rgba(232,53,90,0.35)",
                }}>
                  Build My Impression →
                </Link>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </div>

      <style>{`
        @media(max-width: 768px) { .auth-left { display: none !important; } }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
