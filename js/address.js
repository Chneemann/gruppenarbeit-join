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
    }
]


function firstLetter(i){
    let firstLetter = contacts[i].name[0].toUpperCase();
    document.getElementById("contact-list").innerHTML+= /*html*/`
    <div class='first-letter' id='first-letter-${firstLetter}'>
    ${firstLetter}</div>
    ` 

}
function renderContacts(){
    for (let i = 0; i < contacts.length; i++) {
        firstLetter(i);
        let contact =contacts[i];
        console.log(JSON.stringify(contact['name']));
        document.getElementById("contact-list").innerHTML+= /*html*/`
        <div class='card'>
           <span>${contact['name']}</span>   <br>
            <a href=""> ${contact['email']}</a> <br>
    </div>
       `;
        
       
        
    }
}