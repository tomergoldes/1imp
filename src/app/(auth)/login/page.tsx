"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.error) {
      setErrorMsg(res.error);
      setLoading(false);
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <div style={{
      minHeight: "100vh", display: "flex",
      background: "linear-gradient(135deg, #F0EEFB 0%, #E4E0F4 50%, #DDD8F0 100%)",
    }}>
      {/* Left — brand panel */}
      <div style={{
        flex: "0 0 44%", background: "#100030",
        display: "flex", flexDirection: "column",
        justifyContent: "space-between", padding: "3rem",
        position: "relative", overflow: "hidden",
      }} className="auth-left">

        {/* Background decorative circles */}
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
          <div style={{ position: "absolute", top: -80, right: -80, width: 320, height: 320, borderRadius: "50%", background: "rgba(99,97,184,0.18)" }} />
          <div style={{ position: "absolute", bottom: -60, left: -60, width: 260, height: 260, borderRadius: "50%", background: "rgba(232,53,90,0.12)" }} />
          <div style={{ position: "absolute", top: "40%", left: "60%", width: 120, height: 120, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.06)" }} />
        </div>

        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", position: "relative", zIndex: 2 }}>
          <svg width="28" height="28" viewBox="0 0 30 30" fill="none"><circle cx="15" cy="15" r="13" stroke="#E8355A" strokeWidth="2"/><circle cx="15" cy="15" r="8" stroke="#E8355A" strokeWidth="1.5" strokeOpacity="0.35"/><circle cx="15" cy="15" r="3.5" fill="#E8355A"/></svg>
          <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.2rem", color: "white" }}>1IMP</span>
        </div>

        {/* Center quote */}
        <div style={{ position: "relative", zIndex: 2 }}>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            style={{
              fontFamily: "var(--font-display)", fontWeight: 700,
              fontSize: "clamp(1.5rem, 2.5vw, 2rem)", color: "white",
              lineHeight: 1.25, marginBottom: "1.5rem",
              letterSpacing: "-0.02em",
            }}
          >
            &ldquo;The way professionals are discovered is changing.<br />
            <span style={{ color: "#E8355A" }}>1IMP</span> is the new standard.&rdquo;
          </motion.p>

          {/* Fake testimonial */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}
          >
            <div style={{
              width: 40, height: 40, borderRadius: "50%",
              background: "linear-gradient(135deg, #6361B8, #E8355A)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontFamily: "var(--font-display)", fontWeight: 700, color: "white", fontSize: "0.9rem",
            }}>S</div>
            <div>
              <div style={{ fontWeight: 600, color: "white", fontSize: "0.875rem" }}>Sara Chen</div>
              <div style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.8rem" }}>Product Manager — got 3× more callbacks</div>
            </div>
          </motion.div>

          {/* Stat pills */}
          <motion.div
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            style={{ display: "flex", gap: "0.75rem", marginTop: "2.5rem", flexWrap: "wrap" }}
          >
            {[
              { val: "3×", label: "More callbacks" },
              { val: "-48%", label: "Time to interview" },
              { val: "50K+", label: "Professionals" },
            ].map(stat => (
              <div key={stat.val} style={{
                background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: 10, padding: "0.6rem 1rem",
              }}>
                <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.25rem", color: "white", lineHeight: 1 }}>{stat.val}</div>
                <div style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.45)", marginTop: 2 }}>{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Bottom footer */}
        <div style={{ position: "relative", zIndex: 2, fontSize: "0.8rem", color: "rgba(255,255,255,0.3)" }}>
          © 2025 1IMP Inc. · <Link href="/privacy" style={{ color: "rgba(255,255,255,0.3)", textDecoration: "none" }}>Privacy</Link> · <Link href="/terms" style={{ color: "rgba(255,255,255,0.3)", textDecoration: "none" }}>Terms</Link>
        </div>
      </div>

      {/* Right — form panel */}
      <div style={{
        flex: 1, display: "flex", alignItems: "center", justifyContent: "center",
        padding: "2rem",
      }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{ width: "100%", maxWidth: 420 }}
        >
          <h1 style={{
            fontFamily: "var(--font-display)", fontWeight: 800,
            fontSize: "clamp(1.5rem, 3vw, 2rem)", color: "#100030",
            letterSpacing: "-0.02em", marginBottom: "0.5rem",
          }}>
            Welcome back
          </h1>
          <p style={{ fontSize: "0.9375rem", color: "#555570", marginBottom: "2rem" }}>
            Sign in to your 1IMP account.{" "}
            <Link href="/signup" style={{ color: "#6361B8", fontWeight: 600, textDecoration: "none" }}>
              Create one free →
            </Link>
          </p>

          {/* Google button */}
          <button
            onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
            style={{
              width: "100%", display: "flex", alignItems: "center", justifyContent: "center",
              gap: "0.75rem", padding: "0.8rem 1.5rem",
              background: "white", border: "1.5px solid rgba(16,0,48,0.15)",
              borderRadius: 12, fontSize: "0.9375rem", fontWeight: 600,
              color: "#100030", cursor: "pointer", fontFamily: "var(--font-body)",
              boxShadow: "0 2px 8px rgba(16,0,48,0.06)", transition: "all 150ms",
              marginBottom: "1.25rem",
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 16px rgba(16,0,48,0.12)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = "0 2px 8px rgba(16,0,48,0.06)"; }}
          >
            {/* Google SVG */}
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M19.6 10.23c0-.68-.06-1.36-.18-2H10v3.79h5.4a4.62 4.62 0 0 1-2 3.03v2.52h3.22c1.89-1.74 2.98-4.3 2.98-7.34z" fill="#4285F4"/>
              <path d="M10 20c2.7 0 4.97-.9 6.62-2.43l-3.22-2.52c-.9.6-2.04.95-3.4.95-2.61 0-4.82-1.76-5.61-4.13H1.08v2.6A10 10 0 0 0 10 20z" fill="#34A853"/>
              <path d="M4.39 11.87A5.98 5.98 0 0 1 4.08 10c0-.65.11-1.28.31-1.87V5.53H1.08A10 10 0 0 0 0 10c0 1.61.38 3.13 1.08 4.47l3.31-2.6z" fill="#FBBC05"/>
              <path d="M10 3.97c1.47 0 2.79.51 3.83 1.5l2.86-2.86C14.96.99 12.69 0 10 0A10 10 0 0 0 1.08 5.53l3.31 2.6C5.18 5.73 7.39 3.97 10 3.97z" fill="#EA4335"/>
            </svg>
            Continue with Google
          </button>

          {/* Divider */}
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.25rem" }}>
            <div style={{ flex: 1, height: 1, background: "rgba(99,82,138,0.15)" }} />
            <span style={{ fontSize: "0.8rem", color: "#9999AA", flexShrink: 0 }}>or continue with email</span>
            <div style={{ flex: 1, height: 1, background: "rgba(99,82,138,0.15)" }} />
          </div>

          {/* Email/Password form */}
          <form onSubmit={handleLogin}>
            {errorMsg && (
              <div style={{ padding: "0.8rem", background: "rgba(232,53,90,0.1)", color: "#E8355A", borderRadius: 8, marginBottom: "1rem", fontSize: "0.875rem", fontWeight: 600 }}>
                {errorMsg}
              </div>
            )}
            <div style={{ marginBottom: "1rem" }}>
              <label style={{ display: "block", fontSize: "0.8125rem", fontWeight: 600, color: "#100030", marginBottom: "0.4rem" }}>
                Work email
              </label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@company.com"
                required
                style={{
                  width: "100%", padding: "0.75rem 1rem",
                  border: "1.5px solid rgba(99,82,138,0.2)",
                  borderRadius: 10, fontSize: "0.9375rem",
                  fontFamily: "var(--font-body)", color: "#100030",
                  background: "white", outline: "none",
                  transition: "border-color 150ms",
                  boxSizing: "border-box",
                }}
                onFocus={e => { e.currentTarget.style.borderColor = "#6361B8"; }}
                onBlur={e => { e.currentTarget.style.borderColor = "rgba(99,82,138,0.2)"; }}
              />
            </div>

            <div style={{ marginBottom: "1.5rem" }}>
              <label style={{ display: "block", fontSize: "0.8125rem", fontWeight: 600, color: "#100030", marginBottom: "0.4rem" }}>
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                style={{
                  width: "100%", padding: "0.75rem 1rem",
                  border: "1.5px solid rgba(99,82,138,0.2)",
                  borderRadius: 10, fontSize: "0.9375rem",
                  fontFamily: "var(--font-body)", color: "#100030",
                  background: "white", outline: "none",
                  transition: "border-color 150ms",
                  boxSizing: "border-box",
                }}
                onFocus={e => { e.currentTarget.style.borderColor = "#6361B8"; }}
                onBlur={e => { e.currentTarget.style.borderColor = "rgba(99,82,138,0.2)"; }}
              />
            </div>

            <button
              type="submit"
              disabled={loading || !email || !password}
              style={{
                width: "100%", padding: "0.8rem 1.5rem",
                background: loading || !email || !password ? "#888" : "#100030",
                color: "white", borderRadius: 10, border: "none",
                fontSize: "0.9375rem", fontWeight: 600,
                fontFamily: "var(--font-body)", cursor: loading || !email || !password ? "not-allowed" : "pointer",
                transition: "all 160ms",
                display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem",
              }}
            >
              {loading ? (
                <>
                  <span style={{ width: 16, height: 16, borderRadius: "50%", border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "white", animation: "spin 0.7s linear infinite", display: "inline-block" }} />
                  Signing in...
                </>
              ) : "Sign in"}
            </button>
          </form>

          {/* Trust badges */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1.5rem", marginTop: "2rem" }}>
            {["🔒 SOC 2", "✓ GDPR", "🛡 No spam"].map(badge => (
              <span key={badge} style={{ fontSize: "0.75rem", color: "#9999AA" }}>{badge}</span>
            ))}
          </div>
        </motion.div>
      </div>

      <style>{`
        @media(max-width: 768px) { .auth-left { display: none !important; } }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
