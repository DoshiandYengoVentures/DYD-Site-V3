function dydMainInit() {
  // Sticky header — frosted-glass state once the page has scrolled
  var header = document.querySelector(".site-header");

  if (header) {
    var updateHeaderScrollState = function () {
      if (window.scrollY > 8) {
        header.classList.add("is-scrolled");
      } else {
        header.classList.remove("is-scrolled");
      }
    };
    updateHeaderScrollState();
    window.addEventListener("scroll", updateHeaderScrollState, { passive: true });
  }

  // Scroll-triggered entrance animations on sections/cards
  var revealSelectors = [
    ".section-head",
    ".card",
    ".value-card",
    ".process-step",
    ".testimonial",
    ".spec-item",
    ".included-item",
    ".accordion-item"
  ];
  var revealTargets = document.querySelectorAll(revealSelectors.join(","));
  var prefersReducedMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var isNarrowViewport = window.innerWidth <= 720;

  if (revealTargets.length && !prefersReducedMotion && "IntersectionObserver" in window) {
    var siblingCounts = new Map();
    revealTargets.forEach(function (el) {
      el.classList.add("reveal-init");

      if (!isNarrowViewport) {
        var parent = el.parentElement;
        var siblingIndex = siblingCounts.get(parent) || 0;
        siblingCounts.set(parent, siblingIndex + 1);

        var staggerStep = 70;
        var maxStagger = 4;
        var delay = Math.min(siblingIndex, maxStagger) * staggerStep;
        el.style.transitionDelay = delay + "ms";
      }
    });

    var observer = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );

    revealTargets.forEach(function (el) { observer.observe(el); });
  } else {
    revealTargets.forEach(function (el) { el.classList.add("reveal-init", "is-visible"); });
  }

  // Mobile nav toggle
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
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", dydMainInit);
} else {
  dydMainInit();
}
