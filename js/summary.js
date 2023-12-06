

/*Funktion, die asynchron ist, weil erst alle Aufgaben geladen sein müssen */

async function initSummary(){
showAllTasks();
showInProgress();
showAwaitFeedback();
showToDo();
showDone();
}

/*Funktion, die alle tasks anzeigt*/

function showAllTasks(){
    let tasksInBoard = tasks.length;
    let inBoard = document.getElementById('inBoard');
    inBoard.innerHTML=`
    <span class="txt_number">${tasksInBoard}</span>
    <span class="txt_todo">Tasks in board</span>`
}

/*Funktionen, die alle tasks in progress anzeigen*/

function showInProgress(){

    let counterProgress = 0;
    for( let i=0; i<tasks.length; i++){
        if(tasks[i].status === "inprogress" )
        counterProgress++;
        renderInProgress(counterProgress);
    }
}

function renderInProgress(counterProgress){

    let inProgress = document.getElementById('inProgress');
    inProgress.innerHTML=`
    <span class="txt_number">${counterProgress}</span>
    <span class="txt_todo">Tasks in Progress</span>`
}

/*Funktionen, die alle tasks in Awaiting feedback anzeigen*/

function showAwaitFeedback(){

    let counterAwait = 0;
    for( let i=0; i<tasks.length; i++){
        if(tasks[i].status === "awaitfeedback" )
        counterAwait++;
        renderAwaitFeedback(counterAwait);
    }
}

function renderAwaitFeedback(counterAwait){

    let awaitFeedback = document.getElementById('awaitFeedback');
    awaitFeedback.innerHTML=`
    <span class="txt_number">${counterAwait}</span>
    <span class="txt_todo">Awaiting feedback</span>`
}

/*Funktionen, die alle tasks in To-Do anzeigen*/

function showToDo(){

    let counterToDo = 0;
    for( let i=0; i<tasks.length; i++){
        if(tasks[i].status === "todo" )
        counterToDo++;
        renderToDo(counterToDo);
    }
}

function renderToDo(counterToDo){

    let toDo = document.getElementById('toDo');
    toDo.innerHTML=`
    <div class="txt_number">${counterToDo}</div>
    <div class="txt_todo">To-do</div>`
}

/*Funktionen, die alle tasks in Done anzeigen*/

function showDone(){

    let counterDone = 0;
    for( let i=0; i<tasks.length; i++){
        if(tasks[i].status === "done" )
        counterDone++;
        renderDone(counterDone);
    }
}

function renderDone(counterDone){

    let Done = document.getElementById('Done');
    Done.innerHTML=`
    <div class="txt_number">${counterDone}</div>
    <div class="txt_todo">Done</div>`
}

