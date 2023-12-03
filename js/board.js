let tasks = [];
let currentDraggedElement;

// BOARD

/**
 * Initialises the board by loading all tasks
 */
async function initBoard() {
  await loadTasks();
  renderTasks();
}

/**
 * This function loads all tasks from the backend.
 *
 */
async function loadTasks() {
  try {
    tasks = JSON.parse(await getItem("tasks"));
  } catch (e) {
    console.error("Loading error:", e);
  }
}

/**
 * This function checks all tasks and assigns them to the correct column
 */
function renderTasks() {
  let states = ["todo", "inprogress", "awaitfeedback", "done"];
  for (let status of states) {
    document.getElementById(`board-content-task-${status}`).innerHTML = "";
    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i].delete != "none")
        if (tasks[i].status === status && tasks[i].delete === "no") {
          renderTaskHTML(i, `board-content-task-${status}`);
        }
    }
    if (
      document.getElementById(`board-content-task-${status}`).innerHTML === ""
    ) {
      generateEmptyTaskHTML(`board-content-task-${status}`);
    }
  }
}

/**
 * This function checks who is working on the task and displays them with their initials
 *
 * @param {string} id User ID
 * @returns HTML user badget for any assignet user in the task
 */
function checkAssignetContactBoard(id) {
  const userInitialsHTML = [];
  for (let i = 0; i < tasks[id].assignet.length; i++) {
    for (let j = 0; j < contacts.length; j++) {
      if (tasks[id].assignet[i] == contacts[j].id) {
        userInitialsHTML.push(
          renderAssignetContactBoardHTML(
            tasks[id].assignet[i],
            contacts[j].initials,
            contacts[j].color
          )
        );
      }
    }
  }
  return userInitialsHTML.join("");
}

/**
 * It will use a modulo operation to ensure that the id remains
 * in the range of 1 to 10 to then select a colour
 */
function colorPicker(id) {
  let colors = [
    "red",
    "green",
    "blue",
    "orange",
    "purple",
    "pink",
    "brown",
    "cyan",
    "magenta",
    "turquoise",
  ];
  let index = id % colors.length;
  index += 1;
  return colors[index - 1];
}

/**
 * This function checks how many subtasks are present in the task and
 * how many of them have already been processed
 *
 * @param {string} id Current task id
 * @returns Html code
 */
function checkSubtasksBoard(id) {
  const countSubtasks = tasks[id].subtaskstate.filter(
    (state) => state === "done"
  ).length;
  const length = tasks[id].subtaskstate.length;
  const fillerLegth = (countSubtasks / length) * 120;
  return length === 0
    ? ""
    : /*html*/ `
      <div class="board-card-subtask-line">
        <span class="filler-full" style="width:${fillerLegth}px"></span>
      </div>
      <div class="board-card-subtask-text">${countSubtasks}/${length} Subtasks</div>`;
}

/**
 * Generates a category color based on the task's category.
 *
 * @param {number} id - The task ID.
 * @returns {string} - The color associated with the task's category.
 */
function generateTaskCategoryColor(id) {
  if (tasks[id].category == "HTML") {
    return "brown";
  } else if (tasks[id].category == "CSS") {
    return "blue";
  } else if (tasks[id].category == "JavaScript") {
    return "yellow";
  }
}

// TASK OVERLAY

/**
 * This function checks who is working on the task and displays them with their initials and usernames
 *
 * @param {string} id User ID
 * @returns HTML user badget for any assignet user in the task
 */
function checkAssignetContact(id) {
  const userInitialsHTML = [];
  for (let i = 0; i < tasks[id].assignet.length; i++) {
    for (let j = 0; j < contacts.length; j++) {
      if (tasks[id].assignet[i] == contacts[j].id) {
        userInitialsHTML.push(
          generateAssignetContactHTML(
            tasks[id].assignet[i],
            contacts[j].initials,
            contacts[j].name,
            contacts[j].color
          )
        );
      }
    }
  }
  return userInitialsHTML.join("");
}

/**
 * This function capitalises the first letter and returns the word
 *
 * @param {String} id Current task id
 * @returns The Priority, first letter capitalised
 */
function textTransformPriority(id) {
  return tasks[id].prio.charAt(0).toUpperCase() + tasks[id].prio.slice(1);
}

/**
 * This function checks whether and how many subtasks are present in the current task and displays them
 *
 * @param {String} id Current task id
 */
function checkSubtasks(id) {
  if (tasks[id].subtasks.length === 0) {
    document.getElementById(
      "task-overlay-subtasks"
    ).innerHTML = /*html*/ `<div class="task-overlay-subtask"><p>No subtask createt</p></div>`;
  } else {
    for (let i = 0; i < tasks[id].subtasks.length; i++) {
      document.getElementById("task-overlay-subtasks").innerHTML += /*html*/ `
    <div class="task-overlay-subtask">
      <input
        id="task-overlay-checkbox-subtask${i}"
        type="checkbox"
        onclick="updateSubtask(${id}, ${i})"
        ${tasks[id].subtaskstate[i] === "done" ? "checked" : ""}
      />
      <p>${tasks[id].subtasks[i]}</p>
    </div>`;
    }
  }
}

/**
 * This function changes the status of the subtask when you click on the checkbox
 *
 * @param {String} id Current task id
 * @param {number} i Current Subtask
 */
async function updateSubtask(id, i) {
  tasks[id].subtaskstate[i] =
    tasks[id].subtaskstate[i] === "done" ? "ongoing" : "done";
  await setItem("tasks", JSON.stringify(tasks));
  initBoard();
}

