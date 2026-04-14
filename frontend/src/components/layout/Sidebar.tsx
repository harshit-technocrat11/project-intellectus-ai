import { useState } from "react";
import { NavLink } from "react-router-dom";
import { IconButton, Tooltip, Avatar } from "@mui/material";
import {
  DashboardRounded,
  ChatBubbleOutlineRounded,
  StorageRounded,
  QueryStatsRounded,
  TokenRounded,
  MenuOpenRounded,
} from "@mui/icons-material";

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const navItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <DashboardRounded fontSize="small" />,
    },
    {
      name: "Copilot Chat",
      path: "/copilot",
      icon: <ChatBubbleOutlineRounded fontSize="small" />,
    },
    {
      name: "Knowledge Inventory",
      path: "/inventory",
      icon: <StorageRounded fontSize="small" />,
    },
    {
      name: "AI Quality & Logs",
      path: "/logs",
      icon: <QueryStatsRounded fontSize="small" />,
    },
  ];

  return (
    <aside
      className={`h-screen bg-primary-navy text-white transition-[width] duration-300 ease-in-out shrink-0 flex flex-col overflow-hidden border-r border-white/10 relative z-30 ${isCollapsed ? "w-18" : "w-64"}`}
    >
      {/* HEADER */}
      <div className="h-15 flex items-center justify-between px-4 shrink-0 border-b border-white/10">
        <div
          className={`flex items-center gap-3 overflow-hidden transition-opacity duration-300 ${isCollapsed ? "opacity-0 w-0 hidden" : "opacity-100"}`}
        >
          <TokenRounded className="text-accent-green shrink-0" />
          <span className="font-semibold text-sm tracking-wide whitespace-nowrap">
            Intellectus AI
          </span>
        </div>

        <Tooltip title={isCollapsed ? "Expand" : "Collapse"} placement="right">
          <IconButton
            onClick={() => setIsCollapsed(!isCollapsed)}
            size="small"
            sx={{
              color: "#94a3b8",
              "&:hover": { color: "white", bgcolor: "rgba(255,255,255,0.1)" },
              margin: isCollapsed ? "0 auto" : "0",
            }}
          >
            <MenuOpenRounded
              fontSize="small"
              sx={{
                transform: isCollapsed ? "rotate(180deg)" : "none",
                transition: "transform 0.3s",
              }}
            />
          </IconButton>
        </Tooltip>
      </div>

      {/* NAVIGATION - Perfectly Centered Spacing */}
      <nav className="flex-1 space-y-2 mt-6 overflow-y-auto overflow-x-hidden">
        {navItems.map((item) => (
          <Tooltip
            key={item.path}
            title={isCollapsed ? item.name : ""}
            placement="right"
            disableHoverListener={!isCollapsed}
          >
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `flex items-center h-10 rounded-lg transition-colors overflow-hidden ${
                  isActive
                    ? "bg-secondary-teal/10 text-secondary-teal"
                    : "text-slate-400 hover:text-white hover:bg-white/5"
                } ${isCollapsed ? "justify-center w-10 mx-auto" : "px-3 gap-3 mx-3"}`
              }
            >
              <div className="shrink-0 flex items-center justify-center">
                {item.icon}
              </div>
              <span
                className={`text-sm font-medium whitespace-nowrap transition-opacity duration-300 ${isCollapsed ? "opacity-0 w-0 hidden" : "opacity-100"}`}
              >
                {item.name}
              </span>
            </NavLink>
          </Tooltip>
        ))}
      </nav>

      {/* USER FOOTER */}
      <div className="p-4 border-t border-white/10 shrink-0">
        <div
          className={`flex items-center overflow-hidden ${isCollapsed ? "justify-center" : "gap-3"}`}
        >
          <Avatar
            sx={{
              bgcolor: "#0D9488",
              width: 32,
              height: 32,
              fontSize: "12px",
              fontWeight: "bold",
            }}
            className="shrink-0"
          >
            DC
          </Avatar>
          <div
            className={`flex flex-col min-w-0 transition-opacity duration-300 ${isCollapsed ? "opacity-0 w-0 hidden" : "opacity-100"}`}
          >
            <span className="text-xs font-semibold text-white whitespace-nowrap">
              Dexter Corp Admin
            </span>
            <span className="text-[10px] text-slate-400 whitespace-nowrap">
              Settings
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
}
