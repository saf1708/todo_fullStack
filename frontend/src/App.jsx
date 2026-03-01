import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import VerifyOTP from "./pages/VerifyOTP";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";

import AuthLayout from "./layouts/AuthLayout";
import DashboardLayout from "./layouts/DashboardLayout";

function App() {
  return (
    <Router>
      <Routes>
        {/* Auth Pages */}
        <Route
          path="/login"
          element={
            <AuthLayout>
              <Login />
            </AuthLayout>
          }
        />

        <Route
          path="/signup"
          element={
            <AuthLayout>
              <Signup />
            </AuthLayout>
          }
        />

        <Route
          path="/verify-otp"
          element={
            <AuthLayout>
              <VerifyOTP />
            </AuthLayout>
          }
        />

        {/* Protected Dashboard */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Dashboard />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        {/* Default */}
        <Route
          path="*"
          element={
            <AuthLayout>
              <Login />
            </AuthLayout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;