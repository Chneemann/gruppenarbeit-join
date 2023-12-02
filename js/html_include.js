// BOARD

/**
 * This function generate the current task
 *
 * @param {string} id Current task id
 * @param {string} name The <div> id in html code
 */
function generateTaskHTML(id, name) {
  document.getElementById(name).innerHTML += /*html*/ `
    <div class="board-cart" draggable="true" ondragstart="startDragging(${
      tasks[id].id
    })" onclick="openCart(${tasks[id].id})">
      <div class="board-card-category" style="background-color: var(--${generateTaskCategoryColor(
        id
      )})">${tasks[id].category}</div>
      <div class="board-card-headline">${tasks[id].title}</div>
      <div class="board-card-description">
      ${tasks[id].description}
      </div>
      <div class="board-card-subtask">
      ${checkSubtasksBoard(tasks[id].id)}
      </div>
      <div class="board-card-footer">
        <div id="board-card-footer-badge">
          ${checkAssignetUsersBoard(tasks[id].id)}
        </div>
        <div class="board-card-footer-priority prio-${tasks[id].prio}"></div>
      </div>
    </div>`;
}

/**
 * This function displays the clicked task in large size
 *
 * @param {string} id Current task id
 */
function generateTaskOverlayHTML(id) {
  document.getElementById("task-overlay-cart").innerHTML = /*html*/ `
  <div class="task-overlay" onclick="event.stopPropagation()">
    <div class="text-wrap-overflow">
      <div class="task-overlay-header">
        <div id="task-overlay-category" style="background-color: var(--${generateTaskCategoryColor(
          id
        )})">${tasks[id].category}</div>
        <div class="task-overlay-img-close" onclick="closeCart()">
          <img src="./assets/img/close.svg" alt="" />
        </div>
      </div>
      <div class="task-overlay-headline">
        <h2 id="task-overlay-headline">${tasks[id].title}</h2>
      </div>
      <div class="task-overlay-content">
        <div id="task-overlay-description">
        ${tasks[id].description}
        </div>
        <div class="task-overlay-date">
          <p>Due date:</p>
          <span id="task-overlay-date">10/05/2023</span>
        </div>
        <div class="task-overlay-prio">
          <p>Priority:</p>
          <span id="task-overlay-prio"
            >${textTransformPriority(
              id
            )}</span><div class="board-card-priority prio-${
    tasks[id].prio
  }"></div>
        </div>
        <div>
          Assigned To:
          <div class="task-overlay-assigned-person">
          ${checkAssignetUsers(id)}
          </div>
        </div>
        <div>
          Subtasks
          <div id="task-overlay-subtasks" class="task-overlay-subtasks">
          </div>
        </div>
      </div>
      <div class="task-overlay-footer">
        <a href="#" onclick="deleteTask(${id})"
          ><img
            class="task-overlay-footer-img"
            src="./assets/img/delete.svg"
            alt="delete"
          /><span>Delete</span></a
        >
        <img src="./assets/img/line.svg" alt="line" />
        <a href="#" onclick="editTask(${id})"
          ><img
            class="task-overlay-footer-img"
            src="./assets/img/edit.svg"
            alt="edit"
          /><span>Edit</span></a
        >
      </div>
    </div>
  </div>
  `;
}

/**
 * This function displays the clicked task in large size
 *
 * @param {string} id Current task id
 */
