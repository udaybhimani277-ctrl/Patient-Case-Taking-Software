import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate, useLocation, Link } from 'react-router-dom';
import { KeyRound, LogIn } from 'lucide-react';
import { DemoProvider, useDemo } from './context/DemoContext';

// Layouts
import { PatientLayout } from './layouts/PatientLayout';
import { DoctorLayout } from './layouts/DoctorLayout';
import { AdminLayout } from './layouts/AdminLayout';

// Public & Auth Pages
import { Home } from './pages/Home';
import { LoginPage } from './pages/auth/LoginPage';
import { RegisterPage } from './pages/auth/RegisterPage';
import { ForgotPasswordPage } from './pages/auth/ForgotPasswordPage';
import { About } from './pages/About';

// Patient Modules
import { PatientDashboard } from './pages/patient/PatientDashboard';
import { PatientProfile } from './pages/patient/PatientProfile';
import { PatientClinicalHistory } from './pages/patient/PatientClinicalHistory';
import { PatientDocuments } from './pages/patient/PatientDocuments';
import { PatientTimeline } from './pages/patient/PatientTimeline';
import { PatientMedicines } from './pages/patient/PatientMedicines';
import { PatientSummary } from './pages/patient/PatientSummary';
import { PatientConsent } from './pages/patient/PatientConsent';
import { PatientAlerts } from './pages/patient/PatientAlerts';
import { PatientJourney } from './pages/patient/PatientJourney';
import { PatientAyushHistory } from './pages/patient/PatientAyushHistory';

// Doctor Modules
import { DoctorDashboard } from './pages/doctor/DoctorDashboard';
import { DoctorQueue } from './pages/doctor/DoctorQueue';
import { DoctorPatientHistory } from './pages/doctor/DoctorPatientHistory';
import { DoctorPatientSummary } from './pages/doctor/DoctorPatientSummary';
import { DoctorDocuments } from './pages/doctor/DoctorDocuments';
import { DoctorTimeline } from './pages/doctor/DoctorTimeline';
import { DoctorMedications } from './pages/doctor/DoctorMedications';
import { DoctorAlerts } from './pages/doctor/DoctorAlerts';
import { DoctorConsultation } from './pages/doctor/DoctorConsultation';
import { DoctorAnalytics } from './pages/doctor/DoctorAnalytics';
import { DoctorAyush } from './pages/doctor/DoctorAyush';

// Admin Modules
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminPatients } from './pages/admin/AdminPatients';
import { AdminDoctors } from './pages/admin/AdminDoctors';
import { AdminDepartments } from './pages/admin/AdminDepartments';
import { AdminKiosks } from './pages/admin/AdminKiosks';
import { AdminAlerts } from './pages/admin/AdminAlerts';
import { AdminDocuments } from './pages/admin/AdminDocuments';
import { AdminAnalytics } from './pages/admin/AdminAnalytics';
import { AdminBottlenecks } from './pages/admin/AdminBottlenecks';
import { AdminIntegration } from './pages/admin/AdminIntegration';
import { AdminAuditLogs } from './pages/admin/AdminAuditLogs';
import { AdminSettings } from './pages/admin/AdminSettings';

// Global Components
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { AccessibilityBar } from './components/AccessibilityBar';
import { ToastContainer } from './components/ToastContainer';
import { TriageAlertModal } from './components/TriageAlertModal';
import { AbdmSyncModal } from './components/AbdmSyncModal';

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function ProtectedRoute({ children, allowedRoles }) {
  const { isAuthenticated, userRole, t } = useDemo();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(userRole)) {
    // Redirect to user's assigned dashboard
    const redirectPath =
      userRole === 'admin'
        ? '/admin/dashboard'
        : userRole === 'doctor'
        ? '/doctor/dashboard'
        : '/patient/dashboard';
    return <Navigate to={redirectPath} replace />;
  }

  return children;
}

