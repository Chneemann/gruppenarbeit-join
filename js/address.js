let co = [
    {
        'name': 'Jana',
        'email': 'js@gmail.com',
        'phone': 76567889,
        'color': '#876446',
    },
    {
        'name': 'Rosi',
        'email': 'rose@gmail.com',
        'phone': 7690089,
        'color': '#242424',
    },
    {
        'name': 'Carl Josef',
        'email': 'charlie@gmail.com',
        'phone': 44444,
        'color': '#218766',
    }
]

function openAddContact() {
    document.getElementById("add-contact-overlay").style.display = "flex";
    document.getElementById("overlay-header").innerHTML = 'Add Contact';
}

function addContact() {
    document.getElementById("add-contact-overlay").style.display = "flex";
    document.getElementById("overlay-header").innerHTML = "Add Contact";

}
async function addContact() {

    let name = document.getElementById('name').value;
    let email = document.getElementById("email").value;
    let phone = document.getElementById("phone").value;
    let color = randomColor = Math.floor(Math.random() * 16777215).toString(16);
    let id = JSON.stringify(contacts.length+1);

    contacts.push({id, name, email, phone, color });
    console.log(contacts);

    renderContacts();
}

function editContact(i) {
    document.getElementById("add-contact-overlay").style.display = "flex";
    document.getElementById("overlay-header").innerHTML = 'Edit Contact';
    document.getElementById("submit-contact").innerHTML = 'Save';
    document.getElementById("delete-close-contact").innerHTML = `
    <span onclick="deleteContact()" >cancel</span>
    `;
    document.getElementById("name").value = contacts[i]['name'];
    document.getElementById("email").value = contacts[i]['email'];
    document.getElementById("phone").value = contacts[i]['phone'];
    document.getElementById("overlay-badge").classList.add('big-badge');
    document.getElementById("overlay-badge").style.backgroundColor = contacts[i]['color'];
    document.getElementById("overlay-badge").innerHTML = `
    <span>${getInitials(i)}</span>
    `;
}

function deleteContact(i) {
    console.log('Delete');
}
function closeAddContact() {
    document.getElementById("add-contact-overlay").style.display = "none";
    resetForm();
}

function resetForm() {
    document.getElementById("name").value = '';
    document.getElementById("email").value = '';
    document.getElementById("phone").value = '';
}
function editContact() {
    document.getElementById("add-contact-overlay").style.display = "flex";
    document.getElementById("overlay-header").innerHTML = "Edit Contact";
}
function closeAddContact() {
    document.getElementById("add-contact-overlay").style.display = "none";

}

function firstLetter(i) {
    //FUNKTION FÜR REGISTER

    let firstLetter = contacts[i].name[0].toUpperCase();
    document.getElementById("contact-list").innerHTML += /*html*/ `
    <div class='first-letter' id='first-letter-${firstLetter}'>
    ${firstLetter}</div>
    `;
    return firstLetter;

}

function getInitials(i) {
    // FUNKTION FÜR BADGES
    const allNames = contacts[i].name.split(" ");

    let initials = [];
    for (let index = 0; index < allNames.length; index++) {

        initials.push(allNames[index][0].toUpperCase());
    }
    return initials.join(""); //Methode entfernt das Komma
}

function renderContacts(){
    for (let i = 0; i < contacts.length; i++) {
        firstLetter(i);
        let contact = contacts[i];

        document.getElementById("contact-list").innerHTML += /*html*/ `
        <div class="single-contact" id='contact-${i}' onclick='viewCard(${i})'> 
        <div class='badge' style="background-color:${contact["color"]
            }"} ><span>${getInitials(i)}</span></div>
        <div class='card'>
           <span>${contact["name"]}</span>   <br>
            <a href=""> ${contact["email"]}</a> <br>
    </div>
</div>
       `;
    }
}

function viewCard(i) {
    document.getElementById("card-closeup").innerHTML =
        /*html*/
        `
        <div class='card-closeup-header'>
            <div class='big-badge' style='background-color:${contacts[i]["color"]}><
              span>${getInitials(i)}</span>
            </div>
            <div class='card-closeup-header-right'><h2>${contacts[i]["name"]}</h2> 
                <div class='edit-delete-contact'>
                    <div class='edit-contact' onclick='editContact(${i})'><img src="./assets/img/edit.svg">Edit</div>
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
    `;
}
