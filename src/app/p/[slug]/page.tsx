"use client";

import { motion } from "framer-motion";
import { Play, Download, ArrowRight, MapPin, Briefcase, Calendar } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

// Mock Data
const candidate = {
  name: "Alex Johnson",
  title: "Senior Product Manager",
  location: "San Francisco, CA",
  photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400&h=400",
  summary: "Product leader with 8+ years scaling B2B SaaS platforms from $1M to $15M ARR. Obsessed with reducing user friction and turning complex workflows into consumer-grade experiences. Known for bridging the gap between engineering velocity and GTM strategy.",
  highlights: [
    "Led a team of 14 across engineering and design to launch 3 flagship features in Q3.",
    "Increased conversion rate by 24% by redesigning the core onboarding flow.",
    "Managed a $2M product budget and reduced infrastructure costs by 15%."
  ],
  skills: [
    "Product Strategy", "Agile Methodologies", "User Research", "Data Analytics", 
    "Figma", "SQL", "Go-to-Market", "Stakeholder Management", "A/B Testing"
  ],
  experience: [
    {
      role: "Senior Product Manager",
      company: "Acme Corp",
      period: "2021 – Present",
      description: "Leading the core platform team for enterprise customers."
    },
    {
      role: "Product Manager",
      company: "TechFlow",
      period: "2018 – 2021",
      description: "Scaled the mobile application from 10k to 500k MAU."
    },
    {
      role: "UX Researcher",
      company: "DesignCo",
      period: "2016 – 2018",
      description: "Conducted foundational research for V1 product launches."
    }
  ]
};

