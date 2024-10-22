import { Link } from 'react-router-dom';
import 'primeicons/primeicons.css'; // Importa los íconos de PrimeIcons

function Sidebar() {
  return (
    <div className="w-64 bg-[#42855b] text-white min-h-screen">
      <div className="p-6">
        <h1 className="text-2xl font-bold">Eco-System Tracker</h1>
      </div>
      <nav>
        <ul>
          <Link to="/" className="p-4 hover:bg-[#37734d] flex items-center">
            <i className="pi pi-pencil mr-2"></i>
            Rellenar Auditoría
          </Link>
          <Link to="/dashboard" className="p-4 hover:bg-[#37734d] flex items-center">
            <i className="pi pi-chart-line mr-2"></i>
            Ver Dashboard
          </Link>
          <Link to="/comparison" className="p-4 hover:bg-[#37734d] flex items-center">
            <i className="pi pi-sync mr-2"></i>
            Comparación de Auditorías
          </Link>
          <Link to="/report" className="p-4 hover:bg-[#37734d] flex items-center">
            <i className="pi pi-file mr-2"></i>
            Informe
          </Link>
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;
