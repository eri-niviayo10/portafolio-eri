"use client";
// Importaciones corregidas y necesarias
import React, { useRef, useMemo, Suspense, useEffect } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';

// --- SHADERS INTEGRADOS ---
const vertexShader = `
// <<<<<< ¡CORRECCIÓN APLICADA AQUÍ! >>>>>>
attribute vec2 uv; 
uniform float uTime;
uniform vec2 uMouse;
uniform float uGlitchFactor;
varying vec2 vUv;

void main() {
vUv = uv;
vec3 pos = position;

// Efecto de distorsión basado en el mouse y el tiempo
float distortion = sin(vUv.y * 10.0 + uTime * 2.0) * cos(vUv.x * 5.0 + uTime * 1.5) * uGlitchFactor;

// Aplicar un desplazamiento horizontal ligero basado en el mouse (Sensibilidad Ajustada: 0.05)
pos.x += distortion * (uMouse.x * 0.05); 

gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
`;

const fragmentShader = `
uniform float uTime;
uniform vec2 uMouse;
uniform sampler2D uTexture;
uniform float uGlitchFactor;
varying vec2 vUv;

void main() {
vec2 uv = vUv;

// Desplazamiento de la textura para el efecto de seguimiento del mouse (Paralaje)
vec2 mouseDisplacement = uMouse * 0.05; 
uv.x += mouseDisplacement.x;
uv.y -= mouseDisplacement.y;

// Efecto de Glitch o Desplazamiento de Línea Horizontal 
float offset = sin(uv.y * 50.0 + uTime * 10.0) * uGlitchFactor; 
uv.x += offset; 

// Muestrear el color de la textura
vec4 color = texture2D(uTexture, uv);

// Efecto de Viñeta (suaviza los bordes)
float vignette = smoothstep(0.0, 0.6, length(uv - 0.5));
color.rgb *= (1.0 - vignette * 0.2); 

gl_FragColor = color;
}
`;
// --- FIN SHADERS INTEGRADOS ---

// Objeto para almacenar las coordenadas normalizadas del mouse
const pointer = new THREE.Vector2(0, 0);

// Referencia global para poder acceder al material desde el listener del mouse
let globalMaterialRef: THREE.ShaderMaterial | null = null;


// 1. COMPONENTE PARA EL PLANO 3D Y LA LÓGICA DEL SHADER
function CustomPlane() {
const meshRef = useRef<THREE.Mesh>(null);

// >>>>>> RUTA CRÍTICA: La imagen debe estar en la carpeta 'public' <<<<<<
const textureUrl = '/eyes-atlas.png'; 

// Usamos el hook useLoader con manejo de errores explícito
const texture = useLoader(THREE.TextureLoader, textureUrl, undefined, (error) => {
console.error("Error al cargar la textura de fondo. Revisa la ruta:", textureUrl, error);
});

texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;

// 2. CREACIÓN DEL MATERIAL CON UNIFORMS
const material = useMemo(() => new THREE.ShaderMaterial({
vertexShader,
fragmentShader,
uniforms: {
uTime: { value: 0.0 }, 
uMouse: { value: new THREE.Vector2(0, 0) }, 
uTexture: { value: texture }, 
uGlitchFactor: { value: 0.015 }, 
},
side: THREE.DoubleSide, 
transparent: true,
}), [texture]);

// 3. Establecer la referencia global del material una vez que se renderice el mesh
useEffect(() => {
    if (meshRef.current && meshRef.current.material) {
        globalMaterialRef = meshRef.current.material as THREE.ShaderMaterial;
    }
    return () => {
        globalMaterialRef = null;
    }
}, [material]);

// 4. ANIMACIÓN (Actualización por frame)
useFrame(({ clock }) => {
    if (globalMaterialRef && globalMaterialRef.uniforms) {
        globalMaterialRef.uniforms.uTime.value = clock.getElapsedTime();
        globalMaterialRef.uniforms.uMouse.value.copy(pointer);
    }
});

// 5. RENDERIZADO
return (
    <mesh 
        ref={meshRef} 
        scale={7.5} 
        rotation={[0, 0, 0]}
    >
        <planeGeometry args={[16, 9]} /> 
        <primitive object={material} attach="material" />
    </mesh>
);
}

// 6. HANDLER DEL MOVIMIENTO DEL PUNTERO
function handlePointerMove(event: PointerEvent) {
    pointer.x = (event.clientX / window.innerWidth) * 2 - 1; 
    pointer.y = -(event.clientY / window.innerHeight) * 2 + 1; 
}


// 7. EFECTO PARA AÑADIR/QUITAR EL LISTENER AL MONTAR/DESMONTAR
function PointerListener() {
    useEffect(() => {
        const handleMove = (event: PointerEvent) => {
            if (globalMaterialRef) {
                handlePointerMove(event);
            }
        };

        window.addEventListener('pointermove', handleMove as EventListener);
        return () => {
            window.removeEventListener('pointermove', handleMove as EventListener);
        };
    }, []);
    return null; 
}


// 8. COMPONENTE PRINCIPAL (EXPORTADO)
export default function Hero3D() {
    return (
        <div className="absolute inset-0 z-0">
            <Canvas 
                flat 
                dpr={[1, 2]} 
                camera={{ 
                    position: [0, 0, 15], 
                    fov: 75 
                }} 
            >
                <PointerListener />

                <ambientLight intensity={0.5} />
                
                <Suspense fallback={<Html center className="text-white bg-indigo-600/50 p-3 rounded-lg backdrop-blur-sm text-sm">Cargando Textura 3D...</Html>}>
                    <CustomPlane />
                </Suspense>
                
            </Canvas>
        </div>
    );
}