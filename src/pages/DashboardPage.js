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
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="bg-white p-6 rounded-lg shadow-xl text-center max-w-md">
          <i className="pi pi-exclamation-circle text-5xl text-yellow-500 mb-4"></i>
          <h2 className="text-xl font-semibold mb-2 text-gray-800">Atención</h2>
          <p className="text-gray-600 text-lg">
            No hay datos disponibles para mostrar en el Dashboard.
          </p>
        </div>
      </div>
    );
  }

  // Función para calcular el porcentaje de cumplimiento general
  const calculateCompliancePercentage = () => {
    // Define los límites para cada indicador
    const complianceLimits = {
      co2: 1000,
      energy: 50000,
      waste: 10000,
      waterUsage: 500000,
      materialsUsage: 1000,
      ghgEmissions: 1500,
      renewableEnergy: 40,
    };

    // Calcula el cumplimiento
    const complianceData = [
      { value: auditData.co2, limit: complianceLimits.co2 },
      { value: auditData.energy, limit: complianceLimits.energy },
      { value: auditData.waste, limit: complianceLimits.waste },
      { value: auditData.waterUsage, limit: complianceLimits.waterUsage },
      { value: auditData.materialsUsage, limit: complianceLimits.materialsUsage },
      { value: auditData.ghgEmissions, limit: complianceLimits.ghgEmissions },
      { value: auditData.renewableEnergy, limit: complianceLimits.renewableEnergy },
    ];

    // Cuenta cuántos cumplen con el límite
    const complianceCount = complianceData.filter(item => item.value <= item.limit).length;

    // Calcula el porcentaje de cumplimiento
    return (complianceCount / complianceData.length) * 100;
  };

  // Cálculo de si se cumplen los parámetros
  const checkCompliance = (value, limit) => {
    return value <= limit ? (
      <span className="text-green-500 font-semibold">Cumple</span>
    ) : (
      <span className="text-red-500 font-semibold">No Cumple</span>
    );
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Dashboard de Auditoría</h2>

      {/* Resumen de Cumplimiento General */}
      <div className="mb-8 bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold text-gray-700">Resumen de Cumplimiento General</h3>
        <div>
          <div className="flex items-center justify-end">
            <span className="font-semibold text-gray-800">{calculateCompliancePercentage().toFixed(2)}%</span>
          </div>
          <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
            <div
              className="h-2 rounded-full"
              style={{
                width: `${calculateCompliancePercentage()}%`,
                backgroundColor: calculateCompliancePercentage() >= 80 ? '#68d391' : '#f56565',
              }}
            ></div>
          </div>
        </div>
      </div>

      {/* Información General */}
      <div className="mb-8 bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold text-gray-700">Detalles de la Última Auditoría</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-4">
          <p className="text-gray-600"><strong>Empresa:</strong> {auditData.companyName}</p>
          <p className="text-gray-600"><strong>Fecha:</strong> {auditData.auditDate}</p>
          <p className="text-gray-600"><strong>Ubicación:</strong> {auditData.location}</p>
        </div>
      </div>

      {/* Indicadores con Cumplimiento */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="p-6 bg-white shadow-lg rounded-lg hover:shadow-xl transition duration-200">
          <h3 className="font-semibold text-lg text-gray-700">CO2 Emitido</h3>
          <p className="text-2xl text-gray-800">{auditData.co2} toneladas</p>
          <p className="mt-2 text-gray-600">Cumplimiento: {checkCompliance(auditData.co2, 1000)}</p>
        </div>
        <div className="p-6 bg-white shadow-lg rounded-lg hover:shadow-xl transition duration-200">
          <h3 className="font-semibold text-lg text-gray-700">Consumo de Energía</h3>
          <p className="text-2xl text-gray-800">{auditData.energy} kWh</p>
          <p className="mt-2 text-gray-600">Cumplimiento: {checkCompliance(auditData.energy, 50000)}</p>
        </div>
        <div className="p-6 bg-white shadow-lg rounded-lg hover:shadow-xl transition duration-200">
          <h3 className="font-semibold text-lg text-gray-700">Residuos Generados</h3>
          <p className="text-2xl text-gray-800">{auditData.waste} kg</p>
          <p className="mt-2 text-gray-600">Cumplimiento: {checkCompliance(auditData.waste, 10000)}</p>
        </div>
        <div className="p-6 bg-white shadow-lg rounded-lg hover:shadow-xl transition duration-200">
          <h3 className="font-semibold text-lg text-gray-700">Uso de Agua</h3>
          <p className="text-2xl text-gray-800">{auditData.waterUsage} L</p>
          <p className="mt-2 text-gray-600">Cumplimiento: {checkCompliance(auditData.waterUsage, 500000)}</p>
        </div>
        <div className="p-6 bg-white shadow-lg rounded-lg hover:shadow-xl transition duration-200">
          <h3 className="font-semibold text-lg text-gray-700">Consumo de Materiales</h3>
          <p className="text-2xl text-gray-800">{auditData.materialsUsage} Tn</p>
          <p className="mt-2 text-gray-600">Cumplimiento: {checkCompliance(auditData.materialsUsage, 1000)}</p>
        </div>
        <div className="p-6 bg-white shadow-lg rounded-lg hover:shadow-xl transition duration-200">
          <h3 className="font-semibold text-lg text-gray-700">GEI</h3>
          <p className="text-2xl text-gray-800">{auditData.ghgEmissions} toneladas</p>
          <p className="mt-2 text-gray-600">Cumplimiento: {checkCompliance(auditData.ghgEmissions, 1500)}</p>
        </div>
        <div className="p-6 bg-white shadow-lg rounded-lg hover:shadow-xl transition duration-200">
          <h3 className="font-semibold text-lg text-gray-700">Energía Renovable</h3>
          <p className="text-2xl text-gray-800">{auditData.renewableEnergy}%</p>
          <p className="mt-2 text-gray-600">Cumplimiento: {checkCompliance(auditData.renewableEnergy, 40)}</p>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
