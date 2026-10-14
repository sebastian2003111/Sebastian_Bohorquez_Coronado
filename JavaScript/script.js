/* ==========================================================================
   PORTAFOLIO SEBASTIAN BOHORQUEZ - SCRIPTS
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  /* ================= 1. MENÚ RESPONSIVE ================= */
  const toggleMenuBtn = document.getElementById("toggle-menu");
  const menuNav = document.querySelector(".menu-nav");

  if (toggleMenuBtn && menuNav) {
    toggleMenuBtn.addEventListener("click", () => {
      menuNav.classList.toggle("open");
      const estaAbierto = menuNav.classList.contains("open");
      toggleMenuBtn.setAttribute("aria-expanded", estaAbierto ? "true" : "false");
    });

    // Cerrar menú al hacer clic en un enlace (móvil)
    menuNav.querySelectorAll("a").forEach((enlace) => {
      enlace.addEventListener("click", () => {
        menuNav.classList.remove("open");
        toggleMenuBtn.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ================= 2. ENLACE ACTIVO EN NAVEGACIÓN ================= */
  const enlaces = document.querySelectorAll(".navegacion-principal a");
  let paginaActual = window.location.pathname.split("/").pop();

  if (paginaActual === "" || paginaActual === "/") {
    paginaActual = "index.html";
  }

  enlaces.forEach((enlace) => {
    const enlaceHref = enlace.getAttribute("href");
    enlace.classList.remove("activo");

    if (enlaceHref === paginaActual) {
      enlace.classList.add("activo");
    } else if (paginaActual === "vigi-bot.html" && enlaceHref === "proyectos.html") {
      // Si estamos en un detalle de proyecto, marcar la sección Proyectos
      enlace.classList.add("activo");
    } else if (paginaActual === "demo-detalle.html" && enlaceHref === "tienda.html") {
      // Si estamos en la demo de la tienda, marcar la sección Tienda
      enlace.classList.add("activo");
    }
  });

  /* ================= 3. MODO OSCURO CON PERSISTENCIA ================= */
  const btnModo = document.getElementById("boton-modo");
  const modoGuardado = localStorage.getItem("modoOscuro");

  function actualizarTextoBotonModo() {
    if (!btnModo) return;
    const esOscuro = document.body.classList.contains("dark-mode");
    btnModo.textContent = esOscuro ? "Modo Claro" : "Modo Oscuro";
  }

  // Aplicar preferencia guardada
  if (modoGuardado === "activo") {
    document.body.classList.add("dark-mode");
  } else {
    document.body.classList.remove("dark-mode");
  }
  actualizarTextoBotonModo();

  if (btnModo) {
    btnModo.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");
      const esOscuro = document.body.classList.contains("dark-mode");

      if (esOscuro) {
        localStorage.setItem("modoOscuro", "activo");
      } else {
        localStorage.setItem("modoOscuro", "inactivo");
      }
      actualizarTextoBotonModo();
    });
  }

  /* ================= 4. VER MÁS / VER MENOS ================= */
  const botonVermas = document.getElementById("boton-vermas");
  const bioCorta = document.getElementById("bio-corta");
  const bioCompleta = document.getElementById("bio-completa");

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

  /* ================= 5. FILTROS DE PROYECTOS ================= */
  const botonesFiltro = document.querySelectorAll(".btn-filtro");
  const proyectos = document.querySelectorAll(".proyecto-card");

  if (botonesFiltro.length > 0 && proyectos.length > 0) {
    botonesFiltro.forEach((boton) => {
      boton.addEventListener("click", () => {
        const filtro = boton.dataset.filtro;

        botonesFiltro.forEach((btn) => btn.classList.remove("activo"));
        boton.classList.add("activo");

        proyectos.forEach((proyecto) => {
          const categoria = proyecto.dataset.categoria;

          if (filtro === "todos" || filtro === categoria) {
            proyecto.style.display = ""; // Restablece el valor predeterminado del CSS
          } else {
            proyecto.style.display = "none";
          }
        });
      });
    });
  }

  /* ================= 6. FORMULARIO DE CONTACTO (AJAX) ================= */
  const formulario = document.querySelector(".formulario");

  if (formulario) {
    formulario.addEventListener("submit", async function (e) {
      e.preventDefault();

      const nombre = document.getElementById("nombre") ? document.getElementById("nombre").value.trim() : "";
      const apellidos = document.getElementById("apellidos") ? document.getElementById("apellidos").value.trim() : "";
      const telefono = document.getElementById("telefono") ? document.getElementById("telefono").value.trim() : "";
      const email = document.getElementById("email") ? document.getElementById("email").value.trim() : "";
      const mensaje = document.getElementById("mensaje") ? document.getElementById("mensaje").value.trim() : "";

      if (!nombre || !email || !mensaje) {
        alert("Por favor completa los campos obligatorios (Nombre, Correo y Mensaje).");
        return;
      }

      if (!email.includes("@") || !email.includes(".")) {
        alert("Por favor ingresa un correo electrónico válido.");
        return;
      }

      const submitBtn = formulario.querySelector('input[type="submit"]');
      const textoOriginal = submitBtn ? submitBtn.value : "Enviar";
      if (submitBtn) {
        submitBtn.value = "Enviando...";
        submitBtn.disabled = true;
      }

      try {
        const respuesta = await fetch("https://formsubmit.co/ajax/sebastianbohorquez4607@gmail.com", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            Nombre: `${nombre} ${apellidos}`.trim(),
            Teléfono: telefono,
            Email: email,
            Mensaje: mensaje,
            _subject: `Nuevo mensaje de contacto de ${nombre} (Portafolio Web)`,
          }),
        });

        if (respuesta.ok) {
          alert("¡Mensaje enviado con éxito! Me pondré en contacto contigo pronto.");
          formulario.reset();
        } else {
          // Fallback en caso de que FormSubmit requiera activación o devuelva error
          alert("Tu mensaje fue procesado. Si no recibes respuesta rápida, puedes escribir directamente a: sebastianbohorquez4607@gmail.com");
          formulario.reset();
        }
      } catch (error) {
        console.error("Error al enviar formulario:", error);
        alert("Hubo un problema de conexión al enviar el mensaje. Por favor contáctame directamente a: sebastianbohorquez4607@gmail.com");
      } finally {
        if (submitBtn) {
          submitBtn.value = textoOriginal;
          submitBtn.disabled = false;
        }
      }
    });
  }
});
