let lastTaskId;
let checkInputFields = [];
let tempTaskId = "";

/**
 * Initialises the task form by loading all required functions
 */
async function initAddTask() {
  renderAddTaskAssignetContentHTML();
  checkTemporaryTask();
}

/**
 * Checks whether there is a temporary task for the current user.
 * If a temporary task is found, the input fields are filled with the values of the task.
 * Otherwise, a new temporary task is created.
 */
function checkTemporaryTask() {
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].creator == currentUser[0].id && tasks[i].delete == "") {
      tempTaskId = tasks[i].id;
    }
  }
  if (tempTaskId) {
    fillAllInputs();
  } else {
    createTemporaryTask();
  }
}

/**
 * Fills all input fields on the user interface with the corresponding values of the temporary task.
 */
function fillAllInputs() {
  addTaskTitel.value = tasks[tempTaskId].title;
  addTaskTitel.style.color = "var(--black)";
  addTaskDescription.value = tasks[tempTaskId].description;
  addTaskDescription.style.color = "var(--black)";
  addTaskCategory.value = tasks[tempTaskId].category;
  if (tasks[tempTaskId].date != "") {
    addTaskDate.value = timestampForInputfield(tasks[tempTaskId].date);
    addTaskDate.style.color = "var(--black)";
  }
  if (tasks[tempTaskId].prio != "") {
    addPrioStatus("icon-" + tasks[tempTaskId].prio);
  }
  checkAssignetContactBoard(tempTaskId, true);
  renderAllSubtasks("add", tempTaskId);
}

/**
 * If all checks are successful, the task is saved on the server.
 * Otherwise, an error message is generated for the task.
 */
async function createTask() {
  clearTaskBtn.disabled = true;
  addTaskBtn.disabled = true;
  updateTemporaryTask();
  if (checkAllRequiredInputFields() && checkTaskDate()) {
    saveTaskOnServer();
  } else {
    errorTaskInput();
  }
}

/**
 * Creates a temporary task and adds it to the task list.
 * The temporary task is initialised with default values.
 */
async function createTemporaryTask() {
  tasks.push({
    id: tasks.length,
    title: "",
    description: "",
    assignet: [],
    category: "",
    date: "",
    prio: "medium",
    subtasks: [],
    subtasksstate: [],
    creator: currentUser[0].id,
    status: "todo",
    delete: "",
  });
  await setItem("tasks", JSON.stringify(tasks));
  initAddTask();
}

/**
 * Updates temporary tasks with the entered values and saves the update.
 */
async function updateTemporaryTask() {
  let timestamp = new Date(addTaskDate.value).getTime();
  if (addTaskDate.value == "") {
    timestamp = "";
  }
  tasks[tempTaskId].title = addTaskTitel.value;
  tasks[tempTaskId].description = addTaskDescription.value;
  tasks[tempTaskId].category = addTaskCategory.value;
  tasks[tempTaskId].date = timestamp;
  tasks[tempTaskId].prio = taskPrio.toLowerCase();
  tasks[tempTaskId].subtasks = tasks[tempTaskId].subtasks.concat(taskSubtasks);
  tasks[tempTaskId].subtasksstate =
    tasks[tempTaskId].subtasksstate.concat(taskSubtaskstate);
  await setItem("tasks", JSON.stringify(tasks));
}

/**
 * Creates the new task in the backend
 */
async function saveTaskOnServer() {
  tasks[tempTaskId].delete = "no";
  await setItem("tasks", JSON.stringify(tasks));
  await sleep(500);
  clearTemporaryTask();
}

/**
 * Resets the form to 0 by zeroing the variables and re-rendering the page
 */
function clearTemporaryTask() {
  tempTaskId = "";
  clearTaskBtn.disabled = false;
  addTaskBtn.disabled = false;
  renderMainpageContent("./html/board.html");
  openInformationWindow("Your task has been created.", 3000);
}

/**
 * Clears the fields of a temporary task, saves the changes,
 * deactivates certain buttons and re-renders the content of the main page.
 */
async function clearTask() {
  tasks[tempTaskId].title = "";
  tasks[tempTaskId].description = "";
  tasks[tempTaskId].category = [];
  tasks[tempTaskId].date = "";
  tasks[tempTaskId].prio = "medium";
  tasks[tempTaskId].subtasks = [];
  tasks[tempTaskId].subtasksstate = [];
  await setItem("tasks", JSON.stringify(tasks));
  renderMainpageContent("./html/add_task.html");
}

