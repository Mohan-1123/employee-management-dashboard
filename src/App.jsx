import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Auth/Login.jsx";
import Dashboard from "./components/Auth/Dashboard/Dashboard.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";

const isLoggedIn = () => {
  return localStorage.getItem("isLoggedIn") === "true";
};

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default App;
