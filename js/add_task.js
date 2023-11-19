function addSubtask() {
  document.getElementById("add-task-subtask").style.color = "var(--black)";
  document.getElementById("add-task-subtask").value = "Contact Form";
  document.getElementById("add-task-icon-add").classList.add("d-none");
  document.getElementById("add-task-icon-close-check").classList.add("flex");
}

function closeSubtask() {
  document.getElementById("add-task-subtask").style.color = "var(--light-gray)";
  document.getElementById("add-task-subtask").value = "";
  document.getElementById("add-task-icon-add").classList.remove("d-none");
  document.getElementById("add-task-icon-close-check").classList.remove("flex");
}
