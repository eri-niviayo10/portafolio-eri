"use client";
import React from 'react';
// Importa el componente 3D (se ha eliminado la extensión .jsx para evitar el error de resolución del módulo)
import Hero3D from './Hero3D'; 

/**
 * Componente principal que integra el fondo 3D con el contenido estático.
 * Este es el componente que debes usar en tu aplicación.
 */
export default function HeroSection() {
  return (
    // Contenedor Principal: Asegura que el fondo 3D ocupe todo el espacio.
    <section className="relative w-full min-h-screen bg-black overflow-hidden flex items-center justify-center p-4 md:p-8 font-inter">
      
      {/* 1. CAPA DE FONDO 3D */}
      {/* Hero3D se posiciona absolutamente y tiene 'pointer-events-none' para no bloquear clics en el contenido. */}
      {/* Asegúrate de que Hero3D.jsx exista en la misma carpeta. */}
      <Hero3D />

      {/* 2. CAPA DE CONTENIDO: Se coloca delante del fondo 3D (z-index 10) */}
      <div className="relative z-10 text-white max-w-4xl w-full text-center p-6 bg-black/30 rounded-xl backdrop-blur-sm shadow-2xl border border-indigo-500/30">
        
        {/* Título Principal */}
        <h1 className="text-4xl sm:text-6xl md:text-8xl font-extrabold tracking-tight mb-4 animate-fadeIn">
          <span className="text-indigo-400">Mi Nombre es</span>
          <br />
          <span className="text-white">JOHN DOE</span>
        </h1>

        {/* Subtítulo */}
        <h2 className="text-xl sm:text-2xl md:text-3xl font-light mb-8 text-gray-300 animate-fadeIn delay-200">
          Frontend Engineer. Diseñador UX. Entusiasta de WebGL.
        </h2>

        {/* Botones de Acción */}
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <button
            className="z-20 w-full sm:w-auto px-8 py-3 text-lg font-semibold text-white bg-indigo-600 rounded-lg shadow-lg hover:bg-indigo-500 transition duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
            onClick={() => console.log('Navegar a Proyectos')} // Reemplaza con tu lógica de navegación
          >
            Ver Proyectos
          </button>
          <button
            className="z-20 w-full sm:w-auto px-8 py-3 text-lg font-semibold text-indigo-400 border border-indigo-400 rounded-lg shadow-lg bg-black/50 hover:bg-indigo-400 hover:text-black transition duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
            onClick={() => console.log('Navegar a Contacto')} // Reemplaza con tu lógica de navegación
          >
            Contacto
          </button>
        </div>
      </div>
    </section>
  );
}