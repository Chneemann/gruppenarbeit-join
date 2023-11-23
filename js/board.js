function openCart() {
  document.getElementById("task-overlay-cart").classList.add("dialog-show");
  document.getElementById("task-overlay-cart").classList.remove("dialog-hide");
}

function closeCart() {
  document.getElementById("task-overlay-cart").classList.add("dialog-hide");
  document.getElementById("task-overlay-cart").classList.remove("dialog-show");
}
