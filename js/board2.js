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

/**
 * Closes the add task overlay and performs various actions to hide it.
 */
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
