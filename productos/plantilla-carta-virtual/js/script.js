/* ========================================================
   PLANTILLA WEB: CARTA VIRTUAL INTERACTIVA
   Desarrollado para fácil personalización.
   No requiere librerías externas ni conocimientos avanzados.
   ======================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Elementos del DOM ---
    const sobreWrapper = document.getElementById('sobre-wrapper');
    const sobre = document.getElementById('sobre');
    const cartaContenido = document.getElementById('carta-contenido');
    const botonMusica = document.getElementById('toggle-musica');

    // --- 2. Evento para Abrir el Sobre ---
    if (sobreWrapper && sobre && cartaContenido) {
        sobreWrapper.addEventListener('click', () => {
            // Activa la animación 3D de la solapa
            sobre.classList.add('abierto');
            
            // Inicia la música suave automáticamente
            iniciarMelodia();

            // Muestra el contenido de la carta con efecto de entrada
            setTimeout(() => {
                sobreWrapper.style.display = 'none';
                cartaContenido.style.display = 'block';
                lanzarConfetiCorazones();
            }, 600);
        });
    }

    // --- 3. Fondo Animado de Corazones y Destellos (HTML5 Canvas) ---
    const canvas = document.getElementById('canvas-bg');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;

        window.addEventListener('resize', () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        });

        const particulas = [];
        // Cantidad de corazones en pantalla (puedes ajustar el 40 por más o menos)
        for (let i = 0; i < 40; i++) {
            particulas.push({
                x: Math.random() * width,
                y: Math.random() * height,
                size: Math.random() * 14 + 8,
                speedY: Math.random() * 1 + 0.5,
                opacity: Math.random() * 0.6 + 0.2,
                symbol: Math.random() > 0.4 ? '❤️' : '✨'
            });
        }

        function animarParticulas() {
            ctx.clearRect(0, 0, width, height);
            particulas.forEach(p => {
                ctx.globalAlpha = p.opacity;
                ctx.font = `${p.size}px serif`;
                ctx.fillText(p.symbol, p.x, p.y);
                p.y -= p.speedY;
                if (p.y < -20) {
                    p.y = height + 20;
                    p.x = Math.random() * width;
                }
            });
            requestAnimationFrame(animarParticulas);
        }
        animarParticulas();

        // Lluvia extra de corazones al abrir la carta
        window.lanzarConfetiCorazones = function() {
            for (let i = 0; i < 30; i++) {
                particulas.push({
                    x: width / 2 + (Math.random() - 0.5) * 200,
                    y: height / 2 + (Math.random() - 0.5) * 200,
                    size: Math.random() * 20 + 12,
                    speedY: Math.random() * 2 + 1,
                    opacity: 1,
                    symbol: '💖'
                });
            }
        };
    }

    // --- 4. Melodía Romántica Sintetizada (Web Audio API) ---
    // Funciona 100% nativa en cualquier navegador, sin archivos de audio externos pesados.
    let audioCtx = null;
    let sonidoActivo = false;

    function iniciarMelodia() {
        if (sonidoActivo) return;
        try {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            audioCtx = new AudioContext();
            sonidoActivo = true;
            if (botonMusica) botonMusica.innerHTML = '<span>🔊</span> Melodía Activa';
            tocarNotas();
        } catch(e) {
            console.log("Audio Web no disponible:", e);
        }
    }

    // Escala armónica suave (Do, Mi, Sol, Do alto, La, Fa, Sol)
    const notas = [261.63, 329.63, 392.00, 523.25, 440.00, 349.23, 392.00];
    let notaIdx = 0;

    function tocarNotas() {
        if (!sonidoActivo || !audioCtx) return;
        try {
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();

            osc.type = 'sine'; // Onda senoidal limpia y suave como una caja de música
            osc.frequency.setValueAtTime(notas[notaIdx % notas.length], audioCtx.currentTime);

            // Suavizado de volumen para evitar "clicks"
            gain.gain.setValueAtTime(0.01, audioCtx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.12, audioCtx.currentTime + 0.3);
            gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 1.2);

            osc.connect(gain);
            gain.connect(audioCtx.destination);

            osc.start();
            osc.stop(audioCtx.currentTime + 1.3);

            notaIdx++;
            setTimeout(tocarNotas, 1100);
        } catch (e) {
            // Evitar errores si el contexto se cierra
        }
    }

    if (botonMusica) {
        botonMusica.addEventListener('click', () => {
            if (!sonidoActivo) {
                iniciarMelodia();
            } else {
                sonidoActivo = false;
                if (audioCtx) audioCtx.close();
                botonMusica.innerHTML = '<span>🔇</span> Melodía Pausada';
            }
        });
    }

});

