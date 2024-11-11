import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import AuditFormPage from './pages/AuditFormPage';
import DashboardPage from './pages/DashboardPage.js';
import ComparisonPage from './pages/ComparisonPage';
import ReportPage from './pages/ReportPage/AuditReportPage.js';
import AuditsHistoryPage from './pages/AuditsHistoryPage';

function App() {
  return (
    <Router>
      <div className="flex">
        <Sidebar />
        <div className="flex-grow p-6 bg-gray-100">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/audit-form" element={<AuditFormPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/comparison" element={<ComparisonPage />} />
            <Route path="/report" element={<ReportPage />} />
            <Route path="/audits-history" element={<AuditsHistoryPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
