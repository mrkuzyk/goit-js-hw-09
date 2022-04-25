startBtn = document.querySelector('[data-start]')
stopBtn = document.querySelector('[data-stop]')
body = document.querySelector('body')
let timerId = null;

startBtn.addEventListener('click', onStartChangeColor);
stopBtn.addEventListener('click', onStopBtn);

// рандомна функція зміни кольору
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

// функія заміни бекгранда іншим кольором
function changeColor() {
    body.style.backgroundColor = getRandomHexColor();
}

// функція після натискання кнопки старт
function onStartChangeColor () {
    timerId = setInterval(changeColor, 1000); //? міняю колір фону кожні 1000 мс
    startBtn.disabled = true; //? при включенній кнопці старт, роблю її неактивною
    
}

// функція після натискання кнопки стоп
function onStopBtn() {
    clearInterval(timerId); //? виключаю зміну кольору після натисепння стоп
    startBtn.disabled = false; //? при виключенній анімації, старт роблю активною
}



