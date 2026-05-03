/* ===================================================
   CSESI Promesas G11 — script.js
   Navbar toggle + proteccion.html + quiz interactivo
   =================================================== */

const menuToggle = document.querySelector("#menuToggle");
const navLinks = document.querySelector("#navLinks");

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

document.addEventListener("DOMContentLoaded", () => {
  const quizQuestions = document.querySelectorAll(".quiz-question");
  const scoreText = document.getElementById("score");
  const finalText = document.getElementById("final");
  const resetQuizBtn = document.getElementById("resetQuiz");

  let score = 0;
  let answered = Array.from(quizQuestions).map(() => false);

  quizQuestions.forEach((questionElement, questionIndex) => {
    const buttons = questionElement.querySelectorAll(".quiz-option");

    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        if (answered[questionIndex]) return;

        answered[questionIndex] = true;

        const isCorrect = button.dataset.correct === "true";

        if (isCorrect) {
          score++;
          button.classList.add("correct");
        } else {
          button.classList.add("incorrect");
        }

        buttons.forEach((btn) => {
          btn.classList.add("disabled");
          btn.disabled = true;
        });

        updateScore();
        checkFinal();
      });
    });
  });

  function updateScore() {
    if (!scoreText) return;
    scoreText.textContent = `Puntaje: ${score}/${quizQuestions.length}`;
  }

  function checkFinal() {
    if (!finalText) return;

    const quizFinished = answered.every((item) => item);

    if (!quizFinished) return;

    if (score === quizQuestions.length) {
      finalText.textContent = "¡Excelente! Tienes muy buenos conocimientos básicos de ciberseguridad.";
    } else if (score >= 2) {
      finalText.textContent = "Bien, pero puedes mejorar repasando los conceptos principales.";
    } else {
      finalText.textContent = "Necesitas mejorar. Revisa los módulos de seguridad web y prevención.";
    }
  }

  if (resetQuizBtn) {
    resetQuizBtn.addEventListener("click", () => {
      score = 0;
      answered = Array.from(quizQuestions).map(() => false);

      quizQuestions.forEach((questionElement) => {
        const buttons = questionElement.querySelectorAll(".quiz-option");

        buttons.forEach((button) => {
          button.classList.remove("correct", "incorrect", "disabled");
          button.disabled = false;
        });
      });

      updateScore();

      if (finalText) {
        finalText.textContent = "";
      }
    });
  }

  const pwInput = document.getElementById("pwInput");
  const togglePw = document.getElementById("togglePw");
  const strengthBar = document.getElementById("strengthBar");
  const strengthLabel = document.getElementById("strengthLabel");
  const cLen = document.getElementById("c-len");
  const cUpper = document.getElementById("c-upper");
  const cLower = document.getElementById("c-lower");
  const cNum = document.getElementById("c-num");
  const cSym = document.getElementById("c-sym");

  if (pwInput && togglePw) {
    togglePw.addEventListener("click", () => {
      const isText = pwInput.type === "text";
      pwInput.type = isText ? "password" : "text";
      togglePw.textContent = isText ? "👁" : "🙈";
    });

    pwInput.addEventListener("input", () => {
      const val = pwInput.value;

      const checks = {
        len: val.length >= 12,
        upper: /[A-Z]/.test(val),
        lower: /[a-z]/.test(val),
        num: /[0-9]/.test(val),
        sym: /[^A-Za-z0-9]/.test(val),
      };

      setMet(cLen, checks.len, "✔ Al menos 12 caracteres", "✘ Al menos 12 caracteres");
      setMet(cUpper, checks.upper, "✔ Mayúscula", "✘ Mayúscula");
      setMet(cLower, checks.lower, "✔ Minúscula", "✘ Minúscula");
      setMet(cNum, checks.num, "✔ Número", "✘ Número");
      setMet(cSym, checks.sym, "✔ Símbolo (!@#$…)", "✘ Símbolo (!@#$…)");

      const pwScore = Object.values(checks).filter(Boolean).length;

      const levels = [
        { label: "Muy débil", color: "#ff4444", w: "15%" },
        { label: "Débil", color: "#ff6b6b", w: "30%" },
        { label: "Regular", color: "#ffaa00", w: "55%" },
        { label: "Fuerte", color: "#4ea8ff", w: "80%" },
        { label: "Muy fuerte", color: "#38f2af", w: "100%" },
      ];

      if (!val.length) {
        strengthBar.style.width = "0";
        strengthLabel.textContent = "—";
        strengthLabel.style.color = "var(--text-muted)";
        return;
      }

      const lvl = levels[pwScore - 1] || levels[0];

      strengthBar.style.width = lvl.w;
      strengthBar.style.background = lvl.color;
      strengthLabel.textContent = lvl.label;
      strengthLabel.style.color = lvl.color;
    });
  }

  function setMet(el, met, textMet, textNot) {
    if (!el) return;

    el.textContent = met ? textMet : textNot;
    el.classList.toggle("met", met);
  }

  const WORDS = [
    "Montaña", "Tigre", "Estrella", "Dragón", "Cohete", "Planeta",
    "Tormenta", "Cristal", "Bosque", "Delfín", "Aurora", "Volcán",
    "Galaxia", "Relámpago", "Cascada", "Halcón", "Océano", "Cometa",
    "Jungla", "Pirámide", "Nebulosa", "Trueno", "Laberinto", "Fénix",
  ];

  const ADJECTIVES = [
    "Veloz", "Secreto", "Digital", "Invencible", "Brillante", "Oscuro",
    "Cósmico", "Silencioso", "Furioso", "Eterno", "Invisible", "Salvaje",
  ];

  const generateBtn = document.getElementById("generatePhrase");
  const generatedPhrase = document.getElementById("generatedPhrase");

  if (generateBtn && generatedPhrase) {
    generateBtn.addEventListener("click", () => {
      const w1 = pick(WORDS);
      const adj = pick(ADJECTIVES);
      const w2 = pick(WORDS);
      const num = Math.floor(Math.random() * 90) + 10;
      const sym = pick(["!", "@", "#", "$", "&", "*"]);

      const phrase = `${w1}${adj}${w2}${num}${sym}`;

      generatedPhrase.textContent = phrase;
      generatedPhrase.style.animation = "none";

      requestAnimationFrame(() => {
        generatedPhrase.style.animation = "";
      });
    });
  }

  function pick(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  const totpCode = document.getElementById("totpCode");
  const timerArc = document.getElementById("timerArc");
  const timerCount = document.getElementById("timerCount");

  if (totpCode) {
    let secondsLeft = 30;

    updateTOTP();
    updateTimer(30);

    setInterval(() => {
      secondsLeft--;

      if (secondsLeft <= 0) {
        secondsLeft = 30;
        updateTOTP();
      }

      updateTimer(secondsLeft);
    }, 1000);

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
  }

  const modal = document.getElementById("tipModal");
  const modalClose = document.getElementById("modalClose");
  const tipContent = document.getElementById("tipContent");

  document.querySelectorAll(".tip-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const card = btn.closest(".privacy-card");
      const tip = card?.dataset.tip;

      if (!tip || !modal || !tipContent) return;

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

  if (modalClose) {
    modalClose.addEventListener("click", closeModal);
  }

  if (modal) {
    modal.addEventListener("click", (event) => {
      if (event.target === modal) closeModal();
    });
  }

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeModal();
  });
});