import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import iziToast from 'izitoast';

import 'izitoast/dist/css/iziToast.min.css';

const startButton = document.querySelector('button[data-start]');
const input = document.querySelector('#datetime-picker');

startButton.disabled = true;
const currentDate = new Date();

let userSelectedDate;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates.length > 0) {
      const selectedDate = selectedDates[0];
      if (selectedDate >= currentDate) {
        userSelectedDate = selectedDate;
        startButton.disabled = false;
      } else {
        iziToast.show({
          title: '',
          message: 'Please choose a date in the future',
          color: 'red',
          icon: 'fa fa-times-circle',
          position: 'topCenter',
          timeout: 3000,
          close: true,
          closeOnClick: true,
        });
        startButton.disabled = true;
      }
    }
  },
};

flatpickr('#datetime-picker', options);

const elements = {
  seconds: document.querySelector('[data-seconds]'),
  minutes: document.querySelector('[data-minutes]'),
  hours: document.querySelector('[data-hours]'),
  days: document.querySelector('[data-days]'),
};

startButton.addEventListener('click', handlerClick);

function handlerClick() {
  const timeDiff = userSelectedDate.getTime() - currentDate.getTime();

  if (timeDiff <= 0) {
    iziToast.show({
      title: '',
      message: 'Please choose a date in the future',
      color: 'red',
      icon: 'fa fa-times-circle',
      position: 'topCenter',
      timeout: 3000,
      close: true,
      closeOnClick: true,
    });
    return;
  }

  input.disabled = true;
  startButton.disabled = true;

  const countdownInterval = setInterval(updateCountdown, 1000);
  updateCountdown();

  function updateCountdown() {
    const timeLeft = userSelectedDate.getTime() - new Date().getTime();

    if (timeLeft <= 0) {
      clearInterval(countdownInterval);
      input.disabled = false;
      return;
    }

    const { days, hours, minutes, seconds } = convertMs(timeLeft);

    elements.days.textContent = addLeadingZero(days);
    elements.hours.textContent = addLeadingZero(hours);
    elements.minutes.textContent = addLeadingZero(minutes);
    elements.seconds.textContent = addLeadingZero(seconds);
  }
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);

  const hours = Math.floor((ms % day) / hour);

  const minutes = Math.floor(((ms % day) % hour) / minute);

  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}