/**
 * Checks the entered date and returns a value indicating whether the date is correct.
 * @returns {boolean} - Returns true if the date is correct, false otherwise.
 */
function checkTaskDate() {
  let currentTimestamp = new Date().getTime();
  let timestamp = new Date(addTaskDate.value).getTime();
  if (timestamp < currentTimestamp && timestamp < getYesterdayTimestamp()) {
    addTaskDateError.classList.remove("d-none");
    addTaskDateError.innerHTML = "The date entered must be in the future";
    return false;
  } else {
    addTaskDateError.classList.add("d-none");
    addTaskDateError.innerHTML = "A date must be entered";
    return true;
  }
}

/**
 * Returns the timestamp for yesterday at 23:59:59.
 * @returns {number} - The timestamp for yesterday at 23:59:59.
 */
function getYesterdayTimestamp() {
  let currentDate = new Date();
  let yesterdayDate = new Date(currentDate.getTime() - 24 * 60 * 60 * 1000);
  yesterdayDate.setHours(23, 59, 59, 999);
  return yesterdayDate.getTime();
}

/**
 * Checks the input fields for errors and updates the display accordingly.
 */
function errorTaskInput() {
  checkField(0, "title", addTaskTitel, addTaskTitelError);
  checkField(1, "date", addTaskDate, addTaskDateError, checkTaskDate);
  checkField(2, "category", addTaskCategory, addTaskCategoryError);
  clearTaskBtn.disabled = false;
  addTaskBtn.disabled = false;
}

/**
 * Checks a specific input field and updates the display accordingly.
 * @param {number} index - The index of the field to be checked in checkInputFields.
 * @param {string} prop - The property of the field to be checked (e.g. "title", "date").
 * @param {HTMLElement|null} element - The HTML element of the field to be styled (or null if not present).
 * @param {HTMLElement|null} errorElement - The HTML element for error messages (or null if not present).
 * @param {Function|null} callback - An optional callback function that is called if the field is valid (or null if not present).
 */
async function checkField(index, prop, element, errorElement, callback) {
  const isValid = checkInputFields[index][prop];
  if (element) {
    element.classList.toggle("red-border", !isValid);
  }
  if (errorElement) {
    errorElement.classList.add("d-none", isValid);
    await sleep("100");
    errorElement.classList.toggle("d-none", isValid);
  }
  if (isValid && callback) {
    callback();
  }
}

/**
 * Checks all input fields for empty values and returns true if all fields are valid, otherwise false.
 * @returns {boolean} - Returns true if all input fields are valid, false otherwise.
 */
function checkAllRequiredInputFields() {
  checkInputFields = [];
  checkInputFields.push({ title: addTaskTitel.value !== "" });
  checkInputFields.push({ date: addTaskDate.value !== "" });
  checkInputFields.push({ category: addTaskCategory.value !== "" });
  return checkInputFields.every((field) => Object.values(field)[0]);
}

/**
 * Renders the HTML content for the assignment of a new task.
 * Fills the element with the ID "add-task-assignet" with the corresponding HTML content.
 */
function renderAddTaskAssignetContentHTML() {
  document.getElementById("add-task-assignet").innerHTML = /*html*/ `
  <p>Assignet to</p>
  <input
    type="text"
    id="edit-task-assignet"
    autocomplete="off"
    placeholder="Select contact to assign"
    onclick="openOverlayContacts(tempTaskId)"
    oninput="changeInputTextColor('edit-task-assignet'), searchContact(tempTaskId)"
  />
  <div id="edit-task-icon-closecontact" class="d-none">
    <img
      src="./assets/img/addtask/check-black.svg"
      alt="add"
      onclick="closeOverlayContacts(event, tempTaskId)"
      class="edit-task-icon"
    />
  </div>
  <div id="edit-task-icon-opencontact">
    <img
      src="./assets/img/addtask/add.svg"
      alt="open"
      onclick="openOverlayContacts(tempTaskId)"
      class="edit-task-icon"
    />
  </div>
  <div
    id="edit-task-assignet-overlay"
    class="edit-task-assignet-overlay d-none"
  ></div>
  <div class="edit-card-footer">
    <div id="board-card-footer-badge">
    </div>
  </div>
`;
}
