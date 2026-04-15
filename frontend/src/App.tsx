import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import ChatCopilot from "./pages/CopilotChat";
import AILogs from "./pages/AILogs";
import Dashboard from "./pages/Dashboard";
import KnowledgeInventory from "./pages/KnowledgeInventory";
// import Dashboard from "./pages/Dashboard";
// import KnowledgeInventory from "./pages/KnowledgeInventory";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout><Outlet /></MainLayout>}>
          <Route path="/" element={<Navigate to="/copilot" replace />} />

          <Route path="/copilot" element={<ChatCopilot />} />
          <Route path="/logs" element={<AILogs />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/inventory" element={<KnowledgeInventory />} />

          {/* Placeholders for the remaining pages */}
          {/* <Route path="/dashboard" element={<Dashboard />} /> */}
          {/* <Route path="/inventory" element={<KnowledgeInventory />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
