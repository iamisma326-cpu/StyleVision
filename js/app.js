document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Cambiar el color del Menú (Nav) al hacer scroll
    const nav = document.getElementById('nav-principal');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.remove('encabezado--transparente');
            nav.classList.add('encabezado--blanco');
        } else {
            nav.classList.add('encabezado--transparente');
            nav.classList.remove('encabezado--blanco');
        }
    });

    // 2. Intersección para animar elementos cuando aparecen en pantalla (Efecto Escala Gucci)
    const opcionesObservador = {
        root: null,
        threshold: 0.3 // Se activa cuando el 30% del elemento es visible
    };

    // Animación de reducción (zoom in a normal) para categorías
    const elementosAnimables = document.querySelectorAll('.animacion-scroll');
    const observadorElementos = new IntersectionObserver((entradas) => {
        entradas.forEach(entrada => {
            if (entrada.isIntersecting) {
                // Aplica un transform scale para simular la reducción que pediste
                entrada.target.style.transform = 'scale(0.9)';
            } else {
                // Vuelve a su tamaño original si sale de la pantalla
                entrada.target.style.transform = 'scale(1)';
            }
        });
    }, opcionesObservador);

    elementosAnimables.forEach(el => observadorElementos.observe(el));

    // 3. Invertir colores de la sección Newsletter (Blanco a Negro)
    const seccionNewsletter = document.getElementById('newsletter');
    const observadorNewsletter = new IntersectionObserver((entradas) => {
        entradas.forEach(entrada => {
            if (entrada.isIntersecting) {
                seccionNewsletter.classList.add('fondo-negro');
            } else {
                seccionNewsletter.classList.remove('fondo-negro');
            }
        });
    }, { threshold: 0.5 }); // Se activa cuando el 50% de la sección es visible

    if (seccionNewsletter) {
        observadorNewsletter.observe(seccionNewsletter);
    }
});


// --- LÓGICA DEL GENERADOR DE OUTFITS IA ---
document.addEventListener('DOMContentLoaded', () => {
    
    const formularioIA = document.getElementById('formulario-ia');
    const contenedorResultado = document.getElementById('resultado-ia');

    if (formularioIA) {
        formularioIA.addEventListener('submit', function(eventoSubmit) {
            // 1. Prevenir que la página se recargue al enviar el formulario
            eventoSubmit.preventDefault();

            // 2. Capturar los datos ingresados por el usuario
            const tipoEvento = document.getElementById('evento').value;
            const tipoEstilo = document.getElementById('estilo').value;
            const coloresFavoritos = document.getElementById('color').value;

            // 3. Mostrar estado de "Cargando" simulando a la IA
            contenedorResultado.classList.remove('oculto');
            contenedorResultado.innerHTML = `
                <h3 style="font-size: 18px; text-transform: uppercase; margin-bottom: 15px;">Generando propuesta exclusiva...</h3>
                <p style="font-size: 14px; color: #555;">Analizando evento: <strong>${tipoEvento}</strong> | Estilo: <strong>${tipoEstilo}</strong> | Colores: <strong>${coloresFavoritos}</strong></p>
                <div style="margin: 30px auto; width: 40px; height: 40px; border: 3px solid #eee; border-top: 3px solid black; border-radius: 50%; animation: giro-ia 1s linear infinite;"></div>
                <style>@keyframes giro-ia { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }</style>
            `;

            // 4. Simular el tiempo de procesamiento de la Inteligencia Artificial (3 segundos)
            setTimeout(() => {
                contenedorResultado.innerHTML = `
                    <h3 style="font-size: 20px; text-transform: uppercase; margin-bottom: 20px;">Tu Propuesta StyleVision está lista</h3>
                    <img src="../assets/img/outfit-resultado.jpg" alt="Outfit Generado" style="width: 100%; max-width: 400px; height: auto; object-fit: cover; margin-bottom: 25px;">
                    <br>
                    <a href="../assets/img/outfit-resultado.jpg" download="StyleVision-Outfit.jpg" class="boton-lujo boton-lujo--oscuro" style="display: inline-block;">Descargar Imagen</a>
                `;
            }, 3000);
        });
    }
});