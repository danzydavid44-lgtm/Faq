import { useState, useMemo, useRef, useEffect } from "react";
import { faqData as initialFaqData, categories } from "./data/faqData";
import type { FAQItem } from "./data/faqData";
import { AdminDashboard } from "./AdminDashboard";
import { AdminLogin } from "./AdminLogin";
import { loadLinks, saveLinks } from "./siteLinks";
import type { SiteLinks } from "./siteLinks";

const DEFAULT_LOGO = "/logo.png";

// ─── Icons ────────────────────────────────────────────────────────────────────
function SearchIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  );
}
function ChevronIcon({ className, isOpen }: { className?: string; isOpen: boolean }) {
  return (
    <svg className={`${className} transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
      fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );
}

function BrandLogo({
  logoSrc,
  href,
  size = "large",
  className = "",
}: {
  logoSrc?: string | null;
  href: string;
  size?: "large" | "small";
  className?: string;
}) {
  const sizeClasses = size === "large" ? "w-32 sm:w-40 md:w-48" : "w-10 h-10";
  const glowClasses = size === "large"
    ? "drop-shadow-[0_0_40px_rgba(56,189,248,0.5)]"
    : "drop-shadow-[0_0_16px_rgba(56,189,248,0.25)]";

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Visit Vyxo website"
      className={`group inline-flex items-center justify-center ${className}`}
    >
      {logoSrc ? (
        <img
          src={logoSrc}
          alt="Vyxo"
          className={`${sizeClasses} object-contain transition-transform duration-200 group-hover:scale-[1.03] ${glowClasses}`}
          onError={(e) => {
            e.currentTarget.style.display = "none";
            const sibling = e.currentTarget.nextElementSibling as HTMLElement | null;
            if (sibling) sibling.style.display = "flex";
          }}
        />
      ) : null}
      <div
        style={{ display: logoSrc ? "none" : "flex" }}
        className={`${size === "large" ? "w-16 h-16 rounded-3xl text-4xl" : "w-10 h-10 rounded-xl text-xl"} bg-gradient-to-br from-sky-400 to-blue-600 items-center justify-center shadow-2xl shadow-sky-500/40 transition-transform duration-200 group-hover:scale-[1.05]`}
      >
        <span className="font-black text-white">V</span>
      </div>
    </a>
  );
}

// ─── Decorative SVG graphics ──────────────────────────────────────────────────
function GridPattern() {
  return (
    <svg className="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid)" />
    </svg>
  );
}

function FloatingDots() {
  return (
    <svg className="absolute right-0 top-0 w-72 h-72 opacity-10 text-sky-300" viewBox="0 0 200 200" fill="currentColor">
      {Array.from({ length: 6 }).map((_, row) =>
        Array.from({ length: 6 }).map((_, col) => (
          <circle key={`${row}-${col}`} cx={20 + col * 32} cy={20 + row * 32} r="3" />
        ))
      )}
    </svg>
  );
}

function WaveDecoration() {
  return (
    <div className="absolute bottom-0 left-0 right-0">
      <svg viewBox="0 0 1440 90" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
        <path d="M0 90L48 82C96 74 192 58 288 50C384 42 480 42 576 50C672 58 768 74 864 78C960 82 1056 74 1152 66C1248 58 1344 50 1392 46L1440 42V90H0Z" fill="white" fillOpacity="0.03" />
        <path d="M0 90L60 80C120 70 240 50 360 46C480 42 600 54 720 58C840 62 960 58 1080 54C1200 50 1320 46 1380 44L1440 42V90H0Z" fill="#0f172a" />
      </svg>
    </div>
  );
}

function HexGrid() {
  return (
    <svg className="absolute left-0 bottom-20 w-64 h-64 opacity-[0.06] text-violet-400" viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth="1">
      {[0, 1, 2, 3].map(row =>
        [0, 1, 2, 3].map(col => {
          const x = col * 45 + (row % 2 === 0 ? 0 : 22);
          const y = row * 38;
          const pts = [
            [x + 20, y], [x + 40, y + 10], [x + 40, y + 30],
            [x + 20, y + 40], [x, y + 30], [x, y + 10]
          ].map(p => p.join(",")).join(" ");
          return <polygon key={`${row}-${col}`} points={pts} />;
        })
      )}
    </svg>
  );
}

function CircuitLines() {
  return (
    <svg className="absolute right-0 bottom-0 w-80 h-80 opacity-[0.05] text-sky-400" viewBox="0 0 300 300" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M 280 20 L 200 20 L 200 80 L 120 80 L 120 160 L 40 160 L 40 240" />
      <path d="M 280 80 L 220 80 L 220 140 L 160 140 L 160 220 L 80 220" />
      <path d="M 280 140 L 240 140 L 240 200 L 180 200 L 180 260" />
      <circle cx="200" cy="20" r="4" fill="currentColor" />
      <circle cx="120" cy="80" r="4" fill="currentColor" />
      <circle cx="40" cy="160" r="4" fill="currentColor" />
      <circle cx="220" cy="80" r="4" fill="currentColor" />
      <circle cx="160" cy="140" r="4" fill="currentColor" />
      <circle cx="240" cy="140" r="4" fill="currentColor" />
      <circle cx="180" cy="200" r="4" fill="currentColor" />
    </svg>
  );
}

// ─── Category config ──────────────────────────────────────────────────────────
const catConfig: Record<string, { badge: string; pill: string; pillActive: string; border: string; glow: string; icon: string }> = {
  "Getting Started":        { badge: "bg-emerald-100 text-emerald-700 border-emerald-200",    pill: "border-emerald-200 text-emerald-700 hover:bg-emerald-50",   pillActive: "bg-emerald-500 text-white border-emerald-500",   border: "border-emerald-400/30", glow: "shadow-emerald-200", icon: "🚀" },
  "Pricing & Payments":     { badge: "bg-sky-100 text-sky-700 border-sky-200",                pill: "border-sky-200 text-sky-700 hover:bg-sky-50",               pillActive: "bg-sky-500 text-white border-sky-500",           border: "border-sky-400/30",     glow: "shadow-sky-200",     icon: "💰" },
  "Consultation & Booking": { badge: "bg-violet-100 text-violet-700 border-violet-200",       pill: "border-violet-200 text-violet-700 hover:bg-violet-50",      pillActive: "bg-violet-500 text-white border-violet-500",     border: "border-violet-400/30", glow: "shadow-violet-200",  icon: "📅" },
  "Delivery & Workflow":    { badge: "bg-amber-100 text-amber-700 border-amber-200",          pill: "border-amber-200 text-amber-700 hover:bg-amber-50",         pillActive: "bg-amber-500 text-white border-amber-500",       border: "border-amber-400/30",  glow: "shadow-amber-200",   icon: "⚡" },
  "Website Features":       { badge: "bg-rose-100 text-rose-700 border-rose-200",             pill: "border-rose-200 text-rose-700 hover:bg-rose-50",            pillActive: "bg-rose-500 text-white border-rose-500",         border: "border-rose-400/30",   glow: "shadow-rose-200",    icon: "🌐" },
  "AI & Automation":        { badge: "bg-blue-100 text-blue-700 border-blue-200",             pill: "border-blue-200 text-blue-700 hover:bg-blue-50",            pillActive: "bg-blue-500 text-white border-blue-500",         border: "border-blue-400/30",   glow: "shadow-blue-200",    icon: "🤖" },
  "Trust & Quality":        { badge: "bg-teal-100 text-teal-700 border-teal-200",             pill: "border-teal-200 text-teal-700 hover:bg-teal-50",            pillActive: "bg-teal-500 text-white border-teal-500",         border: "border-teal-400/30",   glow: "shadow-teal-200",    icon: "🛡️" },
  "Support & Communication":{ badge: "bg-orange-100 text-orange-700 border-orange-200",       pill: "border-orange-200 text-orange-700 hover:bg-orange-50",      pillActive: "bg-orange-500 text-white border-orange-500",     border: "border-orange-400/30", glow: "shadow-orange-200",  icon: "💬" },
};
const defaultCat = { badge: "bg-slate-100 text-slate-600 border-slate-200", pill: "border-slate-200 text-slate-600 hover:bg-slate-50", pillActive: "bg-slate-500 text-white border-slate-500", border: "border-slate-300/30", glow: "shadow-slate-200", icon: "❓" };

function CategoryBadge({ category }: { category: string }) {
  const cfg = catConfig[category] ?? defaultCat;
  return (
    <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-0.5 rounded-full border ${cfg.badge}`}>
      <span>{cfg.icon}</span> {category}
    </span>
  );
}

