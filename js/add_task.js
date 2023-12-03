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

function clearTask() {
  // Todo
}
