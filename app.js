
let cyclesTime = 0;

const objetTime = {
  timeWork: 10,
  timeRest: 10,
};

const workDisplayTime = document.querySelector(".work-display-time");
const pauseDisplayTime = document.querySelector(".pause-display-time");
let intervalIdTimer;
let intervalIdRepos;

initTime(objetTime.timeWork, objetTime.timeRest);

// Inititalisation HTML valeur Travail et Repos
function initTime(timeWorkSecond, timeRestSecond) {
  const minutesTimeWork = Math.floor(timeWorkSecond / 60);
  const secondsTimeWork = timeWorkSecond % 60;
  // Met à jour l'affichage
  workDisplayTime.textContent = `${minutesTimeWork
    .toString()
    .padStart(2, "0")}:${secondsTimeWork.toString().padStart(2, "0")}`;

  const minutesTimeRest = Math.floor(timeRestSecond / 60);
  const secondsTimeRest = timeRestSecond % 60;
  // Met à jour l'affichage
  pauseDisplayTime.textContent = `${minutesTimeRest
    .toString()
    .padStart(2, "0")}:${secondsTimeRest.toString().padStart(2, "0")}`;
}

// Compte a rebourd Travail
function startTimer(durationInSeconds) {
  let remainingTime = durationInSeconds;

    intervalIdTimer = setInterval(() => {
    const minutes = Math.floor(remainingTime / 60);
    const seconds = remainingTime % 60;

    // Met à jour l'affichage
    workDisplayTime.textContent = `${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

    remainingTime--;

    // Arrête le minuteur quand le temps est écoulé et passe au repos
    if (remainingTime < 0) {
      clearInterval(intervalIdTimer);
      workDisplayTime.textContent = "00:00";
      startRepos(objetTime.timeRest);
    }
  }, 1000);
}

//Compte à rebours ReposF
function startRepos(durationInSeconds) {
  let remainingTime = durationInSeconds;

    intervalIdRepos = setInterval(() => {
    const minutes = Math.floor(remainingTime / 60);
    const seconds = remainingTime % 60;

    // Met à jour l'affichage
    pauseDisplayTime.textContent = `${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

    remainingTime--;

    // Arrête le minuteur quand le temps est écoulé et passe au repos
    if (remainingTime < 0) {
      clearInterval(intervalIdRepos);
      initTime(objetTime.timeWork, objetTime.timeRest);
      cyclesTime+=1;
      const cycles = document.querySelector('.cycles');
      cycles.textContent=`Cycle(s) : ${cyclesTime}`;
      // Relance un cycle :
      startTimer(objetTime.timeWork);
    }
  }, 1000);
}

// Declaration des boutons
const toggleBtn = document.querySelector(".toggle-btn");

let lock=false;
//Evenement Appui btn 
toggleBtn.addEventListener("click", () => {
  // Lancer le travail de 30min soit 1800s.
  if (lock) return;
  setTimeout(()=>{
      lock=true;
      startTimer(objetTime.timeWork);

  },objetTime.timeWork+objetTime.timeRest)
});

const resetBtn = document.querySelector(".reset-btn");
resetBtn.addEventListener('click',()=>{
    cyclesTime=0;
    const cycles = document.querySelector('.cycles');
    cycles.textContent=`Cycle(s) : ${cyclesTime}`;
    initTime(objetTime.timeWork, objetTime.timeRest);
    clearInterval(intervalIdRepos);
    clearInterval(intervalIdTimer)
    lock=false;
})