export default function PublicProfilePage() {
  const { slug } = useParams();

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "#FAFAFA",
      fontFamily: "var(--font-body)",
      color: "#100030",
      paddingBottom: "8rem" // Space for fixed action bar
    }}>
      {/* 1. Header (Photo + Name + Title) */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        style={{
          background: "white",
          padding: "4rem 1.5rem 3rem",
          borderBottom: "1px solid rgba(16,0,48,0.06)",
          textAlign: "center"
        }}
      >
        <div style={{ maxWidth: 640, margin: "0 auto" }}>
          <div style={{
            width: 120, height: 120, borderRadius: "50%", margin: "0 auto 1.5rem",
            position: "relative", overflow: "hidden", border: "4px solid white",
            boxShadow: "0 8px 24px rgba(16,0,48,0.08)"
          }}>
            <Image src={candidate.photo} alt={candidate.name} fill style={{ objectFit: "cover" }} />
          </div>
          
          <h1 style={{ 
            fontFamily: "var(--font-display)", fontWeight: 800, 
            fontSize: "clamp(2rem, 5vw, 2.75rem)", letterSpacing: "-0.03em", 
            marginBottom: "0.5rem" 
          }}>
            {candidate.name}
          </h1>
          
          <p style={{ 
            fontSize: "1.125rem", color: "#6361B8", fontWeight: 600, 
            marginBottom: "1rem" 
          }}>
            {candidate.title}
          </p>

          <div style={{ 
            display: "flex", alignItems: "center", justifyContent: "center", 
            gap: "0.5rem", color: "#555570", fontSize: "0.875rem" 
          }}>
            <MapPin size={16} />
            {candidate.location}
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main style={{ maxWidth: 640, margin: "0 auto", padding: "3rem 1.5rem" }}>
        <motion.div variants={containerVariants} initial="hidden" animate="show">
          
          {/* 2. AI Summary */}
          <motion.section variants={itemVariants} style={{ marginBottom: "3rem" }}>
            <h2 style={{ 
              fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.25rem", 
              marginBottom: "1rem", color: "#100030" 
            }}>
              Overview
            </h2>
            <p style={{ 
              fontSize: "1rem", lineHeight: 1.7, color: "#444466",
              background: "white", padding: "1.5rem", borderRadius: 16,
              border: "1px solid rgba(16,0,48,0.06)",
              boxShadow: "0 2px 8px rgba(16,0,48,0.02)"
            }}>
              {candidate.summary}
            </p>
          </motion.section>

          {/* 3. Highlights */}
          <motion.section variants={itemVariants} style={{ marginBottom: "3rem" }}>
            <h2 style={{ 
              fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.25rem", 
              marginBottom: "1rem", color: "#100030" 
            }}>
              Key Highlights
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {candidate.highlights.map((highlight, i) => (
                <div key={i} style={{ 
                  display: "flex", gap: "1rem", background: "white", 
                  padding: "1.25rem", borderRadius: 12,
                  border: "1px solid rgba(16,0,48,0.06)",
                  boxShadow: "0 2px 8px rgba(16,0,48,0.02)"
                }}>
                  <div style={{ 
                    width: 24, height: 24, borderRadius: "50%", background: "rgba(99,97,184,0.1)", 
                    color: "#6361B8", display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0, fontWeight: 700, fontSize: "0.75rem"
                  }}>
                    {i + 1}
                  </div>
                  <span style={{ color: "#444466", lineHeight: 1.5, fontSize: "0.9375rem" }}>
                    {highlight}
                  </span>
                </div>
              ))}
            </div>
          </motion.section>

          {/* 4. Skills Cloud */}
          <motion.section variants={itemVariants} style={{ marginBottom: "3rem" }}>
            <h2 style={{ 
              fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.25rem", 
              marginBottom: "1rem", color: "#100030" 
            }}>
              Skills & Expertise
            </h2>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
              {candidate.skills.map(skill => (
                <span key={skill} style={{
                  padding: "0.5rem 1rem", background: "white", 
                  border: "1px solid rgba(16,0,48,0.08)", borderRadius: 999,
                  fontSize: "0.875rem", fontWeight: 500, color: "#100030",
                  boxShadow: "0 2px 4px rgba(16,0,48,0.02)"
                }}>
                  {skill}
                </span>
              ))}
            </div>
          </motion.section>

          {/* 5. Experience Timeline */}
          <motion.section variants={itemVariants} style={{ marginBottom: "4rem" }}>
            <h2 style={{ 
              fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.25rem", 
              marginBottom: "1.5rem", color: "#100030" 
            }}>
              Experience
            </h2>
            <div style={{ position: "relative", paddingLeft: "1.5rem" }}>
              {/* Timeline line */}
              <div style={{ 
                position: "absolute", left: 7, top: 8, bottom: 24, 
                width: 2, background: "rgba(16,0,48,0.08)" 
              }} />
              
              {candidate.experience.map((job, i) => (
                <div key={i} style={{ position: "relative", marginBottom: "2rem" }}>
                  {/* Timeline dot */}
                  <div style={{ 
                    position: "absolute", left: "-1.5rem", top: 4, 
                    width: 16, height: 16, borderRadius: "50%", 
                    background: "white", border: "4px solid #6361B8" 
                  }} />
                  
                  <h3 style={{ fontWeight: 700, fontSize: "1.0625rem", color: "#100030", marginBottom: "0.25rem" }}>
                    {job.role}
                  </h3>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem", fontSize: "0.875rem" }}>
                    <span style={{ fontWeight: 600, color: "#6361B8" }}>{job.company}</span>
                    <span style={{ color: "#9999AA" }}>•</span>
                    <span style={{ color: "#555570" }}>{job.period}</span>
                  </div>
                  <p style={{ color: "#444466", fontSize: "0.9375rem", lineHeight: 1.5 }}>
                    {job.description}
                  </p>
                </div>
              ))}
            </div>
          </motion.section>

          {/* 6. Video Pitch (Optional) */}
          <motion.section variants={itemVariants} style={{ marginBottom: "4rem" }}>
            <div style={{ 
              width: "100%", aspectRatio: "16/9", background: "#100030", 
              borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center",
              position: "relative", overflow: "hidden", cursor: "pointer",
              boxShadow: "0 12px 32px rgba(16,0,48,0.15)"
            }}>
              <Image src={candidate.photo} alt="Video thumbnail" fill style={{ objectFit: "cover", opacity: 0.5 }} />
              <div style={{ 
                width: 64, height: 64, borderRadius: "50%", background: "#E8355A", 
                display: "flex", alignItems: "center", justifyContent: "center", 
                color: "white", position: "relative", zIndex: 2,
                boxShadow: "0 4px 16px rgba(232,53,90,0.4)"
              }}>
                <Play size={28} fill="currentColor" style={{ marginLeft: 4 }} />
              </div>
              <div style={{ position: "absolute", bottom: 20, left: 24, zIndex: 2 }}>
                <div style={{ color: "white", fontWeight: 700, fontFamily: "var(--font-display)", fontSize: "1.125rem" }}>My 60-Second Pitch</div>
                <div style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.875rem" }}>Click to play</div>
              </div>
            </div>
          </motion.section>

        </motion.div>
      </main>

      {/* Floating Action Bar */}
      <div style={{
        position: "fixed", bottom: 32, left: "50%", transform: "translateX(-50%)", zIndex: 100,
        background: "rgba(255,255,255,0.9)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)",
        padding: "0.5rem", borderRadius: 999, border: "1px solid rgba(16,0,48,0.08)",
        boxShadow: "0 12px 32px rgba(16,0,48,0.12)", display: "flex", gap: "0.5rem"
      }}>
        <button style={{
          padding: "0.75rem 1.5rem", background: "#100030", color: "white", 
          borderRadius: 999, border: "none", fontSize: "0.9375rem", fontWeight: 600,
          fontFamily: "var(--font-body)", cursor: "pointer", display: "flex", alignItems: "center", gap: "0.5rem"
        }}>
          Contact Alex <ArrowRight size={16} />
        </button>
        <button style={{
          width: 44, height: 44, borderRadius: "50%", background: "white", 
          border: "1px solid rgba(16,0,48,0.1)", display: "flex", alignItems: "center", justifyContent: "center",
          color: "#100030", cursor: "pointer"
        }} title="Download Resume">
          <Download size={18} />
        </button>
      </div>

      {/* Viral Footer */}
      <footer style={{
        padding: "2rem", textAlign: "center", borderTop: "1px solid rgba(16,0,48,0.06)",
        background: "white"
      }}>
        <Link href="/" style={{ 
          display: "inline-flex", alignItems: "center", gap: "0.5rem", 
          textDecoration: "none", color: "#555570", fontSize: "0.875rem", fontWeight: 500 
        }}>
          <span style={{ opacity: 0.7 }}>Powered by</span>
          <div style={{ display: "flex", alignItems: "center", gap: "0.25rem", color: "#100030" }}>
            <svg width="16" height="16" viewBox="0 0 30 30" fill="none"><circle cx="15" cy="15" r="13" stroke="#E8355A" strokeWidth="2"/><circle cx="15" cy="15" r="8" stroke="#E8355A" strokeWidth="1.5" strokeOpacity="0.35"/><circle cx="15" cy="15" r="3.5" fill="#E8355A"/></svg>
            <span style={{ fontFamily: "var(--font-display)", fontWeight: 800 }}>1IMP</span>
          </div>
        </Link>
        <p style={{ fontSize: "0.75rem", color: "#9999AA", marginTop: "0.5rem" }}>
          Create your own first impression for free.
        </p>
      </footer>
    </div>
  );
}
