"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function OurStoryPage() {
  return (
    <>
      <Navbar />
      <div style={{ background: "#F4F2FC", minHeight: "100vh", paddingTop: 64 }}>

      {/* Opening — full bleed dark */}
      <section style={{ background: "linear-gradient(180deg, #100030 0%, #0A001C 100%)", padding: "7rem 1.5rem 6rem", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle at 50% 40%, rgba(99,97,184,0.12) 0%, transparent 70%)", pointerEvents: "none" }} />
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}
          style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#E8355A", marginBottom: "1.5rem" }}>
          OUR STORY
        </motion.p>
        <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(2.5rem, 6vw, 4.5rem)", color: "white", letterSpacing: "-0.03em", lineHeight: 1.05, maxWidth: 800, margin: "0 auto 2rem" }}>
          It started with a resume<br />that was never opened.
        </motion.h1>
      </section>

      {/* The Story */}
      <section style={{ maxWidth: 720, margin: "0 auto", padding: "5rem 1.5rem" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>

          {/* Chapter 1 */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.6 }}>
            <p style={{ fontSize: "1.125rem", color: "#100030", lineHeight: 1.8, fontWeight: 400 }}>
              A few years ago, we watched someone we knew spend three months applying to jobs.
              She was talented. Experienced. The kind of candidate that companies spend thousands of dollars to find through recruiters.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.6 }}>
            <p style={{ fontSize: "1.125rem", color: "#100030", lineHeight: 1.8 }}>
              She applied to over 60 positions. She heard back from fewer than 10. The rest? Silence.
              Not rejection. Silence. Her resume went into a pile with 400 others, and it was never opened.
            </p>
          </motion.div>

          {/* Pull quote */}
          <motion.div initial={{ opacity: 0, scale: 0.97 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.5 }}>
            <div style={{ background: "linear-gradient(135deg, #100030, #1E0060)", borderRadius: 20, padding: "2.5rem 2rem", margin: "1rem 0" }}>
              <p style={{ fontSize: "1.5rem", fontFamily: "var(--font-display)", fontWeight: 700, color: "white", lineHeight: 1.4, margin: 0, letterSpacing: "-0.02em" }}>
                &ldquo;Her resume went into a pile with 400 others.<br />It was never opened.&rdquo;
              </p>
            </div>
          </motion.div>

          {/* Chapter 2 */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.6 }}>
            <p style={{ fontSize: "1.125rem", color: "#100030", lineHeight: 1.8 }}>
              Then she tried something different. Instead of a resume, she recorded a short introduction.
              Two minutes. No script. No production. Just her, at her desk, talking about what she was good at and what she was looking for.
            </p>
            <p style={{ fontSize: "1.125rem", color: "#100030", lineHeight: 1.8, marginTop: "1.5rem" }}>
              She sent that video to a recruiter.
            </p>
            <p style={{ fontSize: "1.125rem", color: "#100030", lineHeight: 1.8, marginTop: "1.5rem" }}>
              The recruiter responded <strong>within four hours.</strong>
            </p>
          </motion.div>

          {/* The insight */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.6 }}>
            <div style={{ borderLeft: "3px solid #E8355A", paddingLeft: "1.5rem" }}>
              <p style={{ fontSize: "1.25rem", fontFamily: "var(--font-display)", fontWeight: 700, color: "#100030", lineHeight: 1.5, letterSpacing: "-0.01em" }}>
                That was the moment we understood the real problem.
              </p>
              <p style={{ fontSize: "1.0625rem", color: "#444466", lineHeight: 1.75, marginTop: "0.875rem" }}>
                Candidates aren&apos;t losing opportunities because they lack talent. They&apos;re losing opportunities because they don&apos;t get noticed. The PDF resume is a 30-year-old format being used to make decisions worth hundreds of thousands of dollars. It doesn&apos;t show personality. It doesn&apos;t show energy. It doesn&apos;t show what a person is actually like to work with.
              </p>
            </div>
          </motion.div>

          {/* Chapter 3 */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.6 }}>
            <p style={{ fontSize: "1.125rem", color: "#100030", lineHeight: 1.8 }}>
              We started building 1IMP because we believed the hiring process deserved something better. Not a longer resume. Not a longer video. A smarter first impression.
            </p>
            <p style={{ fontSize: "1.125rem", color: "#100030", lineHeight: 1.8, marginTop: "1.5rem" }}>
              An AI that reads your career story and turns it into something a recruiter actually wants to see. A profile that works in the 10 seconds they actually spend. A link that works in LinkedIn messages, emails, and QR codes — everywhere a conversation starts.
            </p>
          </motion.div>

          {/* Mission */}
          <motion.div initial={{ opacity: 0, scale: 0.97 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.5 }}>
            <div style={{ background: "rgba(99,97,184,0.07)", border: "1.5px solid rgba(99,97,184,0.2)", borderRadius: 20, padding: "2.5rem 2rem", textAlign: "center" }}>
              <p style={{ fontSize: "0.72rem", fontWeight: 700, color: "#6361B8", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "1rem" }}>OUR MISSION</p>
              <p style={{ fontSize: "1.375rem", fontFamily: "var(--font-display)", fontWeight: 700, color: "#100030", lineHeight: 1.45, letterSpacing: "-0.02em", margin: 0 }}>
                To increase the probability that the right people<br />get in front of the right opportunities.
              </p>
            </div>
          </motion.div>

          {/* Closing */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.6 }}>
            <p style={{ fontSize: "1.125rem", color: "#100030", lineHeight: 1.8 }}>
              We are not building a video generator. We are not building a resume tool.
            </p>
            <p style={{ fontSize: "1.125rem", color: "#100030", lineHeight: 1.8, marginTop: "1.25rem" }}>
              We are building the infrastructure for how the world&apos;s best talent gets discovered. We believe that in five years, &ldquo;Send me your resume&rdquo; will be replaced by &ldquo;Send me your impression.&rdquo;
            </p>
            <p style={{ fontSize: "1.125rem", color: "#100030", lineHeight: 1.8, marginTop: "1.25rem" }}>
              We are building that future. And we&apos;re just getting started.
            </p>
          </motion.div>

          {/* Sign-off */}
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem", paddingTop: "1rem" }}>
              <div style={{ width: 48, height: 48, borderRadius: "50%", background: "linear-gradient(135deg, #6361B8, #E8355A)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-display)", fontWeight: 800, color: "white", fontSize: "1rem" }}>TG</div>
              <div>
                <div style={{ fontWeight: 700, color: "#100030" }}>Tomer Goldes</div>
                <div style={{ fontSize: "0.875rem", color: "#9999AA" }}>Founder, 1IMP</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: "#100030", padding: "5rem 1.5rem", textAlign: "center" }}>
        <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)", color: "white", letterSpacing: "-0.02em", marginBottom: "1.25rem", lineHeight: 1.2 }}>
          Your story deserves<br />to be heard.
        </h2>
        <Link href="/signup" style={{ display: "inline-flex", padding: "0.875rem 2.25rem", background: "#E8355A", color: "white", borderRadius: 9999, fontSize: "1.0625rem", fontWeight: 600, textDecoration: "none", boxShadow: "0 4px 20px rgba(232,53,90,0.4)" }}>
          Create My First Impression →
        </Link>
      </section>
    </div>
    <Footer />
    </>
  );
}
