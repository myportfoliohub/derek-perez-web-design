const navToggle = document.getElementById("navToggle");
const siteNav = document.getElementById("siteNav");
const rushToggle = document.getElementById("rushToggle");
const yearEl = document.getElementById("year");

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

function formatUsd(amount) {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0
    }).format(amount);
}

function updatePricing() {
    const rushEnabled = rushToggle?.checked ?? false;
    const rushFee = 29;

    document.querySelectorAll("[data-price-display]").forEach((priceEl) => {
        const basePrice = Number(priceEl.getAttribute("data-base-price"));
        const updatedPrice = rushEnabled ? basePrice + rushFee : basePrice;
        priceEl.textContent = formatUsd(updatedPrice);
    });

    document.querySelectorAll(".paypal-form").forEach((form) => {
        const basePrice = Number(form.getAttribute("data-base-price"));
        const packageName = form.getAttribute("data-package") || "Portfolio Website Package";
        const updatedPrice = rushEnabled ? basePrice + rushFee : basePrice;

        const amountInput = form.querySelector("[data-amount-input]");
        const customInput = form.querySelector("[data-custom-input]");
        const button = form.querySelector("button[type='submit']");
        const itemNameInput = form.querySelector("input[name='item_name']");

        if (amountInput) {
            amountInput.value = updatedPrice.toFixed(2);
        }

        if (itemNameInput) {
            itemNameInput.value = rushEnabled
                ? `${packageName} + Rush Delivery`
                : packageName;
        }

        if (customInput) {
            customInput.value = rushEnabled
                ? `${packageName} | Rush delivery added`
                : `${packageName} | Standard delivery`;
        }

        if (button) {
            if (basePrice === 100) {
                button.textContent = rushEnabled
                    ? "Buy Basic + Rush"
                    : "Buy Basic Package";
            } else if (basePrice === 250) {
                button.textContent = rushEnabled
                    ? "Buy Complete + Rush"
                    : "Buy Complete Package";
            } else {
                button.textContent = rushEnabled
                    ? "Buy Package + Rush"
                    : "Buy Package";
            }
        }
    });
}

if (rushToggle) {
    rushToggle.addEventListener("change", updatePricing);
}

updatePricing();