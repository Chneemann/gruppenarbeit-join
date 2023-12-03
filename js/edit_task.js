// EDIT TASK

/**
 * Opens the overlay for the contact list and renders all contacts.
 *
 * @param {number} taskId - The ID of the task.
 */
function openOverlayContacts(taskId) {
  document
    .getElementById("edit-task-icon-closecontact")
    .classList.remove("d-none");
  document.getElementById("edit-task-icon-opencontact").classList.add("d-none");
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
    checkAssignetContactEdit(taskId);
  }
}

/**
 * This function checks who is working on the task and displays them
 *
 * @param {string} taskId The ID of the contact.
 */
function checkAssignetContactEdit(taskId) {
  const userInitialsHTML = [];
  for (let i = 0; i < tasks[taskId].assignet.length; i++) {
    for (let j = 0; j < contacts.length; j++) {
      if (tasks[taskId].assignet[i] == contacts[j].id) {
        userInitialsHTML.push(
          renderAssignetContactBoardHTML(
            tasks[taskId].assignet[i],
            contacts[j].initials,
            contacts[j].color
          )
        );
      }
    }
  }
  document.getElementById("board-card-footer-badge").innerHTML =
    userInitialsHTML.join("");
}

/**
 * Renders all contacts, both assigned and unassigned, the assigned ones should come first.
 *
 * @param {number} taskId - The ID of the task.
 */
function renderAllContacts(taskId) {
  let assignetContacts = tasks[taskId].assignet;
  for (let i = 0; i < assignetContacts.length; i++) {
    let contact = contacts.find((u) => u.id === assignetContacts[i]);
    if (contact) {
      renderContactHTML(contact, taskId);
    }
  }
  for (let i = 0; i < contacts.length; i++) {
    if (!assignetContacts.includes(contacts[i].id)) {
      renderContactHTML(contacts[i], taskId);
    }
  }
}

/**
 * Checks whether a contact is already assigned to the task.
 *
 * @param {number} taskId - The ID of the task.
 * @param {number} contactId - The ID of the contact.
 * @returns {string} - The "checked" value for the HTML checkbox attribute.
 */
function checkContactIsInAssignet(taskId, contactId) {
  for (let i = 0; i < tasks[taskId].assignet.length; i++) {
    if (contactId == tasks[taskId].assignet[i]) {
      return "checked";
    }
  }
}

/**
 * Adds or removes a contact from the task assignment.
 *
 * @param {number} contactId - The ID of the contact.
 * @param {number} taskId - The ID of the task.
 */
function addContactToAssignet(contactId, taskId) {
  let checkbox = document.getElementById(`contact_checkbox${contactId}`);
  checkbox.checked = !checkbox.checked;
  if (checkbox.checked) {
    tasks[taskId].assignet.push(contactId);
  } else {
    const index = tasks[taskId].assignet.indexOf(contactId);
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

/**
 * Displays all subtasks in the current task
 *
 * @param {number} taskId - The ID of the task.
 */
function renderAllSubtasksEdit(taskId) {
  document.getElementById("edit-task-subtask-addet").innerHTML = "";
  for (let i = 0; i < tasks[taskId].subtasks.length; i++) {
    renderSubtaskEditHTML(taskId, i);
  }
}

/**
 * Searches for contacts based on the input value and renders the matching contacts in the overlay.
 *
 * @param {string} taskId - The ID of the task for which contacts are being searched.
 */
function searchContact(taskId) {
  let search = document
    .getElementById("edit-task-assignet")
    .value.toLowerCase();
  document.getElementById("edit-task-assignet-overlay").innerHTML = "";

  for (let i = 0; i < contacts.length; i++) {
    if (contacts[i].name.toLowerCase().includes(search)) {
      renderContactHTML(contacts[i], taskId);
    }
  }
}

function addSubtask(divId) {
  document.getElementById(`${divId}-task-subtask`).style.color = "var(--black)";
  document.getElementById(`${divId}-task-icon-add`).classList.add("d-none");
  document
    .getElementById(`${divId}-task-icon-close-check`)
    .classList.remove("d-none");
}

function closeSubtask(divId) {
  document.getElementById(`${divId}-task-subtask`).style.color =
    "var(--light-gray)";
  document.getElementById(`${divId}-task-subtask`).value = "";
  document.getElementById(`${divId}-task-icon-add`).classList.remove("d-none");
  document
    .getElementById(`${divId}-task-icon-close-check`)
    .classList.add("d-none");
}

function confirmSubtask(taskId) {
  let newSubtask = document.getElementById(`edit-task-subtask`).value;
  tasks[taskId].subtasks.push(newSubtask);
  tasks[taskId].subtaskstate.push("ongoing");
  renderAllSubtasksEdit(taskId);
}

function deleteSubtask(taskId, i) {
  tasks[taskId].subtasks.splice(i, 1);
  tasks[taskId].subtaskstate.splice(i, 1);
  renderAllSubtasksEdit(taskId);
}

function changeInputTextColor(input) {
  var inputElement = document.getElementById(input);

  if (inputElement.value.trim() !== "") {
    inputElement.style.color = "var(--black)";
  } else {
    inputElement.style.color = "";
  }
}

/**
 * This function checks which prio button has been clicked, saves this
 * and then colours it in its respective colour
 *
 * @param {string} clicked id of the button
 */
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
