/* ===================================================
   CSESI Promesas G11 — Protección & Privacidad
   Script interactivo: medidor contraseñas, 2FA,
   generador de frases y modal de privacidad
   =================================================== */

document.addEventListener("DOMContentLoaded", () => {

  /* ────────────────────────────────────────────────
     1. MEDIDOR DE FORTALEZA DE CONTRASEÑA
  ──────────────────────────────────────────────── */
  const pwInput      = document.getElementById("pwInput");
  const togglePw     = document.getElementById("togglePw");
  const strengthBar  = document.getElementById("strengthBar");
  const strengthLabel= document.getElementById("strengthLabel");
  const cLen         = document.getElementById("c-len");
  const cUpper       = document.getElementById("c-upper");
  const cLower       = document.getElementById("c-lower");
  const cNum         = document.getElementById("c-num");
  const cSym         = document.getElementById("c-sym");

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

      // Update criteria list
      setMet(cLen,   checks.len,   "✔ Al menos 12 caracteres",  "✘ Al menos 12 caracteres");
      setMet(cUpper, checks.upper, "✔ Mayúscula",               "✘ Mayúscula");
      setMet(cLower, checks.lower, "✔ Minúscula",               "✘ Minúscula");
      setMet(cNum,   checks.num,   "✔ Número",                  "✘ Número");
      setMet(cSym,   checks.sym,   "✔ Símbolo (!@#$…)",         "✘ Símbolo (!@#$…)");

      const score = Object.values(checks).filter(Boolean).length;

      const levels = [
        { label: "Muy débil",  color: "#ff4444", w: "15%" },
        { label: "Débil",      color: "#ff6b6b", w: "30%" },
        { label: "Regular",    color: "#ffaa00", w: "55%" },
        { label: "Fuerte",     color: "#4ea8ff", w: "80%" },
        { label: "Muy fuerte", color: "#38f2af", w: "100%" },
      ];

      if (!val.length) {
        strengthBar.style.width = "0";
        strengthLabel.textContent = "—";
        strengthLabel.style.color = "var(--text-muted)";
        return;
      }

      const lvl = levels[score - 1] || levels[0];
      strengthBar.style.width    = lvl.w;
      strengthBar.style.background = lvl.color;
      strengthLabel.textContent  = lvl.label;
      strengthLabel.style.color  = lvl.color;
    });
  }

  function setMet(el, met, textMet, textNot) {
    if (!el) return;
    el.textContent = met ? textMet : textNot;
    el.classList.toggle("met", met);
  }
  
});