import { LayoutGrid, TrendingUp, Database, Activity } from "lucide-react";

export default function Dashboard() {
  const stats = [
    {
      label: "Total Queries",
      value: "1,284",
      icon: <Database size={16} />,
      color: "text-blue-600",
    },
    {
      label: "Avg. Accuracy",
      value: "99.2%",
      icon: <TrendingUp size={16} />,
      color: "text-teal-600",
    },
    {
      label: "Active Sessions",
      value: "12",
      icon: <Activity size={16} />,
      color: "text-purple-600",
    },
  ];

  return (
    <div className="p-8 bg-slate-50/50 h-full overflow-y-auto">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2 bg-white rounded-lg shadow-sm border border-slate-100">
          <LayoutGrid size={20} className="text-slate-600" />
        </div>
        <h1 className="text-xl font-bold text-slate-800 tracking-tight">
          System Overview
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {stats.map((s, i) => (
          <div
            key={i}
            className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm"
          >
            <div
              className={`flex items-center gap-2 mb-4 text-[10px] font-bold uppercase tracking-widest ${s.color}`}
            >
              {s.icon} {s.label}
            </div>
            <div className="text-3xl font-bold text-slate-900">{s.value}</div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
        <h2 className="text-sm font-bold text-slate-800 mb-6 uppercase tracking-wider">
          Recent Analysis Traces
        </h2>
        <div className="space-y-4">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100/50"
            >
              <div className="flex items-center gap-4">
                <div className="w-1.5 h-1.5 rounded-full bg-teal-500" />
                <span className="text-sm font-medium text-slate-700">
                  Q{item} Financial Anomaly Detection
                </span>
              </div>
              <span className="text-[10px] font-bold text-slate-400">
                24 MINS AGO
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
