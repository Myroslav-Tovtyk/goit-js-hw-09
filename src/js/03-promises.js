const refs = {    
  btnSubmit: document.querySelector('.form'),
};

refs.btnSubmit.addEventListener('submit', onFormSubmit);

function onFormSubmit(e) {
  e.preventDefault();
  const formData = new FormData(refs.btnSubmit);  
  const delay = formData.get("delay");
  const step = formData.get("step");
  const amount = formData.get("amount");
  generatorPromices(delay, step, amount);
  e.target.reset();
};

function generatorPromices(delay, step, amount) {
  for (let i = 0; i < amount; i++){
    delay += step;

    createPromise(i, delay)
      .then(({ position, delay }) => {
        console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        console.log(`❌ Rejected promise ${position} in ${delay}ms`);
      })
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
