"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <div style={{ background: "#FDFDFD", minHeight: "100vh", paddingTop: 100, paddingBottom: 100 }}>
        <div style={{ maxWidth: 700, margin: "0 auto", padding: "0 1.5rem" }}>
          <p style={{ fontSize: "0.875rem", fontWeight: 700, color: "#E8355A", letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: "0.5rem" }}>LEGAL</p>
          <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(2rem, 4vw, 3rem)", color: "#100030", letterSpacing: "-0.02em", marginBottom: "1.5rem" }}>
            Terms of Service
          </h1>
          <p style={{ fontSize: "0.9375rem", color: "#9999AA", marginBottom: "3rem" }}>Last updated: October 2025</p>

          <div style={{ color: "#555570", lineHeight: 1.7, fontSize: "1.0625rem", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            <p>
              Welcome to 1IMP. By accessing or using our website and services, you agree to be bound by these Terms of Service. If you do not agree to all the terms and conditions, you must not use our service.
            </p>

            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", color: "#100030", fontWeight: 700, marginTop: "1rem", marginBottom: "0.5rem" }}>1. Acceptance of Terms</h2>
            <p>
              By accessing our platform, you agree to be bound by these Terms. If you are using the Services on behalf of an organization, you are agreeing to these Terms for that organization.
            </p>

            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", color: "#100030", fontWeight: 700, marginTop: "1rem", marginBottom: "0.5rem" }}>2. Use of Service</h2>
            <p>
              You must provide accurate information when creating an account or submitting a resume. You are responsible for safeguarding your account and any activities or actions under your account.
            </p>

            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", color: "#100030", fontWeight: 700, marginTop: "1rem", marginBottom: "0.5rem" }}>3. Content Ownership</h2>
            <p>
              You retain all rights to the information and content you provide to 1IMP. By submitting your resume, you grant us a non-exclusive license to process, analyze, and generate your visual story.
            </p>

            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", color: "#100030", fontWeight: 700, marginTop: "1rem", marginBottom: "0.5rem" }}>4. Termination</h2>
            <p>
              We may terminate or suspend your access to the Service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
