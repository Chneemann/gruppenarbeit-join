// BOARD

/**
 * Renders the HTML code for a task card and adds it to the corresponding container.
 *
 * @param {number} id - The unique identification number of the task.
 * @param {string} name - The name of the container to which the task card is added.
 */
function renderTaskHTML(id, name) {
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
      ${checkSubtasksBoard(tasks[id].id)}
      <div class="board-card-footer">
        <div id="board-card-footer-badge">
          ${checkAssignetContactBoard(tasks[id].id)}
        </div>
        <div class="board-card-footer-priority prio-${tasks[id].prio}"></div>
      </div>
    </div>
    `;
}

/**
 * Generates HTML code for the display element of an assigned contact on the board.
 *
 * @param {number} i - The index of the element or task.
 * @param {string} userInitials - The initials of the assigned user.
 * @param {string} color - The background colour of the display element.
 * @returns {string} - The generated HTML code for the assigned contact board element.
 */
function renderAssignetContactBoardHTML(i, userInitials, color) {
  return /*html*/ `
    <span class="board-card-footer-badged margin-left" style="background-color: ${color}">${userInitials}</span>
  `;
}

/**
 * Render HTML for the task overlay based on the task ID.
 *
 * @param {number} id - The ID of the task for which the overlay is to be rendered.
 */
function renderTaskOverlayHTML(id) {
  document.getElementById("task-overlay-cart").innerHTML = /*html*/ `
  <div class="task-overlay" onclick="event.stopPropagation()">
    <div class="text-wrap-overflow">
      <div class="task-overlay-header">
        <div id="task-overlay-category" style="background-color: var(--${generateTaskCategoryColor(
          id
        )})">${tasks[id].category}</div>
        <div class="task-overlay-img-close" onclick="closeCart()">
          <img src="./assets/img/board/close.svg" alt="" />
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
          <span id="task-overlay-date">${timestampInDate(tasks[id].date)}</span>
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
          ${checkAssignetContact(id)}
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
            src="./assets/img/board/delete.svg"
            alt="delete"
          /><span>Delete</span></a
        >
        <img src="./assets/img/board/line.svg" alt="line" />
        <a href="#" onclick="editTask(${id})"
          ><img
            class="task-overlay-footer-img"
            src="./assets/img/board/edit.svg"
            alt="edit"
          /><span>Edit</span></a
        >
      </div>
    </div>
  </div>
  `;
}

/**
 * Render HTML for the task overlay in edit mode.
 *
 * @param {number} id - The ID of the task for which the overlay is being rendered.
 */
function renderTaskOverlayEditHTML(id) {
  document.getElementById("task-overlay-cart").innerHTML = /*html*/ `
  <div id="edit-task-page" onclick="event.stopPropagation()">
    <div class="text-wrap-overflow">
      <div class="edit-task-header right">
        <div
          id="edit-task-img-close"
          class="edit-task-img-close"
          onclick="closeCart()"
        >
          <img src="./assets/img/board/close.svg" alt="" />
        </div>
      </div>
      <div class="edit-task-formular">
        <div class="edit-task-left">
          <div class="edit-task-title">
            <p>Title<span class="red-dot">*</span></p>
            <input
              type="text"
              id="editTaskTitel"
              placeholder="Enter a title"
              value="${tasks[id].title}"
              oninput="changeInputTextColor('editTaskTitel')"
              required
            />
          </div>
          <div class="edit-task-description">
            <p>Description</p>
            <textarea
              id="editTaskDescription"
              placeholder="Enter a Description"
              oninput="changeInputTextColor('editTaskDescription')"
            >${tasks[id].description}</textarea>
          </div>
          <div class="edit-task-date">
            <p>Due date<span class="red-dot">*</span></p>
            <input
              type="date"
              id="editTaskDate"
              oninput="changeInputTextColor('editTaskDate')"
              value="${timestampForInputfield(tasks[id].date)}"
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
                  <img src="./assets/img/board/urgent.svg" alt="" />
                </div>
              </button>
              <button
                id="icon-medium"
                class="edit-task-prio-field"
                onclick="addPrioStatus('icon-medium')"
              >
                <div id="icon-medium-inline" class="edit-task-prio-button">
                  <span>Medium</span>
                  <img src="./assets/img/board/medium.svg" alt="" />
                </div>
              </button>
              <button
                id="icon-low"
                class="edit-task-prio-field icon-low"
                onclick="addPrioStatus('icon-low')"
              >
                <div id="icon-low-inline" class="edit-task-prio-button">
                  <span>Low</span>
                  <img src="./assets/img/board/low.svg" alt="" />
                </div>
              </button>
            </div>
          </div>
          <div class="edit-task-assignet">
            <p>Assignet to</p>
            <input
              type="text"
              id="edit-task-assignet"
              autocomplete="off"
              placeholder="Select contact to assign"
              onclick="openOverlayContacts(${tasks[id].id})"
              oninput="changeInputTextColor('edit-task-assignet'), searchContact(${
                tasks[id].id
              })"
            />
            <div id="edit-task-icon-closecontact" class="edit-task-icon-closecontact d-none">
                <img
                  src="./assets/img/board/check-black.svg"
                  alt="add"
                  onclick="closeOverlayContacts(event, ${tasks[id].id})"
                  class="edit-task-icon"
                />
              </div>
              <div id="edit-task-icon-opencontact" class="edit-task-icon-closecontact">
                <img
                  src="./assets/img/board/add.svg"
                  alt="open"
                  onclick="openOverlayContacts(${tasks[id].id})"
                  class="edit-task-icon"
                />
              </div>
            <div id="edit-task-assignet-overlay" class="edit-task-assignet-overlay edit-task-assignet-overlay-media d-none">
            </div>
            <div class="edit-card-footer">
              <div id="board-card-footer-badge">
              </div>
            </div>
          </div>
          <div class="edit-task-subtask">
            <p>Subtask</p>
            <input
              type="text"
              id="edit-task-subtask"
              placeholder="Add new subtask"
              oninput="userInputSubtask('edit')"
            />
            <div id="edit-task-icons">
              <div id="edit-task-icon-add">
                <img
                  src="./assets/img/board/add.svg"
                  alt="add"
                />
              </div>
              <div id="edit-task-icon-close-check" class="d-none flex">
                <img
                  src="./assets/img/board/close.svg"
                  alt="close"
                  onclick="closeSubtask('edit')"
                  class="edit-task-icon"
                />
                <span class="edit-task-line small"></span>
                <img
                  src="./assets/img/board/check-black.svg"
                  alt="check"
                  onclick="confirmSubtask('edit', ${tasks[id].id})"
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
            <button class="edit-task-btn" type="button" onclick="confirmEditTask(${
              tasks[id].id
            })">
              <div class="edit-task-btn-inside">
                <span>Ok</span>
                <img src="./assets/img/board/check.svg" alt="ckeck" />
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  `;
}

/**
 * Render HTML for a contact and add it to the overlay for assigned contacts.
 *
 * @param {Object} contact - The contact to be rendered.
 * @param {string} taskId - The ID of the associated task.
 */
function renderContactHTML(contact, taskId) {
  document.getElementById("edit-task-assignet-overlay").innerHTML += /*html*/ `
    <div onclick="addContactToAssignet(${
      contact.id
    }, ${taskId})" class="edit-task-contact-overlay"><span>${
    contact.initials
  }</span><span>${contact.name}</span><input id="contact_checkbox${
    contact.id
  }" type="checkbox" style="pointer-events: none" ${checkContactIsInAssignet(
    taskId,
    contact.id
  )}></div>
  `;
}

/**
 * Generates HTML for an empty task area and adds it to the corresponding element.
 *
 * @param {string} id - The ID of the HTML element to which the empty task HTML is added.
 */
function generateEmptyTaskHTML(id) {
  document.getElementById(id).innerHTML = /*html*/ `
   <div class="board-empty-task">No tasks To do</div>
  `;
}

/**
 * Generates HTML code for the display of assigned contacts in a task.
 *
 * @param {number} i - The index of the assigned contact.
 * @param {string} userInitials - The initials of the assigned contact.
 * @param {string} username - The user name of the assigned contact.
 * @param {string} color - The background colour for the initials badge.
 * @returns {string} - The generated HTML code for the assigned contacts.
 */
function generateAssignetContactHTML(i, userInitials, username, color) {
  return /*html*/ `
    <div class="task-overlay-person">
    <span class="board-card-footer-badged" style="background-color: ${color}">${userInitials}</span>
       <p>${username}</p>
     </div>
  `;
}

/**
 * Render HTML for a subtask in a specific task div.
 *
 * @param {string} divId - The ID of the HTML element in which the subtask is to be rendered.
 * @param {number} taskId - The ID of the task to which the subtask belongs.
 * @param {number} i - The index of the subtask in the array of subtasks of the task.
 */
function renderSubtaskHTML(divId, taskId, i) {
  document.getElementById(`${divId}-task-subtask-addet`).innerHTML += /*html*/ `
    <div class="edit-task-subtask-addet">
    <li><span id="${divId}TaskTitletext${i}">${tasks[taskId].subtasks[i]}</span><input type="text" id="${divId}TaskEditfield${i}" value="${tasks[taskId].subtasks[i]}" class="d-none"/></li>
    <div class="edit-task-icons-addet">
    <img
        id="${divId}-edit-task-icon-subtask-close${i}"
        src="../assets/img/board/check.svg"
        alt="add"
        class="edit-task-icon-addet d-none"
        onclick="saveEditSubtask('${divId}',${taskId},${i})"
      />
      <img
      id="${divId}-edit-task-icon-subtask-edit${i}"
        src="../assets/img/board/edit.svg"
        alt="edit"
        class="edit-task-icon-addet"
        onclick="editSubtask('${divId}',${i})"
      />
      <div class="edit-task-subtask-line"></div>
      <img
        src="../assets/img/board/delete.svg"
        alt="delete"
        class="edit-task-icon-addet"
        onclick="deleteSubtask('${divId}',${taskId},${i})"
      />
    </div>
  </div>`;
}
