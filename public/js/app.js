document.addEventListener('DOMContentLoaded', () => {

    console.log("✅ JavaScript completo cargado - Todo restaurado");

    // ======================== 1. NAVEGACIÓN (Scroll) ========================
    const nav = document.getElementById('nav-principal');
    if (nav) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                nav.classList.remove('encabezado--transparente');
                nav.classList.add('encabezado--blanco');
            } else {
                nav.classList.add('encabezado--transparente');
                nav.classList.remove('encabezado--blanco');
            }
        });
    }

    // ======================== 2. ANIMACIONES DE CATEGORÍAS (Zoom) ========================
    const opcionesObservador = {
        root: null,
        threshold: 0.3,
        rootMargin: "0px 0px -50px 0px"
    };

    const elementosAnimables = document.querySelectorAll('.animacion-scroll');
    const observadorElementos = new IntersectionObserver((entradas) => {
        entradas.forEach(entrada => {
            if (entrada.isIntersecting) {
                entrada.target.classList.add('visible');
            }
        });
    }, opcionesObservador);

    elementosAnimables.forEach(el => observadorElementos.observe(el));

    // ======================== 3. NEWSLETTER (Blanco → Negro) ========================
    const seccionNewsletter = document.getElementById('newsletter');
    if (seccionNewsletter) {
        const observadorNewsletter = new IntersectionObserver((entradas) => {
            entradas.forEach(entrada => {
                if (entrada.isIntersecting) {
                    seccionNewsletter.classList.add('fondo-negro');
                } else {
                    seccionNewsletter.classList.remove('fondo-negro');
                }
            });
        }, { threshold: 0.5 });

        observadorNewsletter.observe(seccionNewsletter);
    }

    // ======================== 4. GENERADOR IA (Optimizado + Respaldo) ========================
    const formularioIA = document.getElementById('formulario-ia');
    const contenedorResultado = document.getElementById('resultado-ia');

    if (formularioIA && contenedorResultado) {
        formularioIA.addEventListener('submit', async (e) => {
            e.preventDefault();

            const genero = document.getElementById('genero').value;
            const tipoEvento = document.getElementById('evento').value;
            const tipoEstilo = document.getElementById('estilo').value;
            const temporada = document.getElementById('temporada').value;
            const coloresFavoritos = document.getElementById('color').value;

            contenedorResultado.classList.remove('oculto');
            contenedorResultado.innerHTML = `
                <div style="text-align: center; padding: 50px 20px;">
                    <h3>Generando Outfit con IA...</h3>
                    <div style="margin:25px auto; width:60px; height:60px; border:6px solid #eee; border-top:6px solid #000; border-radius:50%; animation: spin 1s linear infinite;"></div>
                    <p>Usando Pollinations AI (Flux) • 10-25 segundos</p>
                    
                    <button onclick="usarModoRespaldo()" 
                            style="margin-top: 25px; background:#333; color:white; padding:12px 28px; border:none; border-radius:6px; cursor:pointer;">
                        Usar Modo Respaldo (Instantáneo)
                    </button>
                </div>
            `;

            const promptIA = `Single person only, full body fashion editorial, ${genero === 'hombre' ? 'handsome young man, masculine features, short hair' : genero === 'mujer' ? 'beautiful young woman, feminine features, long hair' : 'young person'}, wearing luxury ${tipoEstilo} outfit for ${tipoEvento} during ${temporada}, main colors ${coloresFavoritos}, elegant pose, vogue magazine style, photorealistic, sharp details, single model centered`;

            try {
                const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(promptIA)}?width=512&height=640&nologo=true&enhance=false&seed=${Date.now()}`;

                const response = await fetch(url);
                
                if (response.ok) {
                    contenedorResultado.innerHTML = `
                        <h3 style="margin: 20px 0;">¡Outfit Generado con IA!</h3>
                        <img src="${url}" style="max-width: 100%; border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.15);" alt="Outfit IA" />
                        <br><br>
                        <a href="${url}" download="StyleVision-Outfit.jpg" style="background:#000; color:white; padding:15px 35px; text-decoration:none; border-radius:6px; display:inline-block;">
                            Descargar Imagen
                        </a>
                        <button onclick="location.reload()" style="background:#333; color:white; padding:15px 35px; border:none; border-radius:6px; margin-left:10px;">
                            Generar Otro
                        </button>
                    `;
                } else {
                    throw new Error("Error");
                }
            } catch (error) {
                console.error(error);
                usarModoRespaldo();
            }
        });
    }
});

// ==================== FUNCIÓN DE RESPALDO ====================
window.usarModoRespaldo = function() {
    const contenedorResultado = document.getElementById('resultado-ia');
    const genero = document.getElementById('genero').value || "persona";
    const tipoEstilo = document.getElementById('estilo').value || "elegante";
    const temporada = document.getElementById('temporada').value || "general";
    const colores = document.getElementById('color').value || "";

    contenedorResultado.innerHTML = `
        <h3 style="margin: 25px 0;">Propuesta (Modo Respaldo)</h3>
        <p style="color:#555;">${genero} • ${tipoEstilo} • ${temporada}</p>
        <img src="../assets/img/outfit-resultado.jpg" style="max-width:100%; border-radius:12px; box-shadow:0 10px 30px rgba(0,0,0,0.15);"/>
        <br><br>
        <a href="../assets/img/outfit-resultado.jpg" download="outfit-respaldo.jpg" style="background:#000;color:white;padding:15px 35px;text-decoration:none;border-radius:6px;">Descargar Respaldo</a>
        <button onclick="location.reload()" style="background:#333;color:white;padding:15px 35px;border:none;border-radius:6px;margin-left:10px;">Intentar IA</button>
    `;
};

// Animación spinner
const style = document.createElement('style');
style.innerHTML = `@keyframes spin {0% {transform:rotate(0deg);} 100%{transform:rotate(360deg);}}`;
document.head.appendChild(style);