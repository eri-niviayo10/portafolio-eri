/** @type {import('next').NextConfig} */
const nextConfig = {
    // Puedes añadir cualquier otra configuración de Next.js aquí (e.g., images, experimental, etc.)
    // You can add any other Next.js configuration here (e.g., images, experimental, etc.)

    // Configuración de Webpack para cargar archivos GLSL (Shaders)
    webpack: (config, { isServer }) => {
        // Añadir la regla para procesar archivos GLSL
        // Add the rule to process GLSL files
        
        config.module.rules.push({
            test: /\.(glsl|vs|fs|vert|frag)$/, // Busca las extensiones de Shaders
            exclude: /node_modules/,
            use: [
                'raw-loader' // Usa raw-loader para importar el contenido del archivo como string
            ],
        });

        // Importante: Debes devolver la configuración modificada
        // Important: You must return the modified configuration
        return config;
    },
};

module.exports = nextConfig;