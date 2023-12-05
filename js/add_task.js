let taskPrio = "";
let taskSubtasks = [];
let taskSubtaskstate = [];
let lastTaskId;
let task = "";
let checkInputFields = [];

/**
 * Initialises the task form by loading all required functions
 */
async function initAddTask() {
  await loadAllTasks();
}

/**
 * Checks whether all entries are correct
 */
async function createNewTask() {
  console.log(checkAllInputFields(), checkTaskDate());
  if (checkAllInputFields() && checkTaskDate()) {
    saveTaskOnServer();
  } else {
    errorTaskInput();
  }
}

/**
 * Creates the new task in the backend
 */
function saveTaskOnServer() {
  clearTaskBtn.disabled = true;
  addTaskBtn.disabled = true;
  let timestamp = new Date(addTaskDate.value).getTime();
  task = {
    id: tasks.length,
    title: addTaskTitel.value,
    description: addTaskDescription.value,
    assignet: addTaskAssignet.value,
    category: addTaskCategory.value,
    date: timestamp,
    prio: taskPrio,
    subtasks: taskSubtasks,
    subtasksstate: taskSubtaskstate,
    status: "todo",
    delete: "no",
  };
  alert("Your task has been created.");
  clearTask();
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
  checkField(3, "prio", null, addTaskPrioError);
}

/**
 * Checks a specific input field and updates the display accordingly.
 * @param {number} index - The index of the field to be checked in checkInputFields.
 * @param {string} prop - The property of the field to be checked (e.g. "title", "date").
 * @param {HTMLElement|null} element - The HTML element of the field to be styled (or null if not present).
 * @param {HTMLElement|null} errorElement - The HTML element for error messages (or null if not present).
 * @param {Function|null} callback - An optional callback function that is called if the field is valid (or null if not present).
 */
function checkField(index, prop, element, errorElement, callback) {
  const isValid = checkInputFields[index][prop];
  if (element) {
    element.classList.toggle("red-border", !isValid);
  }
  if (errorElement) {
    errorElement.classList.toggle("d-none", isValid);
  }
  if (isValid && callback) {
    callback();
  }
}

/**
 * Resets the form to 0 by zeroing the variables and re-rendering the page
 */
function clearTask() {
  taskPrio = "";
  taskSubtasks = [];
  taskSubtaskstate = [];
  renderMainpageContent("./html/add_task.html");
}

/**
 * Checks all input fields for empty values and returns true if all fields are valid, otherwise false.
 * @returns {boolean} - Returns true if all input fields are valid, false otherwise.
 */
function checkAllInputFields() {
  checkInputFields = [];
  checkInputFields.push({ title: addTaskTitel.value !== "" });
  checkInputFields.push({ date: addTaskDate.value !== "" });
  checkInputFields.push({ category: addTaskCategory.value !== "" });
  checkInputFields.push({ prio: taskPrio !== "" });
  return checkInputFields.every((field) => Object.values(field)[0]);
}
