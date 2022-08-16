function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};

const bodyEl = document.querySelector("body");
const btnStartEl = document.querySelector('[data-start]');
const btnStopEl = document.querySelector('[data-stop]');

btnStartEl.addEventListener('click', onStartBtnClick);
btnStopEl.addEventListener('click', onStopBtnClick);

let timerInterval = null;

btnStopEl.setAttribute('disabled', true);

function onStartBtnClick(e) {
    if (e.target) {  
        btnStartEl.setAttribute('disabled', true);
        btnStopEl.removeAttribute('disabled');
        timerInterval = setInterval(() => {            
            return bodyEl.style.backgroundColor = getRandomHexColor();
        }, 1000);        
    };
}

function onStopBtnClick(e) {
    if (e.target) {
        btnStartEl.removeAttribute('disabled');
        btnStopEl.setAttribute('disabled', true);
        clearInterval(timerInterval);
    };    
};