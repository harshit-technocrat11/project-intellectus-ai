import { FolderOpen, FileText, Plus, Search } from "lucide-react";

export default function Knowledge() {
  return (
    <div className="p-8 h-full">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <FolderOpen size={24} className="text-teal-600" />
          <h1 className="text-xl font-bold text-slate-800">Knowledge Base</h1>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-[#0F172A] text-white rounded-xl text-sm font-medium hover:bg-slate-800 transition-all">
          <Plus size={16} /> Add Source
        </button>
      </div>

      <div className="relative mb-6">
        <Search
          size={16}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
        />
        <input
          type="text"
          placeholder="Search documents, tables, or logic..."
          className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-12 pr-4 text-sm focus:outline-none focus:border-teal-500/50"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          "Neon DB Schema",
          "Q3 Revenue PDF",
          "Marketing Logic",
          "Employee Handbook",
        ].map((file, i) => (
          <div
            key={i}
            className="p-4 bg-white border border-slate-100 rounded-2xl hover:shadow-md hover:border-teal-500/20 transition-all cursor-pointer group"
          >
            <FileText
              size={32}
              className="text-slate-300 mb-4 group-hover:text-teal-500 transition-colors"
            />
            <h3 className="text-sm font-bold text-slate-800 truncate">
              {file}
            </h3>
            <p className="text-[10px] text-slate-400 mt-1 uppercase font-bold tracking-tighter">
              Modified Oct 12
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