function AppContent() {
  const location = useLocation();

  // Determine if current route is inside a dedicated 3-role portal layout or auth page
  const isPortalRoute =
    location.pathname.startsWith('/patient') ||
    location.pathname.startsWith('/doctor') ||
    location.pathname.startsWith('/admin');

  const isAuthRoute =
    location.pathname === '/login' ||
    location.pathname.startsWith('/login/') ||
    location.pathname === '/register' ||
    location.pathname === '/forgot-password';

  const showPublicHeaderFooter = !isPortalRoute && !isAuthRoute;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 font-sans selection:bg-blue-100 selection:text-blue-900">
      <ScrollToTop />

      {/* Public Header for Home and About pages */}
      {showPublicHeaderFooter && <Navbar />}

      <div className={`flex-1 flex flex-col w-full ${showPublicHeaderFooter ? 'pt-16 sm:pt-20' : ''}`}>
        <Routes>
          {/* Public Home & Landing */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />

          {/* Authentication Suite */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/login/patient" element={<LoginPage />} />
          <Route path="/login/doctor" element={<LoginPage />} />
          <Route path="/login/admin" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />

          {/* ============================================================== */}
          {/* 1. PATIENT PORTAL (10 Modules + AYUSH)                         */}
          {/* ============================================================== */}
          <Route
            path="/patient"
            element={
              <ProtectedRoute allowedRoles={['patient', 'admin']}>
                <PatientLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="/patient/dashboard" replace />} />
            <Route path="dashboard" element={<PatientDashboard />} />
            <Route path="profile" element={<PatientProfile />} />
            <Route path="history" element={<PatientClinicalHistory />} />
            <Route path="documents" element={<PatientDocuments />} />
            <Route path="timeline" element={<PatientTimeline />} />
            <Route path="medicines" element={<PatientMedicines />} />
            <Route path="summary" element={<PatientSummary />} />
            <Route path="consent" element={<PatientConsent />} />
            <Route path="alerts" element={<PatientAlerts />} />
            <Route path="journey" element={<PatientJourney />} />
            <Route path="ayush-history" element={<PatientAyushHistory />} />
          </Route>

          {/* ============================================================== */}
          {/* 2. DOCTOR WORKSTATION (10 Modules + AYUSH)                     */}
          {/* ============================================================== */}
          <Route
            path="/doctor"
            element={
              <ProtectedRoute allowedRoles={['doctor', 'admin']}>
                <DoctorLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="/doctor/dashboard" replace />} />
            <Route path="dashboard" element={<DoctorDashboard />} />
            <Route path="queue" element={<DoctorQueue />} />
            <Route path="alerts" element={<DoctorAlerts />} />
            <Route path="analytics" element={<DoctorAnalytics />} />

            {/* Patient-specific Doctor Views */}
            <Route path="patient/:patientId/history" element={<DoctorPatientHistory />} />
            <Route path="patient/:patientId/summary" element={<DoctorPatientSummary />} />
            <Route path="patient/:patientId/documents" element={<DoctorDocuments />} />
            <Route path="patient/:patientId/timeline" element={<DoctorTimeline />} />
            <Route path="patient/:patientId/medications" element={<DoctorMedications />} />
            <Route path="patient/:patientId/consultation" element={<DoctorConsultation />} />
            <Route path="patient/:patientId/ayush" element={<DoctorAyush />} />

            {/* Direct Shortcuts (Default Active Patient) */}
            <Route path="history" element={<DoctorPatientHistory />} />
            <Route path="summary" element={<DoctorPatientSummary />} />
            <Route path="documents" element={<DoctorDocuments />} />
            <Route path="timeline" element={<DoctorTimeline />} />
            <Route path="medications" element={<DoctorMedications />} />
            <Route path="consultation" element={<DoctorConsultation />} />
            <Route path="ayush" element={<DoctorAyush />} />
          </Route>

          {/* ============================================================== */}
          {/* 3. HOSPITAL ADMIN COMMAND CENTER (11 Modules + Settings)       */}
          {/* ============================================================== */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="patients" element={<AdminPatients />} />
            <Route path="doctors" element={<AdminDoctors />} />
            <Route path="departments" element={<AdminDepartments />} />
            <Route path="kiosks" element={<AdminKiosks />} />
            <Route path="alerts" element={<AdminAlerts />} />
            <Route path="documents" element={<AdminDocuments />} />
            <Route path="analytics" element={<AdminAnalytics />} />
            <Route path="bottlenecks" element={<AdminBottlenecks />} />
            <Route path="integration" element={<AdminIntegration />} />
            <Route path="audit" element={<AdminAuditLogs />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>

          {/* ============================================================== */}
          {/* BACKWARD-COMPATIBLE ALIAS ROUTES                               */}
          {/* ============================================================== */}
          <Route path="/patient-intake" element={<Navigate to="/patient/history" replace />} />
          <Route path="/ai-history" element={<Navigate to="/patient/history" replace />} />
          <Route path="/clinical-summary" element={<Navigate to="/patient/summary" replace />} />
          <Route path="/doctor-dashboard" element={<Navigate to="/doctor/dashboard" replace />} />
          <Route path="/documents" element={<Navigate to="/patient/documents" replace />} />
          <Route path="/timeline" element={<Navigate to="/patient/timeline" replace />} />
          <Route path="/consent" element={<Navigate to="/patient/consent" replace />} />
          <Route path="/ayush" element={<Navigate to="/patient/ayush-history" replace />} />

          {/* Fallback to Home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>

      {/* Public Footer for Home and About */}
      {showPublicHeaderFooter && <Footer />}

      {/* Persistent Accessibility & Multilingual Floating Toolbar */}
      <AccessibilityBar />

      {/* Global Interactive Modals & Toast Dispatcher */}
      <TriageAlertModal />
      <AbdmSyncModal />
      <ToastContainer />
    </div>
  );
}

export default function App() {
  return (
    <DemoProvider>
      <Router>
        <AppContent />
      </Router>
    </DemoProvider>
  );
}
