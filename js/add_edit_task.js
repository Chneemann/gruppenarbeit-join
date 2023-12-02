let taskPrio = "";
let taskSubtasks = "";
let lastTaskId;

function initAddTask() {
  // loadTasks();
}

async function addTask() {
  clearTaskBtn.disabled = true;
  addTaskBtn.disabled = true;
  let timestamp = new Date(addTaskDate.value).getTime();
  let task = {
    id: lastTaskId,
    title: addTaskTitel.value,
    description: addTaskDescription.value,
    assignet: addTaskAssignet.value,
    category: addTaskCategory.value,
    date: timestamp,
    prio: taskPrio,
    status: "todo",
    delete: "no",
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

// EDIT TASK

/**
 * Opens the overlay for the contact list and renders all contacts.
 *
 * @param {number} taskId - The ID of the task.
 */
function openOverlayContacts(taskId) {
  document.getElementById("edit-task-assignet-overlay").innerHTML = "";
  document
    .getElementById("edit-task-assignet-overlay")
    .classList.remove("d-none");
  renderAllContacts(taskId);
}

/**
 * Closes the overlay for the contact list if the click takes place outside the overlay
 *
 * @param {Event} event - The click event.
 * @param {number} taskId - The ID of the task.
 */
function closeOverlayContacts(event, taskId) {
  let overlay = document.getElementById("edit-task-assignet-overlay");
  let target = event.target;

  if (!overlay.contains(target) && !target.matches("#edit-task-assignet")) {
    overlay.classList.add("d-none");
    generateTaskOverlayEditHTML(taskId);
  }
}

/**
 * Renders all contacts, both assigned and unassigned, the assigned ones should come first.
 *
 * @param {number} taskId - The ID of the task.
 */
function renderAllContacts(taskId) {
  let assignetUsers = tasks[taskId].assignet;
  for (let i = 0; i < assignetUsers.length; i++) {
    let user = users.find((u) => u.id === assignetUsers[i]);
    if (user) {
      renderContact(user, taskId);
    }
  }
  for (let i = 0; i < users.length; i++) {
    if (!assignetUsers.includes(users[i].id)) {
      renderContact(users[i], taskId);
    }
  }
}

/**
 * Renders a single contact in the contact list of the overlay.
 *
 * @param {Object} user - The user to be rendered.
 * @param {number} taskId - The ID of the task.
 */
function renderContact(user, taskId) {
  document.getElementById("edit-task-assignet-overlay").innerHTML += /*html*/ `
    <div onclick="addContactToAssignet(${
      user.id
    }, ${taskId})" class="edit-task-contact-overlay"><span>${getUserInitials(
    user.id
  )}</span><span>${user.username}</span><input id="contact_checkbox${
    user.id
  }" type="checkbox" ${checkContactIsInAssignet(taskId, user.id)}></div>
  `;
}

/**
 * Checks whether a contact is already assigned to the task.
 *
 * @param {number} taskId - The ID of the user.
 * @param {number} userId - Die ID des Benutzers.
 * @returns {string} - Der "checked"-Wert für das HTML-Checkbox-Attribut.
 */
function checkContactIsInAssignet(taskId, userId) {
  for (let i = 0; i < tasks[taskId].assignet.length; i++) {
    if (userId == tasks[taskId].assignet[i]) {
      return "checked";
    }
  }
}

/**
 * Adds or removes a contact from the task assignment.
 *
 * @param {number} userId - The ID of the user.
 * @param {number} taskId - The ID of the task.
 */
function addContactToAssignet(userId, taskId) {
  let checkbox = document.getElementById(`contact_checkbox${userId}`);
  checkbox.checked = !checkbox.checked;
  if (checkbox.checked) {
    tasks[taskId].assignet.push(userId);
  } else {
    const index = tasks[taskId].assignet.indexOf(userId);
    if (index !== -1) {
      tasks[taskId].assignet.splice(index, 1);
    }
  }
}

/**
 * Confirms the processing of a task and updates the information in the backend.
 *
 * @param {number} taskId - The ID of the task.
 */
async function confirmEditTask(taskId) {
  const selectedDate = new Date(editTaskDate.value);
  const timestamp = selectedDate.getTime();
  tasks[taskId]["title"] = editTaskTitel.value;
  tasks[taskId]["description"] = editTaskDescription.value;
  tasks[taskId]["date"] = timestamp;
  tasks[taskId]["prio"] = taskPrio.toLowerCase();
  await setItem("tasks", JSON.stringify(tasks));
  closeCart();
}

// ADD TASK

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
 *
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
