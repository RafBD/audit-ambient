import { useEffect, useState } from 'react';
import { Chart } from 'primereact/chart';

function ComparisonPage() {
  const [audits, setAudits] = useState([]);

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
      materialsUsageLimit: 1000,
      ghgLimit: 1500,
      renewableEnergyMin: 35
    };

    const passed = audit.co2 <= parameters.co2Limit &&
                   audit.energy <= parameters.energyLimit &&
                   audit.waste <= parameters.wasteLimit &&
                   audit.waterUsage <= parameters.waterUsageLimit &&
                   audit.materialsUsage <= parameters.materialsUsageLimit &&
                   audit.ghgEmissions <= parameters.ghgLimit &&
                   audit.renewableEnergy >= parameters.renewableEnergyMin;

    const message = passed
      ? 'La empresa ha aprobado la auditoría ambiental.'
      : 'La empresa no ha aprobado la auditoría ambiental.';
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
        data: [previousAudit.materialsUsage, currentAudit.materialsUsage],
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
          maxTicksLimit: 6,
          padding: 10,
        },
      },
    },
  };

  const compareAudits = () => {
    const parameters = {
      co2: 'CO2 Emitido',
      energy: 'Consumo de Energía',
      waste: 'Residuos Generados',
      waterUsage: 'Uso de Agua',
      materialsUsage: 'Uso de Materiales',
      ghgEmissions: 'Emisiones GHG',
      renewableEnergy: 'Porcentaje de Energía Renovable',
    };

    const limits = {
      co2: 1000,
      energy: 50000,
      waste: 10000,
      waterUsage: 500000,
      materialsUsage: 1000,
      ghgEmissions: 1500,
      renewableEnergy: 35, // Para el porcentaje de energía renovable
    };

    return Object.keys(parameters).map(param => {
      const previous = previousAudit[param];
      const current = currentAudit[param];
      const diff = current - previous;

      // Determinar si la auditoría actual pasa o no el límite
      const exceedsLimit = current > limits[param];

      // Definir el color de la diferencia: verde si pasa, rojo si excede
      const color = exceedsLimit ? 'text-red-600' : 'text-green-600';

      // Agregar símbolo de aumento o disminución
      const symbol = diff > 0 ? '↑' : diff < 0 ? '↓' : '';

      return (
        <tr key={param}>
          <td className="border px-4 py-2">{parameters[param]}</td>
          <td className="border px-4 py-2">{previous}</td>
          <td className="border px-4 py-2">{current}</td>
          <td className={`border px-4 py-2 ${color}`}>
            {Math.abs(diff)} {symbol && `${symbol}`}
          </td>
        </tr>
      );
    });
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Comparación de Auditorías</h2>
      <Chart type="bar" data={data} options={options} className="mb-6" />
      
      <h3 className="text-xl font-semibold mb-4">Diferencias en los parámetros</h3>
      <table className="min-w-full border-collapse">
        <thead>
          <tr>
            <th className="border px-4 py-2">Parámetro</th>
            <th className="border px-4 py-2">Auditoría Anterior</th>
            <th className="border px-4 py-2">Auditoría Actual</th>
            <th className="border px-4 py-2">Diferencia</th>
          </tr>
        </thead>
        <tbody>
          {compareAudits()}
        </tbody>
      </table>
    </div>
  );
}

export default ComparisonPage;
