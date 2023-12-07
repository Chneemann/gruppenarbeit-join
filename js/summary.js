/*Funktion, die asynchron ist, weil erst alle Aufgaben geladen sein müssen */

async function initSummary() {
  showAllTasks();
  showInProgress();
  showAwaitFeedback();
  showToDo();
  showDone();
  greetCurrentUser();
}

/*Funktion, die alle tasks anzeigt*/

function showAllTasks() {
  let tasksInBoard = tasks.length;
  let inBoard = document.getElementById("inBoard");
  inBoard.innerHTML = `
    <span class="txt_number">${tasksInBoard}</span>
    <span class="txt_todo">Tasks in board</span>`;
}

/*Funktionen, die alle tasks in progress anzeigen*/

function showInProgress() {
  let counterProgress = 0;
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].status === "inprogress" && tasks[i].delete === "no") counterProgress++;
    renderInProgress(counterProgress);
  }
}

function renderInProgress(counterProgress) {
  let inProgress = document.getElementById("inProgress");
  inProgress.innerHTML = `
    <span class="txt_number">${counterProgress}</span>
    <span class="txt_todo">Tasks in Progress</span>`;
}

/*Funktionen, die alle tasks in Awaiting feedback anzeigen*/

function showAwaitFeedback() {
  let counterAwait = 0;
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].status === "awaitfeedback" && tasks[i].delete === "no") counterAwait++;
    renderAwaitFeedback(counterAwait);
  }
}

function renderAwaitFeedback(counterAwait) {
  let awaitFeedback = document.getElementById("awaitFeedback");
  awaitFeedback.innerHTML = `
    <span class="txt_number">${counterAwait}</span>
    <span class="txt_todo">Awaiting feedback</span>`;
}

/*Funktionen, die alle tasks in Urgent anzeigen*/

function showUrgent() {
  let counterUrgent = 0;
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].prio === "urgent" && tasks[i].delete === "no") counterUrgent++;
    renderUrgent(counterUrgent);
  }
}

function renderUrgent(counterUrgent) {
  let urGent = document.getElementById("urGent");
  urGent.innerHTML = `
    <div class="txt_number">${counterUrgent}</div>
    <div class="txt_todo">Urgent</div>`;
}

/*Funktionen, die alle tasks in To-Do anzeigen*/

function showToDo() {
  let counterToDo = 0;
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].status === "todo" && tasks[i].delete === "no") counterToDo++;
    renderToDo(counterToDo);
  }
}

function renderToDo(counterToDo) {
  let toDo = document.getElementById("toDo");
  toDo.innerHTML = `
    <div class="txt_number">${counterToDo}</div>
    <div class="txt_todo">To-do</div>`;
}

/*Funktionen, die alle tasks in Done anzeigen*/

function showDone() {
  let counterDone = 0;
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].status === "done" && tasks[i].delete === "no") counterDone++;
    renderDone(counterDone);
  }
}

function renderDone(counterDone) {
  let Done = document.getElementById("Done");
  Done.innerHTML = `
    <div class="txt_number">${counterDone}</div>
    <div class="txt_todo">Done</div>`;
}

/*Funktion um den aktuellen Benutzer zu begrüßen*/

function greetCurrentUser() {
  let greetCurrentUser = document.getElementById("greetCurrentUser");
  let currentUser = currentUser[0].username;
  let utcOffset = 60; 
  let localTime = new Date(currentTime.getTime() + utcOffset * 60000);
  let currentHour = localTime.getHours();
  
  let greeting;
    if (currentHour >= 5 && currentHour < 12) {
        greeting = "Good Morning, ";
    } else if (currentHour >= 12 && currentHour < 18) {
        greeting = "Good Afternoon, ";
    } else {
        greeting = "Good Evening, ";
    }
  greetCurrentUser.innerHTML = `
    <h1 class="welcome">${greeting}</h1>
    <span class="welcome_txt">${currentUser}</span>`;
}
