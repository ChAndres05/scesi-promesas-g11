let score = 0;
let answered = [false, false, false];

function checkAnswer(question, correct, button) {
  if (answered[question]) return;

  answered[question] = true;

  if (correct) {
    score++;
    button.style.background = "green";
  } else {
    button.style.background = "red";
  }

  document.getElementById("score").textContent =
    "Puntaje: " + score + "/3";

  checkFinal();
}

function checkFinal() {
  if (answered.every(a => a)) {
    let message = "";

    if (score === 3) message = "Excelente!";
    else if (score === 2) message = "Bien, pero puedes mejorar";
    else message = "Necesitas mejorar";

    document.getElementById("final").textContent = message;
  }
}