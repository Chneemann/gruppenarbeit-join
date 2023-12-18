/**
 * This function checks whether the logged-in user (in LocalStorage) is a guest
 * or not and assigns their initials to the badged in the header.
 */
function currentUserBadged() {
  if (currentUser[0].username == "Guest") {
    document.getElementById("header-userimg").innerHTML = "G";
    document.getElementById("mobile-header-userimg").innerHTML = "G";
  } else {
    for (let i = 0; i < users.length; i++) {
      if (i == currentUser[0].id) {
        document.getElementById("header-userimg").innerHTML = getInitialsNavbar(
          currentUser[0].username
        );
        document.getElementById("mobile-header-userimg").innerHTML =
          getInitialsNavbar(currentUser[0].username);
      }
    }
  }
}

/**
 * Returns the initials for the navigation toolbar (navbar), based on the full name.
 *
 * @param {string} fullName - The full name from which initials are to be generated.
 * @returns {string} The initials generated from the first letter of the first name and the surname.
 */
function getInitialsNavbar(fullName) {
  let nameParts = fullName.split(" ");
  let firstInitial = nameParts[0].charAt(0).toUpperCase();
  let lastInitial = nameParts[1].charAt(0).toUpperCase();
  return `${firstInitial}${lastInitial}`;
}

/**
 * Opens the Navbar menu in the top right-hand corner
 */
function openNavbarMenu() {
  document.getElementById("navbar-menu").classList.toggle("d-none");
}

/**
 * Closes the navigation menu if a click event occurs outside certain elements.
 *
 * @param {Event} event - The click event that was triggered.
 */
function closeNavbarMenu(event) {
  if (!["header-userimg", "mobile-header-userimg"].includes(event.target.id)) {
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