function generateTaskOverlayEditHTML(id) {
  document.getElementById("task-overlay-cart").innerHTML = /*html*/ `
  <div id="edit-task-page" onclick="event.stopPropagation(), closeOverlayContacts(event)">
    <div class="text-wrap-overflow">
      <div class="edit-task-header right">
        <div
          id="edit-task-img-close"
          class="edit-task-img-close"
          onclick="closeCart()"
        >
          <img src="./assets/img/close.svg" alt="" />
        </div>
      </div>
      <div class="edit-task-formular">
        <div class="edit-task-left">
          <div class="edit-task-title">
            <p>Title<span class="red-dot">*</span></p>
            <input
              type="text"
              id="edit-task-titel"
              placeholder="Enter a title"
              value="${tasks[id].title}"
              oninput="changeInputTextColor('edit-task-titel')"
              required
            />
          </div>
          <div class="edit-task-description">
            <p>Description</p>
            <textarea
              id="edit-task-description"
              placeholder="Enter a Description"
              oninput="changeInputTextColor('edit-task-description')"
            >${tasks[id].description}</textarea>
          </div>
          <div class="edit-task-date">
            <p>Due date<span class="red-dot">*</span></p>
            <input
              type="date"
              id="edit-task-date"
              oninput="changeInputTextColor('edit-task-date')"
              required
            />
          </div>
        </div>
        <div class="edit-task-middle">
          <div class="add-task-line"></div>
        </div>
        <div class="edit-task-right">
          <div class="edit-task-prio">
            <p>Prio</p>
            <div class="edit-task-prio-fields">
              <button
                id="icon-urgent"
                class="edit-task-prio-field icon-urgent"
                onclick="addPrioStatus('icon-urgent')"
              >
                <div id="icon-urgent-inline" class="edit-task-prio-button">
                  <span>Urgent</span>
                  <img src="./assets/img/urgent.svg" alt="" />
                </div>
              </button>
              <button
                id="icon-medium"
                class="edit-task-prio-field"
                onclick="addPrioStatus('icon-medium')"
              >
                <div id="icon-medium-inline" class="edit-task-prio-button">
                  <span>Medium</span>
                  <img src="./assets/img/medium.svg" alt="" />
                </div>
              </button>
              <button
                id="icon-low"
                class="edit-task-prio-field icon-low"
                onclick="addPrioStatus('icon-low')"
              >
                <div id="icon-low-inline" class="edit-task-prio-button">
                  <span>Low</span>
                  <img src="./assets/img/low.svg" alt="" />
                </div>
              </button>
            </div>
          </div>
          <div class="edit-task-assignet">
            <p>Assignet to</p>
            <input
              type="text"
              id="edit-task-assignet"
              placeholder="Select contact to assign"
              onclick="openOverlayContacts(event)"
              oninput="changeInputTextColor('edit-task-assignet')"
            />
            <div id="edit-task-assignet-overlay" class="edit-task-assignet-overlay d-none">
            </div>
            <div class="board-card-footer">
              <div id="board-card-footer-badge">
              ${checkAssignetUsersBoard(tasks[id].id)}
              </div>
            </div>
          </div>
          <div class="edit-task-subtask">
            <p>Subtask</p>
            <input
              type="text"
              id="edit-task-subtask"
              placeholder="Add new subtask"
              onclick="addSubtask()"
            />
            <div id="edit-task-icons">
              <div id="edit-task-icon-add">
                <img
                  src="./assets/img/add.svg"
                  alt="add"
                  onclick="addSubtask()"
                  class="edit-task-icon"
                />
              </div>
              <div id="edit-task-icon-close-check" class="d-none">
                <img
                  src="./assets/img/close.svg"
                  alt="close"
                  onclick="closeSubtask()"
                  class="edit-task-icon"
                />
                <span class="edit-task-line small"></span>
                <img
                  src="./assets/img/check-black.png"
                  alt="check"
                  onclick="confirmSubtask()"
                  class="edit-task-icon"
                />
              </div>
            </div>
            <div id="edit-task-subtask-addet">
            
            </div>
          </div>
        </div>
      </div>
      <div>
        <div class="edit-task-footer">
          <div class="edit-task-buttons">
            <button class="edit-task-btn" type="submit">
              <div class="edit-task-btn-inside">
                <span>Ok</span>
                <img src="./assets/img/check.svg" alt="ckeck" />
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  `;
}

function openOverlayContacts(event) {
  if (event) event.stopPropagation();
  document
    .getElementById("edit-task-assignet-overlay")
    .classList.remove("d-none");
  renderAllContacts();
}

function closeOverlayContacts(event) {
  const overlay = document.getElementById("edit-task-assignet-overlay");
  const target = event.target;

  if (!overlay.contains(target) && !target.matches("#edit-task-assignet")) {
    overlay.classList.add("d-none");
    saveContactToTask();
  }
}

function renderAllContacts() {
  document.getElementById("edit-task-assignet-overlay").innerHTML = "";
  for (let i = 0; i < users.length; i++) {
    document.getElementById(
      "edit-task-assignet-overlay"
    ).innerHTML += /*html*/ `
    <div class="edit-task-contact-overlay"><span>${getUserInitials(
      users[i].id
    )}</span><span>${users[i].username}</span><input type="checkbox"></div>
    `;
  }
}

function saveContactToTask() {}
