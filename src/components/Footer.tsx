import Link from "next/link";

export default function Footer() {
  return (
    <footer style={{ background: "#FDFDFD", borderTop: "1px solid rgba(16,0,48,0.08)", padding: "4rem 1.5rem" }}>
      <div style={{ maxWidth: 1180, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "2rem" }}>
        
        <div>
          <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: "0.45rem", textDecoration: "none", marginBottom: "1.5rem" }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M 5 19 C 2 10 10 2 19 5" stroke="#E8355A" strokeWidth="1.1" fill="none" strokeLinecap="round" strokeOpacity="0.45"/>
              <line x1="5" y1="19" x2="19" y2="5" stroke="#E8355A" strokeWidth="2.2" strokeLinecap="round"/>
              <circle cx="19.5" cy="4.5" r="1.4" fill="#E8355A"/>
            </svg>
            <span style={{ fontFamily: "var(--font-body)", fontWeight: 500, fontSize: "1.05rem", color: "#100030", letterSpacing: "-0.01em" }}>
              1IMP
            </span>
          </Link>
          <p style={{ fontSize: "0.85rem", color: "#666680", lineHeight: 1.6, maxWidth: 280 }}>
            The AI-powered First Impression Platform. Stop being a PDF. Start getting noticed.
          </p>
        </div>

        <div>
          <h4 style={{ fontSize: "0.95rem", fontWeight: 700, color: "#100030", marginBottom: "1rem" }}>Product</h4>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            <li><Link href="/how-it-works" style={{ fontSize: "0.85rem", color: "#666680", textDecoration: "none" }}>How It Works</Link></li>
            <li><Link href="/candidates" style={{ fontSize: "0.85rem", color: "#666680", textDecoration: "none" }}>For Candidates</Link></li>
            <li><Link href="/recruiters" style={{ fontSize: "0.85rem", color: "#666680", textDecoration: "none" }}>For Recruiters</Link></li>
            <li><Link href="/pricing" style={{ fontSize: "0.85rem", color: "#666680", textDecoration: "none" }}>Pricing</Link></li>
          </ul>
        </div>

        <div>
          <h4 style={{ fontSize: "0.95rem", fontWeight: 700, color: "#100030", marginBottom: "1rem" }}>Company</h4>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            <li><Link href="/story" style={{ fontSize: "0.85rem", color: "#666680", textDecoration: "none" }}>Our Story</Link></li>
            <li><Link href="/contact" style={{ fontSize: "0.85rem", color: "#666680", textDecoration: "none" }}>Contact</Link></li>
            <li><Link href="/privacy" style={{ fontSize: "0.85rem", color: "#666680", textDecoration: "none" }}>Privacy Policy</Link></li>
            <li><Link href="/terms" style={{ fontSize: "0.85rem", color: "#666680", textDecoration: "none" }}>Terms of Service</Link></li>
          </ul>
        </div>

      </div>
      <div style={{ maxWidth: 1180, margin: "3rem auto 0", borderTop: "1px solid rgba(16,0,48,0.08)", paddingTop: "1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <p style={{ fontSize: "0.8rem", color: "#9999AA" }}>© {new Date().getFullYear()} 1IMP. All rights reserved.</p>
      </div>
    </footer>
  );
}
