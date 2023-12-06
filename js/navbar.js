/**
 * This function checks whether the logged-in user (in LocalStorage) is a guest
 * or not and assigns their initials to the badged in the header.
 */
function currentUserBadged() {
  let currentUser = JSON.parse(localStorage.getItem("currentUser"));
  if (currentUser[0].username == "Guest") {
    document.getElementById("header-userimg").innerHTML = "G";
    document.getElementById("mobile-header-userimg").innerHTML = "G";
  } else {
    for (let i = 0; i < users.length; i++) {
      if (i == currentUser[0].id) {
        document.getElementById("header-userimg").innerHTML = users[i].initials;
        document.getElementById("mobile-header-userimg").innerHTML =
          users[i].initials;
      }
    }
  }
}

function openNavbarMenu() {
  document.getElementById("navbar-menu").classList.toggle("d-none");
}

function closeNavbarMenu(event) {
  if (event.target.id != "header-userimg") {
    document.getElementById("navbar-menu").classList.add("d-none");
  }
}

/**
 * This function deletes the user from the LocalStorage and loads the login page, he is now logged out
 */
function logout() {
  localStorage.removeItem("currentUser");
  window.location.href = "./index.html";
  document.getElementById("loginpage").classList.remove("d-none");
  document.getElementById("mainpage").classList.add("d-none");
}
