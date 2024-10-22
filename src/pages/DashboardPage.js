import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

function DashboardPage() {
  const location = useLocation();
  const [auditData, setAuditData] = useState(null);

  useEffect(() => {
    if (location.state) {
      setAuditData(location.state);
    } else {
      const storedAudits = JSON.parse(localStorage.getItem('audits')) || [];
      if (storedAudits.length > 0) {
        setAuditData(storedAudits[storedAudits.length - 1]);
      }
    }
  }, [location.state]);

  if (!auditData) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-md">
          <i className="pi pi-exclamation-circle text-5xl text-yellow-500 mb-4"></i>
          <h2 className="text-xl font-bold mb-2">Atención</h2>
          <p className="text-gray-700 text-lg">
            No hay datos disponibles para mostrar en el Dashboard.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Dashboard de Auditoría</h2>
      {/* Información General */}
      <div className="mb-6">
        <h3 className="text-xl font-bold">Detalles de la ultima Auditoría</h3>
        <div className='grid grid-cols-3 mt-2'>
          <p><strong>Empresa:</strong> {auditData.companyName}</p>
          <p><strong>Fecha:</strong> {auditData.auditDate}</p>
          <p><strong>Ubicación:</strong> {auditData.location}</p>
        </div>
      </div>
      {/* Indicadores */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-white shadow-md rounded">
          <h3 className="font-bold text-lg">CO2 Emitido</h3>
          <p className="text-2xl">{auditData.co2} toneladas</p>
        </div>
        <div className="p-4 bg-white shadow-md rounded">
          <h3 className="font-bold text-lg">Consumo de Energía</h3>
          <p className="text-2xl">{auditData.energy} kWh</p>
        </div>
        <div className="p-4 bg-white shadow-md rounded">
          <h3 className="font-bold text-lg">Residuos Generados</h3>
          <p className="text-2xl">{auditData.waste} kg</p>
        </div>
        <div className="p-4 bg-white shadow-md rounded">
          <h3 className="font-bold text-lg">Uso de Agua</h3>
          <p className="text-2xl">{auditData.waterUsage} L</p>
        </div>
        <div className="p-4 bg-white shadow-md rounded">
          <h3 className="font-bold text-lg">Consumo de Materiales</h3>
          <p className="text-2xl">{auditData.materialsUsage} Tn</p>
        </div>
        <div className="p-4 bg-white shadow-md rounded">
          <h3 className="font-bold text-lg">GEI</h3>
          <p className="text-2xl">{auditData.ghgEmissions} CO2</p>
        </div>
        <div className="p-4 bg-white shadow-md rounded">
          <h3 className="font-bold text-lg">% de Energía Renovable Usada</h3>
          <p className="text-2xl">{auditData.renewableEnergy} VCN</p>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
