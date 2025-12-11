uniform float uTime;
uniform sampler2D uTexture; // La textura Atlas 
uniform vec2 uMouse;        // Posición normalizada del ratón (-1 a 1)
varying vec2 vUv;           // Coordenadas UV del plano (0 a 1)

void main() {
    vec2 uv = vUv;

    // Distancia al centro para aplicar un brillo simple
    float dist = distance(uv, vec2(0.5, 0.5));
    float vignette = 1.0 - dist * 0.4;

    // ----- SELECCIÓN DE IMAGEN EN EL ATLAS -----
    // IMPORTANTE: Ajusta este valor (3.0) al NÚMERO TOTAL de ojos horizontales en tu imagen.
    float numImages = 3.0; 
    
    // 1. Normaliza la posición del ratón de (-1 a 1) a (0 a 1)
    float mouseNormalized = (uMouse.x + 1.0) * 0.5; // (0.0 a 1.0)
    
    // 2. Calcula el índice de la imagen a mostrar (0, 1, o 2)
    float imageIndex = floor(mouseNormalized * numImages);
    
    // 3. Calcula el desplazamiento X en la tira (0/3, 1/3, 2/3)
    float offset = imageIndex / numImages;
    
    // 4. Mapea la coordenada UV a la porción correcta del atlas:
    // a) Escala la UV horizontal (uv.x / numImages) para que solo ocupe 1/3 del ancho.
    // b) Añade el desplazamiento (offset) para moverla al segmento correcto.
    uv.x = uv.x / numImages + offset; 
    // ------------------------------------------
    
    vec4 textureColor = texture2D(uTexture, uv);
    
    // Aplica el efecto de viñeta para darle un poco de profundidad
    textureColor.rgb *= vignette;
    gl_FragColor = textureColor; 
}