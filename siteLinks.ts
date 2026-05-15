export interface SiteLinks {
  mainWebsite: string;
  bookConsultation: string;
  contactTeam: string;
  viewWebsite: string;
  logoLink: string;
}

export const DEFAULT_LINKS: SiteLinks = {
  mainWebsite: "https://vyxo-global.netlify.app",
  bookConsultation: "https://vyxo-global.netlify.app/book-consultation",
  contactTeam: "https://vyxo-global.netlify.app/contact",
  viewWebsite: "https://vyxo-global.netlify.app",
  logoLink: "https://vyxo-global.netlify.app",
};

export const LINK_LABELS: Record<keyof SiteLinks, { label: string; description: string; icon: string }> = {
  mainWebsite: {
    label: "Visit Our Main Website",
    description: "The top \"Visit our Main Website\" button in the header",
    icon: "🌐",
  },
  bookConsultation: {
    label: "Book Free Consultation",
    description: "The \"Book Free Consultation\" button in the CTA section and footer",
    icon: "📅",
  },
  contactTeam: {
    label: "Contact Our Team",
    description: "The \"Contact Our Team\" button in the CTA section and footer",
    icon: "💬",
  },
  viewWebsite: {
    label: "View Our Website",
    description: "The \"View Our Website\" button in the CTA section",
    icon: "🔗",
  },
  logoLink: {
    label: "Logo Click Destination",
    description: "Where users go when they click the logo in the header or footer",
    icon: "🖼️",
  },
};

export function loadLinks(): SiteLinks {
  try {
    const saved = localStorage.getItem("vyxo_links");
    if (saved) return { ...DEFAULT_LINKS, ...JSON.parse(saved) };
  } catch {}
  return DEFAULT_LINKS;
}

export function saveLinks(links: SiteLinks) {
  try {
    localStorage.setItem("vyxo_links", JSON.stringify(links));
  } catch {}
}
