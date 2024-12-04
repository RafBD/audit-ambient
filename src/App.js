import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import AuditFormPage from './pages/AuditFormPage';
import DashboardPage from './pages/DashboardPage.js';
import ComparisonPage from './pages/ComparisonPage';
import ReportPage from './pages/ReportPage/AuditReportPage.js';
import AuditsHistoryPage from './pages/AuditsHistoryPage';
import HomePage from './pages/HomePage/HomePage.js';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/homepage" replace />} />
          <Route path="/homepage" element={<HomePage />} />
          <Route path="/audit-form" element={<AuditFormPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/comparison" element={<ComparisonPage />} />
          <Route path="/report" element={<ReportPage />} />
          <Route path="/audits-history" element={<AuditsHistoryPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

function Layout({ children }) {
  const location = useLocation();
  const hideSidebarPaths = ["/homepage"]; // Rutas donde no quieres mostrar el Sidebar
  const showSidebar = !hideSidebarPaths.includes(location.pathname);

  return (
    <div className="flex">
      {showSidebar && <Sidebar />}
      <div className={`flex-grow bg-gray-100 ${showSidebar ? "" : "full-width"}`}>
        {children}
      </div>
    </div>
  );
}

export default App;
