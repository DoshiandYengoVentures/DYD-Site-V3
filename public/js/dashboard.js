function dydDashboardInit() {
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

  var requestModalOverlay = document.querySelector("[data-request-modal-overlay]");
  var openRequestModalBtn = document.querySelector("[data-open-request-modal]");
  var closeRequestModalEls = document.querySelectorAll("[data-close-request-modal]");

  if (requestModalOverlay) {
    var openRequestModal = function () {
      requestModalOverlay.classList.add("is-open");
    };
    var closeRequestModal = function () {
      requestModalOverlay.classList.remove("is-open");
    };

    if (openRequestModalBtn) {
      openRequestModalBtn.addEventListener("click", openRequestModal);
    }

    closeRequestModalEls.forEach(function (el) {
      el.addEventListener("click", closeRequestModal);
    });

    requestModalOverlay.addEventListener("click", function (event) {
      if (event.target === requestModalOverlay) closeRequestModal();
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") closeRequestModal();
    });
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", dydDashboardInit);
} else {
  dydDashboardInit();
}
