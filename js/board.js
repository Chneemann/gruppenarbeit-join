let currentDraggedElement;

/**
 * Initialises the board by loading all tasks
 */
function initBoard() {
  navbarLinkActive("board");
  renderTasks();
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
 * @param {string} id Current task id
 * @returns HTML user badget for any assignet user in the task
 */
function checkAssignetContactBoard(id, check) {
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
  if (check) {
    document.getElementById("board-card-footer-badge").innerHTML =
      userInitialsHTML.join("");
  } else {
    return userInitialsHTML.join("");
  }
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
  const countSubtasks = tasks[id].subtasksstate.filter(
    (state) => state === "done"
  ).length;
  const length = tasks[id].subtasksstate.length;
  const fillerLegth = (countSubtasks / length) * 120;
  return length === 0
    ? ""
    : /*html*/ `
      <div class="board-card-subtask">
        <div class="board-card-subtask-line">
          <span class="filler-full" style="width:${fillerLegth}px"></span>
        </div>
        <div class="board-card-subtask-text">${countSubtasks}/${length} Subtasks</div>
      </div>`;
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
  } else if (tasks[id].category == "Angular") {
    return "red";
  }
}

// TASK OVERLAY

/**
 * This function checks who is working on the task and displays them with their initials and usernames
 *
 * @param {string} id Current task id
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
  document.getElementById("task-overlay-subtasks").innerHTML = "";
  if (tasks[id].subtasks.length === 0) {
    document.getElementById(
      "task-overlay-subtasks"
    ).innerHTML = /*html*/ `<div class="task-overlay-subtask"><span>No subtask createt</span></div>`;
  } else {
    for (let i = 0; i < tasks[id].subtasks.length; i++) {
      document.getElementById("task-overlay-subtasks").innerHTML += /*html*/ `
    <div class="task-overlay-subtask">
      <input
        id="task-overlay-checkbox-subtask${i}"
        type="checkbox"
        onclick="updateSubtask(${id}, ${i})"
        ${tasks[id].subtasksstate[i] === "done" ? "checked" : ""}
      />
      <p onclick="updateSubtask(${id}, ${i})">${tasks[id].subtasks[i]}</p>
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
  tasks[id].subtasksstate[i] =
    tasks[id].subtasksstate[i] === "done" ? "ongoing" : "done";
  await setItem("tasks", JSON.stringify(tasks));
  initBoard();
  checkSubtasks(id);
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
  let checkstates = [];
  for (let status of states) {
    document.getElementById(`board-content-task-${status}`).innerHTML = "";
  }
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].delete === "no") {
      if (
        tasks[i].title.toLowerCase().includes(search) ||
        tasks[i].description.toLowerCase().includes(search) ||
        tasks[i].category.toLowerCase().includes(search)
      ) {
        checkstates.push(tasks[i].status);
        renderTaskHTML(i, `board-content-task-${tasks[i].status}`);
      }
    }
  }
  for (let status of states) {
    if (!checkstates.includes(status)) {
      generateEmptyTaskHTML(`board-content-task-${status}`);
    }
  }
}

/**
 * Changes the status of a current task and saves the updated task list.
 *
 * @param {string} progress - The new progress status of the task.
 */
async function saveNewStatus(progress) {
  let tempTaskId = "";
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].creator == currentUser[0].id && tasks[i].delete == "") {
      tempTaskId = tasks[i].id;
    }
  }
  if (!progress) {
    progress = "todo";
  }
  if (tempTaskId) {
    tasks[tempTaskId].status = progress;
    await setItem("tasks", JSON.stringify(tasks));
  } else {
    createTemporaryTask();
    saveNewStatus(progress);
  }
}

/**
 * Opens the page for adding a task.
 *
 * @param {number} progress - The progress used for the task.
 */
async function openAddTaskPage(progress) {
  loadW3Include("./html/add_task.html", "add-task-dialog");
  let overlay = document.getElementById("add-task-dialog");
  await sleep(10);
  await openAddTaskPageStyle(overlay);
  await saveNewStatus(progress);
  changeBackground(overlay);
  initAddTask();
  navbarLinkRemove();
  navbarLinkActive("board");
}

/**
 * Opens the add task page with specific styling and animations.
 *
 * @param {HTMLElement} overlay - The overlay element to display.
 */
async function openAddTaskPageStyle(overlay) {
  document.body.style.overflow = "hidden";
  document.getElementById("add-task-img-close").classList.remove("d-none");
  document.getElementById("add-task-page").style.backgroundColor =
    "var(--white)";
  document.getElementById("add-task-page").style.borderRadius = "30px";
  document
    .getElementById("add-task-formular")
    .classList.add("add-task-dialogbox");
  document
    .getElementById("add-task-header")
    .classList.add("add-task-dialogbox-header");
  document
    .getElementById("add-task-footer")
    .classList.add("add-task-dialogbox-footer");
  overlay.classList.remove("d-none");
  await sleep(10);
  overlay.classList.add("dialog-show");
  overlay.classList.remove("dialog-hide");
  clearTaskBtn.classList.add("d-none");
  clearTaskBtn2.classList.remove("d-none");
}

async function closeAddTask() {
  let overlay = document.getElementById("add-task-dialog");
  document.body.style.overflow = "auto";
  overlay.classList.add("dialog-hide");
  overlay.classList.remove("dialog-show");
  overlay.style.backgroundColor = "";
  await sleep(100);
  overlay.classList.add("d-none");
  overlay.innerHTML = "";
}

/**
 * Opens the editing view for a specific task.
 *
 * @param {number} id - The unique ID of the task to be edited.
 */
function editTask(id) {
  renderTaskOverlayEditHTML(id);
  renderAllSubtasks("edit", id);
  checkAssignetContactEdit(id);
  document.getElementById("board-card-footer-badge").style.width = "400px";
  taskPrio = tasks[id].prio;
  addPrioStatus(`icon-${taskPrio}`);
}

/**
 * Deletes a task based on the given ID.
 *
 * @param {number} id - The ID of the task to be deleted.
 */
async function deleteTask(id) {
  closeCart();
  tasks[id].delete = "yes";
  await setItem("tasks", JSON.stringify(tasks));
  initBoard();
  await sleep(200);
  openInformationWindow("The task has been deleted.", 3000);
}

/**
 * Opens the task dialogue to view the task in detail.
 *
 * @param {string} id - The unique identification number of the task.
 */
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

/**
 * Closes the task dialogue by hiding the overlay.
 */
async function closeCart() {
  var overlay = document.getElementById("task-overlay-cart");
  overlay.classList.add("dialog-hide");
  overlay.classList.remove("dialog-show");
  overlay.style.backgroundColor = "";
  await sleep(100);
  overlay.classList.add("d-none");
  initBoard();
  overlay.innerHTML = "";
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
