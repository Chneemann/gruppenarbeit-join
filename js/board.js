let tasks = [];
let currentDraggedElement;

// BOARD

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
          generateTaskHTML(i, `board-content-task-${status}`);
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
function checkAssignetUsersBoard(id) {
  const userInitialsHTML = [];
  for (let i = 0; i < tasks[id].assignet.length; i++) {
    userInitialsHTML.push(
      generateAssignetUsersBoardHTML(
        tasks[id].assignet[i],
        getUserInitials(tasks[id].assignet[i])
      )
    );
  }
  return userInitialsHTML.join("");
}

/**
 * This function generate the user badget
 *
 * @param {string} userInitials Initials in capital letters
 * @returns HTML user badget
 */
function generateAssignetUsersBoardHTML(i, userInitials) {
  return /*html*/ `
    <span class="board-card-footer-badged" style="background-color: var(--${colorPicker(
      i
    )})">${userInitials}</span>
  `;
}

/**
 * This function creates the initials from the user name
 *
 * @param {string} id User id
 * @returns Initials in capital letters
 */
function getUserInitials(id) {
  for (let i = 0; i < users.length; i++) {
    if (users[i].id === id) {
      const nameParts = users[i].username.split(" ");
      const initials = nameParts.map((part) => part.charAt(0)).join("");
      return initials.toUpperCase();
    }
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
  const countSubtasks = tasks[id].subtaskstate.filter(
    (state) => state === "done"
  ).length;
  const length = tasks[id].subtaskstate.length;
  const fillerSubtasks =
    length === 2 && countSubtasks === 1
      ? "filler-half"
      : (length && countSubtasks === 2) || (length && countSubtasks === 1)
      ? "filler-full"
      : undefined;
  return length === 0
    ? ""
    : /*html*/ `
      <div class="board-card-subtask-line">
        <span class="${fillerSubtasks}"></span>
      </div>
      <div class="board-card-subtask-text">${countSubtasks}/${length} Subtasks</div>`;
}

function generateTaskCategoryColor(id) {
  if (tasks[id].category == "HTML") {
    return "brown";
  } else if (tasks[id].category == "CSS") {
    return "blue";
  } else if (tasks[id].category == "JavaScript") {
    return "yellow";
  }
}

/**
 * This function generate the empty task
 * @param {string} id The <div> id in html code
 */
function generateEmptyTaskHTML(id) {
  document.getElementById(id).innerHTML = /*html*/ `
   <div class="board-empty-task">No tasks To do</div>
  `;
}

// TASK OVERLAY

/**
 * This function checks who is working on the task and displays them with their initials and usernames
 *
 * @param {string} id User ID
 * @returns HTML user badget for any assignet user in the task
 */
function checkAssignetUsers(id) {
  const userInitialsHTML = [];
  for (let i = 0; i < tasks[id].assignet.length; i++) {
    const taskIdUser = tasks[id].assignet[i];
    const user = users.find((user) => user.id === taskIdUser);
    userInitialsHTML.push(
      generateAssignetUsersHTML(
        taskIdUser,
        getUserInitials(taskIdUser),
        user.username
      )
    );
  }
  return userInitialsHTML.join("");
}

/**
 * This function generate the user badget
 *
 * @param {string} userInitials Initials in capital letters
 * @returns HTML user badget
 */
function generateAssignetUsersHTML(i, userInitials, username) {
  return /*html*/ `
    <div class="task-overlay-person">
    <span class="board-card-footer-badged" style="background-color: var(--${colorPicker(
      i
    )})">${userInitials}</span>
       <p>${username}</p>
     </div>
  `;
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
function updateSubtask(id, i) {
  tasks[id].subtaskstate[i] =
    tasks[id].subtaskstate[i] === "done" ? "ongoing" : "done";
  initBoard();
}

// EDIT TASK

// DRAG & DROP

function startDragging(id) {
  currentDraggedElement = id;
}

function allowDrop(ev) {
  ev.preventDefault();
}

async function drop(category) {
  tasks[currentDraggedElement]["status"] = category;
  await setItem("tasks", JSON.stringify(tasks));
  initBoard();
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
  //loadW3Include("./html/edit_task.html", "task-overlay-cart");
  generateTaskOverlayEditHTML(id);
}

function deleteTask(id) {
  alert("Do you really want to delete this task?");
  closeCart();
  tasks[id].delete = "yes";
  initBoard();
}

// OPEN/CLOSE CART

async function openCart(id) {
  //loadW3Include("./html/task_overlay.html", "task-overlay-cart");
  generateTaskOverlayHTML(id);
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
