import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import AuditFormPage from './pages/AuditFormPage';
import DashboardPage from './pages/DashboardPage.js';
import ComparisonPage from './pages/ComparisonPage';
import ReportPage from './pages/AuditReportPage.js';

function App() {
  return (
    <Router>
      <div className="flex">
        <Sidebar />
        <div className="flex-grow p-6 bg-gray-100">
          <Routes>
            <Route path="/" element={<AuditFormPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/comparison" element={<ComparisonPage />} />
            <Route path="/report" element={<ReportPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
