import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useChatStore } from "../../store/chatStore";
import { Tooltip, IconButton } from "@mui/material";
import {
  DashboardRounded,
  ChatBubbleOutlineRounded,
  StorageRounded,
  QueryStatsRounded,
  SettingsOutlined,
  TokenRounded,
  MenuOpenRounded,
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
      className={`h-screen bg-[#0f172a] text-white transition-all duration-500 ease-[0.32,0,0.67,0] flex flex-col relative z-20 shadow-2xl shrink-0 border-r border-white/5 ${
        isCollapsed ? "w-20" : "w-64"
      }`}
    >
      {/* HEADER */}
      <div className="h-16 px-4 flex items-center justify-between shrink-0">
        {!isCollapsed && (
          <div className="flex items-center gap-3 animate-in fade-in duration-300">
            <TokenRounded className="text-teal-400" />
            <span className="font-bold tracking-tight text-sm uppercase">
              Intellectus AI
            </span>
          </div>
        )}
        <IconButton
          onClick={() => setIsCollapsed(!isCollapsed)}
          size="small"
          className="mx-auto"
          sx={{
            color: "rgba(255,255,255,0.5)",
            "&:hover": {
              color: "white",
              backgroundColor: "rgba(255,255,255,0.05)",
            },
          }}
        >
          <MenuOpenRounded
            sx={{
              fontSize: 20,
              transform: isCollapsed ? "rotate(180deg)" : "none",
              transition: "transform 0.3s",
            }}
          />
        </IconButton>
      </div>

      {/* NEW CHAT BUTTON */}
      <div className="p-4">
        <button
          onClick={addChat}
          className={`w-full bg-teal-500/10 hover:bg-teal-500/20 text-teal-400 border border-teal-500/20 rounded-xl flex items-center transition-all duration-200 cursor-pointer ${
            isCollapsed ? "justify-center h-12" : "px-4 py-3 gap-3"
          }`}
        >
          <AddRounded sx={{ fontSize: 22 }} />
          {!isCollapsed && <span className="text-sm font-bold">New Chat</span>}
        </button>
      </div>

      {/* NAV ITEMS */}
      <nav className="flex-1 px-3 space-y-2 overflow-y-auto">
        {navItems.map((item) => (
          <Tooltip
            key={item.path}
            title={isCollapsed ? item.name : ""}
            placement="right"
          >
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `flex items-center rounded-xl transition-all duration-200 group h-12 ${
                  isCollapsed ? "justify-center px-2" : "px-4 gap-3"
                } ${
                  isActive
                    ? "bg-teal-500/15 text-teal-400 border border-teal-500/10 shadow-[inset_0_0_10px_rgba(20,184,166,0.05)]"
                    : "text-slate-400 hover:text-white hover:bg-white/5"
                }`
              }
            >
              <div className="flex h-10 w-10 min-w-10 items-center justify-center rounded-lg text-teal-400">
                {item.icon}
              </div>
              {!isCollapsed && (
                <span className="text-sm font-medium tracking-wide truncate leading-none">
                  {item.name}
                </span>
              )}
            </NavLink>
          </Tooltip>
        ))}
      </nav>

      {/* FOOTER */}
      <div className="p-4 border-t border-white/5 bg-black/20">
        <div
          className={`flex items-center gap-3 ${isCollapsed ? "justify-center" : ""}`}
        >
          <div className="w-9 h-9 shrink-0 rounded-xl bg-teal-500 flex items-center justify-center font-black text-xs text-[#0f172a] shadow-lg">
            DC
          </div>
          {!isCollapsed && (
            <div className="flex flex-col min-w-0">
              <span className="text-[11px] font-black truncate text-white uppercase tracking-tighter">
                Dexter Corp Admin
              </span>
              <span className="text-[9px] text-emerald-400 font-bold flex items-center gap-1.5 uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.5)]" />
                Operational
              </span>
            </div>
          )}
        </div>

        <button
          className={`flex items-center text-slate-500 hover:text-white mt-5 transition-colors w-full ${isCollapsed ? "justify-center" : "px-1 gap-4"}`}
        >
          <SettingsOutlined
            sx={{ fontSize: 20 }}
            className="hover:rotate-45 transition-transform duration-500"
          />
          {!isCollapsed && (
            <span className="text-[11px] font-bold uppercase tracking-wider">
              Settings
            </span>
          )}
        </button>
      </div>
    </aside>
  );
}
