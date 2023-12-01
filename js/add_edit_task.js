let taskPrio = "";
let taskSubtasks = "";

function addTask() {
  clearTaskBtn.disabled = true;
  addTaskBtn.disabled = true;
  let timestamp = new Date(addTaskDate.value).getTime();

  let task = {
    title: addTaskTitel.value,
    description: addTaskDescription.value,
    assignet: addTaskAssignet.value,
    category: addTaskCategory.value,
    date: timestamp,
    prio: taskPrio,
    status: "todo",
  };
  resetForm();
}

function resetForm() {
  clearTaskBtn.disabled = false;
  addTaskBtn.disabled = false;
  addTaskTitel.value = "";
  addTaskDescription.value = "";
  addTaskAssignet.value = "";
  addTaskDate.value = "";
  addTaskCategory.value = "";
}

function clearTask() {
  // Todo
}

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

function confirmSubtask() {
  let newSubtask = document.getElementById("add-task-subtask").value;
  document.getElementById("add-task-subtask-addet").innerHTML = /*html*/ `
    <div class="add-task-subtask-addet">
      <li>${newSubtask}</li>
      <div class="add-task-icons-addet">
        <img
          src="../assets/img/edit.svg"
          alt="edit"
          class="add-task-icon-addet"
        />
        <div class="add-task-subtask-line"></div>
        <img
          src="../assets/img/delete.svg"
          alt="delete"
          class="add-task-icon-addet"
          onclick="deleteSubtask()"
        />
      </div>
    </div>`;
}

function deleteSubtask() {
  document.getElementById("add-task-subtask-addet").innerHTML = "";
}

function changeInputTextColor(input) {
  var inputElement = document.getElementById(input);

  if (inputElement.value.trim() !== "") {
    inputElement.style.color = "var(--black)";
  } else {
    inputElement.style.color = "";
  }
}

function addPrioStatus(clicked) {
  document
    .getElementById("icon-low")
    .classList.remove("add-task-prio-field-clicked", "bgcolor-green");
  document.getElementById("icon-low-inline").classList.remove("max-brightness");
  document
    .getElementById("icon-medium")
    .classList.remove("add-task-prio-field-clicked", "bgcolor-orange");
  document
    .getElementById("icon-medium-inline")
    .classList.remove("max-brightness");
  document
    .getElementById("icon-urgent")
    .classList.remove("add-task-prio-field-clicked", "bgcolor-red");
  document
    .getElementById("icon-urgent-inline")
    .classList.remove("max-brightness");
  clickedPrioButton(clicked);
  document.getElementById(`${clicked}-inline`).classList.add("max-brightness");
  document.getElementById(clicked).classList.add("add-task-prio-field-clicked");
}

/**
 * This function checks which prio button has been clicked, saves this
 * and then colours it in its respective colour
 * @param {string} clicked id of the button
 */
function clickedPrioButton(clicked) {
  if (clicked == "icon-urgent") {
    taskPrio = "Urgent";
    document.getElementById(clicked).classList.add("bgcolor-red");
  } else if (clicked == "icon-medium") {
    taskPrio = "Medium";
    document.getElementById(clicked).classList.add("bgcolor-orange");
  } else if (clicked == "icon-low") {
    taskPrio = "Low";
    document.getElementById(clicked).classList.add("bgcolor-green");
  }
}
