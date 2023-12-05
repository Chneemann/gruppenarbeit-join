function renderContacts() {

    contacts.sort(function (a, b) {
        if (a.name < b.name) {
            return -1;
        }
        if (a.name > b.name) {
            return 1;
        }
        return 0;
    });


    for (let i = 0; i < contacts.length; i++) {
        firstLetter(i);
        let contact = contacts[i];

        document.getElementById("contact-list").innerHTML += /*html*/ `
        <div class="single-contact" id='contact-${i}' onclick='viewCard(${i})'>
        <div class='badge' style="background-color:${contact["color"]
            }"} ><span>${contact["initials"]}</span></div>
        <div class='card'>
           <span>${contact["name"]}</span>   <br>
            <a href=""> ${contact["email"]}</a> <br>
    </div>
</div>
       `;
    }
}


function openAddContact() {
    document.getElementById("add-contact-overlay").style.display = "flex";
    document.getElementById("overlay-header").innerHTML = 'Add Contact';
    document.getElementById("submit-buttons").innerHTML = `<button class="add-contact-btn-clear" id="delete-close-contact" onclick="closeAddContact()"><span>cancel</span><img
    src="./assets/img/close.svg"/>
    </button>

    <button class="add-contact-btn-create" id="submit-contact" onclick="addContact(), closeAddContact(), alert('Neuen Kontakt angelegt')"><span>Create
        contact</span><img src="./assets/img/check.svg" />
    </button>
    `
}


function openEditContact(id) {
    console.log(id);
    document.getElementById("add-contact-overlay").style.display = "flex";
    document.getElementById("overlay-header").innerHTML = "Edit Contact";
    document.getElementById("submit-buttons").innerHTML = ` <button class="add-contact-btn-clear" id="delete-close-contact" onclick="deleteContact(${id}), closeAddContact()"><span>Delete</span>
</button>

<button class="add-contact-btn-create" id="submit-contact"><span>Edit
    contact</span><img src="./assets/img/check.svg" onclick="editContact(${id})"/>
</button>
    `
    document.getElementById("name").value = contacts[id]['name'];
    document.getElementById("email").value = contacts[id]['email'];
    document.getElementById("phone").value = contacts[id]['phone'];
    document.getElementById("overlay-badge").classList.add('big-badge');
    document.getElementById("overlay-badge").style.backgroundColor = contacts[id]['color'];
    document.getElementById("overlay-badge").innerHTML = `
    <span>${contacts[id]['initials']}</span>
    `;
    document.getElementById("delete-close-contact").innerHTML = `
    <span onclick="deleteContact(${id})" >delete</span>
    `;
}


function closeAddContact() {
    document.getElementById("add-contact-overlay").style.display = "none";
    resetForm();
}


function openContactOptions(i){
    document.getElementById('contact-options').innerHTML += 
`
<div class='contact-options'>
<div class='edit-contact' onclick='openEditContact(${i})'><img src="./assets/img/edit.svg">Edit</div>
                    <div class='delete-contact' onclick='deleteContact(${i})'><img src="./assets/img/delete.svg">Delete</div></div>
`
}


async function addContact() {

    console.log('addContact');
    let name = document.getElementById('name').value;
    let email = document.getElementById("email").value;
    let phone = document.getElementById("phone").value;
    let initials = getInitials(name);
    let color = getRandomColor()
    console.log(color);
    let id = JSON.stringify(contacts.length);
    localStorage.setItem
    contacts.push({ id, name, initials, email, phone, color });

    await setItem("contacts", JSON.stringify(contacts));
    resetPage();
    renderContacts();
}


async function deleteContact(i) {
    console.log('delete i', i);
    contacts.splice(i, 1);
    resetPage();
    renderContacts();
}


async function editContact(id) {
    let name = document.getElementById('name').value;
    let email = document.getElementById("email").value;
    let phone = document.getElementById("phone").value;
    let initials = getInitials(name);
    let color = contacts[id]['color'];
    contacts.splice(id, 1, { id, name, initials, email, phone, color });
    await setItem("contacts", JSON.stringify(contacts));
    resetPage();
    closeAddContact();
    renderContacts();
}

function resetForm() {
    document.getElementById("name").value = '';
    document.getElementById("email").value = '';
    document.getElementById("phone").value = '';
}


function resetPage() {
    document.getElementById("contact-list").innerHTML = '';
    document.getElementById("view-contact").style.display = "none";
}


function firstLetter(i) {
    //FUNKTION FÜR REGISTER

    let firstLetter = contacts[i].name[0].toUpperCase();
    if ((i > 0) && (firstLetter != contacts[i - 1].name[0])) {
        document.getElementById("contact-list").innerHTML += /*html*/ `
    <div class='first-letter' id='first-letter-${firstLetter}'>
    ${firstLetter}</div>
    `;
    }
    else if(i==0){
        document.getElementById("contact-list").innerHTML += /*html*/ `
        <div class='first-letter' id='first-letter-${firstLetter}'>
        ${firstLetter}</div>
        `;
    }
    


    return firstLetter;

}


function getInitials(name) {
    console.log(name);
    const allNames = name.split(" ");

    let initials = [];
    for (let index = 0; index < allNames.length; index++) {

        initials.push(allNames[index][0].toUpperCase());
    }
    return initials.join(""); //Methode entfernt das Komma
}



function viewCard(i) {
    console.log(contacts[i]["color"], contacts[i]["initials"])
    document.getElementById("view-contact").style.display = "block";
    document.getElementById("card-closeup").innerHTML =
        /*html*/
        `
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
            <a href=""> ${contacts[i]["email"]}</a> <br>
            <p>Phone</p>
            <span>${contacts[i]["phone"]}</span>
    </div>
    <button onclick="openContactOptions(${i})" class="button-open-add-contact-mobile" id="contact-options">
                <img src="./assets/img/Menu Contact Options.png">
            </button>
    `;
}


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


function isGrayscale(color) {
    const hex = color.slice(1);
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return r === g && g === b;
}

