let contactEmail;
let contactPhone;

function initAdress() {
  renderContacts();
}

/**
 * Renders a list of contacts in a scrollcontainer
 */
function renderContacts() {
  document.getElementById("contact-list").innerHTML = "";
  sortContacts();
  for (let i = 0; i < contacts.length; i++) {
    firstLetter(i);
    let contact = contacts[i];

    document.getElementById("contact-list").innerHTML += /*html*/ `
      <div class="single-contact" id='contact-${i}' onclick='viewCard(${i})'>
          <div class='badge' style="background-color:${contact["color"]}" ><span>${contact["initials"]}</span></div>
          <div class='card'>
            <span>${contact["name"]}</span>
              <p>${contact["email"]}</p>
      </div>
    </div>
       `;
  }
}

/**
 * Sorts contacts by alphabetically
 */
function sortContacts() {
  contacts.sort(function (a, b) {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  });
}

/**
 * Opens a dialog with a form to add contacts
 */
async function openAddContact() {
  document.getElementById("add-contact-overlay").classList.remove("d-none");

  renderContactOverlay();
  await openDialog("add-contact");
  document.getElementById("overlay-header").innerHTML = "Add Contact";
  document.getElementById("form-input").innerHTML = /*html*/ `
  <form class="contact-inputs" onsubmit="addContact(); return false">
  <input required type="text" placeholder='Name' id="name" autocomplete="none">
  <input required type="email" placeholder='Email' id="email" autocomplete="none">
  <input type="tel" placeholder='Phone' id="phone" autocomplete="none"> 
    <div id="submit-buttons">
      <button class="add-contact-btn-clear" id="delete-close-contact" onclick="closeAddContact()">
      <span>cancel</span>
      <img src="./assets/img/close.svg"/>
      </button>
      <button type="submit" class="add-contact-btn-create" id="submit-contact" onclick="">
      <span>Create contact</span>
      <img src="./assets/img/check.svg" />
      </button>
    </div>
    </form>
    `;
}

/**
 * Closes the dialog with a form to add contacts
 */
function closeAddContact() {
  closeDialog("add-contact");
  resetForm();
  renderContacts();
}

/**
 * Adds a new contact to the existing list with the contact information of the input
 * if the name field is empty, the form is not validated and no contact will be created
 */
async function addContact() {
  let name = document.getElementById("name").value;
  name = capitalizeFirstLetter(name);
  if (checkNameValidity(name) && name) {
    let email = document.getElementById("email").value;
    let phone = document.getElementById("phone").value;
    let initials = getInitials(name);
    let color = getRandomColor();
    let id = contacts.length;
    contacts.push({ id, name, initials, email, phone, color });
    setItem("contacts", contacts);
    closeAddContact();
    resetPage();
    renderContacts();
    await sleep(300);
    openInformationWindow("The contact was successfully created", 2500);
  }
}

function checkNameValidity(name) {
  const fullNameValue = name.trim();
  const nameRegex = /^(\S+\s+\S+)$/;
  const isValidName = nameRegex.test(fullNameValue);
  if (!isValidName) {
    openInformationWindow("You must enter a first name and a surname.", 3000);
    return false;
  } else {
    return true;
  }
}

/**
 * Creates an overlay-container which opens as a dialog
 */
function renderContactOverlay(id) {
  document.getElementById("add-contact-overlay").innerHTML = /*html*/ `
    <div id="add-contact" class="dialog-hide" onclick="event.stopPropagation()">
        <div class="add-contact-left"><img src="./assets/img/Join logo light.png" alt="">
            <h1 id="overlay-header">Add contact</h1>
            <span id="subtitle">Tasks are better with a Team </span>
            <img src="./assets/img/Vector 5.png" alt="">
        </div>
        <div id="overlay-badge">
            <img class="big-badge"  src="./assets/img/Group 13.png" alt="">
        </div>
        <div class="add-contact-form">
            <img src="./assets/img/close.svg" class="overlay-close-x" onclick="closeAddContact()">
            <div id="form-input"></div>             
        </div>
    </div>
    `;
}

/**
 * Opens a dialog with a form to edit the selected contact
 */