// ─── FAQ Accordion ─────────────────────────────────────────────────────────────
function FAQAccordion({ item }: { item: FAQItem }) {
  const [isOpen, setIsOpen] = useState(false);
  const cfg = catConfig[item.category] ?? defaultCat;

  return (
    <div className={`border rounded-2xl overflow-hidden transition-all duration-300 bg-white ${
      isOpen ? `shadow-lg ${cfg.glow}/40 ${cfg.border}` : "border-slate-200 hover:border-slate-300 hover:shadow-md"
    }`}>
      <button onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left px-6 py-5 flex items-start gap-4 group cursor-pointer">
        <div className={`flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold transition-all duration-300 ${
          isOpen ? `bg-gradient-to-br from-sky-400 to-blue-600 text-white shadow-md shadow-sky-200` : "bg-slate-100 text-slate-500 group-hover:bg-slate-200"
        }`}>
          {item.id}
        </div>
        <div className="flex-1 min-w-0">
          <div className="mb-2"><CategoryBadge category={item.category} /></div>
          <h3 className={`text-base font-semibold transition-colors duration-200 ${isOpen ? "text-slate-900" : "text-slate-700 group-hover:text-slate-900"}`}>
            {item.question}
          </h3>
        </div>
        <ChevronIcon isOpen={isOpen} className={`flex-shrink-0 w-5 h-5 mt-1 transition-colors duration-200 ${isOpen ? "text-sky-500" : "text-slate-400"}`} />
      </button>
      <div className={`transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? "max-h-[1200px] opacity-100" : "max-h-0 opacity-0"}`}>
        <div className="px-6 pb-6 ml-13">
          <div className={`ml-[52px] pt-2 border-t ${cfg.border}`}>
            <p className="text-sm text-slate-500 leading-relaxed whitespace-pre-line mt-3">{item.answer}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Search Result Item ────────────────────────────────────────────────────────
function SearchResultItem({ item }: { item: FAQItem }) {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="border-2 border-sky-300 rounded-2xl overflow-hidden bg-white shadow-xl shadow-sky-100 animate-fade-in">
      <button onClick={() => setIsOpen(!isOpen)} className="w-full text-left px-6 py-5 flex items-start gap-4 cursor-pointer">
        <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-sky-400 to-blue-600 text-white flex items-center justify-center shadow-md shadow-sky-200">
          <SearchIcon className="w-5 h-5" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span className="text-xs font-bold text-sky-600 uppercase tracking-wider">✨ Best Match</span>
            <CategoryBadge category={item.category} />
          </div>
          <h3 className="text-base font-semibold text-slate-900">{item.question}</h3>
        </div>
        <ChevronIcon isOpen={isOpen} className={`flex-shrink-0 w-5 h-5 mt-1 ${isOpen ? "text-sky-500" : "text-slate-400"}`} />
      </button>
      <div className={`transition-all duration-300 overflow-hidden ${isOpen ? "max-h-[1200px] opacity-100" : "max-h-0 opacity-0"}`}>
        <div className="px-6 pb-6">
          <div className="ml-14 pt-2 border-t border-sky-100">
            <p className="text-sm text-slate-500 leading-relaxed whitespace-pre-line mt-3">{item.answer}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Similar Questions ─────────────────────────────────────────────────────────
function SimilarQuestions({ results }: { results: FAQItem[] }) {
  if (!results.length) return null;
  return (
    <div className="mt-8">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-xl">✨</span>
        <h3 className="text-lg font-semibold text-slate-700">You might also find these helpful</h3>
      </div>
      <div className="grid gap-3">
        {results.map(item => (
          <button key={item.id}
            onClick={() => document.getElementById(`faq-item-${item.id}`)?.scrollIntoView({ behavior: "smooth", block: "center" })}
            className="text-left px-5 py-4 bg-white hover:bg-sky-50 border border-slate-200 hover:border-sky-300 rounded-xl transition-all duration-200 hover:shadow-md group cursor-pointer">
            <div className="flex items-center gap-3">
              <div className="flex-shrink-0 w-7 h-7 rounded-lg bg-slate-100 group-hover:bg-sky-100 text-slate-400 group-hover:text-sky-500 flex items-center justify-center transition-colors">
                <SearchIcon className="w-4 h-4" />
              </div>
              <span className="text-sm font-medium text-slate-600 group-hover:text-slate-900 transition-colors">{item.question}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── Stat card ────────────────────────────────────────────────────────────────
function StatCard({ icon, value, label, color }: { icon: string; value: string; label: string; color: string }) {
  return (
    <div className={`relative overflow-hidden rounded-2xl p-6 border ${color} bg-white shadow-sm hover:shadow-md transition-shadow`}>
      <div className="text-3xl mb-3">{icon}</div>
      <div className="text-2xl font-extrabold text-slate-800 mb-1">{value}</div>
      <div className="text-sm text-slate-500">{label}</div>
    </div>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────
export function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const [, setAdminClickCount] = useState(0);
  const [showLogin, setShowLogin] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const clickTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const [faqs, setFaqs] = useState<FAQItem[]>(() => {
    try { const s = localStorage.getItem("vyxo_faqs"); return s ? JSON.parse(s) : initialFaqData; }
    catch { return initialFaqData; }
  });
  const [logoSrc, setLogoSrc] = useState<string>(() => {
    try {
      return localStorage.getItem("vyxo_logo") || DEFAULT_LOGO;
    } catch {
      return DEFAULT_LOGO;
    }
  });
  const [links, setLinks] = useState<SiteLinks>(() => loadLinks());

  useEffect(() => { localStorage.setItem("vyxo_faqs", JSON.stringify(faqs)); }, [faqs]);
  useEffect(() => {
    if (logoSrc && logoSrc !== DEFAULT_LOGO) {
      localStorage.setItem("vyxo_logo", logoSrc);
    } else {
      localStorage.removeItem("vyxo_logo");
    }
  }, [logoSrc]);
  useEffect(() => { saveLinks(links); }, [links]);

  const handleCopyrightClick = () => {
    if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current);
    setAdminClickCount(prev => {
      const n = prev + 1;
      if (n >= 5) { setShowLogin(true); return 0; }
      return n;
    });
    clickTimeoutRef.current = setTimeout(() => setAdminClickCount(0), 2000);
  };

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase();
    const kw = q.split(/\s+/);
    return faqs.map(item => {
      const iq = item.question.toLowerCase(), ia = item.answer.toLowerCase(), ic = item.category.toLowerCase();
      let score = 0;
      if (iq.includes(q)) score += 10;
      kw.forEach(k => { if (k.length < 2) return; if (iq.includes(k)) score += 3; if (ia.includes(k)) score += 1; if (ic.includes(k)) score += 2; });
      kw.forEach(k => { if (k.length < 3) return; if (k.split("").every(c => iq.includes(c))) score += 2; });
      return { item, score };
    }).filter(r => r.score > 0).sort((a, b) => b.score - a.score).map(r => r.item);
  }, [searchQuery, faqs]);

  const similarQuestions = useMemo(() => {
    if (searchQuery.trim() && !searchResults.length) {
      const kw = searchQuery.toLowerCase().split(/\s+/).filter(k => k.length >= 2);
      return faqs.map(item => {
        const iq = item.question.toLowerCase(), ic = item.category.toLowerCase();
        let score = 0;
        kw.forEach(k => { if (iq.includes(k)) score += 2; if (ic.includes(k)) score += 1; });
        return { item, score };
      }).filter(r => r.score > 0).sort((a, b) => b.score - a.score).slice(0, 5).map(r => r.item);
    }
    if (searchQuery.trim() && searchResults.length) return faqs.filter(i => i.id !== searchResults[0].id).slice(0, 4);
    return [];
  }, [searchQuery, searchResults, faqs]);

  const filteredFAQs = useMemo(() =>
    activeCategory ? faqs.filter(i => i.category === activeCategory) : faqs,
    [activeCategory, faqs]);

  useEffect(() => {
    if (searchQuery.trim() && searchResults.length) searchRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [searchQuery, searchResults]);

  if (showAdmin) {
    return (
      <AdminDashboard
        faqs={faqs}
        setFaqs={setFaqs}
        logoSrc={logoSrc}
        setLogoSrc={setLogoSrc}
        links={links}
        setLinks={setLinks}
        onClose={() => setShowAdmin(false)}
      />
    );
  }
  if (showLogin) return <AdminLogin onLogin={() => { setShowLogin(false); setShowAdmin(true); }} onCancel={() => setShowLogin(false)} />;

  return (
    <div className="min-h-screen bg-slate-50" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>

      {/* ── HEADER ───────────────────────────────────────────────────────── */}
      <header className="relative overflow-hidden" style={{ background: "linear-gradient(135deg, #0f172a 0%, #1e3a5f 40%, #0c4a6e 70%, #0f172a 100%)" }}>
        <GridPattern />
        <FloatingDots />
        <HexGrid />
        <CircuitLines />

        {/* Coloured orbs */}
        <div className="absolute top-10 left-1/4 w-72 h-72 bg-sky-400/20 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-10 right-1/4 w-56 h-56 bg-violet-500/20 rounded-full blur-[80px] pointer-events-none" />
        <div className="absolute top-1/2 left-10 w-40 h-40 bg-emerald-400/15 rounded-full blur-[60px] pointer-events-none" />
        <div className="absolute top-10 right-10 w-32 h-32 bg-amber-400/15 rounded-full blur-[50px] pointer-events-none" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-28 sm:pt-20 sm:pb-36">
          <div className="text-center">
            {/* Back to main site */}
            <div className="mb-8">
              <a href={links.mainWebsite} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-sky-200 hover:text-white text-sm font-medium rounded-full border border-white/20 hover:border-white/40 transition-all duration-200">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Visit our Main Website
              </a>
            </div>

            {/* Logo */}
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="absolute -inset-4 bg-sky-400/20 rounded-full blur-2xl" />
                <BrandLogo logoSrc={logoSrc} href={links.logoLink} size="large" className="relative" />
              </div>
            </div>

            {/* Headline */}
            <div className="inline-flex items-center gap-2 bg-sky-400/10 border border-sky-400/30 text-sky-300 text-sm font-medium px-4 py-1.5 rounded-full mb-6">
              <span className="w-2 h-2 bg-sky-400 rounded-full animate-pulse" />
              Client Support Center
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-6 tracking-tight leading-tight">
              Got Questions?<br />
              <span style={{ background: "linear-gradient(90deg, #38bdf8, #818cf8, #f472b6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                We've Got Answers.
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed">
              Everything you need to know about working with Vyxo — from pricing and delivery to AI and support.
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative group">
                <div className="absolute -inset-[1.5px] rounded-2xl opacity-60 group-hover:opacity-90 transition-opacity duration-300 blur-sm"
                  style={{ background: "linear-gradient(90deg, #38bdf8, #818cf8, #f472b6, #38bdf8)" }} />
                <div className="relative flex items-center bg-white rounded-2xl shadow-2xl overflow-hidden">
                  <div className="pl-5 text-slate-400"><SearchIcon className="w-6 h-6" /></div>
                  <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                    placeholder="Ask anything… e.g. pricing, delivery, AI features"
                    className="flex-1 px-4 py-5 text-slate-800 text-lg placeholder-slate-400 bg-transparent outline-none" />
                  {searchQuery && (
                    <button onClick={() => setSearchQuery("")} className="pr-4 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                </div>
              </div>

              {/* Quick tags */}
              <div className="flex flex-wrap items-center justify-center gap-2 mt-5">
                <span className="text-sm text-slate-400">Try:</span>
                {[
                  { label: "Pricing 💰", q: "Pricing" },
                  { label: "Delivery ⚡", q: "Delivery" },
                  { label: "AI 🤖", q: "AI Features" },
                  { label: "Consultation 📅", q: "Consultation" },
                  { label: "Payment 💳", q: "Payment" },
                ].map(t => (
                  <button key={t.q} onClick={() => setSearchQuery(t.q)}
                    className="px-4 py-1.5 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white text-sm font-medium rounded-full border border-white/20 hover:border-white/40 transition-all duration-200 cursor-pointer">
                    {t.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
        <WaveDecoration />
      </header>

      {/* ── STATS STRIP ──────────────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-10 mb-10">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <StatCard icon="🌍" value="Global" label="Serving clients worldwide" color="border-sky-200" />
          <StatCard icon="⚡" value="24/7" label="Always available, any timezone" color="border-violet-200" />
          <StatCard icon="♾️" value="Unlimited" label="Revisions until you love it" color="border-emerald-200" />
          <StatCard icon="💎" value="Premium" label="Quality at every budget" color="border-amber-200" />
        </div>
      </section>

      {/* ── MAIN CONTENT ─────────────────────────────────────────────────── */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">

        {/* Search Results */}
        {searchQuery.trim() && (
          <div ref={searchRef} className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-sky-400 to-blue-600 flex items-center justify-center shadow-md shadow-sky-200">
                <SearchIcon className="w-4 h-4 text-white" />
              </div>
              <h2 className="text-xl font-bold text-slate-800">
                {searchResults.length > 0
                  ? `${searchResults.length} result${searchResults.length > 1 ? "s" : ""} for "${searchQuery}"`
                  : `No exact match for "${searchQuery}"`}
              </h2>
            </div>
            {searchResults.length > 0 && <div className="space-y-4">{searchResults.map(item => <SearchResultItem key={item.id} item={item} />)}</div>}
            <SimilarQuestions results={similarQuestions} />
            {!searchResults.length && !similarQuestions.length && (
              <div className="text-center py-14 bg-white rounded-2xl border border-slate-200 shadow-sm">
                <div className="text-5xl mb-4">🔍</div>
                <h3 className="text-lg font-semibold text-slate-700 mb-2">No results found</h3>
                <p className="text-slate-500 mb-6 max-w-sm mx-auto">Try rephrasing or browse all categories below.</p>
                <button onClick={() => setSearchQuery("")}
                  className="px-6 py-3 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-semibold rounded-xl transition-all cursor-pointer shadow-lg shadow-sky-200">
                  Browse All FAQs
                </button>
              </div>
            )}
          </div>
        )}

        {/* Category Filter */}
        {!searchQuery.trim() && (
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-400 to-purple-600 flex items-center justify-center shadow-md shadow-violet-200">
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-slate-800">Browse by Category</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              <button onClick={() => setActiveCategory(null)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer border ${
                  activeCategory === null
                    ? "bg-gradient-to-r from-sky-500 to-blue-600 text-white border-transparent shadow-lg shadow-sky-200"
                    : "bg-white border-slate-200 text-slate-600 hover:border-sky-300 hover:text-sky-600 hover:bg-sky-50"
                }`}>
                🗂 All Topics <span className="ml-1 text-xs opacity-70">({faqs.length})</span>
              </button>
              {categories.map(cat => {
                const cfg = catConfig[cat] ?? defaultCat;
                const count = faqs.filter(f => f.category === cat).length;
                const isActive = activeCategory === cat;
                return (
                  <button key={cat} onClick={() => setActiveCategory(isActive ? null : cat)}
                    className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer border ${
                      isActive ? cfg.pillActive : `bg-white ${cfg.pill}`
                    }`}>
                    {cfg.icon} {cat} <span className="ml-1 text-xs opacity-70">({count})</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Category hero stripe (when filtered) */}
        {activeCategory && !searchQuery.trim() && (() => {
          const cfg = catConfig[activeCategory] ?? defaultCat;
          return (
            <div className={`mb-6 px-5 py-4 rounded-2xl border ${cfg.badge} flex items-center gap-3`}>
              <span className="text-2xl">{cfg.icon}</span>
              <div>
                <div className="font-bold text-sm">{activeCategory}</div>
                <div className="text-xs opacity-70">{filteredFAQs.length} question{filteredFAQs.length !== 1 ? "s" : ""} in this category</div>
              </div>
              <button onClick={() => setActiveCategory(null)} className="ml-auto text-xs underline opacity-60 hover:opacity-100 cursor-pointer">Clear</button>
            </div>
          );
        })()}

        {/* FAQ List */}
        <div className="space-y-3">
          {filteredFAQs.map(item => (
            <div key={item.id} id={`faq-item-${item.id}`} className="scroll-mt-8">
              <FAQAccordion item={item} />
            </div>
          ))}
          {!filteredFAQs.length && (
            <div className="text-center py-12 text-slate-400 bg-white rounded-2xl border border-slate-200">
              No questions in this category yet.
            </div>
          )}
        </div>

        {/* ── CTA ──────────────────────────────────────────────────────── */}
        <div className="mt-16 relative rounded-3xl overflow-hidden"
          style={{ background: "linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #312e81 100%)" }}>
          <GridPattern />
          <div className="absolute -top-16 -right-16 w-64 h-64 bg-sky-400/20 rounded-full blur-[80px]" />
          <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-violet-500/20 rounded-full blur-[80px]" />
          <div className="absolute top-6 left-1/3 w-40 h-40 bg-pink-400/10 rounded-full blur-[60px]" />
          <div className="relative px-8 py-12 sm:px-12 sm:py-16 text-center">
            <div className="text-5xl mb-4">🚀</div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4 tracking-tight">
              Still have questions?
            </h2>
            <p className="text-lg text-slate-300 max-w-xl mx-auto mb-8">
              Our team is here to help 24/7. Book a free consultation and let's discuss how Vyxo can transform your business.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href={links.bookConsultation} target="_blank" rel="noopener noreferrer"
                className="w-full sm:w-auto px-8 py-4 font-bold text-lg rounded-2xl text-white transition-all duration-200 cursor-pointer text-center shadow-2xl shadow-sky-500/30 hover:scale-105"
                style={{ background: "linear-gradient(135deg, #38bdf8, #6366f1)" }}>
                📅 Book Free Consultation
              </a>
              <a href={links.contactTeam} target="_blank" rel="noopener noreferrer"
                className="w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded-2xl transition-all duration-200 border border-white/20 hover:border-white/40 text-lg cursor-pointer text-center hover:scale-105">
                💬 Contact Our Team
              </a>
              <a href={links.viewWebsite} target="_blank" rel="noopener noreferrer"
                className="w-full sm:w-auto px-8 py-4 bg-white text-slate-800 hover:bg-slate-100 font-bold rounded-2xl transition-all duration-200 text-lg cursor-pointer text-center hover:scale-105">
                🌐 View Our Website
              </a>
            </div>
          </div>
        </div>

        {/* ── TRUST CARDS ──────────────────────────────────────────────── */}
        <div className="mt-16">
          <h2 className="text-2xl font-extrabold text-slate-800 text-center mb-8">Why clients love working with Vyxo</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { icon: "⏰", title: "24/7 Availability", desc: "Our global team spans every timezone. Day or night, someone is always ready to help.", color: "from-sky-50 to-sky-100 border-sky-200", accent: "text-sky-600" },
              { icon: "♾️", title: "Unlimited Revisions", desc: "We refine your project until it's exactly right — no limits, no extra charges.", color: "from-violet-50 to-violet-100 border-violet-200", accent: "text-violet-600" },
              { icon: "⚡", title: "Lightning Fast Delivery", desc: "Simple sites in 24–48 hours. Complex projects in 1–4 weeks, always on time.", color: "from-amber-50 to-amber-100 border-amber-200", accent: "text-amber-600" },
              { icon: "🌍", title: "Global Reach", desc: "We serve clients from every corner of the world with full privacy and professionalism.", color: "from-emerald-50 to-emerald-100 border-emerald-200", accent: "text-emerald-600" },
              { icon: "🤖", title: "AI-Powered Solutions", desc: "From chatbots to voice assistants, we bring cutting-edge AI to your business.", color: "from-blue-50 to-blue-100 border-blue-200", accent: "text-blue-600" },
              { icon: "💎", title: "Premium Quality", desc: "Enterprise-grade work at prices that work for everyone — no compromise.", color: "from-rose-50 to-rose-100 border-rose-200", accent: "text-rose-600" },
            ].map(c => (
              <div key={c.title} className={`bg-gradient-to-br ${c.color} border rounded-2xl p-6 hover:shadow-lg transition-shadow`}>
                <div className="text-4xl mb-3">{c.icon}</div>
                <h3 className={`text-base font-bold mb-2 ${c.accent}`}>{c.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* ── FOOTER ───────────────────────────────────────────────────────── */}
      <footer style={{ background: "linear-gradient(135deg, #0f172a, #1e3a5f)" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
              {/* Brand */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <BrandLogo logoSrc={logoSrc} href={links.logoLink} size="small" />
                <div>
                  <span className="text-lg font-bold text-white">Vyxo</span>
                  <p className="text-xs text-slate-500">Premium websites for everyone</p>
                </div>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed">
                We build premium websites and AI-powered solutions at prices that work for your budget. Your vision, our expertise.
              </p>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Contact Us</h4>
              <ul className="space-y-3 text-sm">
                <li>
                  <a href="mailto:support.vyxo@gmail.com" className="flex items-center gap-3 text-slate-300 hover:text-sky-400 transition-colors">
                    <span className="w-8 h-8 bg-sky-500/15 rounded-lg flex items-center justify-center text-sky-400 text-base">📧</span>
                    support.vyxo@gmail.com
                  </a>
                </li>
                <li className="flex items-center gap-3 text-slate-400">
                  <span className="w-8 h-8 bg-emerald-500/15 rounded-lg flex items-center justify-center text-emerald-400 text-base">⏰</span>
                  Available 24/7 worldwide
                </li>
                <li className="flex items-center gap-3 text-slate-400">
                  <span className="w-8 h-8 bg-violet-500/15 rounded-lg flex items-center justify-center text-violet-400 text-base">🌍</span>
                  Serving clients globally
                </li>
              </ul>
            </div>

            {/* Links */}
            <div>
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Quick Links</h4>
              <ul className="space-y-3 text-sm">
                {[
                  { label: "🌐 Main Website", href: links.mainWebsite },
                  { label: "📅 Book Consultation", href: links.bookConsultation },
                  { label: "💬 Contact Team", href: links.contactTeam },
                ].map(l => (
                  <li key={l.label}>
                    <a href={l.href} target="_blank" rel="noopener noreferrer"
                      className="text-slate-300 hover:text-sky-400 transition-colors flex items-center gap-2">
                      {l.label}
                      <svg className="w-3 h-3 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              <span className="text-xs text-slate-500">All systems operational · 24/7 support active</span>
            </div>
            <div onClick={handleCopyrightClick}
              className="text-xs text-slate-600 cursor-pointer select-none hover:text-slate-400 transition-colors">
              © 2026 Vyxo. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
