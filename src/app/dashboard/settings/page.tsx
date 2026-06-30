"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Link as LinkIcon, Shield, CreditCard, Check, AlertCircle, ArrowRight } from "lucide-react";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("general");
  
  // Mocks
  const [slug, setSlug] = useState("tomer");
  const [slugStatus, setSlugStatus] = useState<"available" | "taken" | "checking">("available");
  const [searchVisible, setSearchVisible] = useState(true);
  const [talentPool, setTalentPool] = useState(true);

  const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "");
    setSlug(val);
    setSlugStatus("checking");
    setTimeout(() => {
      setSlugStatus(val === "tomer" || val === "admin" ? "taken" : "available");
    }, 400);
  };

  const tabs = [
    { id: "general", label: "General", icon: User },
    { id: "privacy", label: "Privacy", icon: Shield },
    { id: "billing", label: "Billing", icon: CreditCard },
  ];

  return (
    <div>
      <div style={{ marginBottom: "2rem" }}>
        <h1 style={{ fontSize: "1.75rem", fontWeight: 700, fontFamily: "var(--font-display)", letterSpacing: "-0.02em", color: "#100030", marginBottom: "0.25rem" }}>
          Settings
        </h1>
        <p style={{ color: "#666680", fontSize: "0.95rem" }}>Manage your account, profile URL, and subscription.</p>
      </div>

      {/* ── Tabs Navigation ── */}
      <div style={{ display: "flex", gap: "1rem", borderBottom: "1px solid rgba(16,0,48,0.08)", marginBottom: "2rem" }}>
        {tabs.map(tab => (
          <button 
            key={tab.id} 
            onClick={() => setActiveTab(tab.id)}
            style={{ 
              display: "flex", alignItems: "center", gap: "0.4rem", padding: "0.75rem 0.5rem",
              background: "none", border: "none", borderBottom: `2px solid ${activeTab === tab.id ? "#100030" : "transparent"}`,
              fontSize: "0.95rem", fontWeight: activeTab === tab.id ? 600 : 500,
              color: activeTab === tab.id ? "#100030" : "#666680", cursor: "pointer", transition: "all 0.2s"
            }}
          >
            <tab.icon size={16} />
            {tab.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {/* ── GENERAL TAB ── */}
        {activeTab === "general" && (
          <motion.div key="general" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
            <div style={{ maxWidth: 600, display: "flex", flexDirection: "column", gap: "2rem" }}>
              
              <section style={{ background: "white", border: "1px solid rgba(16,0,48,0.08)", borderRadius: 16, padding: "1.5rem", boxShadow: "0 2px 8px rgba(16,0,48,0.02)" }}>
                <h3 style={{ fontSize: "1.1rem", fontWeight: 600, color: "#100030", marginBottom: "1rem", fontFamily: "var(--font-display)" }}>Personal Information</h3>
                
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#555570", marginBottom: "0.4rem" }}>Full Name</label>
                    <input type="text" defaultValue="Tomer Goldes" style={{ width: "100%", padding: "0.75rem 1rem", border: "1px solid rgba(16,0,48,0.1)", borderRadius: 8, fontSize: "0.95rem", color: "#100030", outline: "none" }} />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#555570", marginBottom: "0.4rem" }}>Email Address</label>
                    <input type="email" defaultValue="hello@tomergoldes.com" disabled style={{ width: "100%", padding: "0.75rem 1rem", border: "1px solid rgba(16,0,48,0.1)", borderRadius: 8, fontSize: "0.95rem", color: "#666680", background: "#F9F9FB", outline: "none" }} />
                  </div>
                  <button style={{ alignSelf: "flex-start", padding: "0.6rem 1.25rem", background: "#100030", color: "white", border: "none", borderRadius: 8, fontSize: "0.9rem", fontWeight: 600, cursor: "pointer", marginTop: "0.5rem" }}>
                    Save Changes
                  </button>
                </div>
              </section>

              <section style={{ background: "white", border: "1px solid rgba(16,0,48,0.08)", borderRadius: 16, padding: "1.5rem", boxShadow: "0 2px 8px rgba(16,0,48,0.02)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem" }}>
                  <LinkIcon size={18} color="#100030" />
                  <h3 style={{ fontSize: "1.1rem", fontWeight: 600, color: "#100030", fontFamily: "var(--font-display)" }}>Profile URL</h3>
                </div>
                <p style={{ fontSize: "0.85rem", color: "#666680", marginBottom: "1rem" }}>Claim your unique public URL. This is the link you will share with recruiters.</p>
                
                <div>
                  <div style={{ display: "flex", alignItems: "center", border: `1px solid ${slugStatus === 'taken' ? '#E8355A' : slugStatus === 'available' ? '#00C853' : 'rgba(16,0,48,0.1)'}`, borderRadius: 8, overflow: "hidden", background: "white", transition: "border 0.2s" }}>
                    <div style={{ padding: "0.75rem 0.75rem 0.75rem 1rem", background: "rgba(99,82,138,0.03)", color: "#666680", fontSize: "0.95rem", borderRight: "1px solid rgba(16,0,48,0.05)" }}>
                      1imp.io/p/
                    </div>
                    <input 
                      type="text" 
                      value={slug} 
                      onChange={handleSlugChange}
                      style={{ flex: 1, padding: "0.75rem 1rem", border: "none", fontSize: "0.95rem", color: "#100030", outline: "none", fontWeight: 600 }} 
                    />
                  </div>
                  
                  <div style={{ marginTop: "0.5rem", fontSize: "0.85rem", display: "flex", alignItems: "center", gap: "0.3rem" }}>
                    {slugStatus === "checking" && <span style={{ color: "#666680" }}>Checking availability...</span>}
                    {slugStatus === "available" && <span style={{ color: "#00C853", display: "flex", alignItems: "center", gap: "0.2rem", fontWeight: 500 }}><Check size={14} /> Available</span>}
                    {slugStatus === "taken" && <span style={{ color: "#E8355A", display: "flex", alignItems: "center", gap: "0.2rem", fontWeight: 500 }}><AlertCircle size={14} /> This URL is already taken</span>}
                  </div>
                  
                  <button style={{ alignSelf: "flex-start", padding: "0.6rem 1.25rem", background: "rgba(99,82,138,0.08)", color: "#100030", border: "none", borderRadius: 8, fontSize: "0.9rem", fontWeight: 600, cursor: "pointer", marginTop: "1rem" }}>
                    Update Link
                  </button>
                </div>
              </section>
            </div>
          </motion.div>
        )}

        {/* ── PRIVACY TAB ── */}
        {activeTab === "privacy" && (
          <motion.div key="privacy" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
            <div style={{ maxWidth: 600, display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              <div style={{ background: "white", border: "1px solid rgba(16,0,48,0.08)", borderRadius: 16, padding: "1.5rem", boxShadow: "0 2px 8px rgba(16,0,48,0.02)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <h3 style={{ fontSize: "1rem", fontWeight: 600, color: "#100030", marginBottom: "0.25rem" }}>Search Engine Visibility</h3>
                  <p style={{ fontSize: "0.85rem", color: "#666680" }}>Allow search engines like Google to index your profile.</p>
                </div>
                <div onClick={() => setSearchVisible(!searchVisible)} style={{ width: 44, height: 24, borderRadius: 999, background: searchVisible ? "#100030" : "rgba(16,0,48,0.1)", position: "relative", cursor: "pointer", transition: "background 0.2s" }}>
                  <motion.div animate={{ x: searchVisible ? 22 : 2 }} transition={{ type: "spring", stiffness: 500, damping: 30 }} style={{ position: "absolute", top: 2, left: 0, width: 20, height: 20, borderRadius: "50%", background: "white", boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }} />
                </div>
              </div>
              
              <div style={{ background: "white", border: "1px solid rgba(16,0,48,0.08)", borderRadius: 16, padding: "1.5rem", boxShadow: "0 2px 8px rgba(16,0,48,0.02)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <h3 style={{ fontSize: "1rem", fontWeight: 600, color: "#100030", marginBottom: "0.25rem" }}>1IMP Talent Pool</h3>
                  <p style={{ fontSize: "0.85rem", color: "#666680", maxWidth: 380 }}>Allow verified recruiters on the 1IMP platform to discover your profile natively.</p>
                </div>
                <div onClick={() => setTalentPool(!talentPool)} style={{ width: 44, height: 24, borderRadius: 999, background: talentPool ? "#100030" : "rgba(16,0,48,0.1)", position: "relative", cursor: "pointer", transition: "background 0.2s" }}>
                  <motion.div animate={{ x: talentPool ? 22 : 2 }} transition={{ type: "spring", stiffness: 500, damping: 30 }} style={{ position: "absolute", top: 2, left: 0, width: 20, height: 20, borderRadius: "50%", background: "white", boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }} />
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* ── BILLING TAB ── */}
        {activeTab === "billing" && (
          <motion.div key="billing" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
            <div style={{ maxWidth: 600 }}>
              <div style={{ background: "white", border: "1px solid rgba(16,0,48,0.08)", borderRadius: 16, padding: "1.5rem", boxShadow: "0 2px 8px rgba(16,0,48,0.02)", marginBottom: "2rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.5rem" }}>
                  <div>
                    <div style={{ display: "inline-flex", padding: "0.25rem 0.75rem", background: "rgba(16,0,48,0.05)", borderRadius: 999, fontSize: "0.75rem", fontWeight: 700, color: "#555570", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.5rem" }}>Current Plan</div>
                    <h3 style={{ fontSize: "1.5rem", fontWeight: 700, color: "#100030", fontFamily: "var(--font-display)" }}>Free Tier</h3>
                  </div>
                  <div style={{ fontSize: "1.5rem", fontWeight: 700, color: "#100030" }}>$0<span style={{ fontSize: "0.85rem", color: "#666680", fontWeight: 500 }}> /mo</span></div>
                </div>
                
                <p style={{ fontSize: "0.9rem", color: "#666680", marginBottom: "1.5rem", paddingBottom: "1.5rem", borderBottom: "1px solid rgba(16,0,48,0.05)" }}>
                  You are currently on the Free plan. You can create and share your First Impression, but analytics and advanced features are limited.
                </p>

                <div style={{ background: "linear-gradient(135deg, #100030, #2A2A4A)", borderRadius: 12, padding: "1.5rem", color: "white" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                    <h4 style={{ fontSize: "1.1rem", fontWeight: 600, fontFamily: "var(--font-display)" }}>1IMP Pro</h4>
                    <span style={{ background: "#E8355A", padding: "0.2rem 0.5rem", borderRadius: 4, fontSize: "0.75rem", fontWeight: 700 }}>Most Popular</span>
                  </div>
                  <ul style={{ listStyle: "none", padding: 0, margin: "0 0 1.5rem 0", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                    <li style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.85rem", color: "rgba(255,255,255,0.8)" }}><Check size={14} color="#00E676" /> See exactly who views your profile</li>
                    <li style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.85rem", color: "rgba(255,255,255,0.8)" }}><Check size={14} color="#00E676" /> Advanced AI Summary tuning</li>
                    <li style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.85rem", color: "rgba(255,255,255,0.8)" }}><Check size={14} color="#00E676" /> Priority in Recruiter Search</li>
                  </ul>
                  <button style={{ width: "100%", padding: "0.75rem", background: "white", color: "#100030", border: "none", borderRadius: 8, fontSize: "0.95rem", fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.4rem" }}>
                    Upgrade to Pro <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