async function openEditContact(id) {
  document.getElementById("add-contact-overlay").classList.remove("d-none");
  resetPage();
  renderContactOverlay(id);
  await openDialog("add-contact");
  document.getElementById("overlay-header").innerHTML = "Edit Contact";
  document.getElementById("subtitle").classList.add("none");
  document.getElementById("form-input").innerHTML = /*html*/ `
  <form class="contact-inputs" onsubmit="editContact(${id}); return false">
                <input required type="text" placeholder='Name' id="name" autocomplete="none">
                <input required type="email" placeholder='Email' id="email" autocomplete="none">
                <input type="tel" placeholder='Phone' id="phone" autocomplete="none">
                <div id="submit-buttons">
    <button class="add-contact-btn-clear" id="delete-close-contact" onclick="deleteContact(${id}), closeAddContact()"><span>Delete</span>
    </button>
    <button type="submit" class="add-contact-btn-create" id="submit-contact"><span>Save</span><img src="./assets/img/check.svg" />
    </button>
</div>
</form>
    `;
  fillInput(id);
  document.getElementById("delete-close-contact").innerHTML = `
    <span onclick="deleteContact(${id})" >Delete</span>
    `;
}

/**
 * Fills the form with the existing contact information to edit the selected contact
 */
function fillInput(id) {
  document.getElementById("name").value = contacts[id]["name"];
  document.getElementById("email").value = contacts[id]["email"];
  document.getElementById("phone").value = contacts[id]["phone"];
  document.getElementById("overlay-badge").classList.add("big-badge");
  document.getElementById("overlay-badge").style.backgroundColor =
    contacts[id]["color"];
  document.getElementById("overlay-badge").innerHTML = `
    <span>${contacts[id]["initials"]}</span>
    `;
}

/**
 * Overwrites the existing contact with the new input
 */
async function editContact(id) {
  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let phone = document.getElementById("phone").value;
  let initials = getInitials(name);
  let color = contacts[id]["color"];
  if (checkNameValidity(name)) {
    contacts.splice(id, 1, { id, name, initials, email, phone, color });
    await setItem("contacts", JSON.stringify(contacts));
    resetPage();
    closeAddContact();
    renderContacts();
    await sleep(300);
    openInformationWindow("The contact information has been saved", 2500);
  }
}

/**
 * Deletes a contact from the storage and reloads the contact list
 */
async function deleteContact(i) {
  contacts.splice(i, 1);
  await setItem("contacts", contacts);
  resetPage();
  renderContacts();
  await sleep(200);
  openInformationWindow("The contact has been deleted", 1500);
}

/**
 * Slides in a card with the contact information
 */
async function viewCard(i) {
  checkMailAndPhone(i);
  renderCardCloseup(i);
  document.getElementById("view-contact").style.display = "flex";
  let hidden =
    document.getElementById("card-closeup").style.transform ==
    "translateX(100vw)";
  if (hidden) {
    document.getElementById("card-closeup").classList.add("transition");
    await sleep(10);
    document.getElementById("card-closeup").style.transform = "translateX(0)";
    await sleep(10);
  } else {
    document.getElementById("card-closeup").classList.remove("transition");
    document.getElementById("card-closeup").style.transform =
      "translateX(100vw)";
    await sleep(10);
    document.getElementById("card-closeup").classList.add("transition");
    await sleep(10);
    document.getElementById("card-closeup").style.transform = "translateX(0)";
  }
}

function checkMailAndPhone(i) {
  if (contacts[i]["email"] == "") {
    contactEmail = "no email";
  } else {
    contactEmail = `<a href="mail-to:${contacts[i]["email"]}"> ${contacts[i]["email"]}</a> `;
  }
  if (contacts[i]["phone"] == "") {
    contactPhone = "no phone";
  } else {
    contactPhone = contacts[i]["phone"];
  }
}

/**
 * Provides the two options delete and edit in cell phone mode, when clicked on the context-menu-button
 */
function openContactOptions(i) {
  document.getElementById("contact-options").onclick = function () {
    closeContactOptions(i);
  };
  document.getElementById("contact-options").innerHTML += `
    <div class='contact-options'>
    <div class='edit-contact' onclick='openEditContact(${i})'><img src="./assets/img/edit.svg">Edit</div>
    <div class='delete-contact' onclick='deleteContact(${i})'><img src="./assets/img/delete.svg">Delete</div>
    </div>
        `;
}

/**
 * Closes the context menu
 */
