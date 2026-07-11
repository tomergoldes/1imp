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
              Welcome to 1IMP. These Terms of Service ("Terms") govern your use of the 1IMP website and our AI-powered video generation services. By uploading your CV or using our platform, you agree to these Terms.
            </p>

            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", color: "#100030", fontWeight: 700, marginTop: "1rem", marginBottom: "0.5rem" }}>1. Service Overview & Freemium Model</h2>
            <p>
              1IMP provides AI-generated video profiles based on user-provided text or resumes. We offer a free, watermarked preview of your video. To remove the watermark, download the video in HD, or receive a shareable public profile link, you must purchase a Premium Unlock.
            </p>

            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", color: "#100030", fontWeight: 700, marginTop: "1rem", marginBottom: "0.5rem" }}>2. Purchases and Refunds</h2>
            <p>
              Due to the significant computational costs associated with AI video generation, all payments for Premium Unlocks are final and non-refundable once the non-watermarked video has been successfully processed and delivered to your account.
            </p>

            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", color: "#100030", fontWeight: 700, marginTop: "1rem", marginBottom: "0.5rem" }}>3. User Content and AI Generation</h2>
            <p>
              You retain all ownership rights to the CV or text you upload. By submitting content to 1IMP, you grant us and our third-party AI partners (such as OpenAI and HeyGen) a temporary license to process this data solely for the purpose of generating your video script and avatar. We do not use your personal data to train our own AI models.
            </p>

            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", color: "#100030", fontWeight: 700, marginTop: "1rem", marginBottom: "0.5rem" }}>4. Acceptable Use</h2>
            <p>
              You agree not to upload any content that is illegal, defamatory, offensive, or infringes on third-party intellectual property. You may not attempt to bypass our paywall, remove watermarks from free previews unlawfully, or scrape our platform.
            </p>

            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", color: "#100030", fontWeight: 700, marginTop: "1rem", marginBottom: "0.5rem" }}>5. Service Availability</h2>
            <p>
              While we strive for 99.9% uptime, AI generation relies on complex third-party APIs. We are not liable for delays in video generation caused by downstream API outages.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
