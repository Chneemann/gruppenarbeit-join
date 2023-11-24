// TASK

async function openAddTask() {
  var overlay = document.getElementById("add-task-dialog");
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

// CART

async function openCart() {
  var overlay = document.getElementById("task-overlay-cart");
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
