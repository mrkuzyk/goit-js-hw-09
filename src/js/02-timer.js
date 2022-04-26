import flatpickr from 'flatpickr';
import "flatpickr/dist/flatpickr.min.css";
import Notiflix, { Notify } from 'notiflix';

const refs = {
    input: document.querySelector('#datetime-picker'),
    startBtn: document.querySelector('[data-start]'),
    days: document.querySelector('[data-days]'),
    hours: document.querySelector('[data-hours]'),
    minutes: document.querySelector('[data-minutes]'),
    seconds: document.querySelector('[data-seconds]'),
};

const curentDate = Date.now(); //? теперішня дата для перевірки
let selectedDate = null; //? вибрана дата попердньо 0
refs.startBtn.disabled = true; //? кнопка попередньо неактивна

//? готовий об'єкт
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
      console.log(selectedDates[0]); // вибрана дата на календарі
      selectedDate = selectedDates[0]; // прирівнюю дати
      checkDate(selectedDate)
  },
};

const calendar = flatpickr(refs.input, options); //? роблю каленлар в інпуті

//? слухач на клік по кнопці старт
refs.startBtn.addEventListener('click', onStart);


//? функція перевірки вибору дати на минуле і майбутнє
function checkDate(selectedDate) {
    if (selectedDate > curentDate) {
        //? якщо вибрана дата в майбутньому
        refs.startBtn.disabled = false;
    } else { 
        // ? якщо вибана дата в минулому
        Notiflix.Notify.failure('Please choose a date in the future');
        // refs.startBtn.disabled = true;
    }
}

function onStart() {
    refs.startBtn.disabled = true; //? після запуску таймера кнопка стає неактивна

    //? інтервал в 1 секунду для слідкування зміни таймера
    setInterval(() => {
        const diffTime = convertMs(selectedDate - Date.now()) //? вираховую різницю  між вибраним часом і зараз
        changeHTML(diffTime); //? функція малювання змін в хтмл
    }, 1000);
}

//? якщо одна цифра то всерівно буде два числа 
function addLeadingZero(value) {
    return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

//? записую в хтмл значення цифрами
function changeHTML({ days, hours, minutes, seconds }) {
    refs.days.textContent = days;
    refs.hours.textContent = addLeadingZero(hours);
    refs.minutes.textContent = addLeadingZero(minutes);
    refs.seconds.textContent = addLeadingZero(seconds);
}
