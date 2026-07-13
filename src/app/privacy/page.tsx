"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <div style={{ background: "#FDFDFD", minHeight: "100vh", paddingTop: 100, paddingBottom: 100 }}>
        <div style={{ maxWidth: 700, margin: "0 auto", padding: "0 1.5rem" }}>
          <p style={{ fontSize: "0.875rem", fontWeight: 700, color: "#E8355A", letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: "0.5rem" }}>LEGAL</p>
          <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(2rem, 4vw, 3rem)", color: "#100030", letterSpacing: "-0.02em", marginBottom: "1.5rem" }}>
            Privacy Policy
          </h1>
          <p style={{ fontSize: "0.9375rem", color: "#9999AA", marginBottom: "3rem" }}>Last updated: October 2025</p>

          <div style={{ color: "#555570", lineHeight: 1.7, fontSize: "1.0625rem", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            <p>
              At 1IMP, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our service.
            </p>

            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", color: "#100030", fontWeight: 700, marginTop: "1rem", marginBottom: "0.5rem" }}>1. Information we collect</h2>
            <p>
              We collect information that you provide directly to us when you create an account, upload a CV, or generate a video story. This includes your name, email address, professional history, profile photos, and any other text you submit to our platform.
            </p>

            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", color: "#100030", fontWeight: 700, marginTop: "1rem", marginBottom: "0.5rem" }}>2. How We Use and Process Your Information</h2>
            <p>
              We use your data primarily to provide the 1IMP service—specifically to write a professional script and generate an AI video. To accomplish this, we transmit your text and image data via encrypted API calls to our third-party AI providers (e.g., OpenAI for scripting, ElevenLabs for voice-over, and our video-rendering providers).
            </p>

            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", color: "#100030", fontWeight: 700, marginTop: "1rem", marginBottom: "0.5rem" }}>3. Data Sharing and Third Parties</h2>
            <p>
              We do not sell your personal data. We share data only with trusted service providers essential to delivering the core functionality (AI generation, payment processing via Stripe, and email delivery via Resend). Our AI partners are strictly prohibited from using your personal data to train their foundational models.
            </p>

            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", color: "#100030", fontWeight: 700, marginTop: "1rem", marginBottom: "0.5rem" }}>4. Data Security & Retention</h2>
            <p>
              We implement industry-standard security measures to protect your personal information. You may request the deletion of your account and all associated generated videos at any time by contacting our support team.
            </p>

            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", color: "#100030", fontWeight: 700, marginTop: "1rem", marginBottom: "0.5rem" }}>4. Contact Us</h2>
            <p>
              If you have any questions or concerns about this Privacy Policy, please contact us at <a href="mailto:privacy@1imp.io" style={{ color: "#6361B8", textDecoration: "none" }}>privacy@1imp.io</a>.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
