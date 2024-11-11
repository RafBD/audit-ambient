import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AuditFormPage() {
  const [formData, setFormData] = useState({
    companyName: '',
    auditDate: '',
    location: '',
    co2: '',
    energy: '',
    waste: '',
    waterUsage: '',
    materialsUsage: '',
    ghgEmissions: '',
    renewableEnergy: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Guardar los datos en localStorage
    const storedAudits = JSON.parse(localStorage.getItem('audits')) || [];
    const newAudit = { ...formData, date: new Date() };
    
    // Agregar la nueva auditoría a la lista de auditorías previas
    storedAudits.push(newAudit);
    localStorage.setItem('audits', JSON.stringify(storedAudits));
    
    // Navegar al dashboard con los datos actuales
    navigate('/dashboard', { state: formData });
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Rellenar Auditoría</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
        {/* Nombre de la Empresa */}
        <div>
          <label className="block text-sm font-bold">Nombre de la Empresa</label>
          <input
            type="text"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        {/* Fecha de la Auditoría */}
        <div>
          <label className="block text-sm font-bold">Fecha de la Auditoría</label>
          <input
            type="date"
            name="auditDate"
            value={formData.auditDate}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
            max={new Date().toISOString().split('T')[0]}
            min={new Date().toISOString().split('T')[0]}
          />
        </div>
        {/* Ubicación */}
        <div>
          <label className="block text-sm font-bold">Ubicación de la Empresa</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        {/* CO2 Emitido */}
        <div>
          <label className="block text-sm font-bold">CO2 Emitido (Toneladas)</label>
          <input
            type="number"
            name="co2"
            value={formData.co2}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        {/* Consumo de Energía */}
        <div>
          <label className="block text-sm font-bold">Consumo de Energía (kWh)</label>
          <input
            type="number"
            name="energy"
            value={formData.energy}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        {/* Residuos Generados */}
        <div>
          <label className="block text-sm font-bold">Residuos Generados (kg)</label>
          <input
            type="number"
            name="waste"
            value={formData.waste}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        {/* Uso de Agua */}
        <div>
          <label className="block text-sm font-bold">Uso de Agua (Litros)</label>
          <input
            type="number"
            name="waterUsage"
            value={formData.waterUsage}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        {/* Consumo de Materiales */}
        <div>
          <label className="block text-sm font-bold">Consumo de Materiales (Toneladas)</label>
          <input
            type="number"
            name="materialsUsage"
            value={formData.materialsUsage}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        
        {/* Emisiones de Gases de Efecto Invernadero */}
        <div>
          <label className="block text-sm font-bold">Emisiones de Gases de Efecto Invernadero (GEI)</label>
          <input
            type="number"
            name="ghgEmissions"
            value={formData.ghgEmissions}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        {/* Energía Renovable */}
        <div>
          <label className="block text-sm font-bold">% de Energía Renovable Usada</label>
          <input
            type="number"
            name="renewableEnergy"
            value={formData.renewableEnergy}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <button type="submit" className="bg-verde-obscuro hover:bg-verde-hover text-white p-2 rounded">
          Enviar
        </button>
      </form>
      
    </div>
  );
}

export default AuditFormPage;
