// TASK

async function openAddTask() {
  loadW3Include("../html/add_task.html", "add-task-dialog");
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
  loadW3Include("../html/edit_task.html", "task-overlay-cart");
}

function deleteTask() {
  //TODO
}

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

// CART

async function openCart() {
  loadW3Include("../html/task_overlay.html", "task-overlay-cart");
  var overlay = document.getElementById("task-overlay-cart");
  document.body.style.overflow = "hidden";
  document.getElementById("board-page").style.overflow = "hidden";
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
