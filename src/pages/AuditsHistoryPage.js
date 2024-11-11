// AuditsHistoryPage.js
import { useLocation, Link } from 'react-router-dom';

function AuditsHistoryPage() {
  const location = useLocation();
  const audits = location.state?.audits || [];

  // Función para dar formato a las fechas
  const formatDate = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Auditorías Anteriores</h2>

      {audits.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {audits.map((audit, index) => (
            <div
              key={index}
              className="p-6 bg-white shadow-lg rounded-lg hover:shadow-xl transition duration-200"
            >
              <h3 className="font-semibold text-lg text-gray-700">Auditoría {index + 1}</h3>
              <p className="text-gray-600">
                <strong>Empresa:</strong> {audit.companyName}
              </p>
              <p className="text-gray-600">
                <strong>Fecha:</strong> {formatDate(audit.auditDate)}
              </p>
              <p className="text-gray-600">
                <strong>Ubicación:</strong> {audit.location}
              </p>
              {/* Mostrar indicadores clave */}
              <div className="mt-4">
                <p className="text-gray-600"><strong>CO2 Emitido:</strong> {audit.co2} toneladas</p>
                <p className="text-gray-600"><strong>Residuos Generados:</strong> {audit.waste} kg</p>
                <p className="text-gray-600"><strong>Consumo de Energía:</strong> {audit.energy} kWh</p>
                <p className="text-gray-600"><strong>Agua Usada:</strong> {audit.waterUsage} L</p>
              </div>

              {/* Enlace para ver detalles más específicos */}
              <Link
                to={`/audit-details/${index}`}
                className="text-blue-500 mt-4 inline-block font-semibold"
              >
                Ver Detalles
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-xl text-center">
          <p className="text-gray-600 text-lg">No hay auditorías anteriores para mostrar.</p>
        </div>
      )}
    </div>
  );
}

export default AuditsHistoryPage;
