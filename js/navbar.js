/**
 * This function checks whether the logged-in user (in the LocalStorag) is the
 * guest or not and assigns its initials to the badged in the header.
 */
function currentUserBadged() {
  let currentUser = JSON.parse(localStorage.getItem("currentUser"));
  if (currentUser[0].username == "Guest") {
    document.getElementById("mobile-header-userimg").innerHTML = "G";
  } else {
    for (let i = 0; i < users.length; i++) {
      if (i == currentUser[0].id) {
        document.getElementById("mobile-header-userimg").innerHTML =
          users[i].initials;
      }
    }
  }
}
