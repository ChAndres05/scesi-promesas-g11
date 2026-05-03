/* ===================================================
   CSESI Promesas G11 — script.js
   Navbar toggle + interactividad de proteccion.html
   =================================================== */

/* ── Navbar mobile toggle (index.html) ──────────────── */
const menuToggle = document.querySelector("#menuToggle");
const navLinks   = document.querySelector("#navLinks");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });

  navLinks.addEventListener("click", (event) => {
    if (event.target.tagName === "A") {
      navLinks.classList.remove("active");
    }
  });
}

/* ── Interactividad de Protección & Privacidad ───────── */
document.addEventListener("DOMContentLoaded", () => {

  /* ────────────────────────────────────────────────
     1. MEDIDOR DE FORTALEZA DE CONTRASEÑA
  ──────────────────────────────────────────────── */
  const pwInput       = document.getElementById("pwInput");
  const togglePw      = document.getElementById("togglePw");
  const strengthBar   = document.getElementById("strengthBar");
  const strengthLabel = document.getElementById("strengthLabel");
  const cLen          = document.getElementById("c-len");
  const cUpper        = document.getElementById("c-upper");
  const cLower        = document.getElementById("c-lower");
  const cNum          = document.getElementById("c-num");
  const cSym          = document.getElementById("c-sym");

  if (pwInput) {
    togglePw.addEventListener("click", () => {
      const isText = pwInput.type === "text";
      pwInput.type = isText ? "password" : "text";
      togglePw.textContent = isText ? "👁" : "🙈";
    });

    pwInput.addEventListener("input", () => {
      const val = pwInput.value;
      const checks = {
        len:   val.length >= 12,
        upper: /[A-Z]/.test(val),
        lower: /[a-z]/.test(val),
        num:   /[0-9]/.test(val),
        sym:   /[^A-Za-z0-9]/.test(val),
      };

      setMet(cLen,   checks.len,   "✔ Al menos 12 caracteres", "✘ Al menos 12 caracteres");
      setMet(cUpper, checks.upper, "✔ Mayúscula",              "✘ Mayúscula");
      setMet(cLower, checks.lower, "✔ Minúscula",              "✘ Minúscula");
      setMet(cNum,   checks.num,   "✔ Número",                 "✘ Número");
      setMet(cSym,   checks.sym,   "✔ Símbolo (!@#$…)",        "✘ Símbolo (!@#$…)");

      const score = Object.values(checks).filter(Boolean).length;
      const levels = [
        { label: "Muy débil",  color: "#ff4444", w: "15%"  },
        { label: "Débil",      color: "#ff6b6b", w: "30%"  },
        { label: "Regular",    color: "#ffaa00", w: "55%"  },
        { label: "Fuerte",     color: "#4ea8ff", w: "80%"  },
        { label: "Muy fuerte", color: "#38f2af", w: "100%" },
      ];

      if (!val.length) {
        strengthBar.style.width = "0";
        strengthLabel.textContent = "—";
        strengthLabel.style.color = "var(--text-muted)";
        return;
      }

      const lvl = levels[score - 1] || levels[0];
      strengthBar.style.width      = lvl.w;
      strengthBar.style.background = lvl.color;
      strengthLabel.textContent    = lvl.label;
      strengthLabel.style.color    = lvl.color;
    });
  }

  function setMet(el, met, textMet, textNot) {
    if (!el) return;
    el.textContent = met ? textMet : textNot;
    el.classList.toggle("met", met);
  }

  /* ────────────────────────────────────────────────
     2. GENERADOR DE FRASE CLAVE
  ──────────────────────────────────────────────── */
  const WORDS = [
    "Montaña","Tigre","Estrella","Dragón","Cohete","Planeta",
    "Tormenta","Cristal","Bosque","Delfín","Aurora","Volcán",
    "Galaxia","Relámpago","Cascada","Halcón","Océano","Cometa",
    "Jungla","Pirámide","Nebulosa","Trueno","Laberinto","Fénix",
  ];
  const ADJECTIVES = [
    "Veloz","Secreto","Digital","Invencible","Brillante","Oscuro",
    "Cósmico","Silencioso","Furioso","Eterno","Invisible","Salvaje",
  ];

  const generateBtn     = document.getElementById("generatePhrase");
  const generatedPhrase = document.getElementById("generatedPhrase");

  if (generateBtn) {
    generateBtn.addEventListener("click", () => {
      const w1  = pick(WORDS);
      const adj = pick(ADJECTIVES);
      const w2  = pick(WORDS);
      const num = Math.floor(Math.random() * 90) + 10;
      const sym = pick(["!", "@", "#", "$", "&", "*"]);
      const phrase = `${w1}${adj}${w2}${num}${sym}`;
      generatedPhrase.textContent = phrase;
      generatedPhrase.style.animation = "none";
      requestAnimationFrame(() => { generatedPhrase.style.animation = ""; });
    });
  }

  function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

  /* ────────────────────────────────────────────────
     3. SIMULADOR 2FA / TOTP
  ──────────────────────────────────────────────── */
  const totpCode   = document.getElementById("totpCode");
  const timerArc   = document.getElementById("timerArc");
  const timerCount = document.getElementById("timerCount");

  if (totpCode) {
    let secondsLeft = 30;
    updateTOTP();
    tick();

    function tick() {
      setInterval(() => {
        secondsLeft--;
        if (secondsLeft <= 0) {
          secondsLeft = 30;
          updateTOTP();
        }
        updateTimer(secondsLeft);
      }, 1000);
    }

    function updateTOTP() {
      const code = String(Math.floor(100000 + Math.random() * 900000));
      totpCode.style.opacity = "0.3";
      setTimeout(() => {
        totpCode.textContent = code;
        totpCode.style.opacity = "1";
        totpCode.style.transition = "opacity 0.4s ease";
      }, 200);
    }

    function updateTimer(secs) {
      if (timerCount) timerCount.textContent = secs;
      if (timerArc) {
        const progress = (secs / 30) * 100;
        timerArc.style.strokeDashoffset = 100 - progress;
      }
    }

    updateTimer(30);
  }

  /* ────────────────────────────────────────────────
     4. MODAL DE TIPS DE PRIVACIDAD
  ──────────────────────────────────────────────── */
  const modal      = document.getElementById("tipModal");
  const modalClose = document.getElementById("modalClose");
  const tipContent = document.getElementById("tipContent");

  document.querySelectorAll(".tip-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const card = btn.closest(".privacy-card");
      const tip  = card?.dataset.tip;
      if (!tip || !modal) return;
      tipContent.textContent = tip;
      modal.classList.add("open");
      modal.setAttribute("aria-hidden", "false");
    });
  });

  function closeModal() {
    if (!modal) return;
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
  }

  if (modalClose) modalClose.addEventListener("click", closeModal);
  if (modal) {
    modal.addEventListener("click", e => { if (e.target === modal) closeModal(); });
  }
  document.addEventListener("keydown", e => { if (e.key === "Escape") closeModal(); });

});
