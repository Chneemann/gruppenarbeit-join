let users = [];

async function initLogin() {
  loadUsers();
}

async function loadUsers() {
  try {
    users = JSON.parse(await getItem("users"));
  } catch (e) {
    console.error("Loading error:", e);
  }
}

// LOGIN

function login() {
  console.log("Login");
}

function redirectToIndex() {
  window.location.href = "./mainpage.html";
}

// SIGNUP

async function register() {
  signupBtn.disabled = true;
  if (validatePassword()) {
    users.push({
      username: signupUsername.value,
      email: signupEmail.value,
      password: signupPassword.value,
    });
    await setItem("users", JSON.stringify(users));
    resetForm();
  }
  signupBtn.disabled = false;
}

function validatePassword() {
  if (signupPassword.value !== signupConfirmPassword.value) {
    alert("Passwords don't match");
    return false;
  }
  return true;
}

function resetForm() {
  signupUsername.value = "";
  signupEmail.value = "";
  signupPassword.value = "";
  signupConfirmPassword.value = "";
  signupCheckBox.checked = false;
}

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
