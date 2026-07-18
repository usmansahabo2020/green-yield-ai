import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ===== TYPES ===== */
type ModuleKey =
  | "assistant"
  | "weather"
  | "market"
  | "livestock"
  | "training"
  | "cropdoctor"
  | "finance"
  | "community"
  | "schemes"
  | "elearning";

interface ModuleTab {
  key: ModuleKey;
  label: string;
  icon: string;
}

const TABS: ModuleTab[] = [
  { key: "assistant", label: "AI Assistant", icon: "🤖" },
  { key: "weather", label: "Weather", icon: "🌤️" },
  { key: "market", label: "Market Prices", icon: "💰" },
  { key: "livestock", label: "Livestock", icon: "🐄" },
  { key: "training", label: "Training", icon: "📚" },
  { key: "cropdoctor", label: "Crop Doctor", icon: "🔬" },
  { key: "finance", label: "Farm Finance", icon: "📊" },
  { key: "community", label: "Community", icon: "🤝" },
  { key: "schemes", label: "Schemes", icon: "📋" },
  { key: "elearning", label: "E-Learning", icon: "🎓" },
];

/* ===== DASHBOARD ===== */
export default function Dashboard({ onBack }: { onBack: () => void }) {
  const [activeTab, setActiveTab] = useState<ModuleKey>("assistant");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-[#FDFCF7]">
      {/* Dashboard header */}
      <div className="bg-white border-b border-[#1B4332]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <button
                onClick={onBack}
                className="p-2 hover:bg-[#1B4332]/10 rounded-lg transition-colors"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
              </button>
              <h1 className="text-xl font-bold text-[#1B4332]">Farm Dashboard</h1>
            </div>
            <div className="flex items-center gap-3">
              {/* Search */}
              <div className="relative hidden sm:block">
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#1B4332]/40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
                <input
                  type="text"
                  placeholder="Search modules..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 pr-4 py-2 bg-[#1B4332]/5 border border-[#1B4332]/10 rounded-lg text-sm text-[#1B4332] placeholder:text-[#1B4332]/30 focus:outline-none focus:ring-2 focus:ring-[#1B4332]/20 w-48"
                />
              </div>
              {/* User badge */}
              <div className="w-9 h-9 rounded-full bg-[#1B4332] flex items-center justify-center text-[#FDFCF7] text-sm font-semibold">
                EF
              </div>
            </div>
          </div>

          {/* Tab navigation */}
          <div className="flex gap-1 overflow-x-auto pb-1 scrollbar-none">
            {TABS.filter(
              (t) =>
                !searchQuery ||
                t.label.toLowerCase().includes(searchQuery.toLowerCase())
            ).map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                  activeTab === tab.key
                    ? "bg-[#1B4332] text-[#FDFCF7] shadow-sm"
                    : "text-[#1B4332]/60 hover:text-[#1B4332] hover:bg-[#1B4332]/5"
                }`}
              >
                <span>{tab.icon}</span>
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Module content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === "assistant" && <AIAssistantModule />}
            {activeTab === "weather" && <WeatherModule />}
            {activeTab === "market" && <MarketPricesModule />}
            {activeTab === "livestock" && <LivestockModule />}
            {activeTab === "training" && <TrainingModule />}
            {activeTab === "cropdoctor" && <CropDoctorModule />}
            {activeTab === "finance" && <FarmFinanceModule />}
            {activeTab === "community" && <CommunityModule />}
            {activeTab === "schemes" && <SchemesModule />}
            {activeTab === "elearning" && <ELearningModule />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ===== MODULE: AI Farming Assistant ===== */
function AIAssistantModule() {
  const [messages, setMessages] = useState<{ role: "user" | "ai"; text: string }[]>([
    { role: "ai", text: "Hello! I'm your GreenRise farming assistant. Ask me anything about crops, weather, pests, or farming techniques in English, Yoruba, Hausa, or Igbo." },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages((prev) => [...prev, { role: "user", text: input }]);
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text: `For "${input}": Based on current data, I recommend planting drought-resistant maize varieties this season. The rains are expected to start in the next 2 weeks in your region. Would you like more specific advice?`,
        },
      ]);
    }, 800);
    setInput("");
  };

  const quickQuestions = [
    "When should I plant maize in Kaduna?",
    "How do I treat cassava mosaic?",
    "Best fertilizer for tomatoes?",
    "Pest control for cowpeas",
  ];

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-[#1B4332]">🤖 AI Farming Assistant</h2>
        <p className="text-[#1B4332]/60 mt-1">
          Ask questions in English, Yoruba, Hausa, or Igbo. Get instant, personalized farming advice.
        </p>
      </div>

      {/* Chat area */}
      <div className="bg-white rounded-2xl border border-[#1B4332]/10 overflow-hidden">
        <div className="h-80 overflow-y-auto p-4 space-y-3">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                  msg.role === "user"
                    ? "bg-[#1B4332] text-[#FDFCF7] rounded-br-md"
                    : "bg-[#1B4332]/5 text-[#1B4332] rounded-bl-md"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>
        <div className="border-t border-[#1B4332]/10 p-4">
          <div className="flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Ask a farming question..."
              className="flex-1 px-4 py-2.5 bg-[#1B4332]/5 border border-[#1B4332]/10 rounded-xl text-sm text-[#1B4332] placeholder:text-[#1B4332]/30 focus:outline-none focus:ring-2 focus:ring-[#1B4332]/20"
            />
            <button
              onClick={handleSend}
              className="px-4 py-2.5 bg-[#1B4332] text-[#FDFCF7] rounded-xl font-medium text-sm hover:bg-[#1B4332]/90 transition-colors"
            >
              Send
            </button>
          </div>
          <div className="flex flex-wrap gap-2 mt-3">
            {quickQuestions.map((q) => (
              <button
                key={q}
                onClick={() => {
                  setInput(q);
                }}
                className="px-3 py-1.5 bg-[#1B4332]/5 text-[#1B4332]/70 rounded-lg text-xs hover:bg-[#1B4332]/10 transition-colors"
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ===== MODULE: Weather & Planting Advisor ===== */
function WeatherModule() {
  const regions = [
    { name: "Kaduna", temp: "31°C", condition: "Sunny", humidity: "45%", rain: "0%", icon: "☀️" },
    { name: "Ibadan", temp: "28°C", condition: "Partly Cloudy", humidity: "62%", rain: "20%", icon: "⛅" },
    { name: "Enugu", temp: "27°C", condition: "Light Rain", humidity: "78%", rain: "60%", icon: "🌦️" },
    { name: "Maiduguri", temp: "35°C", condition: "Clear", humidity: "30%", rain: "0%", icon: "☀️" },
    { name: "Port Harcourt", temp: "26°C", condition: "Rainy", humidity: "85%", rain: "80%", icon: "🌧️" },
    { name: "Abuja", temp: "30°C", condition: "Sunny", humidity: "50%", rain: "10%", icon: "☀️" },
  ];

  const advice = [
    { crop: "Maize", action: "Plant now", reason: "Optimal soil temperature in Northern regions" },
    { crop: "Cassava", action: "Prepare land", reason: "Rainy season approaching in South-West" },
    { crop: "Rice", action: "Transplant seedlings", reason: "Good water availability in Anambra basin" },
    { crop: "Tomatoes", action: "Apply fungicide", reason: "High humidity increases blight risk" },
  ];

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-[#1B4332]">🌤️ Weather & Planting Advisor</h2>
        <p className="text-[#1B4332]/60 mt-1">Real-time weather data and optimal planting windows for your region.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Weather cards */}
        <div className="lg:col-span-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {regions.map((r) => (
              <div key={r.name} className="bg-white rounded-xl border border-[#1B4332]/10 p-4 hover:border-[#D4A853]/30 transition-all">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-[#1B4332]">{r.name}</span>
                  <span className="text-2xl">{r.icon}</span>
                </div>
                <div className="text-2xl font-bold text-[#1B4332]">{r.temp}</div>
                <div className="text-sm text-[#1B4332]/60">{r.condition}</div>
                <div className="flex gap-4 mt-2 text-xs text-[#1B4332]/50">
                  <span>💧 {r.humidity}</span>
                  <span>🌧️ {r.rain}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Planting advice */}
        <div className="bg-white rounded-xl border border-[#1B4332]/10 p-5">
          <h3 className="font-semibold text-[#1B4332] mb-4">🌱 Today's Planting Advice</h3>
          <div className="space-y-4">
            {advice.map((a) => (
              <div key={a.crop} className="pb-4 border-b border-[#1B4332]/5 last:border-0 last:pb-0">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-[#1B4332]">{a.crop}</span>
                  <span className="px-2 py-0.5 bg-[#1B4332]/10 text-[#1B4332] text-xs rounded-full font-medium">{a.action}</span>
                </div>
                <p className="text-xs text-[#1B4332]/50 mt-1">{a.reason}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ===== MODULE: Market Prices & Farm Gate ===== */
function MarketPricesModule() {
  const prices = [
    { crop: "Maize (white)", price: "₦42,000", unit: "per 100kg bag", change: "+2%", direction: "up" },
    { crop: "Cassava (fresh)", price: "₦28,000", unit: "per tonne", change: "+5%", direction: "up" },
    { crop: "Tomatoes", price: "₦35,000", unit: "per crate", change: "-3%", direction: "down" },
    { crop: "Rice (local)", price: "₦55,000", unit: "per 50kg bag", change: "+1%", direction: "up" },
    { crop: "Yam (tubers)", price: "₦45,000", unit: "per 100 tubers", change: "0%", direction: "flat" },
    { crop: "Cowpea", price: "₦38,000", unit: "per 100kg bag", change: "+4%", direction: "up" },
    { crop: "Soybeans", price: "₦32,000", unit: "per 100kg bag", change: "-1%", direction: "down" },
    { crop: "Palm Oil", price: "₦85,000", unit: "per 25L keg", change: "+3%", direction: "up" },
  ];

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-[#1B4332]">💰 Market Prices & Farm Gate</h2>
        <p className="text-[#1B4332]/60 mt-1">Live market prices for crops and livestock across major Nigerian markets.</p>
      </div>

      <div className="bg-white rounded-2xl border border-[#1B4332]/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#1B4332]/5 border-b border-[#1B4332]/10">
                <th className="text-left px-4 py-3 font-semibold text-[#1B4332]">Crop / Product</th>
                <th className="text-left px-4 py-3 font-semibold text-[#1B4332]">Price</th>
                <th className="text-left px-4 py-3 font-semibold text-[#1B4332] hidden sm:table-cell">Unit</th>
                <th className="text-right px-4 py-3 font-semibold text-[#1B4332]">Change</th>
              </tr>
            </thead>
            <tbody>
              {prices.map((p) => (
                <tr key={p.crop} className="border-b border-[#1B4332]/5 hover:bg-[#1B4332]/[0.02]">
                  <td className="px-4 py-3 font-medium text-[#1B4332]">{p.crop}</td>
                  <td className="px-4 py-3 font-semibold text-[#1B4332]">{p.price}</td>
                  <td className="px-4 py-3 text-[#1B4332]/60 hidden sm:table-cell">{p.unit}</td>
                  <td className={`px-4 py-3 text-right font-medium ${
                    p.direction === "up" ? "text-green-600" : p.direction === "down" ? "text-red-500" : "text-[#1B4332]/60"
                  }`}>
                    {p.direction === "up" ? "↑" : p.direction === "down" ? "↓" : "→"} {p.change}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* ===== MODULE: Livestock Management ===== */
function LivestockModule() {
  const animals = [
    { name: "Cattle (White Fulani)", count: 24, health: "Good", nextCheck: "2025-04-15", status: "healthy" },
    { name: "Goats (Red Sokoto)", count: 45, health: "Excellent", nextCheck: "2025-04-10", status: "excellent" },
    { name: "Sheep (Balami)", count: 30, health: "Fair", nextCheck: "2025-04-08", status: "fair" },
    { name: "Chickens (Noiler)", count: 200, health: "Good", nextCheck: "2025-04-12", status: "healthy" },
  ];

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-[#1B4332]">🐄 Livestock Management</h2>
        <p className="text-[#1B4332]/60 mt-1">Track animal health, breeding schedules, and feed management.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl border border-[#1B4332]/10 p-4 text-center">
          <div className="text-3xl font-bold text-[#1B4332]">299</div>
          <div className="text-sm text-[#1B4332]/60">Total Animals</div>
        </div>
        <div className="bg-white rounded-xl border border-[#1B4332]/10 p-4 text-center">
          <div className="text-3xl font-bold text-green-600">285</div>
          <div className="text-sm text-[#1B4332]/60">Healthy</div>
        </div>
        <div className="bg-white rounded-xl border border-[#1B4332]/10 p-4 text-center">
          <div className="text-3xl font-bold text-amber-500">14</div>
          <div className="text-sm text-[#1B4332]/60">Needs Attention</div>
        </div>
        <div className="bg-white rounded-xl border border-[#1B4332]/10 p-4 text-center">
          <div className="text-3xl font-bold text-[#D4A853]">3</div>
          <div className="text-sm text-[#1B4332]/60">Vaccinations Due</div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-[#1B4332]/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#1B4332]/5 border-b border-[#1B4332]/10">
                <th className="text-left px-4 py-3 font-semibold text-[#1B4332]">Breed</th>
                <th className="text-right px-4 py-3 font-semibold text-[#1B4332]">Count</th>
                <th className="text-center px-4 py-3 font-semibold text-[#1B4332]">Health</th>
                <th className="text-right px-4 py-3 font-semibold text-[#1B4332] hidden sm:table-cell">Next Check</th>
              </tr>
            </thead>
            <tbody>
              {animals.map((a) => (
                <tr key={a.name} className="border-b border-[#1B4332]/5 hover:bg-[#1B4332]/[0.02]">
                  <td className="px-4 py-3 font-medium text-[#1B4332]">{a.name}</td>
                  <td className="px-4 py-3 text-right font-semibold text-[#1B4332]">{a.count}</td>
                  <td className="px-4 py-3 text-center">
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${
                      a.status === "excellent" ? "bg-green-100 text-green-700" :
                      a.status === "healthy" ? "bg-green-50 text-green-600" :
                      "bg-amber-50 text-amber-600"
                    }`}>
                      {a.health}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right text-[#1B4332]/60 hidden sm:table-cell">{a.nextCheck}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* ===== MODULE: Training & Knowledge Hub ===== */
function TrainingModule() {
  const courses = [
    { title: "Modern Maize Farming Techniques", duration: "2 hours", lessons: 8, level: "Beginner" },
    { title: "Organic Pest Control Methods", duration: "1.5 hours", lessons: 5, level: "Intermediate" },
    { title: "Cassava Processing & Value Addition", duration: "3 hours", lessons: 12, level: "Advanced" },
    { title: "Fish Pond Management", duration: "2.5 hours", lessons: 10, level: "Intermediate" },
    { title: "Soil Health & Fertility Management", duration: "1 hour", lessons: 4, level: "Beginner" },
    { title: "Poultry Farming for Profit", duration: "4 hours", lessons: 15, level: "All Levels" },
  ];

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-[#1B4332]">📚 Training & Knowledge Hub</h2>
        <p className="text-[#1B4332]/60 mt-1">Access a library of agricultural best practices, video tutorials, and guides.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {courses.map((c) => (
          <div key={c.title} className="group bg-white rounded-xl border border-[#1B4332]/10 p-5 hover:border-[#D4A853]/30 hover:shadow-lg transition-all cursor-pointer">
            <div className="flex items-center gap-2 mb-3">
              <span className="px-2 py-0.5 bg-[#1B4332]/10 text-[#1B4332] text-xs rounded-full font-medium">
                {c.level}
              </span>
              <span className="text-xs text-[#1B4332]/40">{c.duration}</span>
            </div>
            <h3 className="font-semibold text-[#1B4332] mb-2 group-hover:text-[#D4A853] transition-colors">{c.title}</h3>
            <div className="flex items-center justify-between mt-4">
              <span className="text-xs text-[#1B4332]/50">{c.lessons} lessons</span>
              <span className="text-xs text-[#1B4332]/40 group-hover:text-[#D4A853] transition-colors">Start learning →</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ===== MODULE: Crop Doctor ===== */
function CropDoctorModule() {
  const issues = [
    { crop: "Cassava", issue: "Cassava Mosaic Virus", symptoms: "Yellow mottling on leaves, stunted growth", remedy: "Use resistant varieties, remove infected plants", severity: "high" },
    { crop: "Maize", issue: "Fall Armyworm", symptoms: "Holes in leaves, frass on stalks", remedy: "Apply neem extract or emamectin benzoate", severity: "high" },
    { crop: "Tomatoes", issue: "Late Blight", symptoms: "Dark lesions on leaves and stems", remedy: "Copper-based fungicide, improve air circulation", severity: "medium" },
    { crop: "Cowpea", issue: "Aphids", symptoms: "Curled leaves, sticky residue", remedy: "Insecticidal soap or neem oil spray", severity: "low" },
    { crop: "Rice", issue: "Rice Blast", symptoms: "Diamond-shaped lesions on leaves", remedy: "Use resistant varieties, avoid excess nitrogen", severity: "medium" },
  ];

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-[#1B4332]">🔬 Crop Doctor</h2>
        <p className="text-[#1B4332]/60 mt-1">Diagnose crop diseases, pests, and nutrient deficiencies with AI-powered analysis.</p>
      </div>

      {/* Quick diagnose */}
      <div className="bg-white rounded-2xl border border-[#1B4332]/10 p-5 mb-6">
        <h3 className="font-semibold text-[#1B4332] mb-3">📸 Diagnose a Crop Problem</h3>
        <p className="text-sm text-[#1B4332]/60 mb-4">Upload a photo of your crop and our AI will identify the issue.</p>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2.5 bg-[#1B4332] text-[#FDFCF7] rounded-xl text-sm font-medium hover:bg-[#1B4332]/90 transition-colors">
            Upload Image
          </button>
          <span className="text-xs text-[#1B4332]/40">or describe the symptoms below</span>
        </div>
        <div className="mt-3">
          <textarea
            placeholder="Describe what you see on your crops..."
            className="w-full px-4 py-3 bg-[#1B4332]/5 border border-[#1B4332]/10 rounded-xl text-sm text-[#1B4332] placeholder:text-[#1B4332]/30 focus:outline-none focus:ring-2 focus:ring-[#1B4332]/20 resize-none h-20"
          />
        </div>
      </div>

      {/* Common issues */}
      <h3 className="font-semibold text-[#1B4332] mb-4">Common Issues in Your Area</h3>
      <div className="space-y-3">
        {issues.map((i) => (
          <div key={i.issue} className="bg-white rounded-xl border border-[#1B4332]/10 p-4">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-[#1B4332]">{i.issue}</span>
                  <span className={`px-2 py-0.5 text-xs rounded-full font-medium ${
                    i.severity === "high" ? "bg-red-50 text-red-600" :
                    i.severity === "medium" ? "bg-amber-50 text-amber-600" :
                    "bg-green-50 text-green-600"
                  }`}>{i.severity}</span>
                </div>
                <p className="text-xs text-[#1B4332]/50">Crop: {i.crop}</p>
              </div>
            </div>
            <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
              <div>
                <span className="text-xs font-medium text-[#1B4332]/70">Symptoms:</span>
                <p className="text-xs text-[#1B4332]/60">{i.symptoms}</p>
              </div>
              <div>
                <span className="text-xs font-medium text-[#1B4332]/70">Remedy:</span>
                <p className="text-xs text-[#1B4332]/60">{i.remedy}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ===== MODULE: Farm Finance ===== */
function FarmFinanceModule() {
  const transactions = [
    { date: "2025-04-01", item: "Maize harvest sold", type: "income", amount: "₦420,000" },
    { date: "2025-03-28", item: "Fertilizer (NPK) purchase", type: "expense", amount: "₦85,000" },
    { date: "2025-03-25", item: "Tomatoes sold at market", type: "income", amount: "₦175,000" },
    { date: "2025-03-20", item: "Labour cost (3 workers)", type: "expense", amount: "₦60,000" },
    { date: "2025-03-18", item: "Pesticide spray", type: "expense", amount: "₦25,000" },
    { date: "2025-03-15", item: "Cassava tuber sales", type: "income", amount: "₦280,000" },
  ];

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-[#1B4332]">📊 Farm Finance</h2>
        <p className="text-[#1B4332]/60 mt-1">Track income, expenses, and profitability across your farm operations.</p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl border border-[#1B4332]/10 p-4">
          <div className="text-sm text-[#1B4332]/60 mb-1">Monthly Income</div>
          <div className="text-2xl font-bold text-green-600">₦875,000</div>
          <div className="text-xs text-green-600 mt-1">↑ 12% from last month</div>
        </div>
        <div className="bg-white rounded-xl border border-[#1B4332]/10 p-4">
          <div className="text-sm text-[#1B4332]/60 mb-1">Monthly Expenses</div>
          <div className="text-2xl font-bold text-red-500">₦170,000</div>
          <div className="text-xs text-red-500 mt-1">↑ 5% from last month</div>
        </div>
        <div className="bg-white rounded-xl border border-[#1B4332]/10 p-4">
          <div className="text-sm text-[#1B4332]/60 mb-1">Net Profit</div>
          <div className="text-2xl font-bold text-[#1B4332]">₦705,000</div>
          <div className="text-xs text-green-600 mt-1">↑ 18% from last month</div>
        </div>
      </div>

      {/* Transactions */}
      <div className="bg-white rounded-2xl border border-[#1B4332]/10 overflow-hidden">
        <div className="px-4 py-3 border-b border-[#1B4332]/10">
          <h3 className="font-semibold text-[#1B4332]">Recent Transactions</h3>
        </div>
        <div className="divide-y divide-[#1B4332]/5">
          {transactions.map((t) => (
            <div key={t.date + t.item} className="flex items-center justify-between px-4 py-3">
              <div className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${t.type === "income" ? "bg-green-500" : "bg-red-400"}`} />
                <div>
                  <div className="text-sm font-medium text-[#1B4332]">{t.item}</div>
                  <div className="text-xs text-[#1B4332]/40">{t.date}</div>
                </div>
              </div>
              <span className={`text-sm font-semibold ${t.type === "income" ? "text-green-600" : "text-red-500"}`}>
                {t.type === "income" ? "+" : "-"}{t.amount}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ===== MODULE: Community & Marketplace ===== */
function CommunityModule() {
  const listings = [
    { user: "Chidi O.", item: "Fresh Maize — 500kg", price: "₦210,000", location: "Oyo State", type: "sell" },
    { user: "Aisha M.", item: "Looking for Noiler Chicks", price: "Budget: ₦50,000", location: "Kaduna", type: "buy" },
    { user: "Yusuf A.", item: "NPK Fertilizer — 10 bags", price: "₦160,000", location: "Kano", type: "sell" },
    { user: "Grace E.", item: "Cassava Stem Cuttings", price: "₦15,000/bundle", location: "Benue", type: "sell" },
    { user: "Ibrahim S.", item: "Need Farm Labourers", price: "₦5,000/day", location: "Nasarawa", type: "buy" },
  ];

  const groups = [
    { name: "Maize Farmers Association", members: 1240, region: "South-West" },
    { name: "Cassava Processors Co-op", members: 856, region: "South-East" },
    { name: "Northern Livestock Group", members: 2090, region: "North-West" },
    { name: "Youth in Agribusiness", members: 3420, region: "National" },
  ];

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-[#1B4332]">🤝 Community & Marketplace</h2>
        <p className="text-[#1B4332]/60 mt-1">Connect with buyers, sellers, and farming communities across Nigeria.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Marketplace */}
        <div className="bg-white rounded-2xl border border-[#1B4332]/10 overflow-hidden">
          <div className="px-4 py-3 border-b border-[#1B4332]/10 flex items-center justify-between">
            <h3 className="font-semibold text-[#1B4332]">🏪 Marketplace</h3>
            <button className="text-xs text-[#D4A853] font-medium hover:underline">Post Listing</button>
          </div>
          <div className="divide-y divide-[#1B4332]/5">
            {listings.map((l) => (
              <div key={l.item} className="px-4 py-3">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm text-[#1B4332]">{l.item}</span>
                      <span className={`px-2 py-0.5 text-xs rounded-full font-medium ${
                        l.type === "sell" ? "bg-green-50 text-green-600" : "bg-amber-50 text-amber-600"
                      }`}>{l.type === "sell" ? "For Sale" : "Wanted"}</span>
                    </div>
                    <div className="text-xs text-[#1B4332]/50 mt-1">{l.user} · {l.location}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold text-[#1B4332]">{l.price}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Community groups */}
        <div className="bg-white rounded-2xl border border-[#1B4332]/10 overflow-hidden">
          <div className="px-4 py-3 border-b border-[#1B4332]/10">
            <h3 className="font-semibold text-[#1B4332]">👥 Community Groups</h3>
          </div>
          <div className="divide-y divide-[#1B4332]/5">
            {groups.map((g) => (
              <div key={g.name} className="px-4 py-3 flex items-center justify-between hover:bg-[#1B4332]/[0.02] cursor-pointer">
                <div>
                  <div className="text-sm font-medium text-[#1B4332]">{g.name}</div>
                  <div className="text-xs text-[#1B4332]/50">{g.members.toLocaleString()} members · {g.region}</div>
                </div>
                <button className="px-3 py-1.5 bg-[#1B4332]/10 text-[#1B4332] text-xs rounded-lg font-medium hover:bg-[#1B4332]/20 transition-colors">
                  Join
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ===== MODULE: Government Schemes & Grants ===== */
function SchemesModule() {
  const schemes = [
    { name: "Anchor Borrowers' Programme", provider: "CBN", type: "Loan", status: "Open", deadline: "2025-05-30", desc: "Input loans for smallholder farmers growing key commodities." },
    { name: "NAGS-AP", provider: "Federal Ministry of Ag.", type: "Grant", status: "Open", deadline: "2025-06-15", desc: "National Agricultural Growth Scheme — Agro-Processing support." },
    { name: "FADAMA III", provider: "World Bank/FGN", type: "Grant", status: "Open", deadline: "2025-07-01", desc: "Community-based agricultural development project." },
    { name: "Youth in Agribusiness", provider: "BOI", type: "Loan", status: "Coming Soon", deadline: "TBD", desc: "Low-interest loans for young agripreneurs (18-35)." },
    { name: "Rice Farmers Support", provider: "RIFAN", type: "Inputs", status: "Open", deadline: "2025-04-20", desc: "Subsidized rice seeds, fertilizer, and agrochemicals." },
  ];

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-[#1B4332]">📋 Government Schemes & Grants</h2>
        <p className="text-[#1B4332]/60 mt-1">Stay informed about agricultural programs, subsidies, and funding opportunities.</p>
      </div>

      <div className="space-y-4">
        {schemes.map((s) => (
          <div key={s.name} className="bg-white rounded-xl border border-[#1B4332]/10 p-5 hover:border-[#D4A853]/30 transition-all">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="font-semibold text-[#1B4332]">{s.name}</h3>
                <p className="text-xs text-[#1B4332]/50">{s.provider}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 bg-[#1B4332]/10 text-[#1B4332] text-xs rounded-full font-medium">{s.type}</span>
                <span className={`px-2 py-0.5 text-xs rounded-full font-medium ${
                  s.status === "Open" ? "bg-green-50 text-green-600" : "bg-amber-50 text-amber-600"
                }`}>{s.status}</span>
              </div>
            </div>
            <p className="text-sm text-[#1B4332]/70 mb-3">{s.desc}</p>
            <div className="flex items-center justify-between text-xs">
              <span className="text-[#1B4332]/50">Deadline: {s.deadline}</span>
              <button className="text-[#D4A853] font-medium hover:underline">Apply Now →</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ===== MODULE: E-Learning & Certifications ===== */
function ELearningModule() {
  const certs = [
    { title: "Certified Maize Farmer", progress: 75, lessons: "12/16", status: "In Progress" },
    { title: "Organic Farming Specialist", progress: 30, lessons: "3/10", status: "In Progress" },
    { title: "Poultry Management Expert", progress: 100, lessons: "12/12", status: "Completed" },
    { title: "Agricultural Business Management", progress: 0, lessons: "0/8", status: "Not Started" },
    { title: "Cassava Value Chain", progress: 60, lessons: "6/10", status: "In Progress" },
  ];

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-[#1B4332]">🎓 E-Learning & Certifications</h2>
        <p className="text-[#1B4332]/60 mt-1">Structured courses, quizzes, and certificates to advance your farming knowledge.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <div className="bg-[#1B4332] text-[#FDFCF7] rounded-xl p-5">
          <div className="text-3xl font-bold">5</div>
          <div className="text-sm mt-1 opacity-80">Enrolled Courses</div>
        </div>
        <div className="bg-white rounded-xl border border-[#1B4332]/10 p-5">
          <div className="text-3xl font-bold text-[#1B4332]">1</div>
          <div className="text-sm text-[#1B4332]/60 mt-1">Completed</div>
        </div>
        <div className="bg-white rounded-xl border border-[#1B4332]/10 p-5">
          <div className="text-3xl font-bold text-[#D4A853]">3</div>
          <div className="text-sm text-[#1B4332]/60 mt-1">Certificates Earned</div>
        </div>
      </div>

      <div className="space-y-3">
        {certs.map((c) => (
          <div key={c.title} className="bg-white rounded-xl border border-[#1B4332]/10 p-4">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h3 className="font-semibold text-[#1B4332] text-sm">{c.title}</h3>
                <p className="text-xs text-[#1B4332]/50">{c.lessons} lessons</p>
              </div>
              <span className={`px-2 py-0.5 text-xs rounded-full font-medium ${
                c.status === "Completed" ? "bg-green-50 text-green-600" :
                c.status === "In Progress" ? "bg-blue-50 text-blue-600" :
                "bg-gray-50 text-gray-500"
              }`}>{c.status}</span>
            </div>
            <div className="w-full bg-[#1B4332]/10 rounded-full h-2">
              <div
                className="bg-[#1B4332] h-2 rounded-full transition-all"
                style={{ width: `${c.progress}%` }}
              />
            </div>
            <div className="text-xs text-[#1B4332]/40 mt-1 text-right">{c.progress}%</div>
          </div>
        ))}
      </div>
    </div>
  );
}