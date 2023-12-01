let tasks = [];

// BOARD

async function initBoard() {
  //loadTasks();
  renderTask();
}

/**
 * This function loads all tasks from the backend.
 */
async function loadTasks() {
  try {
    tasks = JSON.parse(await getItem("tasks"));
  } catch (e) {
    console.error("Loading error:", e);
  }
}

/**
 * This function renders the task
 */
function renderTask() {
  if (tasks) {
    renderEmptyTaskHTML("board-content-task-todo");
    renderTaskHTML("board-content-task-inprogress");
    renderEmptyTaskHTML("board-content-task-awaitfeedback");
    renderEmptyTaskHTML("board-content-task-done");
  }
}

/**
 * This function renders the current task
 */
function renderTaskHTML(id) {
  document.getElementById(id).innerHTML = /*html*/ `
    <div class="board-cart" onclick="openCart()">
      <div class="board-card-category blue">User Story</div>
      <div class="board-card-headline">Kochwelt Page & Recipe Recommender</div>
      <div class="board-card-description">
        Build start page with recipe recommendation...
      </div>
      <div class="board-card-subtask">
        <div class="board-card-subtask-line">
          <span class="filler-half"></span>
        </div>
        <div class="board-card-subtask-text">1/2 Subtasks</div>
      </div>
      <div class="board-card-footer">
        <div id="board-card-footer-badge">
          <span class="board-card-footer-badged orange">AM</span>
          <span class="board-card-footer-badged turquoise">EM</span>
          <span class="board-card-footer-badged purple">MB</span>
        </div>
        <div class="board-card-footer-priority"></div>
      </div>
    </div>`;
}

/**
 * This function displays the empty task
 */
function renderEmptyTaskHTML(id) {
  document.getElementById(id).innerHTML = /*html*/ `
   <div class="board-empty-task">No tasks To do</div>
  `;
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

async function openCart() {
  loadW3Include("./html/task_overlay.html", "task-overlay-cart");
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

// ADD & REMOVE NAVBAR

window.addEventListener("DOMContentLoaded", (event) => {
  function handleResize() {
    if (window.innerWidth < 860) {
      document.getElementById("mobile-header").classList.remove("d-none");
      document.getElementById("navbar").classList.add("d-none");
      document.getElementById("mobile-navbar").classList.remove("d-none");
    } else {
      document.getElementById("mobile-header").classList.add("d-none");
      document.getElementById("navbar").classList.remove("d-none");
      document.getElementById("mobile-navbar").classList.add("d-none");
    }
  }
  handleResize();
  window.addEventListener("resize", handleResize);
});

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
