/* =========================================================
   RAGNAROK FIGHT CLUB — INTERACTIONS
   File: index.js
   ========================================================= */

(() => {
  "use strict";

  const menuButton = document.querySelector(".menu-toggle");
  const navPanel = document.querySelector("#primary-menu");
  const navLinks = document.querySelectorAll("#primary-menu a");

  if (menuButton && navPanel) {
    const closeMenu = () => {
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "Buka menu");
      navPanel.classList.remove("is-open");
      document.body.classList.remove("menu-open");
    };

    const openMenu = () => {
      menuButton.setAttribute("aria-expanded", "true");
      menuButton.setAttribute("aria-label", "Tutup menu");
      navPanel.classList.add("is-open");
      document.body.classList.add("menu-open");
    };

    menuButton.addEventListener("click", () => {
      const isExpanded = menuButton.getAttribute("aria-expanded") === "true";
      isExpanded ? closeMenu() : openMenu();
    });

    navLinks.forEach((link) => link.addEventListener("click", closeMenu));

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeMenu();
    });

    document.addEventListener("click", (event) => {
      if (
        menuButton.getAttribute("aria-expanded") === "true" &&
        !navPanel.contains(event.target) &&
        !menuButton.contains(event.target)
      ) {
        closeMenu();
      }
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 680) closeMenu();
    });
  }

  const yearElement = document.querySelector("#current-year");
  if (yearElement) yearElement.textContent = new Date().getFullYear();
})();
