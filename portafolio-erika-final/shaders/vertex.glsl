const vertexShader = `
// ⚠️ ¡CORRECCIÓN CRÍTICA! Declara 'uv' como un attribute (entrada de la geometría)
attribute vec2 uv; 

uniform float uTime; 
uniform vec2 uMouse; 
varying vec2 vUv; 

void main() {
    vUv = uv; // Pasa las coordenadas UV al fragment shader
    vec3 newPosition = position;
    
    // Aplica una pequeña onda en el eje Z (profundidad)
    newPosition.z += sin(newPosition.x * 2.0 + uTime * 2.0) * 0.1; 
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
}
`;