function closeContactOptions(i) {
  document.getElementById("contact-options").onclick = function () {
    openContactOptions(i);
  };
  document.getElementById("contact-options").innerHTML = `
  <img src="./assets/img/Menu Contact Options.png">
  `;
}

/**
 * resets the contact input-form
 */
function resetForm() {
  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
  document.getElementById("phone").value = "";
}

/**
 * resets the page after changes
 */
function resetPage() {
  document.getElementById("view-contact").style.display = "none";
  document.getElementById("card-closeup").style.transform = "translateX(100vw)";
  document.getElementById("contact-list").innerHTML = "";
  sleep(10);
}

/**
 * capitalizes the input name
 */
function capitalizeFirstLetter(string) {
  const allNames = string.split(" ");
  return allNames[0].charAt(0).toUpperCase() + string.slice(1);
}

/**
 * turns the first letters into a register, checks for duplicates
 */
function firstLetter(i) {
  let firstLetter = contacts[i].name[0].toUpperCase();
  if (i > 0 && firstLetter != contacts[i - 1].name[0]) {
    document.getElementById("contact-list").innerHTML += /*html*/ `
    <div class='first-letter' id='first-letter-${firstLetter}'>
    ${firstLetter}</div>
    `;
  } else if (i == 0) {
    document.getElementById("contact-list").innerHTML += /*html*/ `
        <div class='first-letter' id='first-letter-${firstLetter}'>
        ${firstLetter}</div>
        `;
  }
  return firstLetter;
}

/**
 * Shows the selected contact with all information next to the contact list(desktop mode)
 */
function renderCardCloseup(i) {
  document.getElementById("card-closeup").innerHTML = /*html*/ `
    <div class='card-closeup-header'>
      <div class='big-badge' style='background-color:${contacts[i]["color"]}'>
      <span>${contacts[i]["initials"]}</span>
      </div>
      <div class='card-closeup-header-right'><h2>${contacts[i]["name"]}</h2> 
          <div class='edit-delete-contact'>
              <div class='edit-contact' onclick='openEditContact(${i})'><img src="./assets/img/edit.svg">Edit</div>
              <div class='delete-contact' onclick='deleteContact(${i})'><img src="./assets/img/delete.svg">Delete</div>
          </div>
      </div>
    </div>
    <div class='contact-information'>
      <h3> Contact Information</h3>
      <p>Email</p>
        ${contactEmail}
        <br>
        <p>Phone</p>
        <span>${contactPhone}</span>
    </div>
    <button onclick="openContactOptions(${i})" class="button-open-add-contact-mobile2" id="contact-options">
    <img src="./assets/img/Menu Contact Options.png">
    </button>
    `;
}

/**
 * Hides the contact card in mobile mode when back-button is pressed
 */
function hideViewCard() {
  document.getElementById("view-contact").style.display = "none";
  renderContacts();
}

/**
 * Opens a dialog-overlay
 */
async function openDialog(id) {
  let overlay = document.getElementById(id);
  await sleep(10);
  overlay.classList.add("dialog-show");
  overlay.classList.remove("dialog-hide");
}

/**
 * Closes the dialog-overlay
 */
async function closeDialog(id) {
  let overlay = document.getElementById(id);
  document.body.style.overflow = "auto";
  overlay.classList.add("dialog-hide");
  overlay.classList.remove("dialog-show");
  overlay.style.backgroundColor = "";
  await sleep(100);
  overlay.classList.add("d-none");
  document.getElementById("add-contact-overlay").classList.add("d-none");
}

/**
 * Splits Initials of the input name to create a badge
 */
function getInitials(name) {
  const allNames = name.split(" ");

  let initials = [];
  for (let index = 0; index < allNames.length; index++) {
    initials.push(allNames[index][0].toUpperCase());
  }
  return initials.join(""); //Methode entfernt das Komma
}

/**
 * Generates a random color used for the background of the userbadge
 */
function getRandomColor() {
  function getRandomComponent() {
    const component = Math.floor(Math.random() * 256).toString(16);
    return component.length === 1 ? "0" + component : component;
  }
  let color;
  do {
    const red = getRandomComponent();
    const green = getRandomComponent();
    const blue = getRandomComponent();
    color = `#${red}${green}${blue}`;
  } while (isGrayscale(color));
  return color;
}

/**
 * Filters gray tones from the random color
 */
function isGrayscale(color) {
  const hex = color.slice(1);
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  return r === g && g === b;
}
