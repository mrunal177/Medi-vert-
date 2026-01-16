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
} from "recharts";

// ================= MOCK BACKEND DATA =================
// (This mirrors EXACTLY what backend will send later)

const donations = [
  {
    donationId: "d1",
    userId: "u1",
    medicineCount: 12,
    medicineTypes: { pills: 6, syrups: 3, ointments: 3 },
    timestamp: "2025-01-12",
    impactScore: 40,
    waterSaved: 300,
  },
  {
    donationId: "d2",
    userId: "u1",
    medicineCount: 8,
    medicineTypes: { pills: 4, syrups: 2, injectables: 2 },
    timestamp: "2025-02-05",
    impactScore: 30,
    waterSaved: 220,
  },
  {
    donationId: "d3",
    userId: "u1",
    medicineCount: 15,
    medicineTypes: { pills: 10, syrups: 5 },
    timestamp: "2025-03-18",
    impactScore: 55,
    waterSaved: 410,
  },
];

// ================= DATA TRANSFORMATIONS =================

// Monthly aggregation (bar chart)
const monthlyData = {};
let totalWaterSaved = 0;
let totalImpactScore = 0;
let totalMedicines = 0;
const medicineTypeTotals = {};

donations.forEach((d) => {
  const month = new Date(d.timestamp).toLocaleString("default", {
    month: "short",
  });

  monthlyData[month] = (monthlyData[month] || 0) + d.medicineCount;

  totalWaterSaved += d.waterSaved;
  totalImpactScore += d.impactScore;
  totalMedicines += d.medicineCount;

  Object.entries(d.medicineTypes).forEach(([type, count]) => {
    medicineTypeTotals[type] = (medicineTypeTotals[type] || 0) + count;
  });
});

// Convert for charts
const barChartData = Object.keys(monthlyData).map((month) => ({
  month,
  medicines: monthlyData[month],
}));

const pieChartData = Object.keys(medicineTypeTotals).map((type) => ({
  name: type,
  value: medicineTypeTotals[type],
}));

const COLORS = ["#4A5D23", "#BC4B28", "#2C5F58", "#7A6C5D"];

// ================= DASHBOARD =================

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-[#EFEDE6] p-8">
      {/* HEADER */}
      <h1 className="text-4xl font-serif text-[#1A1A1A] mb-8">
        Dashboard
      </h1>

      {/* KPI CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
        <KPI title="Medicines Diverted" value={`${totalMedicines}`} />
        <KPI title="Water Saved" value={`${totalWaterSaved} L`} />
        <KPI title="Impact Points" value={`${totalImpactScore}`} />
      </div>

      {/* CHARTS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
        {/* BAR CHART */}
        <div className="bg-white rounded-2xl p-6 shadow border">
          <h2 className="text-lg font-medium mb-4">
            Monthly Activity
          </h2>

          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={barChartData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar
                dataKey="medicines"
                fill="#4A5D23"
                radius={[6, 6, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* PIE CHART */}
        <div className="bg-white rounded-2xl p-6 shadow border">
          <h2 className="text-lg font-medium mb-4">
            Medicine Types Donated
          </h2>

          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={pieChartData}
                dataKey="value"
                nameKey="name"
                innerRadius={60}
                outerRadius={100}
              >
                {pieChartData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* RECENT DONATIONS */}
      <div className="bg-white rounded-2xl p-6 shadow border">
        <h2 className="text-lg font-medium mb-4">
          Recent Donations
        </h2>

        <ul className="space-y-3 text-sm text-[#1A1A1A]/70">
          {donations.map((d) => (
            <li key={d.donationId}>
              • {d.medicineCount} medicines —{" "}
              {new Date(d.timestamp).toDateString()}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// ================= COMPONENTS =================

function KPI({ title, value }) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow border">
      <p className="text-sm text-[#1A1A1A]/50 mb-1">
        {title}
      </p>
      <p className="text-3xl font-semibold text-[#1A1A1A]">
        {value}
      </p>
    </div>
  );
}
