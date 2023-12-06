

/*Funktion, die asynchron ist, weil erst alle Aufgaben geladen sein müssen */

async function initSummary(){
showAllTasks();
}

/*Funktion, die alle tasks anzeigt*/

function showAllTasks(){
    let tasksInBoard = tasks.length;
    let inBoard = document.getElementById('inBoard');
    inBoard.innerHTML=`
    <span class="txt_number">${tasksInBoard}</span>
    <span class="txt_todo">Tasks in board</span>`
}

/*Funktion, die alle tasks in progress anzeigt*/

