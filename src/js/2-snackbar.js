// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');

form.addEventListener('submit', headlerSubmitForm);

function headlerSubmitForm(event) {
  event.preventDefault();

  const delay = form.querySelector('input[name="delay"]').value;
  const state = form.elements['state'].value;

  const promise = new Promise((res, rej) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        res(delay);
      } else {
        rej(delay);
      }
    }, delay);
  });

  promise
    .then(delay => {
      iziToast.success({
        icon: false,
        message: `✅ Fulfilled promise in ${delay}ms`,
        position: 'topCenter',
        messageColor: 'white',
        backgroundColor: '#4CAF50',
      });
    })
    .catch(delay => {
      iziToast.error({
        icon: false,
        message: `❌ Rejected promise in ${delay}ms`,
        messageColor: 'white',
        position: 'topCenter',
        backgroundColor: '#E53935',
      });
    });
}
