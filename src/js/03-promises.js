import Notiflix, { Notify } from 'notiflix';

const formEl = document.querySelector('.form');

formEl.addEventListener('submit', onFormSubmit); //? слухач на відправку форми

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3; //? рандомна функція

  //? проміс в повертає при виконанні умови і не виконанні
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
          console.log(position);
      }
    }, delay);
  });
};

function onFormSubmit(e) {
  e.preventDefault(); //? дефолтні налаштування (неоновлюється сторінка після відправки)

  //? забираю з елементів форм числа
  let delay = Number(formEl.elements.delay.value);
  const step = Number(formEl.elements.step.value);
  const amount = Number(formEl.elements.amount.value);

  //? перебираю кількість промісів з кроком +1
  for (let i = 1; i <= amount; i += 1) {

    //? проміс на кожному кроці показує хороший чи поганий результат
    createPromise(i, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(` Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(` Rejected promise ${position} in ${delay}ms`);
      });
  delay += step; //? до першого значення додаю крок (ставлю після промісу, щоб не починалося зразу з суми)
  };

  // formEl.reset(); //? після запуску очищує форму
}

