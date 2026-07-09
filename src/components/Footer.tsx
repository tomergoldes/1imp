import Link from "next/link";

export default function Footer() {
  return (
    <footer style={{ background: "#09051E", padding: "3rem 0 2rem" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 1.5rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr 1fr 1fr", gap: "2rem", marginBottom: "3rem" }} className="footer-cols">
          {/* Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.45rem", marginBottom: "1rem" }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M 5 19 C 2 10 10 2 19 5" stroke="#E8355A" strokeWidth="1.1" fill="none" strokeLinecap="round" strokeOpacity="0.45"/>
                <line x1="5" y1="19" x2="19" y2="5" stroke="#E8355A" strokeWidth="2.2" strokeLinecap="round"/>
                <circle cx="19.5" cy="4.5" r="1.4" fill="#E8355A"/>
              </svg>
              <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.0625rem", color: "white", letterSpacing: "0.01em" }}>1IMP</span>
            </div>
            <p style={{ fontSize: "0.875rem", color: "rgba(255,255,255,0.45)", lineHeight: 1.65, maxWidth: 240 }}>
              The world&apos;s first AI-powered First Impression Platform. Helping every candidate get noticed.
            </p>
          </div>

          {/* Link columns */}
          {[
            { title: "Platform", links: [{ label: "How It Works", href: "/#how-it-works" }, { label: "Pricing", href: "/#pricing" }, { label: "Create Video", href: "/create" }] },
            { title: "Solutions", links: [{ label: "For Recruiters", href: "/recruiters" }, { label: "View Demo", href: "/v/demo" }] },
            { title: "Company", links: [{ label: "Our Story", href: "/#our-story" }, { label: "Contact Us", href: "/contact" }] },
            { title: "Legal", links: [{ label: "Privacy Policy", href: "/privacy" }, { label: "Terms of Service", href: "/terms" }] },
          ].map(col => (
            <div key={col.title}>
              <div style={{ fontSize: "0.8125rem", fontWeight: 700, color: "rgba(255,255,255,0.9)", marginBottom: "1rem", letterSpacing: "0.02em" }}>{col.title}</div>
              {col.links.map(link => (
                <div key={link.label}>
                  <Link href={link.href} style={{ display: "block", fontSize: "0.875rem", color: "rgba(255,255,255,0.45)", textDecoration: "none", marginBottom: "0.6rem", transition: "color 150ms" }}
                    onMouseEnter={e => ((e.target as HTMLElement).style.color = "rgba(255,255,255,0.85)")}
                    onMouseLeave={e => ((e.target as HTMLElement).style.color = "rgba(255,255,255,0.45)")}
                  >{link.label}</Link>
                </div>
              ))}
            </div>
          ))}
        </div>

        <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.75rem" }}>
          <span style={{ fontSize: "0.8125rem", color: "rgba(255,255,255,0.3)" }}>© {new Date().getFullYear()} 1IMP Inc. All rights reserved.</span>
          <div style={{ display: "flex", gap: "1.5rem" }}>
            <Link href="/privacy" style={{ fontSize: "0.8125rem", color: "rgba(255,255,255,0.35)", textDecoration: "none" }}>Privacy Policy</Link>
            <Link href="/terms" style={{ fontSize: "0.8125rem", color: "rgba(255,255,255,0.35)", textDecoration: "none" }}>Terms of Service</Link>
          </div>
        </div>
      </div>
      <style>{`@media(max-width:768px){ .footer-cols{ grid-template-columns:1fr 1fr!important; gap:1.5rem!important; } }`}</style>
    </footer>
  );
}
