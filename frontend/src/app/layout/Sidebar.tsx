import { NavLink } from "react-router-dom";
import { LayoutDashboard, Bot, FileText } from "lucide-react";

interface SidebarProps {
  collapsed: boolean;
}

export default function Sidebar({ collapsed }: SidebarProps) {
  const navItems = [
    { name: "Dashboard", path: "/", icon: LayoutDashboard },
    { name: "Copilot", path: "/copilot", icon: Bot },
    { name: "Request Logs", path: "/logs", icon: FileText },
  ];

  return (
    <aside
      className={`border-r bg-white transition-all duration-300
        ${collapsed ? "w-16" : "w-60"}`}
    >
      <div className="h-full flex flex-col">
        {/* Logo */}
        <div className="px-4 py-4 font-semibold border-b">
          {!collapsed ? "Intellectus AI" : "IA"}
        </div>

        {/* Nav */}
        <nav className="flex-1 px-2 py-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition
                  ${isActive ? "bg-muted font-medium" : "hover:bg-muted"}`
                }
              >
                <Icon size={18} />
                {!collapsed && <span>{item.name}</span>}
              </NavLink>
            );
          })}
        </nav>

        <div className="px-4 py-3 border-t text-xs text-muted-foreground">
          {!collapsed && "v1.0.0"}
        </div>
      </div>
    </aside>
  );
}
