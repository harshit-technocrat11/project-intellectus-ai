import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useChatStore } from "../../store/chatStore";
import { ToggleButton, Tooltip } from "@mui/material";
import {
  DashboardRounded,
  ChatBubbleOutlineRounded,
  StorageRounded,
  QueryStatsRounded,
  SettingsOutlined,
  TokenRounded,
  ViewSidebarOutlined,
  AddRounded,
} from "@mui/icons-material";

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { addChat } = useChatStore();

  const navItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <DashboardRounded sx={{ fontSize: 20 }} />,
    },
    {
      name: "Copilot Chat",
      path: "/copilot",
      icon: <ChatBubbleOutlineRounded sx={{ fontSize: 20 }} />,
    },
    {
      name: "Knowledge Inventory",
      path: "/inventory",
      icon: <StorageRounded sx={{ fontSize: 20 }} />,
    },
    {
      name: "AI Quality & Logs",
      path: "/logs",
      icon: <QueryStatsRounded sx={{ fontSize: 20 }} />,
    },
  ];

  return (
    <aside
      className={`h-screen bg-primary-navy text-white transition-all duration-500 ease-[cubic-bezier(0.32,0,0.67,0)] flex flex-col relative z-20 shadow-xl shrink-0 ${
        isCollapsed ? "w-16" : "w-64"
      }`}
    >
      {/* HEADER: Integrated Toggle */}
      <div className="h-15 px-3 flex items-center justify-between border-b border-white/5 shrink-0">
        {!isCollapsed && (
          <div className="flex items-center gap-2.5 px-1 overflow-hidden animate-in fade-in duration-500">
            <TokenRounded className="text-secondary-teal shrink-0" />
            <span className="font-semibold tracking-tight text-sm whitespace-nowrap">
              Intellectus AI
            </span>
          </div>
        )}
        <Tooltip
          title={isCollapsed ? "Expand Sidebar" : "Collapse"}
          placement="right"
        >
          <ToggleButton
            value="check"
            selected={isCollapsed}
            onChange={() => setIsCollapsed(!isCollapsed)}
            size="small"
            sx={{
              color: "#94a3b8",
              border: "none",
              margin: isCollapsed ? "0 auto" : "0",
              "&.Mui-selected": {
                color: "white",
                backgroundColor: "rgba(255,255,255,0.1)",
              },
              "&:hover": {
                color: "white",
                backgroundColor: "rgba(255,255,255,0.05)",
              },
            }}
          >
            <ViewSidebarOutlined sx={{ fontSize: 20 }} />
          </ToggleButton>
        </Tooltip>
      </div>

      {/* QUICK ACTION: Light Teal "New Chat" Pill */}
      <div className="p-3 shrink-0">
        <button
          onClick={addChat}
          className={`w-full bg-secondary-teal/10 hover:bg-secondary-teal/20 text-secondary-teal border border-secondary-teal/20 rounded-lg flex items-center transition-all duration-200 cursor-pointer ${
            isCollapsed ? "py-2 justify-center" : "py-2 px-3 gap-2"
          }`}
        >
          <AddRounded sx={{ fontSize: 18 }} />
          {!isCollapsed && (
            <span className="text-sm font-medium">New Chat</span>
          )}
        </button>
      </div>

      {/* NAVIGATION */}
      <nav className="flex-1 px-2 space-y-1 overflow-y-auto mt-2">
        {navItems.map((item) => (
          <Tooltip
            key={item.path}
            title={isCollapsed ? item.name : ""}
            placement="right"
          >
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-md transition-all duration-200 group relative ${
                  isActive
                    ? "bg-secondary-teal/10 text-secondary-teal"
                    : "text-slate-400 hover:text-white hover:bg-white/5"
                }`
              }
            >
              <div className="shrink-0">{item.icon}</div>
              {!isCollapsed && (
                <span className="text-xs font-medium whitespace-nowrap">
                  {item.name}
                </span>
              )}
            </NavLink>
          </Tooltip>
        ))}
      </nav>

      {/* FOOTER: Identity & Settings */}
      <div className="p-3 border-t border-white/5 shrink-0 bg-black/5">
        <div
          className={`flex items-center gap-3 px-2 py-2 rounded transition-all ${isCollapsed ? "justify-center" : ""}`}
        >
          <div className="w-6 h-6 rounded bg-secondary-teal flex items-center justify-center font-bold text-[10px] shrink-0 text-white shadow-lg">
            DC
          </div>
          {!isCollapsed && (
            <div className="flex flex-col min-w-0">
              <span className="text-[11px] font-medium truncate text-white">
                Dexter Corp Pvt Ltd
              </span>
              <span className="text-[9px] text-emerald-400 flex items-center gap-1 mt-0.5 font-bold uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />{" "}
                Operational
              </span>
            </div>
          )}
        </div>
        <button
          className={`flex items-center gap-3 text-slate-400 hover:text-white mt-3 transition-colors group w-full ${isCollapsed ? "p-2 justify-center" : "px-2 py-1"}`}
        >
          <SettingsOutlined
            sx={{ fontSize: 18 }}
            className="group-hover:rotate-45 transition-transform duration-500"
          />
          {!isCollapsed && (
            <span className="text-[11px] font-medium">Settings</span>
          )}
        </button>
      </div>
    </aside>
  );
}
