import Notiflix from 'notiflix';

const refs = {    
  btnSubmit: document.querySelector('.form'),
};

refs.btnSubmit.addEventListener('submit', onFormSubmit);

function onFormSubmit(e) {
  e.preventDefault();
  const formData = new FormData(refs.btnSubmit);  
  let delay = Number(formData.get('delay'));
  const step = Number(formData.get("step"));
  const amount = Number(formData.get("amount"));
  generatorPromices(delay, step, amount);
  e.target.reset();
};

function generatorPromices(delay, step, amount) {
  for (let i = 1; i <= amount; i++){    

    createPromise(i, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.warning(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    delay += step;
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      };
    }, delay);
  });
};
