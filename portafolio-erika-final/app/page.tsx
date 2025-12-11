// src/app/page.tsx
// IMPORTACIONES NECESARIAS:
import Hero3D from '@/components/Hero3D';
// Importaciones de fuente (vienen por defecto con la instalación):
import { Inter } from 'next/font/google'; 

// Inicializa la fuente (debe ser mantenido)
const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    // 'main' es la estructura principal de la página.
    <main className={`flex min-h-screen flex-col items-center p-0 ${inter.className}`}>
      
      {/* ===================================================================
        1. HERO SECTION (La parte interactiva 3D)
        ===================================================================
      */}
      <Hero3D />

      {/* ===================================================================
        2. CONTENIDO (Aquí va el resto de tu portafolio antiguo)
        ===================================================================
      */}
      
      {/* Ejemplo: Sección de contenido real (usa clases de Tailwind) */}
      <section className="bg-white text-gray-800 w-full py-16 px-8 text-center" id="acerca-de-mi">
         <h2 className="text-4xl font-bold mb-4">Acerca de Mí (Tu Contenido Aquí)</h2>
         <p className="max-w-3xl mx-auto">
             Aquí es donde copiarías y pegarías el texto de tu sección "Acerca de Mí" de tu antiguo portafolio.
         </p>
      </section>

      {/* Puedes agregar más secciones como Proyectos, Contacto, etc. */}
      
    </main>
  );
}