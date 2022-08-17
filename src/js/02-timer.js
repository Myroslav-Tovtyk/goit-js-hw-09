import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const refs = {
    inputPicker: document.querySelector('#datetime-picker'),
    startBtn: document.querySelector('[data-start]')
};

const timerRefs = {
    days: document.querySelector('[data-days]'),
    hours: document.querySelector('[data-hours]'),
    minutes: document.querySelector('[data-minutes]'),
    seconds: document.querySelector('[data-seconds]')
}

refs.startBtn.addEventListener('click', () => {
    timer.start();
});

let startTime = null;
refs.startBtn.disabled = true;


const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
onClose(selectedDates) {
    if (selectedDates[0] < Date.now()) {
        alert('Please select valid date in the future');
      };
      startTime = selectedDates[0].getTime();
    },
onChange(selectedDates) {
    if (selectedDates[0] > Date.now()) {
        refs.startBtn.disabled = false;
    } else {
        refs.startBtn.disabled = true;
    };
  },
};

flatpickr(refs.inputPicker, options);

const timer = {
    intervalId: null,
    isActive: false,
    stop() {
        clearInterval(this.intervalId);
        refs.startBtn.disabled = false;
        this.isActive = false;
    },
    start() {
        if(this.isActive) {
        return;
        };
        this.isActive = true;
        refs.startBtn.disabled = true;
        this.intervalId = setInterval(() => {
            const currentTime = Date.now();
            const deltaTime = startTime - currentTime;
            const time = convertMs(deltaTime);            
            updClockFace(time);

            if (deltaTime <= 1000) {
                timer.stop();
                alert('You won 1 000 000$. Congratulations!!!');
            return;
        };
        }, 1000);        
    },
};

function pad(value) {
    return String(value).padStart(2, '0');
};

function updClockFace(time) {
    for (const key of Object.keys(timerRefs)){
        timerRefs[key].textContent = pad(time[key]);
    };
};

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
};
