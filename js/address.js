function addContact() {
  document.getElementById("add-contact-overlay").style.display = "flex";
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

function test(path) {
  console.log("test");
}

function renderContacts() {
  console.log("render contacts");
  for (let i = 0; i < contacts.length; i++) {
    firstLetter(i);
    let contact = contacts[i];

    document.getElementById("contact-list").innerHTML += /*html*/ `
        <div class="single-contact" id='contact-${i}' onclick='viewCard(${i})'> <!-- /*id notwendig? */ -->
        <div class='badge' style="background-color:${
          contact["color"]
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
            <div class='big-badge' style='background-color:${
              contacts[i]["color"]
            }'} ><span>${getInitials(i)}</span>
            </div>
            <div class='card-closeup-header-right'><h2>${
              contacts[i]["name"]
            }</h2> 
                <div class='edit-delete-contact'>
                    <div class='edit-contact' onclick='editContact()'><img src="./assets/img/edit.svg">Edit</div>
                    <div class='delete-contact' onclick='deleteContact()'><img src="./assets/img/delete.svg">Delete</div>
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
  console.log("test view card", i);
}
