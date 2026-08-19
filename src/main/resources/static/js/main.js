document.addEventListener("DOMContentLoaded", function () {
  // Mobile nav toggle
  var header = document.querySelector(".site-header");
  var hamburger = document.querySelector(".hamburger");

  if (hamburger && header) {
    hamburger.addEventListener("click", function () {
      var isOpen = header.classList.toggle("is-open");
      hamburger.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    document.querySelectorAll(".nav-group > .nav-link").forEach(function (trigger) {
      trigger.addEventListener("click", function (event) {
        if (window.innerWidth <= 720) {
          event.preventDefault();
          trigger.closest(".nav-group").classList.toggle("is-open");
        }
      });
    });
  }

  // FAQ accordion
  document.querySelectorAll(".accordion-trigger").forEach(function (trigger) {
    trigger.addEventListener("click", function () {
      var expanded = trigger.getAttribute("aria-expanded") === "true";
      var panel = document.getElementById(trigger.getAttribute("aria-controls"));

      document.querySelectorAll(".accordion-trigger").forEach(function (other) {
        if (other !== trigger) {
          other.setAttribute("aria-expanded", "false");
          var otherPanel = document.getElementById(other.getAttribute("aria-controls"));
          if (otherPanel) otherPanel.style.maxHeight = null;
        }
      });

      trigger.setAttribute("aria-expanded", expanded ? "false" : "true");
      if (panel) {
        panel.style.maxHeight = expanded ? null : panel.scrollHeight + "px";
      }
    });
  });
});
