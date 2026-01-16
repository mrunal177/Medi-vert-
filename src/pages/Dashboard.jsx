import React, { useState, useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  CartesianGrid,
} from "recharts";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../auth/AuthContext";
import { getDashboardData } from "../firebase/dashboardService";
import { logDisposal } from "../firebase/disposalService";
import { useEffect } from "react";

// ================= THEME CONFIG =================
const COLORS = ["#4A5D23", "#BC4B28", "#2C5F58", "#1A1A1A"];

// ================= STYLED COMPONENTS =================

const GraphBackground = () => (
  <div className="absolute inset-0 pointer-events-none z-0">
    <div className="absolute inset-0 opacity-[0.05] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-multiply" />
    <div
      className="absolute inset-0 w-full h-full"
      style={{
        backgroundImage:
          "linear-gradient(to right, rgba(26, 26, 26, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(26, 26, 26, 0.05) 1px, transparent 1px)",
        backgroundSize: "30px 30px",
      }}
    />
  </div>
);

const Stamp = () => (
  <div className="absolute -top-8 right-2 md:-top-4 md:right-4 border-[2px] border-[#BC4B28] p-2 rotate-[-3deg] opacity-20 pointer-events-none z-0 mix-blend-multiply">
    <div className="border border-[#BC4B28] px-4 py-1">
      <span className="font-mono font-bold text-lg md:text-xl text-[#BC4B28] uppercase tracking-[0.3em] block text-center leading-none">
        Confidential Dossier
      </span>
    </div>
  </div>
);

