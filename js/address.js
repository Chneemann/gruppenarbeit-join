let contacts =[
    {'name':'Jana',
    'email': 'js@gmail.com',
   'phone': 76567889,
    'color': '#876446',
    },
    {'name':'Rosi',
    'email': 'rose@gmail.com',
   'phone': 7690089,
    'color': '#242424',
    },
    {'name':'Carl Josef',
    'email': 'charlie@gmail.com',
   'phone': 44444,
    'color': '#218766',
    }
]
function addContact(){
document.getElementById("add-contact-overlay").style.display = "block";

}
function closeAddContact(){
   document.getElementById("add-contact-overlay").style.display = "block";
}

function firstLetter(i){ //FUNKTION FÜR REGISTER
    
    let firstLetter = contacts[i].name[0].toUpperCase();
    document.getElementById("contact-list").innerHTML+= /*html*/`
    <div class='first-letter' id='first-letter-${firstLetter}'>
    ${firstLetter}</div>
    ` 
    return firstLetter;

}

function getInitials(i){// FUNKTION FÜR BADGES
const allNames =contacts[i].name.split(' ');
console.log(allNames);
let initials =[];
for (let index = 0; index < allNames.length; index++) {
    
    initials.push(allNames[index][0].toUpperCase());
}
return initials.join("") //Methode entfernt das Komma
}


function renderContacts(){
    for (let i = 0; i < contacts.length; i++) {
        firstLetter(i);
        let contact =contacts[i];
        console.log(JSON.stringify(contact['name']));
        document.getElementById("contact-list").innerHTML+= /*html*/`
        <div class="single-contact">
        <div class='badge' style="background-color:${contact['color']}"} ><span>${getInitials(i)}</span></div>
        <div class='card'>
           <span>${contact['name']}</span>   <br>
            <a href=""> ${contact['email']}</a> <br>
    </div>
</div>
       `;
        
       
        
    }
}