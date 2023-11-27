// TASK

async function openAddTask() {
  var overlay = document.getElementById("add-task-dialog");
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
  overlay.classList.add("dialog-hide");
  overlay.classList.remove("dialog-show");
  overlay.style.backgroundColor = "";
  await sleep(100);
  overlay.classList.add("d-none");
}

function editTask() {
  loadW3Include("../html/edit_task.html");
}

function deleteTask() {
  //TODO
}

function loadW3Include(path) {
  fetch(path)
    .then((response) => response.text())
    .then((html) => {
      document.getElementById("task-overlay-cart").innerHTML = html;
    })
    .catch((error) => {
      console.error("Error loading:", error);
    });
}

// CART

async function openCart() {
  var overlay = document.getElementById("task-overlay-cart");
  document.getElementById("board-page").style.overflow = "hidden";
  console.log("estsf");
  overlay.classList.remove("d-none");
  await sleep(10);
  overlay.classList.add("dialog-show");
  overlay.classList.remove("dialog-hide");
  changeBackground(overlay);
}

async function closeCart() {
  var overlay = document.getElementById("task-overlay-cart");
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
