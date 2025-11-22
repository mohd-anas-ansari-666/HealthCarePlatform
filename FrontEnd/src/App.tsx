import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CompleteProfile from "./pages/CompleteProfile";
import PatientDashboard from "./pages/PatientDashboard";
import Progress from "./pages/Progress";
import Goals from "./pages/Goals";
import Reminders from "./pages/Reminders";
import DoctorDashboard from "./pages/DoctorDashboard";
import PatientDetails from "./pages/PatientDetails";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/complete-profile" element={
              <ProtectedRoute>
                <CompleteProfile />
              </ProtectedRoute>
            } />
            <Route path="/dashboard" element={
              <ProtectedRoute role="patient">
                <PatientDashboard />
              </ProtectedRoute>
            } />
            <Route path="/progress" element={
              <ProtectedRoute role="patient">
                <Progress />
              </ProtectedRoute>
            } />
            <Route path="/goals" element={
              <ProtectedRoute role="patient">
                <Goals />
              </ProtectedRoute>
            } />
            <Route path="/reminders" element={
              <ProtectedRoute role="patient">
                <Reminders />
              </ProtectedRoute>
            } />
            <Route path="/doctor-dashboard" element={
              <ProtectedRoute role="doctor">
                <DoctorDashboard />
              </ProtectedRoute>
            } />
            <Route path="/patient/:patientId" element={
              <ProtectedRoute role="doctor">
                <PatientDetails />
              </ProtectedRoute>
            } />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
