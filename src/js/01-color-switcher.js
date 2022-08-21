function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};

const bodyEl = document.querySelector("body");
const btnStartEl = document.querySelector('[data-start]');
const btnStopEl = document.querySelector('[data-stop]');

btnStartEl.addEventListener('click', onStartBtnClick);
btnStopEl.addEventListener('click', onStopBtnClick);

let timerInterval = null;

function onStartBtnClick(e) {
    if (e.target) {  
        btnStartEl.disabled = true;
        btnStopEl.disabled = false;
        timerInterval = setInterval(() => {            
            return bodyEl.style.backgroundColor = getRandomHexColor();
        }, 1000);        
    };
}

function onStopBtnClick(e) {
    if (e.target) {
        btnStartEl.disabled = false;
        btnStopEl.disabled = true;
        clearInterval(timerInterval);
    };    
};