import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Dashboard from "./components/Dashboard.tsx";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
};

const stagger = {
  animate: { transition: { staggerChildren: 0.08 } },
};

export default function App() {
  const [view, setView] = useState<"landing" | "dashboard">("landing");
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#FDFCF7] text-[#1B4332] font-sans">
      {/* ===== HEADER ===== */}
      <header className="sticky top-0 z-50 bg-[#FDFCF7]/80 backdrop-blur-md border-b border-[#1B4332]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          {/* Logo */}
          <button onClick={() => setView("landing")} className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-[#1B4332] flex items-center justify-center">
              <span className="text-[#FDFCF7] text-sm font-bold">G</span>
            </div>
            <span className="text-lg font-semibold tracking-tight text-[#1B4332]">
              Green<span className="text-[#D4A853]">Rise</span>
            </span>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <button onClick={() => setView("landing")} className="hover:text-[#D4A853] transition-colors">
              Home
            </button>
            <button onClick={() => setView("dashboard")} className="hover:text-[#D4A853] transition-colors">
              Dashboard
            </button>
            <a href="#features" className="hover:text-[#D4A853] transition-colors">Features</a>
            <a href="#services" className="hover:text-[#D4A853] transition-colors">Services</a>
            <a href="#contact" className="hover:text-[#D4A853] transition-colors">Contact</a>
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setView("dashboard")}
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 bg-[#1B4332] text-[#FDFCF7] rounded-lg text-sm font-medium hover:bg-[#1B4332]/90 transition-all"
            >
              <span>Get Started</span>
              <span className="text-xs">→</span>
            </button>
            {/* Mobile menu */}
            <button className="md:hidden p-2" onClick={() => setMenuOpen(!menuOpen)}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                {menuOpen ? (
                  <path d="M18 6L6 18M6 6l12 12" />
                ) : (
                  <path d="M3 12h18M3 6h18M3 18h18" />
                )}
              </svg>
            </button>
          </div>
        </div>
        {/* Mobile nav */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden overflow-hidden border-t border-[#1B4332]/10 bg-[#FDFCF7]"
            >
              <div className="px-4 py-4 flex flex-col gap-3 text-sm font-medium">
                <button onClick={() => { setView("landing"); setMenuOpen(false); }} className="py-2 hover:text-[#D4A853]">Home</button>
                <button onClick={() => { setView("dashboard"); setMenuOpen(false); }} className="py-2 hover:text-[#D4A853]">Dashboard</button>
                <a href="#features" onClick={() => setMenuOpen(false)} className="py-2 hover:text-[#D4A853]">Features</a>
                <a href="#services" onClick={() => setMenuOpen(false)} className="py-2 hover:text-[#D4A853]">Services</a>
                <a href="#contact" onClick={() => setMenuOpen(false)} className="py-2 hover:text-[#D4A853]">Contact</a>
                <button onClick={() => { setView("dashboard"); setMenuOpen(false); }} className="mt-2 w-full px-4 py-2 bg-[#1B4332] text-[#FDFCF7] rounded-lg text-center">
                  Get Started
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ===== VIEWS ===== */}
      <AnimatePresence mode="wait">
        {view === "landing" ? (
          <LandingPage key="landing" onGetStarted={() => setView("dashboard")} />
        ) : (
          <Dashboard key="dashboard" onBack={() => setView("landing")} />
        )}
      </AnimatePresence>

      {/* ===== FOOTER ===== */}
      <footer id="contact" className="bg-[#1B4332] text-[#FDFCF7]/80 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-[#FDFCF7]/10 flex items-center justify-center">
                  <span className="text-[#FDFCF7] text-sm font-bold">G</span>
                </div>
                <span className="text-lg font-semibold text-[#FDFCF7]">GreenRise AI</span>
              </div>
              <p className="text-sm leading-relaxed max-w-md">
                Empowering Nigerian farmers with AI-driven insights, real-time weather data, 
                market prices, and expert knowledge — all in one platform.
              </p>
            </div>
            <div>
              <h4 className="text-[#FDFCF7] font-semibold mb-3 text-sm uppercase tracking-wider">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li><button onClick={() => setView("dashboard")} className="hover:text-[#D4A853] transition-colors">Dashboard</button></li>
                <li><a href="#features" className="hover:text-[#D4A853] transition-colors">Features</a></li>
                <li><a href="#services" className="hover:text-[#D4A853] transition-colors">Services</a></li>
                <li><a href="#" className="hover:text-[#D4A853] transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-[#FDFCF7] font-semibold mb-3 text-sm uppercase tracking-wider">Contact</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                  hello@greenrise.ng
                </li>
                <li className="flex items-center gap-2">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg>
                  +234 800 123 4567
                </li>
                <li className="flex items-center gap-2">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                  Abuja, Nigeria
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-[#FDFCF7]/10 text-center text-xs">
            © {new Date().getFullYear()} GreenRise AI. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ===== LANDING PAGE ===== */
function LandingPage({ onGetStarted }: { onGetStarted: () => void }) {
  const features = [
    {
      icon: "🌾",
      title: "AI Farming Assistant",
      desc: "Get instant answers to farming questions in Yoruba, Hausa, Igbo, and English.",
    },
    {
      icon: "🌤️",
      title: "Weather & Planting Guide",
      desc: "Real-time local forecasts and optimal planting windows for your region.",
    },
    {
      icon: "💰",
      title: "Market Prices",
      desc: "Live market prices for crops, livestock, and farm inputs across Nigeria.",
    },
    {
      icon: "📚",
      title: "Training & Knowledge",
      desc: "Access a library of agricultural best practices, video tutorials, and guides.",
    },
  ];

  const services = [
    { icon: "🌱", title: "Crop Management", desc: "Personalized crop calendars, pest alerts, and harvest timing." },
    { icon: "🐄", title: "Livestock Tracking", desc: "Animal health records, breeding schedules, and feed management." },
    { icon: "📊", title: "Farm Analytics", desc: "Visual dashboards tracking yield, costs, and profitability." },
    { icon: "🤝", title: "Market Connect", desc: "Direct links to buyers, cooperative groups, and extension agents." },
    { icon: "🎓", title: "E-Learning Hub", desc: "Structured courses, quizzes, and certificates for farmers." },
    { icon: "📰", title: "News & Alerts", desc: "Government policies, grant opportunities, and agricultural news." },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1B4332]/5 via-transparent to-[#D4A853]/10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 relative">
          <motion.div {...fadeUp} className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#1B4332]/10 text-[#1B4332] text-sm rounded-full font-medium mb-6">
              <span className="w-2 h-2 rounded-full bg-[#D4A853] animate-pulse" />
              AI-Powered Agricultural Hub
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight tracking-tight text-[#1B4332]">
              Farming Smarter,{" "}
              <span className="text-[#D4A853]">Harvesting More</span>
            </h1>
            <p className="mt-6 text-lg text-[#1B4332]/70 max-w-xl leading-relaxed">
              GreenRise AI brings the power of artificial intelligence to Nigerian farmers. 
              Get real-time weather forecasts, market prices, expert advice, and training — 
              all in your local language.
            </p>
            <div className="flex flex-wrap gap-4 mt-8">
              <button
                onClick={onGetStarted}
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#1B4332] text-[#FDFCF7] rounded-xl font-semibold hover:bg-[#1B4332]/90 transition-all shadow-lg shadow-[#1B4332]/20"
              >
                Launch Dashboard
                <span>→</span>
              </button>
              <a
                href="#features"
                className="inline-flex items-center gap-2 px-6 py-3 border-2 border-[#1B4332]/20 text-[#1B4332] rounded-xl font-semibold hover:bg-[#1B4332]/5 transition-all"
              >
                Learn More
              </a>
            </div>
          </motion.div>
        </div>
        {/* Decorative */}
        <div className="absolute -bottom-6 -right-6 w-64 h-64 bg-[#D4A853]/5 rounded-full blur-3xl" />
        <div className="absolute -top-6 -left-6 w-48 h-48 bg-[#1B4332]/5 rounded-full blur-3xl" />
      </section>

      {/* Features */}
      <section id="features" className="py-20 bg-white/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1B4332]">
              Everything You Need
            </h2>
            <p className="mt-4 text-[#1B4332]/60 max-w-xl mx-auto">
              Ten powerful modules designed to help Nigerian farmers at every stage.
            </p>
          </motion.div>
          <motion.div
            variants={stagger}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                variants={{
                  initial: { opacity: 0, y: 20 },
                  animate: { opacity: 1, y: 0 },
                }}
                transition={{ delay: i * 0.08 }}
                className="group p-6 bg-white rounded-2xl border border-[#1B4332]/10 hover:border-[#D4A853]/30 hover:shadow-lg hover:shadow-[#D4A853]/5 transition-all"
              >
                <span className="text-3xl block mb-4">{f.icon}</span>
                <h3 className="font-semibold text-lg text-[#1B4332] mb-2">{f.title}</h3>
                <p className="text-sm text-[#1B4332]/60 leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1B4332]">
              Comprehensive Services
            </h2>
            <p className="mt-4 text-[#1B4332]/60 max-w-xl mx-auto">
              From crop to market, we've got you covered.
            </p>
          </motion.div>
          <motion.div
            variants={stagger}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {services.map((s, i) => (
              <motion.div
                key={s.title}
                variants={{
                  initial: { opacity: 0, y: 20 },
                  animate: { opacity: 1, y: 0 },
                }}
                transition={{ delay: i * 0.06 }}
                className="flex items-start gap-4 p-5 rounded-xl bg-white border border-[#1B4332]/10 hover:border-[#1B4332]/20 transition-all"
              >
                <span className="text-2xl shrink-0">{s.icon}</span>
                <div>
                  <h3 className="font-semibold text-[#1B4332]">{s.title}</h3>
                  <p className="text-sm text-[#1B4332]/60 mt-1">{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-[#1B4332] text-[#FDFCF7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              ["10+", "Farming Modules"],
              ["4", "Local Languages"],
              ["24/7", "AI Support"],
              ["36", "States Covered"],
            ].map(([stat, label]) => (
              <div key={label}>
                <div className="text-3xl md:text-4xl font-bold text-[#D4A853]">{stat}</div>
                <div className="text-sm mt-1 text-[#FDFCF7]/70">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 text-center">
        <div className="max-w-2xl mx-auto px-4">
          <motion.div {...fadeUp}>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1B4332]">
              Ready to Transform Your Farm?
            </h2>
            <p className="mt-4 text-[#1B4332]/60">
              Join thousands of Nigerian farmers already using GreenRise AI to grow smarter.
            </p>
            <button
              onClick={onGetStarted}
              className="mt-8 inline-flex items-center gap-2 px-8 py-4 bg-[#1B4332] text-[#FDFCF7] rounded-xl font-semibold hover:bg-[#1B4332]/90 transition-all shadow-lg shadow-[#1B4332]/20 text-lg"
            >
              Get Started Free
              <span>→</span>
            </button>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
}