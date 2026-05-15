export interface FAQItem {
  id: number;
  question: string;
  answer: string;
  category: string;
}

export const faqData: FAQItem[] = [
  // === PRICING & PAYMENTS (Most Important) ===
  {
    id: 1,
    question: "How does Vyxo pricing work? Is there a fixed price?",
    answer:
      "At Vyxo, we believe every business deserves a professional online presence — regardless of budget. We don't have fixed prices because every project is unique. Instead, we work closely with you to understand your goals, requirements, and budget, then create a tailored proposal that works for both of us. Whether you need a simple landing page or a complex enterprise solution, we'll find a pricing arrangement that fits your needs. You can choose between one-time payments, monthly installments, or any arrangement that suits your financial situation.",
    category: "Pricing & Payments",
  },
  {
    id: 2,
    question: "Can you give me a rough price estimate for my project?",
    answer:
      "Absolutely! While every project is unique, we've built websites ranging from as low as $20 for simple projects to premium enterprise solutions worth $10,000+. The final cost depends on the complexity, features, and scope of what you need. During our free consultation, we'll give you a transparent, detailed estimate with no hidden fees — so you know exactly what to expect before we begin.",
    category: "Pricing & Payments",
  },
  {
    id: 3,
    question: "What payment options do you accept?",
    answer:
      "We accept a wide range of payment methods to make things as convenient as possible for you:\n\n• **Bank Transfer** — Our preferred method, accepted from any country\n• **PayPal** — Fast and secure international payments\n• **Cryptocurrency** — Highly preferred, including Bitcoin, Ethereum, and more\n• **Cash App** — Quick and easy transfers\n• **Stripe** — Secure card payments\n\nAll payment agreements and schedules are confirmed in writing before we begin any work, so you're always protected.",
    category: "Pricing & Payments",
  },
  {
    id: 4,
    question: "What payment arrangements do you offer?",
    answer:
      "We're completely flexible with payment arrangements. You can choose from:\n\n• **Full payment upfront** — Pay everything before we start\n• **Partial deposit** — Pay a deposit to begin, then the remainder on completion\n• **Payment after delivery** — Pay once you're fully satisfied\n• **Installment plans** — Spread the cost over manageable monthly payments\n• **Subscription payments** — Ongoing payment plans for continuous services\n\nWhatever works best for your cash flow — we'll make it happen. All agreements are documented and agreed upon before any work begins.",
    category: "Pricing & Payments",
  },
  {
    id: 5,
    question: "Do you charge extra for hosting, domains, or maintenance?",
    answer:
      "That's entirely up to you. We can include hosting, domain registration, and ongoing maintenance in your project package, or you can handle these separately — whatever you prefer. We'll discuss all options during your consultation and make sure you have a clear understanding of all costs involved. There are no surprises.",
    category: "Pricing & Payments",
  },
  {
    id: 6,
    question: "I have a very small budget. Can you still work with me?",
    answer:
      "Absolutely! At Vyxo, our mission is to provide a website for everyone. No budget is too small. We'll work with you to create a solution that fits your financial situation — whether that means a streamlined version of your original idea or a phased approach where we build the essentials first and add more features later. Every great business starts somewhere, and we'd love to be part of your journey.",
    category: "Pricing & Payments",
  },

  // === CONSULTATION & BOOKING ===
  {
    id: 7,
    question: "How do I book a consultation with Vyxo?",
    answer:
      "Booking a consultation is simple! Just reach out to us through our website, email, or any preferred contact method. We'll schedule a time that works for you — and because we operate 24/7 with a global team, we can accommodate any timezone. Consultations are designed to understand your project, answer all your questions, and give you a clear roadmap. There's no obligation — it's a friendly conversation to see if we're the right fit for each other.",
    category: "Consultation & Booking",
  },
  {
    id: 8,
    question: "What happens during a consultation?",
    answer:
      "During your consultation, we'll:\n\n• **Listen to your vision** — We want to understand exactly what you're looking for\n• **Ask the right questions** — To make sure we grasp your business goals, target audience, and requirements\n• **Provide expert advice** — Based on our experience, we'll suggest the best approach for your project\n• **Give you a clear estimate** — A transparent breakdown of costs and timelines\n• **Create a roadmap** — A step-by-step plan from concept to launch\n\nConsultations typically last 30–60 minutes, and we make sure you leave with all the information you need to make a confident decision.",
    category: "Consultation & Booking",
  },
  {
    id: 9,
    question: "Is the consultation free?",
    answer:
      "Yes! Our initial consultation is completely free. We believe you should have all the information you need before making any commitment. Use this time to ask us anything — about our process, pricing, timeline, or even just to bounce ideas off our team. We're here to help, not to pressure you.",
    category: "Consultation & Booking",
  },

  // === DELIVERY & WORKFLOW ===
  {
    id: 10,
    question: "How fast can you deliver my project?",
    answer:
      "Speed is one of our biggest strengths. Once we have all the information we need from you, we begin work immediately. Simple websites can be delivered in as little as 24–48 hours, while more complex projects typically take 1–4 weeks depending on scope. We'll give you a realistic timeline during your consultation, and we always strive to deliver ahead of schedule when possible.",
    category: "Delivery & Workflow",
  },
  {
    id: 11,
    question: "Will I receive updates while my project is being built?",
    answer:
      "Absolutely! We believe in complete transparency throughout the entire process. You'll receive:\n\n• **Regular progress updates** — So you always know where things stand\n• **Live previews** — See your project coming to life in real-time\n• **Working demos** — Test features before final delivery\n\nWe keep you in the loop at every stage. No surprises, no guessing — just clear communication every step of the way.",
    category: "Delivery & Workflow",
  },
  {
    id: 12,
    question: "How many revisions do I get?",
    answer:
      "As many as you need! We don't believe in limiting revisions with arbitrary numbers. Your satisfaction is our top priority, and we'll keep refining and perfecting your project until it's exactly what you envisioned. We're not happy until you're happy.",
    category: "Delivery & Workflow",
  },
  {
    id: 13,
    question: "What if I want to add extra features after development has started?",
    answer:
      "No problem at all! We understand that ideas evolve during the development process. If you'd like to add new features, simply let us know. If the changes affect the overall cost or timeline, we'll communicate this transparently before proceeding — and we'll only move forward with your approval. Your vision comes first.",
    category: "Delivery & Workflow",
  },
  {
    id: 14,
    question: "Do you help with deployment, or just building?",
    answer:
      "We handle the entire process — from building to deployment and beyond. Once your project is complete and you're 100% satisfied, we'll help you deploy it live. Whether you need help with hosting setup, domain configuration, or going live on your preferred platform, we've got you covered.",
    category: "Delivery & Workflow",
  },
  {
    id: 15,
    question: "Do you offer ongoing support after my website is launched?",
    answer:
      "Yes, absolutely! Our relationship doesn't end at launch. We offer comprehensive ongoing support including:\n\n• **Technical maintenance** — Keeping everything running smoothly\n• **Updates & upgrades** — Regular improvements to keep your site current\n• **Troubleshooting** — Quick resolution of any issues\n• **Performance monitoring** — Ensuring optimal speed and uptime\n\nWe're your long-term technology partner, not just a one-time vendor.",
    category: "Delivery & Workflow",
  },
  {
    id: 16,
    question: "How quickly do you respond to client messages?",
    answer:
      "We typically respond immediately. Our team operates 24/7 around the clock because we serve clients globally across different time zones. On the rare occasion we experience a slight delay, you'll always receive a response within 24 hours — guaranteed. Your time is valuable, and we treat every inquiry with urgency.",
    category: "Delivery & Workflow",
  },

  // === WEBSITE FEATURES & QUALITY ===
  {
    id: 17,
    question: "What features are included in your websites?",
    answer:
      "Every Vyxo website comes packed with professional-grade features:\n\n• **Mobile responsiveness** — Looks perfect on every device\n• **Lightning-fast loading** — Optimized for speed and performance\n• **SEO optimization** — Built to rank well on search engines\n• **Contact forms & lead capture** — Convert visitors into customers\n• **Smooth animations** — Modern, engaging user experience\n• **Admin dashboard** — Full control over your content\n• **Booking systems** — Let clients schedule directly on your site\n• **Payment integration** — Accept payments seamlessly\n• **AI integrations** — Smart automation built right in\n• **Email integrations** — Connected to your marketing tools\n\nAnd the best part? You can request any custom feature you can imagine — we'll build it.",
    category: "Website Features",
  },
  {
    id: 18,
    question: "Can I request completely custom features for my website?",
    answer:
      "Yes! Custom features are one of our specialties. Whether you need a unique booking system, a custom AI chatbot, integration with a specific tool, or any feature you can dream up — we can build it. During your consultation, share your ideas and we'll tell you exactly what's possible and how we can bring your vision to life.",
    category: "Website Features",
  },
  {
    id: 19,
    question: "Do you build admin dashboards and management systems?",
    answer:
      "Yes, we build powerful admin dashboards that give you complete control over your website. You'll be able to manage content, track analytics, monitor bookings, view customer data, and much more — all from an intuitive, user-friendly interface. No technical knowledge required.",
    category: "Website Features",
  },
  {
    id: 20,
    question: "Do you build mobile apps, or just websites?",
    answer:
      "We do both! Whether you need a responsive website, a native mobile app for iOS and Android, or a progressive web app (PWA) — we've got you covered. We'll help you choose the best approach based on your business needs, target audience, and budget.",
    category: "Website Features",
  },
  {
    id: 21,
    question: "Can you connect my website with WhatsApp, Instagram, payment gateways, and other tools?",
    answer:
      "Absolutely! We specialize in seamless integrations with virtually any platform or tool:\n\n• **WhatsApp** — Direct communication with your customers\n• **Instagram & Social Media** — Connect and grow your audience\n• **Payment Gateways** — Stripe, PayPal, Crypto, and more\n• **CRMs** — Salesforce, HubSpot, and other CRM platforms\n• **Email Systems** — Mailchimp, SendGrid, and more\n• **AI Systems** — Custom AI bots and automation tools\n\nIf it has an API, we can connect it.",
    category: "Website Features",
  },

  // === AI & AUTOMATION ===
  {
    id: 22,
    question: "What can Vyxo AI assistants automate for my business?",
    answer:
      "Our AI solutions can transform how your business operates. Here's what we can automate:\n\n• **Customer Support Bots** — 24/7 instant responses to common questions\n• **AI Receptionists** — Answer calls naturally and professionally\n• **Lead Qualification** — Automatically identify and prioritize hot leads\n• **AI Booking Systems** — Let customers schedule appointments automatically\n• **Workflow Automations** — Streamline repetitive business processes\n• **AI Voice Assistants** — Handle phone calls with human-like conversation\n• **AI Sales Bots** — Engage visitors and guide them toward purchasing\n• **CRM Automations** — Keep your customer data organized and actionable\n\nWe can also build completely custom AI systems tailored to your specific business needs.",
    category: "AI & Automation",
  },
  {
    id: 23,
    question: "What can your AI chatbot do for my business?",
    answer:
      "Our AI chatbots are incredibly versatile. They can:\n\n• **Answer FAQs instantly** — Free up your time for more important tasks\n• **Collect leads** — Capture visitor information automatically\n• **Book appointments** — Schedule meetings without back-and-forth\n• **Recommend products or services** — Upsell intelligently\n• **Handle customer support** — Resolve issues 24/7\n• **Qualify leads** — Identify serious buyers from casual browsers\n\nThink of it as having a tireless, always-available team member who never takes a break.",
    category: "AI & Automation",
  },
  {
    id: 24,
    question: "What can your Phone AI do?",
    answer:
      "Our Phone AI is like having a professional receptionist who never sleeps:\n\n• **Answer calls naturally** — With human-like conversation\n• **Transfer calls** — Route to the right person or department\n• **Take bookings** — Schedule appointments over the phone\n• **Collect caller details** — Gather information automatically\n• **Answer business questions** — Provide instant, accurate responses\n\nIt's perfect for businesses that miss calls or want to provide 24/7 availability without hiring additional staff.",
    category: "AI & Automation",
  },
  {
    id: 25,
    question: "I don't understand AI. Can you explain it in simple terms?",
    answer:
      "Of course! Think of AI as a smart assistant that works for your business around the clock. Just like you have a receptionist answering phones during business hours, an AI chatbot answers customer questions on your website 24/7 — even while you sleep. It can handle hundreds of conversations at once, never gets tired, and gets smarter over time. We'll explain everything in plain language during your consultation, and we'll only recommend AI solutions that genuinely make sense for your business.",
    category: "AI & Automation",
  },

  // === TRUST & QUALITY ===
  {
    id: 26,
    question: "Are you a real company? Can I trust Vyxo?",
    answer:
      "Yes, Vyxo is a fully legitimate and established company. We've worked with clients from all around the world, and while we respect our clients' privacy and don't publicly share names without permission, we can provide references, case studies, and portfolio examples during your consultation. We're proud of our track record, and our growing client base speaks for itself. We're not going anywhere — we're in this for the long haul with every client we work with.",
    category: "Trust & Quality",
  },
  {
    id: 27,
    question: "What makes Vyxo different from other web development companies?",
    answer:
      "Great question! Here's what sets us apart:\n\n• **Premium quality at affordable prices** — You get enterprise-level work without the enterprise-level price tag\n• **Incredible flexibility** — We adapt to your budget, timeline, and vision\n• **Blazing-fast delivery** — We don't make you wait weeks or months\n• **AI-powered solutions** — We integrate cutting-edge AI into every project\n• **24/7 availability** — Our global team means someone is always ready to help\n• **Unlimited revisions** — Until you're 100% satisfied\n• **Ongoing support** — We're your partner, not a one-time vendor\n\nWe don't just build websites — we build business growth engines.",
    category: "Trust & Quality",
  },
  {
    id: 28,
    question: "What guarantees do you offer?",
    answer:
      "We stand behind our work with these guarantees:\n\n• **Satisfaction guarantee** — Unlimited revisions until you're completely happy\n• **On-time delivery guarantee** — We deliver when we promise, or we make it right\n• **24/7 support guarantee** — Help is always just a message away\n• **Transparent pricing guarantee** — No hidden fees, no surprises\n• **Quality guarantee** — Premium-grade work on every project, regardless of budget\n\nYour success is our reputation, and we take that very seriously.",
    category: "Trust & Quality",
  },
  {
    id: 29,
    question: "I already have a website. Why should I consider Vyxo?",
    answer:
      "Even if you have a website, Vyxo can significantly upgrade your online presence:\n\n• **Modern redesign** — Give your brand a fresh, professional look\n• **AI integration** — Add smart automation that your competitors don't have\n• **Performance optimization** — Make your site faster and more efficient\n• **Mobile optimization** — Ensure a flawless experience on all devices\n• **SEO improvement** — Rank higher and attract more organic traffic\n• **New features** — Add booking systems, chatbots, dashboards, and more\n\nMany of our clients came to us with existing websites and left with a completely transformed digital presence that drove real business results.",
    category: "Trust & Quality",
  },
  {
    id: 30,
    question: "What's the most expensive project Vyxo can handle?",
    answer:
      "Vyxo is equipped to handle projects of any scale — from simple landing pages to complex enterprise solutions worth $10,000 and beyond. We've built:\n\n• **Enterprise websites** — Large-scale corporate platforms\n• **Advanced AI systems** — Custom AI solutions for complex business needs\n• **SaaS platforms** — Full software-as-a-service products\n• **Automation systems** — End-to-end business process automation\n• **AI agents** — Intelligent systems that work autonomously\n\nWhatever your vision and budget, we'll create a proposal that fits.",
    category: "Trust & Quality",
  },

  // === SUPPORT & COMMUNICATION ===
  {
    id: 31,
    question: "What if I have a problem or something goes wrong?",
    answer:
      "We've got you covered. If anything goes wrong or you encounter any issues:\n\n1. **Reach out to us immediately** — Via your preferred communication channel\n2. **We respond fast** — Typically within minutes, always within 24 hours\n3. **We fix it** — Our team will resolve the issue as quickly as possible\n4. **We prevent it from happening again** — We identify the root cause and make sure it doesn't recur\n\nNo one ever has a bad experience with Vyxo. That's not just a claim — it's our standard. If you ever feel we've fallen short, we'll go above and beyond to make it right.",
    category: "Support & Communication",
  },
  {
    id: 32,
    question: "What are your working hours?",
    answer:
      "We operate 24/7, 365 days a year. Because we have a global team spanning multiple time zones, there's always someone available to help you — whether it's 3 AM or 3 PM in your timezone. You'll never have to wait for 'business hours' to get the support you need.",
    category: "Support & Communication",
  },
  {
    id: 33,
    question: "How can I contact a human if I need to?",
    answer:
      "While our AI is incredibly capable, we understand that sometimes you just want to talk to a real person. You can reach a human team member through:\n\n• **Our contact page** — Fill out the form and a team member will reach out\n• **Email** — Send us a detailed message and we'll respond personally\n• **Phone** — Call us directly for immediate assistance\n• **Live chat** — Connect with a human agent in real-time\n\nWe're always just a message away.",
    category: "Support & Communication",
  },

  // === GETTING STARTED ===
  {
    id: 34,
    question: "How do I get started with Vyxo?",
    answer:
      "Getting started is easy! Here's your simple 3-step process:\n\n1. **Book a free consultation** — Tell us about your project and goals\n2. **Get your custom proposal** — We'll create a detailed plan with transparent pricing\n3. **We build & deliver** — Sit back while we bring your vision to life\n\nThat's it! No complicated processes, no pressure — just a straightforward path to getting the website and AI solutions your business deserves.\n\n👉 **Ready to start? Book your free consultation today!**",
    category: "Getting Started",
  },
  {
    id: 35,
    question: "What if I'm not sure what I want yet?",
    answer:
      "That's completely fine! Many of our best clients came to us with just a rough idea. During your free consultation, we'll help you:\n\n• **Clarify your goals** — What do you want to achieve with your website?\n• **Explore your options** — We'll present different approaches and possibilities\n• **Get expert recommendations** — Based on what works best for businesses like yours\n• **Create a flexible plan** — One that can evolve as your ideas become clearer\n\nYou don't need to have everything figured out. Just bring your vision, and we'll handle the rest.",
    category: "Getting Started",
  },
  {
    id: 36,
    question: "Do you work with international clients?",
    answer:
      "Absolutely! Vyxo is a global company with clients from all around the world. We work with businesses in every timezone and every industry. Our 24/7 availability means geography is never a barrier — we're always ready to serve you, no matter where you are.",
    category: "Getting Started",
  },
];

export const categories = [
  "Getting Started",
  "Pricing & Payments",
  "Consultation & Booking",
  "Delivery & Workflow",
  "Website Features",
  "AI & Automation",
  "Trust & Quality",
  "Support & Communication",
];
