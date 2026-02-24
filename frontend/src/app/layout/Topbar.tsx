import { Menu } from "lucide-react";

interface TopbarProps {
  collapsed: boolean;
  setCollapsed: (value: boolean) => void;
}

export default function Topbar({ collapsed, setCollapsed }: TopbarProps) {
  return (
    <header className="h-14 border-b flex items-center justify-between px-6 bg-white">
      <div className="flex items-center gap-4">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 rounded-md hover:bg-muted transition"
        >
          <Menu size={18} />
        </button>

        <h1 className="text-lg font-semibold">Workspace</h1>
      </div>

      <div className="flex items-center gap-4">{/* future icons */}</div>
    </header>
  );
}
