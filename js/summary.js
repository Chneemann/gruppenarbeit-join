const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

/**
 *
 *Function that is asynch because all tasks must be loaded first
 */

async function initSummary() {
  showAllTasks();
  showInProgress();
  showAwaitFeedback();
  showToDo();
  showDone();
  showUrgent();
  displayUsername();
  displayGreeting();
  getRightDate();
}

/**
 * Function that shows all tasks
 */

function showAllTasks() {
  let tasksInBoard = 0;
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].delete === "no") {
      tasksInBoard++;
      renderAllTasks(tasksInBoard);
    }
  }
}
/**
 * Function that displays all tasks as a sum
 *
 * @param {number} tasksInBoard
 */
function renderAllTasks(tasksInBoard) {
  let inBoard = document.getElementById("inBoard");
  inBoard.innerHTML = `
    <span class="txt_number">${tasksInBoard}</span>
    <span class="txt_todo">Tasks in board</span>`;
}
/**
 * Function that counts the tasks that need to be completed
 */
function showInProgress() {
  let counterProgress = 0;
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].status === "inprogress" && tasks[i].delete === "no")
      counterProgress++;
    renderInProgress(counterProgress);
  }
}
/**
 * Function that displays all tasks in progress
 *
 * @param {number} counterProgress
 */
function renderInProgress(counterProgress) {
  let inProgress = document.getElementById("inProgress");
  inProgress.innerHTML = `
    <span class="txt_number">${counterProgress}</span>
    <span class="txt_todo">Tasks in Progress</span>`;
}
/**
 * Function that counts the tasks in feedback
 */
function showAwaitFeedback() {
  let counterAwait = 0;
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].status === "awaitfeedback" && tasks[i].delete === "no")
      counterAwait++;
    renderAwaitFeedback(counterAwait);
  }
}
/**
 * Function that displays all tasks in feedback-awaiting
 *
 * @param {number} counterAwait
 */
function renderAwaitFeedback(counterAwait) {
  let awaitFeedback = document.getElementById("awaitFeedback");
  awaitFeedback.innerHTML = `
    <span class="txt_number">${counterAwait}</span>
    <span class="txt_todo">Awaiting feedback</span>`;
}
/**
 * Function that counts the urgent tasks
 */
function showUrgent() {
  let counterUrgent = 0;
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].prio === "urgent" && tasks[i].delete === "no") counterUrgent++;
  }
  renderUrgent(counterUrgent);
}
/**
 * Function that displays the urgent tasks
 *
 * @param {number} counterUrgent
 */
function renderUrgent(counterUrgent) {
  let urGent = document.getElementById("urGent");
  if (counterUrgent === 0) {
    urGent.innerHTML = `
      <div class="txt_number">0</div>
      <div class="txt_todo">Urgent</div>
      `;
  } else {
    urGent.innerHTML = `
      <div class="txt_number">${counterUrgent}</div>
      <div class="txt_todo">Urgent</div>
      `;
    getRightDate();
  }
}
/**
 * Function that counts the todos
 */
function showToDo() {
  let counterToDo = 0;
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].status === "todo" && tasks[i].delete === "no") counterToDo++;
    renderToDo(counterToDo);
  }
}
/**
 * Function that displays the todos
 *
 * @param {number} counterToDo
 */
function renderToDo(counterToDo) {
  let toDo = document.getElementById("toDo");
  toDo.innerHTML = `
    <div class="txt_number">${counterToDo}</div>
    <div class="txt_todo">To-do</div>`;
}
/**
 * Function that counts the dones
 */
function showDone() {
  let counterDone = 0;
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].status === "done" && tasks[i].delete === "no") counterDone++;
    renderDone(counterDone);
  }
}
/**
 * Function that displays the dones
 *
 * @param {number} counterDone
 */
function renderDone(counterDone) {
  let done = document.getElementById("Done");
  done.innerHTML = `
    <div class="txt_number">${counterDone}</div>
    <div class="txt_todo">Done</div>`;
}
/**
 * Function to display the current user
 */
function displayUsername() {
  let greetCurrentUserElement = document.getElementById("greetCurrentUser");

  greetCurrentUserElement.innerHTML = `
    <span class="welcome_txt">${currentUser[0].username}</span>`;
}
/**
 * Function to greet the current user
 */
function displayGreeting() {
  let welcome = document.getElementById("welcome");
  let currentTime = new Date();
  let utcOffset = 60;
  let localTime = new Date(currentTime.getTime() + utcOffset * 60000);
  let currentHour = localTime.getHours();
  let greeting;
  if (currentHour >= 5 && currentHour < 12) {
    greeting = "Good Morning";
  } else if (currentHour >= 12 && currentHour < 18) {
    greeting = "Good Afternoon";
  } else {
    greeting = "Good Evening";
  }
  welcome.innerHTML = `
    <h1 class="welcome">${greeting}</h1>`;
}
/**
 * Function to find the date of the next urgent task
 *
 * @returns {date}
 */
function findClosestDate() {
  let closestDate = 0;
  for (let i = 0; i < tasks.length; i++) {
    const d = new Date(tasks[i].date);
    if (tasks[i].prio === "urgent" && tasks[i].delete === "no") {
      if (!closestDate || d < closestDate) {
        closestDate = d;
      }
    }
  }
  return closestDate;
}
/**
 * Function to display the date of the next urgent task
 *
 * @param {date} closestDate
 */
function updateHTML(closestDate) {
  let rightDate = document.getElementById("rightDate");
  if (closestDate) {
    const fullYear = closestDate.getFullYear();
    const month = months[closestDate.getMonth()];
    const day = closestDate.getDate();
    rightDate.innerHTML = `
      <div class="urgent_txt">
        <span class="date">${month} ${day}, ${fullYear}</span>
        <span class="deadline">Upcoming deadline</span>
      </div>`;
  } else {
    rightDate.innerHTML = `
      <div class="urgent_txt">
        <span class="date"></span>
        <span class="no_deadline">No deadline</span>
      </div>`;
  }
}
/**
 * Function to perform other functions
 */
function getRightDate() {
  const closestDate = findClosestDate();
  updateHTML(closestDate);
}
