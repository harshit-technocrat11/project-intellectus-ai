import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard.tsx";
import Copilot from "./pages/ChatCopilot.tsx";
import Logs from "./pages/AILogs.tsx";
import AppLayout from "./app/layout/AppLayout.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AppLayout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/copilot" element={<Copilot />} />
          <Route path="/logs" element={<Logs />} />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  </React.StrictMode>,
);
