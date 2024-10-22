import { useEffect, useState } from 'react';
import { Chart } from 'primereact/chart';


function AuditReportPage() {
  const [audits, setAudits] = useState([]);
  const [auditResult, setAuditResult] = useState({ passed: false, message: '', details: [] });

  useEffect(() => {
    const storedAudits = JSON.parse(localStorage.getItem('audits')) || [];
    setAudits(storedAudits);

    if (storedAudits.length >= 1) {
      const currentAudit = storedAudits[storedAudits.length - 1];
      evaluateAudit(currentAudit);
    }
  }, []);

  const evaluateAudit = (audit) => {
    const parameters = {
        co2Limit: 1000,       // CO2 máximo permitido en toneladas
        energyLimit: 50000,   // Energía máxima permitida en kWh
        wasteLimit: 10000,    // Residuos máximos permitidos en kg
        waterUsageLimit: 500000, // Uso máximo de agua permitido en litros
        materialUsageLimit: 1000, // Uso máximo de materiales en toneladas
        ghgLimit: 1500,       // Emisiones máximas de GHG permitidas en toneladas de CO2-eq
        renewableEnergyMin: 35 // Porcentaje mínimo de energía renovable permitido
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

  if (audits.length === 0) {
    return <p>No hay auditorías disponibles para generar un informe.</p>;
  }

  const currentAudit = audits[audits.length - 1];
  const previousAudit = audits.length > 1 ? audits[audits.length - 2] : null;

  const data = previousAudit ? {
    labels: [`${previousAudit.companyName} (${previousAudit.auditDate})`, `${currentAudit.companyName} (${currentAudit.auditDate})`],
    datasets: [
      {
        label: 'CO2 Emitido',
        data: [previousAudit.co2, currentAudit.co2],
        backgroundColor: '#42855b',
      },
      {
        label: 'Consumo de Energía',
        data: [previousAudit.energy, currentAudit.energy],
        backgroundColor: '#68d391',
      },
      {
        label: 'Residuos Generados',
        data: [previousAudit.waste, currentAudit.waste],
        backgroundColor: '#37734d',
      },
    ],
  } : null;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Informe de Auditoría Detallado</h2>
      
      {/* Detalles de la Auditoría */}
      <div className="">
        <h3 className="font-bold text-lg">Detalles de la Auditoría</h3>
        <div className='grid grid-cols-3 mt-2'>
            <p className=''><strong>Empresa:</strong> {currentAudit.companyName}</p>
            <p><strong>Fecha:</strong> {currentAudit.auditDate}</p>
            <p><strong>Ubicación:</strong> {currentAudit.location}</p>
        </div>
      </div>

      {/* Mensaje de Aprobación o Rechazo */}
      <div className={`mt-6 p-4 rounded ${auditResult.passed ? 'bg-green-200' : 'bg-red-200'}`}>
        <h3 className="font-bold text-lg">{auditResult.message}</h3>
      </div>
      
      {/* Parámetros Evaluados */}
      <div className="mt-5">
        <h3 className="font-bold text-lg mb-3">Parámetros Evaluados</h3>
        <ul className='grid grid-cols-2 gap-3'>
          {auditResult.details.map((param, index) => (
            <li key={index} className={`p-5 rounded ${param.passed ? 'bg-green-200' : 'bg-red-200'} mb-2`}>
              {param.name}: {param.value} (Límite: {param.limit}) - {param.passed ? 'Cumplido' : 'No Cumplido'}
            </li>
          ))}
        </ul>
      </div>

      {/* Gráficas de Comparación (si hay auditorías anteriores) */}
      {data && (
        <div className="mb-6" style={{ width: '80%', margin: '0 auto' }}>
          <h3 className="font-bold text-lg">Comparación de Auditorías</h3>
          <Chart type="bar" data={data} options={{
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              x: {
                ticks: {
                  maxRotation: 90,
                  minRotation: 45,
                },
              },
            },
          }} style={{ height: '300px', width: '100%' }} />
        </div>
      )}

      
    </div>
  );
}

export default AuditReportPage;
