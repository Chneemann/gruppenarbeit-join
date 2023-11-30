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
  if (clicked == "icon-urgent") {
    document.getElementById(clicked).classList.add("bgcolor-red");
  } else if (clicked == "icon-medium") {
    document.getElementById(clicked).classList.add("bgcolor-orange");
  } else if (clicked == "icon-low") {
    document.getElementById(clicked).classList.add("bgcolor-green");
  }
  document.getElementById(`${clicked}-inline`).classList.add("max-brightness");
  document.getElementById(clicked).classList.add("add-task-prio-field-clicked");
}

function addTask() {
  let title = document.getElementById("add-task-titel").value;
  let description = document.getElementById("add-task-description").value;
  let date = document.getElementById("add-task-date").value;

  let timestamp = new Date(date).getTime();

  let task = {
    title: title,
    description: description,
    date: timestamp,
  };

  console.log(task);
}

function clearTask() {
  console.log("Clear");
}
