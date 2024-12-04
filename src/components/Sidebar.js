import { useState } from 'react';
import { Link } from 'react-router-dom';
import 'primeicons/primeicons.css'; // Importa los íconos de PrimeIcons
import logo from '../assets/img/logoGV.png'

function Sidebar() {
  const [isOpen, setIsOpen] = useState(true); // Estado para controlar la apertura del sidebar

  return (
    <div className={`bg-[#42855b] text-white min-h-screen transition-all duration-300 ${isOpen ? 'w-64' : 'w-16'}`}>
      <div className={`flex pt-5 ${isOpen ? 'justify-end pr-5' : 'justify-center'}`}>
        <button onClick={() => setIsOpen(!isOpen)} className={`text-white flex items-center ${isOpen ? 'justify-end' : 'justify-center'} w-full`}>
          <i className={`pi ${isOpen ? 'pi-angle-left' : 'pi-angle-right'} text-xl`}></i>
        </button>
      </div>

      {/* Logo */}
      <div className={`flex justify-center ${isOpen ? 'h-auto' : 'h-0 overflow-hidden'} transition-all duration-300`}>
        <img src={logo} alt="Logo" className={`transition-all duration-300 ${isOpen ? 'w-24' : 'w-10'}`} />
      </div>

      {/* Título del sidebar */}
      <h1 className={`text-2xl pb-5 font-bold transition-all duration-300 text-center ${isOpen ? 'opacity-100 h-auto' : 'opacity-0 h-0 overflow-hidden'} ease-in-out`}>
        Eco-System Tracker
      </h1>

      <nav>
        <ul className='flex flex-col gap-2'>
        <li className="flex items-center p-4 text-center hover:bg-[#37734d]">
            <Link to="/homepage" className={`flex items-center ${isOpen ? 'justify-start' : 'justify-center'} w-full`}>
              <i className={`pi pi-home ${isOpen ? 'mr-3' : ''} text-base`}></i>
              <span className={`transition-all duration-300 ${isOpen ? 'opacity-100 h-auto' : 'opacity-0 h-0 overflow-hidden'} ease-in-out`}>
                Inicio
              </span>
            </Link>
          </li>
          <li className="flex items-center p-4 text-center hover:bg-[#37734d]">
            <Link to="/audit-form" className={`flex items-center ${isOpen ? 'justify-start' : 'justify-center'} w-full`}>
              <i className={`pi pi-pencil ${isOpen ? 'mr-3' : ''} text-base`}></i>
              <span className={`transition-all duration-300 ${isOpen ? 'opacity-100 h-auto' : 'opacity-0 h-0 overflow-hidden'} ease-in-out`}>
                Rellenar Auditoría
              </span>
            </Link>
          </li>
          <li className="flex items-center p-4 hover:bg-[#37734d]">
            <Link to="/dashboard" className={`flex items-center ${isOpen ? 'justify-start' : 'justify-center'} w-full`}>
              <i className={`pi pi-chart-line ${isOpen ? 'mr-3' : ''} text-base`}></i>
              <span className={`transition-all duration-300 ${isOpen ? 'opacity-100 h-auto' : 'opacity-0 h-0 overflow-hidden'} ease-in-out`}>
                Ver Dashboard
              </span>
            </Link>
          </li>
          <li className="flex items-center p-4 hover:bg-[#37734d]">
            <Link to="/comparison" className={`flex items-center ${isOpen ? 'justify-start' : 'justify-center'} w-full`}>
              <i className={`pi pi-sync ${isOpen ? 'mr-3' : ''} text-base`}></i>
              <span className={`transition-all duration-300 ${isOpen ? 'opacity-100 h-auto' : 'opacity-0 h-0 overflow-hidden'} ease-in-out`}>
                Comparación de Auditorías
              </span>
            </Link>
          </li>
          <li className="flex items-center p-4 hover:bg-[#37734d]">
            <Link to="/report" className={`flex items-center ${isOpen ? 'justify-start' : 'justify-center'} w-full`}>
              <i className={`pi pi-file ${isOpen ? 'mr-3' : ''} text-base`}></i>
              <span className={`transition-all duration-300 ${isOpen ? 'opacity-100 h-auto' : 'opacity-0 h-0 overflow-hidden'} ease-in-out`}>
                Informe
              </span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;
