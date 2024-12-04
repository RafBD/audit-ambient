import React from "react";
import { Link } from "react-router-dom";
import NavBar from "../../components/NavBar";
import imagen from './hero-img.jpg';

const Home = () => {
  return (
    <div className="bg-gray-50 scroll-smooth">
      <NavBar />

      {/* Hero Section */}
      <section
        className="hero-img relative h-screen flex items-center justify-center text-white bg-cover bg-center"
        style={{ backgroundImage: `url(${imagen})` }}
      >
        {/* Overlay */}
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-65"></div>

        {/* Content */}
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-12">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 animate-fadeIn">
            Green Vision
          </h1>
          <p className="text-lg sm:text-xl lg:text-2xl font-light mb-6">
            Automatizamos auditorías ambientales con tecnología avanzada para un futuro sostenible.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mt-4">
            <a href="#about" className="bg-transparent border border-white text-white font-semibold py-2 px-6 sm:py-3 sm:px-8 rounded-lg hover:bg-white hover:text-green-950 transition">
              Conócenos
            </a>
          </div>

          {/* Additional Elements */}
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-center">
            {[
              { icon: "🌱", text: "Compromiso con el medio ambiente" },
              { icon: "📊", text: "Auditorías basadas en datos" },
              { icon: "♻️", text: "Prácticas sostenibles" },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white bg-opacity-80 p-4 rounded-lg shadow hover:scale-105 transform transition"
              >
                <div className="text-3xl sm:text-4xl mb-2">{item.icon}</div>
                <p className="text-black text-base sm:text-lg font-medium">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-12 px-4 sm:py-16 sm:px-6 lg:px-12" id="about">
        <div className="max-w-screen-lg mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-6">
            ¿Quiénes somos?
          </h2>
          <p className="text-base sm:text-lg font-light text-gray-950 leading-relaxed">
            En Green Vision, combinamos tecnología de punta con nuestra pasión por el medio ambiente. Nuestro programa de auditorías automáticas permite a las empresas medir, gestionar y reducir su impacto ecológico con facilidad.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gradient-to-b from-green-50 to-gray-100 py-12 px-4 sm:py-16 sm:px-6 lg:px-12">
        <div className="max-w-screen-xl mx-auto">
          {/* Title */}
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-12">
            ¿Por qué elegir <span className="text-green-700">Green Vision</span>?
          </h2>

          {/* Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
            {[
              { icon: "🌍", title: "Auditorías Automáticas", description: "Optimiza tus procesos con auditorías rápidas y precisas basadas en datos confiables." },
              { icon: "📈", title: "Cumplimiento Normativo", description: "Asegura el cumplimiento con regulaciones ambientales locales e internacionales." },
              { icon: "♻️", title: "Reducción de Huella de Carbono", description: "Implementa prácticas sostenibles y reduce el impacto ambiental de tu organización." },
              { icon: "📊", title: "Reportes Detallados", description: "Obtén reportes visuales y accionables que facilitan decisiones estratégicas." },
              { icon: "💡", title: "Soluciones Personalizadas", description: "Adaptamos nuestras herramientas a las necesidades específicas de tu negocio." },
              { icon: "🌟", title: "Reconocimiento Ambiental", description: "Diferénciate por tu compromiso con la sostenibilidad y liderazgo en el sector." },
            ].map((feature, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center p-6 bg-white shadow-lg rounded-lg hover:shadow-2xl transition transform hover:scale-105"
              >
                {/* Icon */}
                <div className="flex items-center justify-center w-16 h-16 bg-green-100 text-green-700 rounded-full mb-6 text-2xl sm:text-3xl">
                  {feature.icon}
                </div>
                {/* Title */}
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3">
                  {feature.title}
                </h3>
                {/* Description */}
                <p className="text-gray-600 text-sm sm:text-base">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <footer className="bg-[#42855b] text-white py-12 px-4 sm:px-6 lg:px-12">
        <div className="max-w-screen-lg mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">
            Únete a la revolución verde
          </h2>
          <p className="text-base sm:text-lg font-light mb-6">
            Green Vision te ayuda a marcar la diferencia. Sé parte del cambio.
          </p>
          <Link to="/dashboard" className="bg-white text-green-700 font-medium py-2 px-6 sm:py-3 sm:px-8 rounded-lg shadow hover:bg-gray-100 transition">
            Comenzar Ahora
          </Link>
        </div>
      </footer>
    </div>
  );
};

export default Home;