/**
 * Returns the current date in timestamp format
 *
 * @returns - The current date in the timestamp
 */
function getCurrentTimestamp() {
  return new Date().getTime();
}

/**
 * Formats a number to always have two digits.
 *
 * @param {number} number - The number to format.
 * @returns {string} - The formatted number with two digits.
 */
function formatTwoDigits(number) {
  return number < 10 ? `0${number}` : `${number}`;
}

/**
 * Converts a timestamp to a date string in the format DD/MM/YYYY.
 *
 * @param {number} timestamp - The timestamp to convert.
 * @returns {string} - The formatted date string.
 */
function timestampInDate(timestamp) {
  const dateObject = new Date(timestamp);
  const year = dateObject.getFullYear();
  const month = formatTwoDigits(dateObject.getMonth() + 1);
  const day = formatTwoDigits(dateObject.getDate());
  return `${day}/${month}/${year}`;
}

/**
 * Converts a timestamp to a date string suitable for input fields (YYYY-MM-DD).
 *
 * @param {number} timestamp - The timestamp to convert.
 * @returns {string} - The formatted date string for input fields.
 */
function timestampForInputfield(timestamp) {
  const dateObject = new Date(timestamp);
  const year = dateObject.getFullYear();
  const month = formatTwoDigits(dateObject.getMonth() + 1);
  const day = formatTwoDigits(dateObject.getDate());
  return `${year}-${month}-${day}`;
}

// DRAG & DROP

/**
 * Start dragging a task.
 *
 * @param {string} id - The ID of the task being dragged.
 */
function startDragging(id) {
  currentDraggedElement = id;
}

/**
 * Allow dropping on the board.
 *
 * @param {Event} ev - The drop event.
 */
function allowDrop(ev) {
  ev.preventDefault();
}

/**
 * Handle the drop event by updating the task's status and saving it to storage.
 *
 * @param {string} category - The category to which the task is dropped.
 */
async function drop(category) {
  tasks[currentDraggedElement]["status"] = category;
  await setItem("tasks", JSON.stringify(tasks));
  initBoard();
}

/**
 * Searches for tasks based on the input provided in the board search field.
 * It filters and renders tasks that contain the search term in their title.
 */
function searchTask() {
  let search = document.getElementById("board-searchfield").value.toLowerCase();
  let states = ["todo", "inprogress", "awaitfeedback", "done"];
  for (let status of states) {
    generateEmptyTaskHTML(`board-content-task-${status}`);
  }
  for (let i = 0; i < tasks.length; i++) {
    if (
      tasks[i].title.toLowerCase().includes(search) ||
      tasks[i].description.toLowerCase().includes(search)
    ) {
      if (tasks[i].delete === "no") {
        document.getElementById(
          `board-content-task-${tasks[i].status}`
        ).innerHTML = "";
        renderTaskHTML(i, `board-content-task-${tasks[i].status}`);
      }
    }
  }
}

// OPEN/CLOSE/EDIT/DELETE TASK

async function openAddTask() {
  loadW3Include("./html/add_task.html", "add-task-dialog");
  await sleep(10);
  var overlay = document.getElementById("add-task-dialog");
  document.body.style.overflow = "hidden";
  document.getElementById("add-task-img-close").classList.remove("d-none");
  document.getElementById("add-task-page").style.backgroundColor =
    "var(--white)";
  overlay.classList.remove("d-none");
  await sleep(10);
  overlay.classList.add("dialog-show");
  overlay.classList.remove("dialog-hide");
  changeBackground(overlay);
}

async function closeAddTask() {
  var overlay = document.getElementById("add-task-dialog");
  document.body.style.overflow = "auto";
  overlay.classList.add("dialog-hide");
  overlay.classList.remove("dialog-show");
  overlay.style.backgroundColor = "";
  await sleep(100);
  overlay.classList.add("d-none");
}

function editTask(id) {
  renderTaskOverlayEditHTML(id);
  renderAllSubtasksEdit(id);
  checkAssignetContactEdit(id);
  taskPrio = tasks[id].prio;
  addPrioStatus(`icon-${taskPrio}`);
}

function deleteTask(id) {
  alert("Do you really want to delete this task?");
  closeCart();
  tasks[id].delete = "yes";
  initBoard();
}

// OPEN/CLOSE CART

async function openCart(id) {
  renderTaskOverlayHTML(id);
  checkSubtasks(id);
  var overlay = document.getElementById("task-overlay-cart");
  overlay.classList.remove("d-none");
  await sleep(10);
  overlay.classList.add("dialog-show");
  overlay.classList.remove("dialog-hide");
  changeBackground(overlay);
}

async function closeCart() {
  var overlay = document.getElementById("task-overlay-cart");
  document.body.style.overflow = "auto";
  overlay.classList.add("dialog-hide");
  overlay.classList.remove("dialog-show");
  overlay.style.backgroundColor = "";
  await sleep(100);
  overlay.classList.add("d-none");
  initBoard();
}

// GLOBAL

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function changeBackground(overlay) {
  overlay.addEventListener(
    "transitionend",
    function () {
      overlay.style.backgroundColor = "rgba(0, 0, 0, 0.1)";
    },
    { once: true }
  );
}

// W3C

function loadW3Include(path, id) {
  fetch(path)
    .then((response) => response.text())
    .then((html) => {
      document.getElementById(id).innerHTML = html;
    })
    .catch((error) => {
      console.error("Error loading:", error);
    });
}
