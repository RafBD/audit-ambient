import { useEffect, useState } from 'react';
import { Chart } from 'primereact/chart';

function ComparisonPage() {
  const [audits, setAudits] = useState([]);
  const [auditResult, setAuditResult] = useState({ passed: false, message: '' });

  useEffect(() => {
    const storedAudits = JSON.parse(localStorage.getItem('audits')) || [];
    setAudits(storedAudits);

    if (storedAudits.length >= 2) {
      const currentAudit = storedAudits[storedAudits.length - 1];
      evaluateAudit(currentAudit);
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
      renewableEnergyMin: 35
    };

    const passed = audit.co2 <= parameters.co2Limit &&
                   audit.energy <= parameters.energyLimit &&
                   audit.waste <= parameters.wasteLimit &&
                   audit.waterUsage <= parameters.waterUsageLimit &&
                   audit.materialUsage <= parameters.materialUsageLimit &&
                   audit.ghgEmissions <= parameters.ghgLimit &&
                   audit.renewableEnergy >= parameters.renewableEnergyMin;

    const message = passed
      ? 'La empresa ha aprobado la auditoría ambiental.'
      : 'La empresa no ha aprobado la auditoría ambiental.';

    setAuditResult({ passed, message });
  };

  if (audits.length < 2) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-md">
          <i className="pi pi-exclamation-triangle text-5xl text-yellow-500 mb-4"></i>
          <h2 className="text-xl font-bold mb-2">Atención</h2>
          <p className="text-gray-700 text-lg">
            Debes realizar al menos dos auditorías para compararlas.
          </p>
        </div>
      </div>
    );
  }

  const currentAudit = audits[audits.length - 1];
  const previousAudit = audits[audits.length - 2];

  const data = {
    labels: [
      `${previousAudit.companyName} (${previousAudit.auditDate})`,
      `${currentAudit.companyName} (${currentAudit.auditDate})`
    ],
    datasets: [
      {
        label: 'CO2 Emitido (toneladas)',
        data: [previousAudit.co2, currentAudit.co2],
        backgroundColor: '#42855b',
      },
      {
        label: 'Consumo de Energía (kWh)',
        data: [previousAudit.energy, currentAudit.energy],
        backgroundColor: '#68d391',
      },
      {
        label: 'Residuos Generados (kg)',
        data: [previousAudit.waste, currentAudit.waste],
        backgroundColor: '#37734d',
      },
      {
        label: 'Uso de Agua (litros)',
        data: [previousAudit.waterUsage, currentAudit.waterUsage],
        backgroundColor: '#4caf50',
      },
      {
        label: 'Uso de Materiales (toneladas)',
        data: [previousAudit.materialUsage, currentAudit.materialUsage],
        backgroundColor: '#81c784',
      },
      {
        label: 'Emisiones GHG (toneladas CO2-eq)',
        data: [previousAudit.ghgEmissions, currentAudit.ghgEmissions],
        backgroundColor: '#f44336',
      },
      {
        label: 'Porcentaje de Energía Renovable (%)',
        data: [previousAudit.renewableEnergy, currentAudit.renewableEnergy],
        backgroundColor: '#ff9800',
      },
    ],
  };

  const options = {
    scales: {
      y: {
        type: 'logarithmic',
        beginAtZero: false,
        ticks: {
          callback: function(value) {
            return value.toLocaleString();
          },
          min: 1,
          maxTicksLimit: 6,  // Limitar la cantidad de ticks en el eje Y
          padding: 10,       // Añadir espaciado extra para mayor legibilidad
        },
      },
    },
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Comparación de Auditorías</h2>
      <Chart type="bar" data={data} options={options} className='' />
    </div>
  );
}

export default ComparisonPage;