const HoverCard = ({ children, note, color, className = "" }) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <motion.div
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={`relative overflow-hidden transition-shadow duration-300 ${className}`}
      style={{
        boxShadow: isHovered
          ? "0 20px 25px -5px rgba(0, 0, 0, 0.1)"
          : "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
      }}
    >
      <div
        className="absolute top-0 left-0 w-full h-1"
        style={{ backgroundColor: color }}
      />
      {children}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-[#EFEDE6] border-t border-[#1A1A1A]/5 px-8"
          >
            <div className="py-4 flex gap-3 items-start">
              <span className="text-lg">💡</span>
              <p className="font-serif text-sm italic text-[#1A1A1A]/80 leading-relaxed">
                {note}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// ================= MODAL COMPONENT =================
const LogEntryModal = ({ isOpen, onClose, onSubmit }) => {
  const [qty, setQty] = useState("");
  const [type, setType] = useState("pills");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (qty && parseInt(qty) > 0) {
      setIsSubmitting(true);
      try {
        await onSubmit(parseInt(qty), type);
        setQty("");
        setType("pills");
      } catch (error) {
        console.error("Error submitting entry:", error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#1A1A1A]/80 backdrop-blur-sm p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="bg-[#EFEDE6] w-full max-w-md border-2 border-[#1A1A1A] p-8 relative shadow-2xl"
      >
        <button
          onClick={onClose}
          disabled={isSubmitting}
          className="absolute top-4 right-4 text-[#1A1A1A] hover:text-[#BC4B28] font-bold text-xl disabled:opacity-50"
        >
          ✕
        </button>
        <div className="mb-8 border-b border-[#1A1A1A]/10 pb-4">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] opacity-60">
            Field Ops
          </span>
          <h2 className="text-3xl font-serif text-[#1A1A1A] mt-1">
            Log Disposal
          </h2>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block font-mono text-[10px] uppercase tracking-widest opacity-50 mb-2">
              Quantity (Units)
            </label>
            <input
              type="number"
              min="1"
              value={qty}
              onChange={(e) => setQty(e.target.value)}
              autoFocus
              disabled={isSubmitting}
              className="w-full bg-white border border-[#1A1A1A]/20 p-4 font-serif text-xl focus:outline-none focus:border-[#4A5D23] disabled:opacity-50"
              placeholder="e.g. 15"
              required
            />
          </div>
          <div>
            <label className="block font-mono text-[10px] uppercase tracking-widest opacity-50 mb-2">
              Type
            </label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              disabled={isSubmitting}
              className="w-full bg-white border border-[#1A1A1A]/20 p-4 font-serif text-lg focus:outline-none focus:border-[#4A5D23] disabled:opacity-50"
            >
              <option value="pills">Pills / Tablets</option>
              <option value="syrups">Liquids / Syrups</option>
              <option value="injectables">Sharps / Needles</option>
              <option value="ointments">Creams / Ointments</option>
            </select>
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 mt-4 bg-[#1A1A1A] text-[#EFEDE6] font-mono text-xs font-bold uppercase tracking-[0.2em] hover:bg-[#BC4B28] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Processing..." : "Confirm Entry"}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

// ================= DASHBOARD COMPONENT =================

export default function Dashboard() {
  const { user } = useAuth();
  const [isModalOpen, setModalOpen] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // --- FETCH DASHBOARD DATA ---
  const fetchDashboard = async () => {
    try {
      if (!user?.uid) {
        console.log("No user logged in");
        return;
      }

      setLoading(true);
      const result = await getDashboardData(user.uid);
      console.log("Dashboard data fetched:", result);

      // ✅ FIX: Use the disposals array from the result object
      const disposals = result?.disposals || [];
      console.log("Setting data with disposals:", disposals.length);
      setData(disposals);
    } catch (error) {
      console.error("Error fetching dashboard:", error);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  // --- FETCH ON LOGIN / REFRESH ---
  useEffect(() => {
    if (user?.uid) {
      fetchDashboard();
    }
  }, [user?.uid]);

  // --- CALCULATIONS ---
  const stats = useMemo(() => {
    let totalMedicines = 0;
    let totalWater = 0;
    let totalScore = 0;
    const monthly = {};
    const types = {};

    data.forEach((d) => {
      const count = d.medicineCount || 0;
      totalMedicines += count;
      totalWater += count * 25;
      totalScore += count * 5;

      // ✅ FIX: Safely parse timestamp
      try {
        const date = d.timestamp?.toDate?.() || new Date(d.timestamp);
        const month = date.toLocaleString("default", {
          month: "short",
        });
        monthly[month] = (monthly[month] || 0) + count;
      } catch (e) {
        console.error("Error parsing date:", e);
      }

      // ✅ FIX: Handle medicineTypes safely
      const typeData = d.medicineTypes || {};
      Object.entries(typeData).forEach(([t, c]) => {
        types[t] = (types[t] || 0) + c;
      });
    });

    return {
      totalMedicines,
      totalWater,
      totalScore,
      barData: Object.keys(monthly).map((m) => ({
        month: m,
        medicines: monthly[m],
      })),
      pieData: Object.keys(types).map((t) => ({ name: t, value: types[t] })),
    };
  }, [data]);

  // --- ADD ENTRY (SUBMIT HANDLER) ---
  const handleAddDonation = async (qty, type) => {
    try {
      if (!user?.uid) {
        alert("Please log in first");
        return;
      }

      console.log("Submitting disposal:", { qty, type, userId: user.uid });

      // 1️⃣ Save data to Firestore
      await logDisposal({
        userId: user.uid,
        medicineCount: qty,
        medicineType: type,
      });

      console.log("Disposal logged successfully");

      // 2️⃣ RELOAD DASHBOARD DATA
      await fetchDashboard();

      // 3️⃣ Close modal
      setModalOpen(false);
    } catch (error) {
      console.error("Error adding donation:", error);
      alert("Error saving entry. Check console for details.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#EFEDE6] text-[#1A1A1A] flex items-center justify-center">
        <div className="font-serif text-xl opacity-60">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#EFEDE6] text-[#1A1A1A] font-sans pt-24 pb-20 relative overflow-hidden">
      <GraphBackground />

      <main className="max-w-7xl mx-auto px-6 relative z-10">
        {/* --- HEADER --- */}
        <div className="mb-12 border-b border-[#1A1A1A]/20 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-6 relative">
          <Stamp />

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-[#4A5D23] animate-pulse" />
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] font-bold opacity-60">
                Live Feed
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-serif font-medium tracking-tight leading-[0.9]">
              Field <span className="italic text-[#BC4B28]">Report.</span>
            </h1>
          </div>

          <div className="flex flex-col items-end gap-6 relative z-10">
            <button
              onClick={() => setModalOpen(true)}
              className="bg-[#1A1A1A] text-[#EFEDE6] px-6 py-3 font-mono text-xs font-bold uppercase tracking-[0.15em] hover:bg-[#BC4B28] transition-colors shadow-lg rounded-[2px]"
            >
              + Log New Entry
            </button>
          </div>
        </div>

        {/* --- KPI GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <KPICard
            label="Total Diverted"
            value={stats.totalMedicines}
            unit="Units"
            color="#4A5D23"
            icon="📦"
            note="Toxic units kept out of landfills."
          />
          <KPICard
            label="Aquatic Protection"
            value={stats.totalMedicines}
            unit="Units"
            secondaryValue={`${(stats.totalMedicines * 0.5).toFixed(1)} ng/L`}
            color="#2C5F58"
            icon="💧"
            note="Pharmaceutical contamination prevented from entering aquatic ecosystems."
          />
          <KPICard
            label="Impact Score"
            value={stats.totalScore}
            unit="PTS"
            color="#BC4B28"
            icon="🛡️"
            note="Your global contribution rank score."
          />
        </div>

        {/* --- CHARTS SECTION --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* BAR CHART */}
          <HoverCard
            color="#4A5D23"
            note="Consistent disposal stabilizes the ecosystem."
            className="bg-white border border-[#1A1A1A]/10 rounded-[4px]"
          >
            <div className="p-8 pb-4">
              <div className="mb-6">
                <h2 className="font-mono text-xs font-bold uppercase tracking-widest text-[#1A1A1A]/50">
                  Frequency
                </h2>
                <h3 className="font-serif text-2xl mt-1">Monthly Intake</h3>
              </div>
              <div className="h-[250px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={stats.barData}
                    margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      vertical={false}
                      stroke="#1A1A1A"
                      opacity={0.1}
                    />
                    <XAxis
                      dataKey="month"
                      axisLine={false}
                      tickLine={false}
                      tick={{
                        fill: "#1A1A1A",
                        opacity: 0.6,
                        fontSize: 10,
                        fontFamily: "monospace",
                      }}
                      dy={10}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{
                        fill: "#1A1A1A",
                        opacity: 0.4,
                        fontSize: 10,
                        fontFamily: "monospace",
                      }}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#EFEDE6",
                        border: "1px solid #1A1A1A",
                        fontFamily: "serif",
                      }}
                      cursor={{ fill: "#1A1A1A", opacity: 0.05 }}
                    />
                    <Bar
                      dataKey="medicines"
                      fill="#4A5D23"
                      radius={[4, 4, 0, 0]}
                      barSize={40}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </HoverCard>

          {/* PIE CHART */}
          <HoverCard
            color="#BC4B28"
            note="Sorting helps us optimize the destruction process."
            className="bg-white border border-[#1A1A1A]/10 rounded-[4px]"
          >
            <div className="p-8 pb-4">
              <div className="mb-2">
                <h2 className="font-mono text-xs font-bold uppercase tracking-widest text-[#1A1A1A]/50">
                  Classification
                </h2>
                <h3 className="font-serif text-2xl mt-1">Material Breakdown</h3>
              </div>
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="h-[250px] w-full md:w-1/2 relative">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={stats.pieData}
                        dataKey="value"
                        nameKey="name"
                        innerRadius={70}
                        outerRadius={95}
                        paddingAngle={6}
                        cornerRadius={8}
                        stroke="none"
                      >
                        {stats.pieData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#EFEDE6",
                          border: "1px solid #1A1A1A",
                          fontFamily: "serif",
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <span className="font-serif text-3xl font-bold text-[#1A1A1A]">
                      {stats.totalMedicines}
                    </span>
                    <span className="font-mono text-[8px] uppercase tracking-widest opacity-40">
                      Total
                    </span>
                  </div>
                </div>
                <div className="w-full md:w-1/2 grid grid-cols-1 gap-3">
                  {stats.pieData.map((entry, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-2 border-b border-[#1A1A1A]/5"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{
                            backgroundColor: COLORS[index % COLORS.length],
                          }}
                        />
                        <span className="font-mono text-xs uppercase text-[#1A1A1A]/80">
                          {entry.name}
                        </span>
                      </div>
                      <span className="font-serif font-bold text-lg">
                        {entry.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </HoverCard>
        </div>

        {/* --- RECENT LOGS --- */}
        <div className="bg-white border border-[#1A1A1A]/10 rounded-[4px] overflow-hidden p-8 shadow-sm">
          <div className="flex justify-between items-end mb-8 border-b border-[#1A1A1A]/10 pb-4">
            <div>
              <h2 className="font-mono text-xs font-bold uppercase tracking-[0.2em] opacity-50">
                History
              </h2>
              <h3 className="font-serif text-2xl mt-1">Recent Logs</h3>
            </div>
            <div className="font-mono text-[10px] uppercase tracking-widest opacity-40">
              Verified Entries ({data.length})
            </div>
          </div>
          <div className="divide-y divide-[#1A1A1A]/5">
            {data.length === 0 ? (
              <div className="py-8 text-center text-[#1A1A1A]/50 font-serif">
                No entries yet. Log your first disposal!
              </div>
            ) : (
              data.map((d) => (
                <div
                  key={d.donationId}
                  className="py-4 flex flex-col md:flex-row md:items-center justify-between group hover:bg-[#F9F9F9] -mx-4 px-4 transition-colors rounded"
                >
                  <div className="flex items-center gap-4 mb-2 md:mb-0">
                    <div className="w-10 h-10 rounded-full bg-[#EFEDE6] flex items-center justify-center font-serif text-lg text-[#1A1A1A]/60 group-hover:bg-[#BC4B28] group-hover:text-white transition-colors">
                      ✓
                    </div>
                    <div>
                      <p className="font-serif text-lg text-[#1A1A1A]">
                        {d.medicineCount} Items
                      </p>
                      <p className="font-mono text-[10px] uppercase tracking-widest opacity-40">
                        ID: {d.donationId}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-8 pl-14 md:pl-0">
                    <div className="text-right">
                      <span className="block font-mono text-[9px] uppercase tracking-widest opacity-40">
                        Impact
                      </span>
                      <span className="font-bold text-[#BC4B28]">
                        {d.medicineCount * 5} PTS
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="block font-mono text-[9px] uppercase tracking-widest opacity-40">
                        Date
                      </span>
                      <span className="font-sans text-sm opacity-80">
                        {new Date(d.timestamp?.toDate?.() || d.timestamp).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </main>

      {/* POPUP FORM */}
      <AnimatePresence>
        {isModalOpen && (
          <LogEntryModal
            isOpen={isModalOpen}
            onClose={() => setModalOpen(false)}
            onSubmit={handleAddDonation}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// --- KPI SUB-COMPONENT ---
function KPICard({ label, value, unit, secondaryValue, color, note, icon }) {
  return (
    <HoverCard
      color={color}
      note={note}
      className="bg-white border border-[#1A1A1A]/10 rounded-[4px]"
    >
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] opacity-40">
            {label}
          </p>
          <span className="text-xl opacity-20 grayscale">{icon}</span>
        </div>
        <div className="flex items-baseline gap-2">
          <span
            className="font-serif text-4xl font-medium tracking-tighter"
            style={{ color: color }}
          >
            {value}
          </span>
          <span className="font-sans text-xs font-bold uppercase tracking-wider opacity-30">
            {unit}
          </span>
        </div>
        {secondaryValue && (
          <div className="mt-3 pt-3 border-t border-[#1A1A1A]/5">
            <p className="font-mono text-[10px] uppercase tracking-widest opacity-40 mb-1">
              Contamination Prevented
            </p>
            <span className="font-serif text-lg font-medium" style={{ color: color }}>
              {secondaryValue}
            </span>
          </div>
        )}
      </div>
    </HoverCard>
  );
}