function moveLogoToTopLeft() {
  setTimeout(() => {
    document.querySelector(".logo-loading").classList.add("move-to-top-left");
  }, "2000");
  setTimeout(() => {
    loadLoginPage();
  }, "4000");
}

function loadSignupPage() {
  document.getElementById("signup-page").classList.remove("d-none");
  document.getElementById("login-page").classList.add("d-none");
}

function loadLoginPage() {
  document.getElementById("signup-page").classList.add("d-none");
  document.getElementById("login-page").classList.remove("d-none");
  document.getElementById("logo-loading").classList.add("d-none");
  document.getElementById("footer").classList.remove("d-none");
}
