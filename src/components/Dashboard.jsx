import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const impactData = [
  { month: "Jan", medicines: 2 },
  { month: "Feb", medicines: 5 },
  { month: "Mar", medicines: 9 },
  { month: "Apr", medicines: 14 },
  { month: "May", medicines: 20 },
  { month: "Jun", medicines: 24 },
];

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-[#F9F7F2] px-10 py-16">
      <h1 className="text-4xl font-bold text-[#3B8650] mb-10">
        Your Impact Dashboard
      </h1>

      {/* STATS CARDS */}
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white p-6 rounded-2xl shadow">
          <h3 className="text-lg font-semibold text-gray-600">
            Medicines Donated
          </h3>
          <p className="text-4xl font-bold text-[#3B8650] mt-2">24</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow">
          <h3 className="text-lg font-semibold text-gray-600">
            Environmental Impact
          </h3>
          <p className="text-4xl font-bold text-[#3B8650] mt-2">+84%</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow">
          <h3 className="text-lg font-semibold text-gray-600">
            Green Points Earned
          </h3>
          <p className="text-4xl font-bold text-[#3B8650] mt-2">420</p>
        </div>
      </div>

      {/* GRAPH SECTION */}
      <div className="bg-white p-8 rounded-2xl shadow">
        <h2 className="text-2xl font-bold mb-6 text-gray-700">
          Impact Over Time
        </h2>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={impactData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="medicines"
              stroke="#3B8650"
              strokeWidth={3}
              dot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Dashboard;
