(function () {
  "use strict";

  var detailsData = {
    act1: {
      title: "Actividad 1 · Mi primera página web",
      steps: [
        "Abre la terminal y ve a una carpeta nueva para tu proyecto.",
        "Escribe <code>opencode</code> para iniciar la sesión del asistente.",
        "Pide el apagina con este prompt:",
        "Revisa los archivos que creó, ábrelos en tu navegador y pide pequeños cambios (colores, textos, secciones).",
        "Sube el resultado a GitHub con Git."
      ],
      prompt: 'Crea un portafolio personal: un archivo index.html con mi nombre, mis estudios, mis gustos y un formulario de contacto. Añade style.css con un diseño moderno y script.js para que cambie el color del fondo al hacer clic en un botón.'
    },
    act2: {
      title: "Actividad 2 · Resolver ejercicios de programación",
      steps: [
        "Crea una carpeta para la práctica y escribe <code>opencode</code>.",
        "Pide resolver un ejercicio clásico y que lo explique línea por línea.",
        "Modifica el ejercicio (cambia los números o la condición) y pídele que lo actualice.",
        "Pídele que escriba un ejemplo de ejecución con entradas y salidas."
      ],
      prompt: 'Escribe en Python un programa que pida al usuario un número entero y diga si es par o impar. Explícame cómo funciona cada parte del código.'
    },
    act3: {
      title: "Actividad 3 · Explicar y documentar código",
      steps: [
        "Crea tu archivo de código fuente o descarga un ejemplo pequeño.",
        "Escribe <code>opencode</code> en la carpeta de tu proyecto.",
        "Pide un resumen, explicación paso a paso y documentación con comentarios.",
        "Pide una versión más sencilla y compara ambas."
      ],
      prompt: 'Explica qué hace este archivo paso a paso y añade comentarios de documentación a cada función.'
    },
    act4: {
      title: "Actividad 4 · Probar y corregir errores",
      steps: [
        "Escribe (o pide que genere) un programa con al menos dos errores: uno de lógica y otro de ejecución.",
        "Ejecútalo y observa el error en la terminal.",
        "Con opencode abierto, pide que identifique, explique y corrija los errores.",
        "Pide además que cree pruebas automáticas y verifica que el programa ahora funciona."
      ],
      prompt: 'Este programa no funciona. Encuentra los errores, explícalos y corrígelos. Después escribe pruebas para verificar que funciona.'
    },
    act5: {
      title: "Actividad 5 · Proyecto integrador: gestor de tareas",
      steps: [
        "Crea la carpeta del proyecto e inicia opencode.",
        "Describe la aplicación completa que quieres (funciones, diseño, guardado local).",
        "Deja que opencode genere todos los archivos: HTML, CSS y JavaScript.",
        "Prueba la aplicación, pide mejoras (eliminar tareas, contador de pendientes) y corrije lo que haga falta.",
        "Publica tu app en GitHub. ¡Ese será tu primer producto de software!"
      ],
      prompt: 'Crea una aplicación de lista de tareas (to-do list): puedes agregar, marcar como completadas y eliminar tareas. Guarda las tareas en el navegador para que no se pierdan al recargar la página. Diseño moderno y oscuro.'
    }
  };

  var detailsEl = document.getElementById("details");
  var detailsContent = document.getElementById("detailsContent");
  var detailsClose = document.getElementById("detailsClose");
  var navLinks = document.querySelectorAll("[data-detail]");

  if (detailsClose && detailsContent) {
  function renderPrompt(promptText) {
    var esc = promptText.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    return '<pre><code><span class="c-prompt">you&gt;</span> ' + esc + "</code></pre>";
  }

  navLinks.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var data = detailsData[btn.getAttribute("data-detail")];
      if (!data) return;

      var steps = data.steps.map(function (s, i) {
        return "<li>" + s + "</li>";
      }).join("");

      detailsContent.innerHTML =
        "<h4>" + data.title + "</h4>" +
        "<ol>" + steps + "</ol>" +
        "<p><strong>Prompt sugerido:</strong></p>" +
        renderPrompt(data.prompt);

      detailsEl.classList.add("is-open");
      detailsEl.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  detailsClose.addEventListener("click", function () {
    detailsEl.classList.remove("is-open");
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") detailsEl.classList.remove("is-open");
  });
  }

  var tabs = document.querySelectorAll(".code-panel__tab");
  var blocks = document.querySelectorAll(".code-panel__block");

  tabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      var name = tab.getAttribute("data-tab");
      tabs.forEach(function (t) { t.classList.remove("is-active"); });
      blocks.forEach(function (b) { b.classList.remove("is-active"); });
      tab.classList.add("is-active");
      var block = document.querySelector('[data-block="' + name + '"]');
      if (block) block.classList.add("is-active");
    });
  });

  var menuToggle = document.getElementById("menuToggle");
  var menu = document.getElementById("menu");

  menuToggle.addEventListener("click", function () {
    var open = menu.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", open ? "true" : "false");
  });

  menu.addEventListener("click", function (e) {
    if (e.target.tagName === "A") {
      menu.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
    }
  });

  var revealEls = document.querySelectorAll(".feature, .activity");
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealEls.forEach(function (el) {
    el.classList.add("reveal");
    io.observe(el);
  });
})();