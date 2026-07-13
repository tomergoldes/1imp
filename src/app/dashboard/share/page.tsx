"use client";

import { useState, useEffect } from "react";
import { Copy, Check, Mail, ExternalLink, QrCode } from "lucide-react";

export default function SharingHub() {
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [name, setName] = useState("");
  const [slug, setSlug] = useState<string | null>(null);
  const [origin] = useState(() => (typeof window !== "undefined" ? window.location.origin : ""));

  useEffect(() => {
    fetch("/api/user/profile")
      .then((r) => r.json())
      .then((data) => {
        setName(data.name || "");
        setSlug(data.slug || null);
      })
      .catch(() => {});
  }, []);

  const firstName = name ? name.split(" ")[0] : "there";
  const profileLink = slug ? `${origin}/p/${slug}` : "";
  const qrSrc = profileLink
    ? `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(profileLink)}`
    : "";
  const emailSubject = `My First Impression Profile${name ? ` — ${name}` : ""}`;
  const emailBody = `Hi [Name],

I saw the opening for [Role] and wanted to reach out. Instead of attaching a standard PDF resume, I've put together a First Impression profile that gives a better sense of my background and what I can bring to the team.

You can view it here: ${profileLink}

Looking forward to connecting.
Best,
${name || "Me"}`;

  const copyToClipboard = (text: string, setter: (val: boolean) => void) => {
    navigator.clipboard.writeText(text);
    setter(true);
    setTimeout(() => setter(false), 2000);
  };

  return (
    <div>
      <div style={{ marginBottom: "2.5rem" }}>
        <h1 style={{ fontSize: "1.75rem", fontWeight: 700, fontFamily: "var(--font-display)", letterSpacing: "-0.02em", color: "#100030", marginBottom: "0.25rem" }}>
          Share Your Profile
        </h1>
        <p style={{ color: "#666680", fontSize: "0.95rem" }}>Get noticed. Send your link directly to recruiters or attach it to applications.</p>
      </div>

      {!slug && (
        <div style={{ background: "rgba(232,53,90,0.06)", border: "1px solid rgba(232,53,90,0.2)", borderRadius: 12, padding: "1rem 1.25rem", marginBottom: "1.5rem", color: "#B02045", fontSize: "0.9rem" }}>
          You don&apos;t have a public profile URL yet. Create a video and set your URL in Settings to start sharing.
        </div>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.5rem", alignItems: "start" }}>
        
        {/* ── Link Box ── */}
        <div style={{ background: "white", border: "1px solid rgba(16,0,48,0.08)", borderRadius: 16, padding: "1.5rem", boxShadow: "0 2px 8px rgba(16,0,48,0.02)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem" }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: "rgba(99,82,138,0.05)", display: "flex", alignItems: "center", justifyContent: "center", color: "#6361B8" }}>
              <ExternalLink size={18} />
            </div>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 600, color: "#100030", fontFamily: "var(--font-display)" }}>Your Impression Link</h3>
          </div>
          
          <p style={{ fontSize: "0.85rem", color: "#666680", marginBottom: "1rem" }}>
            This is your public URL. Anyone with this link can view your First Impression.
          </p>

          <div style={{ display: "flex", alignItems: "center", border: "1px solid rgba(16,0,48,0.1)", borderRadius: 8, overflow: "hidden", background: "#FDFDFD" }}>
            <div style={{ flex: 1, padding: "0.75rem 1rem", fontSize: "0.9rem", color: profileLink ? "#100030" : "#9999AA", fontWeight: 500, userSelect: "all" }}>
              {profileLink || "No public URL yet"}
            </div>
            <button 
              onClick={() => profileLink && copyToClipboard(profileLink, setCopiedLink)}
              disabled={!profileLink}
              style={{ display: "flex", alignItems: "center", gap: "0.4rem", padding: "0.75rem 1rem", background: copiedLink ? "#00C853" : "rgba(99,82,138,0.05)", color: copiedLink ? "white" : "#6361B8", border: "none", borderLeft: "1px solid rgba(16,0,48,0.05)", cursor: profileLink ? "pointer" : "not-allowed", fontWeight: 600, fontSize: "0.85rem", transition: "all 0.2s", opacity: profileLink ? 1 : 0.5 }}
            >
              {copiedLink ? <><Check size={16} /> Copied</> : <><Copy size={16} /> Copy</>}
            </button>
          </div>
        </div>

        {/* ── QR Code Placeholder ── */}
        <div style={{ background: "white", border: "1px solid rgba(16,0,48,0.08)", borderRadius: 16, padding: "1.5rem", boxShadow: "0 2px 8px rgba(16,0,48,0.02)", display: "flex", alignItems: "center", gap: "1.5rem" }}>
          <div style={{ width: 100, height: 100, background: "white", border: "1px solid rgba(16,0,48,0.1)", borderRadius: 12, padding: "0.5rem", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            {qrSrc ? (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img src={qrSrc} alt={`QR code linking to ${profileLink}`} width={88} height={88} style={{ display: "block" }} />
            ) : (
              <QrCode size={40} color="rgba(16,0,48,0.2)" />
            )}
          </div>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", marginBottom: "0.25rem" }}>
              <QrCode size={16} color="#6361B8" />
              <h3 style={{ fontSize: "1.1rem", fontWeight: 600, color: "#100030", fontFamily: "var(--font-display)" }}>Profile QR</h3>
            </div>
            <p style={{ fontSize: "0.85rem", color: "#666680", marginBottom: "0.75rem", lineHeight: 1.4 }}>
              Perfect for networking events or adding to presentations.
            </p>
            {qrSrc ? (
              <a href={qrSrc} target="_blank" rel="noopener noreferrer" style={{ fontSize: "0.85rem", fontWeight: 600, color: "#E8355A", textDecoration: "none" }}>
                Open Image
              </a>
            ) : (
              <span style={{ fontSize: "0.85rem", color: "#9999AA" }}>Set your URL first</span>
            )}
          </div>
        </div>

      </div>

      {/* ── Email Template ── */}
      <div style={{ background: "white", border: "1px solid rgba(16,0,48,0.08)", borderRadius: 16, marginTop: "1.5rem", boxShadow: "0 2px 8px rgba(16,0,48,0.02)", overflow: "hidden" }}>
        <div style={{ padding: "1.5rem", borderBottom: "1px solid rgba(16,0,48,0.05)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: "rgba(99,82,138,0.05)", display: "flex", alignItems: "center", justifyContent: "center", color: "#6361B8" }}>
              <Mail size={18} />
            </div>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 600, color: "#100030", fontFamily: "var(--font-display)" }}>Email Template</h3>
          </div>
          <button 
            onClick={() => copyToClipboard(emailBody, setCopiedEmail)}
            style={{ display: "flex", alignItems: "center", gap: "0.4rem", padding: "0.5rem 1rem", background: copiedEmail ? "#00C853" : "#100030", color: "white", border: "none", borderRadius: 999, cursor: "pointer", fontWeight: 600, fontSize: "0.85rem", transition: "all 0.2s" }}
          >
            {copiedEmail ? <><Check size={16} /> Copied</> : <><Copy size={16} /> Copy Message</>}
          </button>
        </div>

        <div style={{ padding: "1.5rem", background: "#FDFDFD" }}>
          <div style={{ fontSize: "0.85rem", color: "#666680", marginBottom: "0.5rem", fontWeight: 600 }}>Subject:</div>
          <div style={{ padding: "0.75rem", border: "1px solid rgba(16,0,48,0.1)", borderRadius: 6, background: "white", fontSize: "0.9rem", color: "#100030", marginBottom: "1.5rem" }}>
            {emailSubject}
          </div>
          
          <div style={{ fontSize: "0.85rem", color: "#666680", marginBottom: "0.5rem", fontWeight: 600 }}>Message:</div>
          <div style={{ padding: "1rem", border: "1px solid rgba(16,0,48,0.1)", borderRadius: 6, background: "white", fontSize: "0.95rem", color: "#100030", whiteSpace: "pre-wrap", lineHeight: 1.6 }}>
            {emailBody}
          </div>
        </div>
      </div>
    </div>
  );
}
