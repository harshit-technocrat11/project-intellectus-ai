import Layout from "./components/layout/Layout";
import Dashboard from "./pages/Dashboard";
import Copilot from "./pages/Copilot";
import { Route } from "react-router-dom";
import Logs from "./pages/logs";
import { BrowserRouter } from "react-router-dom";
import { Routes } from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Layout title="Dashboard">
              <Dashboard />
            </Layout>
          }
        />

        <Route
          path="/copilot"
          element={
            <Layout title="Copilot">
              <Copilot />
            </Layout>
          }
        />

        <Route
          path="/logs"
          element={
            <Layout title="Logs">
              <Logs />
            </Layout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
