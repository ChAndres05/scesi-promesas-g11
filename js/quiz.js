// ===========================
// ESTADO DEL QUIZ
// ===========================
const TOTAL_QUESTIONS = 5;
let score = 0;
let answered = new Array(TOTAL_QUESTIONS).fill(false);

// Textos de feedback por pregunta (correcto / incorrecto)
const feedbacks = [
  {
    correct: "✅ Correcto. HTTPS (HyperText Transfer Protocol Secure) cifra la comunicación entre tu navegador y el servidor web.",
    wrong: "❌ Incorrecto. HTTPS es un protocolo de seguridad que cifra los datos transmitidos. El candado en tu navegador lo indica."
  },
  {
    correct: "✅ Correcto. Los archivos de fuentes desconocidas pueden contener virus, ransomware u otro malware.",
    wrong: "❌ Incorrecto. Nunca es seguro descargar archivos de fuentes no verificadas, aunque parezcan normales."
  },
  {
    correct: "✅ Correcto. Ante un enlace sospechoso, lo mejor es no abrirlo y reportarlo como phishing.",
    wrong: "❌ Incorrecto. Abrir o reenviar links sospechosos puede comprometer tu seguridad o la de tus contactos."
  },
  {
    correct: "✅ Correcto. El 2FA requiere un segundo factor (código SMS, app autenticadora) además de la contraseña.",
    wrong: "❌ Incorrecto. El 2FA es una capa extra de seguridad, no afecta la velocidad ni el diseño."
  },
  {
    correct: "✅ Correcto. El candado indica que la conexión usa HTTPS y los datos viajan cifrados.",
    wrong: "❌ Incorrecto. El candado significa que el sitio usa HTTPS. No indica que sea gratuito ni que esté bloqueado."
  }
];

// Mensajes según puntaje
function getFinalMessage(s, total) {
  const ratio = s / total;
  if (ratio === 1)     return "🏆 ¡Perfecto! Eres un experto en ciberseguridad.";
  if (ratio >= 0.8)    return "🎉 ¡Excelente! Casi perfecto, sigue así.";
  if (ratio >= 0.6)    return "👍 Bien, pero aún puedes mejorar.";
  if (ratio >= 0.4)    return "⚠️ Regular. Repasa los módulos anteriores.";
  return "📚 Necesitas reforzar tus conocimientos. ¡No te rindas!";
}

// ===========================
// LÓGICA DEL QUIZ
// ===========================
function checkAnswer(questionIndex, isCorrect, button) {
  if (answered[questionIndex]) return;

  answered[questionIndex] = true;

  const card = document.getElementById(`q${questionIndex}`);
  const feedbackEl = document.getElementById(`feedback${questionIndex}`);
  const statusEl = document.getElementById(`status${questionIndex}`);
  const allButtons = card.querySelectorAll('.opt-btn');

  // Deshabilitar todos los botones de esta pregunta
  allButtons.forEach(btn => {
    btn.disabled = true;
  });

  if (isCorrect) {
    score++;
    button.classList.add('correct');
    card.classList.add('answered-correct');
    statusEl.textContent = '✅';
    feedbackEl.textContent = feedbacks[questionIndex].correct;
  } else {
    button.classList.add('wrong');
    card.classList.add('answered-wrong');
    statusEl.textContent = '❌';
    feedbackEl.textContent = feedbacks[questionIndex].wrong;
    // Resaltar la correcta si se equivocó
    allButtons.forEach(btn => {
      if (btn.onclick && btn.onclick.toString().includes('true')) {
        btn.classList.add('correct');
      }
    });
  }

  // Mostrar feedback con animación
  feedbackEl.classList.add('show');

  // Actualizar puntaje y barra de progreso
  updateScoreDisplay();
  updateProgress();

  // Verificar si terminó el quiz
  if (answered.every(a => a)) {
    setTimeout(showFinalResult, 500);
  }
}

function updateScoreDisplay() {
  const answeredCount = answered.filter(a => a).length;
  document.getElementById('score').textContent = `${score}/${answeredCount}`;
}

function updateProgress() {
  const answeredCount = answered.filter(a => a).length;
  const pct = (answeredCount / TOTAL_QUESTIONS) * 100;
  document.getElementById('progress-fill').style.width = pct + '%';
  document.getElementById('progress-text').textContent =
    `${answeredCount} de ${TOTAL_QUESTIONS} respondidas`;
}

function showFinalResult() {
  document.getElementById('score').textContent = `${score}/${TOTAL_QUESTIONS}`;
  document.getElementById('final').textContent = getFinalMessage(score, TOTAL_QUESTIONS);
  document.getElementById('retry-btn').style.display = 'inline-block';

  // Scroll suave al panel de puntaje
  document.getElementById('score-panel').scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// ===========================
// REINICIAR QUIZ
// ===========================
function resetQuiz() {
  score = 0;
  answered = new Array(TOTAL_QUESTIONS).fill(false);

  // Resetear UI de cada pregunta
  for (let i = 0; i < TOTAL_QUESTIONS; i++) {
    const card = document.getElementById(`q${i}`);
    const feedbackEl = document.getElementById(`feedback${i}`);
    const statusEl = document.getElementById(`status${i}`);
    const allButtons = card.querySelectorAll('.opt-btn');

    card.classList.remove('answered-correct', 'answered-wrong');
    statusEl.textContent = '';
    feedbackEl.textContent = '';
    feedbackEl.classList.remove('show');

    allButtons.forEach(btn => {
      btn.disabled = false;
      btn.classList.remove('correct', 'wrong');
    });
  }

  // Resetear panel de puntaje
  document.getElementById('score').textContent = '0/5';
  document.getElementById('final').textContent = '';
  document.getElementById('retry-btn').style.display = 'none';

  // Resetear progreso
  document.getElementById('progress-fill').style.width = '0%';
  document.getElementById('progress-text').textContent = '0 de 5 respondidas';

  // Scroll al inicio del quiz
  document.getElementById('quiz').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// ===========================
// NAVEGACIÓN DE PANTALLAS
// ===========================
function showScreen(id) {
  // Ocultar menú
  document.getElementById('menu').style.display = 'none';

  // Ocultar todas las secciones
  document.querySelectorAll('.screen').forEach(sec => {
    sec.classList.add('hidden');
    sec.style.display = 'none';
  });

  // Mostrar la sección pedida
  const target = document.getElementById(id);
  target.classList.remove('hidden');
  target.style.display = 'flex';

  // Scroll al inicio
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function goBack() {
  // Ocultar todas las secciones
  document.querySelectorAll('.screen').forEach(sec => {
    sec.classList.add('hidden');
    sec.style.display = 'none';
  });

  // Mostrar menú
  document.getElementById('menu').style.display = 'flex';

  window.scrollTo({ top: 0, behavior: 'smooth' });
}