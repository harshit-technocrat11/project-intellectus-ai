import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import ChatCopilot from "./pages/CopilotChat";
import AILogs from "./pages/AILogs";
import Dashboard from "./pages/Dashboard";
import KnowledgeInventory from "./pages/KnowledgeInventory";
import { AuthRoute } from "./services/AuthRoute";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUp";
import { useAuth } from "@clerk/clerk-react";
import { useEffect } from "react";
import { setupInterceptors } from "./api/apiClient";



export default function App() {
  const { getToken, isLoaded} =  useAuth();

  useEffect(()=> {
    if ( isLoaded){
      setupInterceptors(getToken);
    }
  }, [isLoaded, getToken]);


  return (
    <BrowserRouter>
      <Routes>
        {/* public routes --- */}
        <Route path="/sign-in/*" element={<SignInPage />} />
        <Route path="/sign-up/*" element={<SignUpPage />} />

        {/* protected routes  */}
        <Route element={<AuthRoute />}>
          <Route
            element={
              <MainLayout>
                <Outlet />
              </MainLayout>
            }
          >
            <Route path="/" element={<Navigate to="/copilot" replace />} />
            <Route path="/copilot" element={<ChatCopilot />} />
            <Route path="/logs" element={<AILogs />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/inventory" element={<KnowledgeInventory />} />
          </Route>
        </Route>

        {/* Default Catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
