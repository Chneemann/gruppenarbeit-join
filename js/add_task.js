let taskPrio = "";
let taskSubtasks = [];
let taskSubtaskstate = [];
let lastTaskId;
let task = "";

async function initAddTask() {
  await loadAllTasks();
  // loadTasks();
}

async function createTask() {
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

function clearTask() {
  taskPrio = "";
  taskSubtasks = [];
  taskSubtaskstate = [];
  renderMainpageContent("./html/add_task.html");
}
