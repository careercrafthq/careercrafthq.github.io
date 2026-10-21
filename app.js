// ===== LANGUAGE DROPDOWN =====
const btn = document.querySelector(".lang-btn");
const menu = document.querySelector(".lang-menu");

// otvaranje / zatvaranje menija
btn.addEventListener("click", () => {
    menu.classList.toggle("show");
});

// klik na jezik
document.querySelectorAll(".lang-menu li").forEach(item => {
    item.addEventListener("click", () => {
        const lang = item.dataset.lang;

        // spremi odabrani jezik
        localStorage.setItem("lang", lang);

        // promijeni tekst dugmeta (zastava + naziv)
        btn.innerHTML = item.innerHTML;

        // zatvori meni
        menu.classList.remove("show");

        applyTranslations(lang);

        console.log("Selected language:", lang);
    });
});

// zatvaranje menija klikom van njega
document.addEventListener("click", (e) => {
    if (!btn.contains(e.target) && !menu.contains(e.target)) {
        menu.classList.remove("show");
    }
});

// ===== APPLY TRANSLATIONS =====
function applyTranslations(lang) {

    // TEXT
    document.querySelectorAll("[data-i18n]").forEach(el => {
        const key = el.dataset.i18n;
        if (translations[lang][key]) {
            el.textContent = translations[lang][key];
        }
    });

    // PLACEHOLDERS
    document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
        const key = el.dataset.i18nPlaceholder;
        if (translations[lang][key]) {
            el.placeholder = translations[lang][key];
        }
    });

    // SELECT OPTIONS
    document.querySelectorAll("option[data-i18n]").forEach(el => {
        const key = el.dataset.i18n;
        if (translations[lang][key]) {
            el.textContent = translations[lang][key];
        }
    });

    localStorage.setItem("lang", lang);
}


// učitaj spremljeni jezik ili default en-us
const savedLang = localStorage.getItem("lang") || "en-us";
applyTranslations(savedLang);