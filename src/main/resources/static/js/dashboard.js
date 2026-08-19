document.addEventListener("DOMContentLoaded", function () {
  var shell = document.querySelector(".db-shell");
  var toggle = document.querySelector(".db-hamburger");
  var backdrop = document.querySelector(".db-sidebar-backdrop");

  if (!shell || !toggle) return;

  function openSidebar() {
    shell.classList.add("db-sidebar-open");
    toggle.setAttribute("aria-expanded", "true");
  }

  function closeSidebar() {
    shell.classList.remove("db-sidebar-open");
    toggle.setAttribute("aria-expanded", "false");
  }

  toggle.addEventListener("click", function () {
    if (shell.classList.contains("db-sidebar-open")) {
      closeSidebar();
    } else {
      openSidebar();
    }
  });

  if (backdrop) {
    backdrop.addEventListener("click", closeSidebar);
  }

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") closeSidebar();
  });

  window.addEventListener("resize", function () {
    if (window.innerWidth > 900) closeSidebar();
  });
});
