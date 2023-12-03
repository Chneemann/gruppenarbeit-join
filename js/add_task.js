let taskPrio = "";
let taskSubtasks = [];
let lastTaskId;
let task = "";

function initAddTask() {
  // loadTasks();
}

async function createTask() {
  clearTaskBtn.disabled = true;
  addTaskBtn.disabled = true;
  let timestamp = new Date(addTaskDate.value).getTime();
  task = {
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
  alert("Your task has been created.");
  clearTask();
}

function clearTask() {
  taskPrio = "";
  taskSubtasks = [];
  renderMainpageContent("./html/add_task.html");
}
