/**  ================================== INDEX ==================================**/

const formulario = document.querySelector('.formulario');

if(formulario){
    formulario.addEventListener('submit', function (e) {
        e.preventDefault();

        const nombre = document.querySelector('input[type="text"]').value;
        const telefono = document.querySelector('input[type="tel"]').value;
        const correo = document.querySelector('input[type="email"]').value;
        const mensaje = document.querySelector('textarea').value;

        if(nombre === '' || telefono === '' || correo === '' || mensaje === ''){
            alert('Todos los campos son obligatorios');
            return;
        }

        if(!correo.includes('@')){
            alert('El correo no es valido');
            return;
        }

        const datosFormulario = {nombre, telefono, correo, mensaje};
        localStorage.setItem('Contacto ' + nombre, JSON.stringify(datosFormulario));

        alert('Mensaje enviado correctamente');
        formulario.reset();
    });
}


const datosGuardados = localStorage.getItem('Contacto ' + nombre);
if (datosGuardados){
    console.log(JSON.parse(datosGuardados));
}

// Activar opciones del menu

const enlaces = document.querySelectorAll('.navegacion-principal a');

let paginaActual = window.location.pathname.split("/").pop();

// Si esta vacia, asumimos index.html

if (paginaActual === "" ) {
    paginaActual = 'index.html';
}

enlaces.forEach(enlace => {
    const enlaceHref = enlace.getAttribute("href");

    enlace.classList.remove('activo');

    if(enlaceHref === paginaActual){
        enlace.classList.add("activo");
    }
});

/**  ================================== QUIEN SOY ==================================**/

// Ver mas / Ver menos (Solo si existe en la pagina)

const botonVermas = document.getElementById("boton-vermas")
const bioCorta = document.getElementById("bio-corta")
const bioCompleta = document.getElementById("bio-completa")

if (botonVermas && bioCorta && bioCompleta) {
    botonVermas.addEventListener("click", () => {

        const estaOculto = bioCompleta.classList.contains("oculto");

        if (estaOculto) {
            bioCompleta.classList.remove("oculto");
            bioCompleta.classList.add("visible");
            bioCorta.classList.add("oculto");
            botonVermas.textContent = "Ver menos";
        } else {
            bioCompleta.classList.add("oculto");
            bioCompleta.classList.remove("visible");
            bioCorta.classList.remove("oculto");
            botonVermas.textContent = "Ver más";
        }

    });
}
// Contadores animados (si existen en la pagina)
const contadores = document.querySelectorAll(".contador");

if (contadores.length > 0) {
    contadores.forEach( contador => {
        const valorFinal = Number (contador.dataset.valor);
        let valorActual = 0;


        //Ajustar la velocidad(mas grande = mas rapido)
        const incremento = Math.ceil(valorFinal / 60);

        const intervalo = setInterval(() => {
            valorActual += incremento;

            if (valorActual >= valorFinal){
                contador.textContent = valorFinal;
                clearInterval(intervalo)
            } else {
                contador.textContent = valorActual;
            }
        }, 25)
    })
}

/* ================= MODO OSCURO CON PERSISTENCIA ================= */

const btnModo = document.getElementById("boton-modo");

// 1) Al cargar, aplicar preferencia guardada
if (localStorage.getItem("modoOscuro") === "activo") {
  document.body.classList.add("dark-mode");
  if (btnModo) btnModo.textContent = "Modo claro";
}

// 2) Al hacer clic, alternar y guardar
if (btnModo) {
  btnModo.addEventListener("click", () => {

    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
      btnModo.textContent = "Modo claro";
      localStorage.setItem("modoOscuro", "activo");
    } else {
      btnModo.textContent = "Modo oscuro";
      localStorage.removeItem("modoOscuro");
    }

  });
}