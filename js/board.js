let tasks = [
  {
    id: "0",
    title: "CSS Architecture Planning",
    description: "Define CSS naming conventions and structure.",
    assignet: [4, 10, 18],
    category: "Technical Task",
    subtasks: ["Test 1"],
    date: "",
    prio: "urgent",
    status: "todo",
    delete: "no",
  },
  {
    id: "1",
    title: "Kochwelt Page & Recipe Recommender",
    description: "Build start page with recipe recommendation.",
    assignet: [5, 7, 13],
    category: "User Story",
    subtasks: ["Test 1", "Test 2"],
    date: "",
    prio: "low",
    status: "inprogress",
    delete: "no",
  },
];
let currentDraggedElement;

// BOARD

async function initBoard() {
  //loadTasks(); !!TODO!!
  renderTasks();
}

/**
 * This function loads all tasks from the backend.
 *
 * !!TODO!!
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
 *
 * @param {string} id User ID
 * @returns HTML user badget for any assignet user in the task
 */
function checkAssignetUsersBoard(id) {
  const userInitialsHTML = [];
  for (let i = 0; i < tasks[id].assignet.length; i++) {
    userInitialsHTML.push(
      generateAssignetUsersHTML(
        tasks[id].assignet[i],
        getUserInitials(tasks[id].assignet[i])
      )
    );
  }
  return userInitialsHTML.join("");
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
 * This function generate the user badget
 *
 * @param {string} userInitials Initials in capital letters
 * @returns HTML user badget
 */
function generateAssignetUsersHTML(i, userInitials) {
  return /*html*/ `
    <span class="board-card-footer-badged" style="background-color: var(--${colorPicker(
      i
    )})">${userInitials}</span>
  `;
}

/**
 * This function checks whether and how many subtasks are present in the task and returns them
 *
 * @param {string} id Current task id
 * @returns Html code
 */
function checkSubtasksBoard(id) {
  let countSubtasks = 0;
  for (let i = 0; i < tasks[id].subtasks.length; i++) {
    countSubtasks++;
  }
  if (countSubtasks === 1) {
    return /*html*/ `
           <div class="board-card-subtask-line">
      <span class="filler-half"></span>
    </div>
      <div class="board-card-subtask-text">1/2 Subtasks</div>`;
  } else if (countSubtasks === 2) {
    return /*html*/ `
       <div class="board-card-subtask-line">
      <span class="filler-full"></span>
    </div>
      <div class="board-card-subtask-text">2/2 Subtasks</div>`;
  } else {
    return /*html*/ ``;
  }
}

/**
 * This function generate the current task
 *
 * @param {string} id Current task id
 * @param {string} name The <div> id in html code
 */
function generateTaskHTML(id, name) {
  document.getElementById(name).innerHTML += /*html*/ `
    <div class="board-cart" draggable="true" ondragstart="startDragging(${
      tasks[id].id
    })" onclick="openCart(${tasks[id].id})">
      <div class="board-card-category blue">${tasks[id].category}</div>
      <div class="board-card-headline">${tasks[id].title}</div>
      <div class="board-card-description">
      ${tasks[id].description}
      </div>
      <div class="board-card-subtask">
      ${checkSubtasksBoard(tasks[id].id)}
      </div>
      <div class="board-card-footer">
        <div id="board-card-footer-badge">
          ${checkAssignetUsersBoard(tasks[id].id)}
        </div>
        <div class="board-card-footer-priority prio-${tasks[id].prio}"></div>
      </div>
    </div>`;
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
 * This function capitalises the first letter and returns the word
 *
 * @param {String} id Current task id
 * @returns The Priority, first letter capitalised
 */
function textTransformPriority(id) {
  return tasks[id].prio.charAt(0).toUpperCase() + tasks[id].prio.slice(1);
}

/**
 * This function displays the clicked task in large size
 *
 * @param {string} id Current task id
 */
function generateTaskOverlayHTML(id) {
  document.getElementById("task-overlay-cart").innerHTML = /*html*/ `
  <div class="task-overlay" onclick="event.stopPropagation()">
    <div class="text-wrap-overflow">
      <div class="task-overlay-header">
        <div id="task-overlay-category" class="blue">${tasks[id].category}</div>
        <div class="task-overlay-img-close" onclick="closeCart()">
          <img src="./assets/img/close.svg" alt="" />
        </div>
      </div>
      <div class="task-overlay-headline">
        <h2 id="task-overlay-headline">${tasks[id].title}</h2>
      </div>
      <div class="task-overlay-content">
        <div id="task-overlay-description">
        ${tasks[id].description}
        </div>
        <div class="task-overlay-date">
          <p>Due date:</p>
          <span id="task-overlay-date">10/05/2023</span>
        </div>
        <div class="task-overlay-prio">
          <p>Priority:</p>
          <span id="task-overlay-prio"
            >${textTransformPriority(
              id
            )}</span><div class="board-card-priority prio-${
    tasks[id].prio
  }"></div>
        </div>
        <div>
          Assigned To:
          <div class="task-overlay-assigned-person">
            <div class="task-overlay-person">
              <span class="board-card-footer-badged orange">EM</span>
              <p>Emmanuel Mauer</p>
            </div>
            <div class="task-overlay-person">
              <span class="board-card-footer-badged purple">MB</span>
              <p>Marcel Bauer</p>
            </div>
            <div class="task-overlay-person">
              <span class="board-card-footer-badged blue">AM</span>
              <p>Anton Mayer</p>
            </div>
          </div>
        </div>
        <div>
          Subtasks
          <div class="task-overlay-subtasks">
            <div class="task-overlay-subtask">
              <input
                id="task-overlay-checkbox-subtask1"
                type="checkbox"
                name=""
                id=""
              />
              <p>Implement Recipe Recommendation</p>
            </div>
            <div class="task-overlay-subtask">
              <input
                id="task-overlay-checkbox-subtask2"
                type="checkbox"
                name=""
                id=""
              />
              <p>Start Page Layout</p>
            </div>
          </div>
        </div>
      </div>
      <div class="task-overlay-footer">
        <a href="#" onclick="deleteCart()"
          ><img
            class="task-overlay-footer-img"
            src="./assets/img/delete.svg"
            alt="delete"
          /><span>Delete</span></a
        >
        <img src="./assets/img/line.svg" alt="line" />
        <a href="#" onclick="editTask()"
          ><img
            class="task-overlay-footer-img"
            src="./assets/img/edit.svg"
            alt="edit"
          /><span>Edit</span></a
        >
      </div>
    </div>
  </div>
  `;
}

// DRAG & DROP

function startDragging(id) {
  currentDraggedElement = id;
}

function allowDrop(ev) {
  ev.preventDefault();
}

function drop(category) {
  tasks[currentDraggedElement]["status"] = category;
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

function editTask() {
  loadW3Include("./html/edit_task.html", "task-overlay-cart");
}

function deleteTask() {
  //TODO
}

// OPEN/CLOSE CART

async function openCart(id) {
  //loadW3Include("./html/task_overlay.html", "task-overlay-cart");
  generateTaskOverlayHTML(id);
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
}

function deleteCart() {
  alert("Do you really want to delete this task?");
  closeCart();
  deleteTask();
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
