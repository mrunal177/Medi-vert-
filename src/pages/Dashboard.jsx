import React, { useState, useMemo, useEffect } from "react";
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
  <div className="absolute -top-2 right-0 md:-top-4 md:right-10 border-[3px] border-[#BC4B28] p-2 rotate-[-12deg] opacity-30 pointer-events-none z-0 mix-blend-multiply mask-image">
    <div className="border border-[#BC4B28] px-2 py-1">
      <span className="font-mono font-bold text-xl md:text-2xl text-[#BC4B28] uppercase tracking-[0.2em] block text-center leading-none">
        Confidential
        <br />
        <span className="text-sm md:text-base tracking-widest">Dossier</span>
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

// ================= MODAL COMPONENT (Fixed Center) =================
const LogEntryModal = ({ isOpen, onClose, onSubmit }) => {
  const [qty, setQty] = useState("");
  const [type, setType] = useState("pills");

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (qty > 0) onSubmit(parseInt(qty), type);
    setQty("");
  };

  return (
    // Fixed inset-0 ensures it covers the whole screen and centers content
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#1A1A1A]/80 backdrop-blur-sm p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="bg-[#EFEDE6] w-full max-w-md border-2 border-[#1A1A1A] p-8 relative shadow-2xl"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#1A1A1A] hover:text-[#BC4B28] font-bold text-xl"
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
              className="w-full bg-white border border-[#1A1A1A]/20 p-4 font-serif text-xl focus:outline-none focus:border-[#4A5D23]"
              placeholder="e.g. 15"
            />
          </div>
          <div>
            <label className="block font-mono text-[10px] uppercase tracking-widest opacity-50 mb-2">
              Type
            </label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full bg-white border border-[#1A1A1A]/20 p-4 font-serif text-lg focus:outline-none focus:border-[#4A5D23]"
            >
              <option value="pills">Pills / Tablets</option>
              <option value="syrups">Liquids / Syrups</option>
              <option value="injectables">Sharps / Needles</option>
              <option value="ointments">Creams / Ointments</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full py-4 mt-4 bg-[#1A1A1A] text-[#EFEDE6] font-mono text-xs font-bold uppercase tracking-[0.2em] hover:bg-[#BC4B28] transition-colors"
          >
            Confirm Entry
          </button>
        </form>
      </motion.div>
    </div>
  );
};

// ================= DASHBOARD COMPONENT =================

export default function Dashboard() {
  const [isModalOpen, setModalOpen] = useState(false);

  // --- 1. STATE: DATA ---
  // Initial Mock Data (Will be replaced by Firebase fetch)
  const [data, setData] = useState([
    {
      donationId: "d1",
      medicineCount: 12,
      medicineTypes: { pills: 6, syrups: 3, ointments: 3 },
      timestamp: "2025-01-12",
    },
    {
      donationId: "d2",
      medicineCount: 8,
      medicineTypes: { pills: 4, syrups: 2, injectables: 2 },
      timestamp: "2025-02-05",
    },
    {
      donationId: "d3",
      medicineCount: 15,
      medicineTypes: { pills: 10, syrups: 5 },
      timestamp: "2025-03-18",
    },
  ]);

  // --- FIREBASE FETCH HOOK (Place here later) ---
  /*
  useEffect(() => {
    const fetchData = async () => {
      // 1. const q = query(collection(db, "disposals"), where("userId", "==", user.uid));
      // 2. const snapshot = await getDocs(q);
      // 3. const fetchedData = snapshot.docs.map(doc => ({ ...doc.data(), donationId: doc.id }));
      // 4. setData(fetchedData);
    };
    fetchData();
  }, [user]);
  */

  // --- 2. CALCULATIONS (Memoized) ---
  const stats = useMemo(() => {
    let totalMedicines = 0;
    let totalWater = 0;
    let totalScore = 0;
    const monthly = {};
    const types = {};

    data.forEach((d) => {
      const count = d.medicineCount;
      totalMedicines += count;
      totalWater += count * 25; // 25L per unit logic
      totalScore += count * 5; // 5pts per unit logic

      // Monthly Chart Data
      const month = new Date(d.timestamp).toLocaleString("default", {
        month: "short",
      });
      monthly[month] = (monthly[month] || 0) + count;

      // Pie Chart Data
      Object.entries(d.medicineTypes).forEach(([t, c]) => {
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

  // --- 3. ADD NEW DONATION (Firebase Write) ---
  const handleAddDonation = async (qty, type) => {
    const newEntry = {
      donationId: `temp-${Date.now()}`, // Temporary ID until Firebase assigns one
      medicineCount: qty,
      medicineTypes: { [type]: qty },
      timestamp: new Date().toISOString(),
    };

    // Optimistic UI Update (Update screen before backend confirms)
    setData((prev) => [newEntry, ...prev]);
    setModalOpen(false);

    // --- FIREBASE WRITE LOGIC ---
    /*
    try {
      await addDoc(collection(db, "disposals"), {
        userId: user.uid,
        medicineCount: qty,
        medicineTypes: { [type]: qty },
        timestamp: new Date().toISOString()
      });
      console.log("Sent to Firebase!");
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    */
  };

  return (
    <div className="min-h-screen bg-[#EFEDE6] text-[#1A1A1A] font-sans pt-32 pb-20 relative overflow-hidden">
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

          <div className="flex flex-col items-end gap-4 relative z-10">
            <div className="text-right font-mono text-[10px] uppercase tracking-widest opacity-40">
              <p>User: u1-Alpha</p>
              <p>Status: Active</p>
            </div>
            {/* ACTION BUTTON */}
            <button
              onClick={() => setModalOpen(true)}
              className="bg-[#1A1A1A] text-[#EFEDE6] px-6 py-3 font-mono text-xs font-bold uppercase tracking-[0.15em] hover:bg-[#BC4B28] transition-colors shadow-lg"
            >
              + Log New Entry
            </button>
          </div>
        </div>

        {/* --- KPI GRID (Clean 3 Cards) --- */}
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
            label="Water Saved"
            value={stats.totalWater}
            unit="Liters"
            color="#2C5F58"
            icon="💧"
            note="Groundwater protected from pharmaceutical leaching."
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

          {/* PIE CHART (Donut Style) */}
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
              Verified Entries
            </div>
          </div>
          <div className="divide-y divide-[#1A1A1A]/5">
            {data.map((d) => (
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
                      {new Date(d.timestamp).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* POPUP FORM (Fixed Center) */}
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
function KPICard({ label, value, unit, color, note, icon }) {
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
      </div>
    </HoverCard>
  );
}
