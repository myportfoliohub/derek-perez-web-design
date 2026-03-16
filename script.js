const navToggle = document.getElementById("navToggle");
const siteNav = document.getElementById("siteNav");
const yearEl = document.getElementById("year");
const packageTypeSelect = document.getElementById("packageType");
const checkoutPanel = document.getElementById("checkout");

if (yearEl) {
    yearEl.textContent = new Date().getFullYear().toString();
}

if (navToggle && siteNav) {
    navToggle.addEventListener("click", () => {
        const isOpen = siteNav.classList.toggle("is-open");
        navToggle.setAttribute("aria-expanded", String(isOpen));
    });

    siteNav.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            siteNav.classList.remove("is-open");
            navToggle.setAttribute("aria-expanded", "false");
        });
    });
}

document.querySelectorAll("[data-package-select]").forEach((button) => {
    button.addEventListener("click", () => {
        const packageValue = button.getAttribute("data-package-select");

        if (packageTypeSelect && packageValue) {
            packageTypeSelect.value = packageValue;
            packageTypeSelect.focus();
        }

        checkoutPanel?.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    });
});
