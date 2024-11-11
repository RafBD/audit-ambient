import { useEffect, useState } from 'react';
import { generateAuditPDF } from './pdfGenerator';

function AuditReportPage() {
  const [auditResult, setAuditResult] = useState({ passed: false, message: '', details: [] });
  const [currentAudit, setCurrentAudit] = useState(null);

  useEffect(() => {
    const storedAudits = JSON.parse(localStorage.getItem('audits')) || [];

    if (storedAudits.length >= 1) {
      const current = storedAudits[storedAudits.length - 1];
      setCurrentAudit(current);
      evaluateAudit(current);
    }
  }, []);

  const evaluateAudit = (audit) => {
    const parameters = {
      co2Limit: 1000,
      energyLimit: 50000,
      wasteLimit: 10000,
      waterUsageLimit: 500000,
      materialUsageLimit: 1000,
      ghgLimit: 1500,
      renewableEnergyMin: 35,
    };

    const details = [
      { name: 'CO2 Emitido', value: audit.co2, limit: parameters.co2Limit, passed: audit.co2 < parameters.co2Limit },
      { name: 'Consumo de Energía', value: audit.energy, limit: parameters.energyLimit, passed: audit.energy < parameters.energyLimit },
      { name: 'Residuos Generados', value: audit.waste, limit: parameters.wasteLimit, passed: audit.waste < parameters.wasteLimit },
      { name: 'Uso de Agua', value: audit.waterUsage, limit: parameters.waterUsageLimit, passed: audit.waterUsage < parameters.waterUsageLimit },
      { name: 'Consumo de Materiales', value: audit.materialsUsage, limit: parameters.materialUsageLimit, passed: audit.materialsUsage < parameters.materialUsageLimit },
      { name: 'GEI', value: audit.ghgEmissions, limit: parameters.ghgLimit, passed: audit.ghgEmissions < parameters.ghgLimit },
      { name: '% de Energía Renovable Usada', value: audit.renewableEnergy, limit: parameters.renewableEnergyMin, passed: audit.renewableEnergy >= parameters.renewableEnergyMin },
    ];

    const passed = details.every((param) => param.passed);
    const message = passed
      ? 'La empresa ha aprobado la auditoría ambiental.'
      : 'La empresa no ha aprobado la auditoría ambiental.';

    setAuditResult({ passed, message, details });
  };

  if (!currentAudit) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-md">
          <i className="pi pi-exclamation-triangle text-5xl text-yellow-500 mb-4"></i>
          <h2 className="text-xl font-bold mb-2">Atención</h2>
          <p className="text-gray-700 text-lg">
            No hay auditorías disponibles para generar un informe.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Informe de Auditoría Detallado</h2>

      {/* Detalles de la Auditoría */}
      <div className="border p-4 bg-white rounded shadow-md mb-4">
        <h3 className="font-bold text-lg mb-2">Detalles de la Auditoría</h3>
        <table className="w-full border-collapse border border-gray-200">
          <tbody>
            <tr>
              <td className="border p-2 font-semibold">Empresa:</td>
              <td className="border p-2">{currentAudit.companyName}</td>
            </tr>
            <tr>
              <td className="border p-2 font-semibold">Fecha:</td>
              <td className="border p-2">{currentAudit.auditDate}</td>
            </tr>
            <tr>
              <td className="border p-2 font-semibold">Ubicación:</td>
              <td className="border p-2">{currentAudit.location}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Resultado de la Auditoría */}
      <div className={`p-4 rounded mb-4 ${auditResult.passed ? 'bg-green-100' : 'bg-red-100'}`}>
        <h3 className="font-bold text-lg mb-2">Resultado de la Auditoría</h3>
        <p className="text-gray-700">{auditResult.message}</p>
      </div>

      {/* Tabla de parámetros */}
      <div className="mb-4 bg-white p-4 rounded shadow-md">
        <h3 className="font-bold text-lg mb-2">Parámetros Evaluados</h3>
        <table className="w-full border-collapse border border-gray-200">
          <thead>
            <tr>
              <th className="border p-2">Parámetro</th>
              <th className="border p-2">Valor</th>
              <th className="border p-2">Límite</th>
              <th className="border p-2">Resultado</th>
            </tr>
          </thead>
          <tbody>
            {auditResult.details.map((param, index) => (
              <tr key={index}>
                <td className="border p-2">{param.name}</td>
                <td className="border p-2">{param.value}</td>
                <td className="border p-2">{param.limit}</td>
                <td className="border p-2">{param.passed ? 'Cumplido' : 'No Cumplido'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Botón para exportar el PDF */}
      <button
        onClick={() => generateAuditPDF(currentAudit, auditResult)}
        className="px-4 py-2 bg-blue-500 text-white font-semibold rounded shadow hover:bg-blue-600"
      >
        Exportar Informe PDF
      </button>
    </div>
  );
}

export default AuditReportPage;
