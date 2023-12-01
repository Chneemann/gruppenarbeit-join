let users = [];

/**
 * This function loads all users from the backend.
 */
async function initLogin() {
  loadUsers();
  moveLogoToTopLeft();
  checkRememberMe();
  if (JSON.parse(localStorage.getItem("currentUser"))) {
    loadMainpage();
  }
}

/**
 * This function loads all users from the backend.
 */
async function loadUsers() {
  try {
    users = JSON.parse(await getItem("users"));
  } catch (e) {
    console.error("Loading error:", e);
  }
}

/**
 * This function checks whether login data is available in LocalStorage and inserts it into the form
 */
function checkRememberMe() {
  let checkUser = JSON.parse(localStorage.getItem("rememberUserLoginData"));
  if (checkUser) {
    loginEmail.value = checkUser["email"];
    loginPassword.value = checkUser["password"];
    loginCheckBox.checked = true;
    changeInputTextColor("loginEmail");
    changeInputTextColor("loginPassword");
  }
}

// LOGIN

/**
 * This function checks whether all the data entered is identical to the backend and then logs the user in
 */
function login() {
  loginBtn.disabled = true;
  guestLoginBtn.disabled = true;
  let emailFound = false;
  for (let i = 0; i < users.length; i++) {
    if (loginEmail.value == users[i]["email"]) {
      emailFound = true;
      if (loginPassword.value == users[i]["password"]) {
        if (loginCheckBox.checked) {
          localStorage.setItem(
            "rememberUserLoginData",
            JSON.stringify(users[i])
          );
        }
        localStorage.setItem("currentUser", JSON.stringify(users[i]));
        redirectToIndex();
        break;
      } else {
        alert("The password is incorrect");
      }
    }
  }
  if (!emailFound) {
    alert("The email address is not in our database");
  }
  loginBtn.disabled = false;
  guestLoginBtn.disabled = false;
}

/**
 * This function places the guest user in the LocalStorage, the user is now logged in as a guest
 */
async function guestLogin() {
  loginEmail.value = "Guest";
  loginPassword.value = "Guest";
  loginBtn.disabled = true;
  guestLoginBtn.disabled = true;
  for (let i = 0; i < users.length; i++) {
    if (loginEmail.value == users[i]["email"]) {
      localStorage.setItem("currentUser", JSON.stringify(users[i]));
    }
  }
  await sleep(1000);
  loadMainpage();
}

/**
 * This function clears the Login form.
 */
function resetFormLogin() {
  loginBtn.disabled = false;
  guestLoginBtn.disabled = false;
  loginEmail.value = "";
  loginPassword.value = "";
  loginCheckBox.checked = false;
}

/**
 * This function closes the login page and opens the main page
 */
function loadMainpage() {
  window.location.href = "./join.html";
}

// SIGNUP

/**
 * This function pushes the new user data to the backend
 */
async function register() {
  signupBtn.disabled = true;
  if (validatePassword()) {
    users.push({
      username: signupUsername.value,
      email: signupEmail.value,
      password: signupPassword.value,
    });
    await setItem("users", JSON.stringify(users));
    resetFormSignup();
    alert("The user has been created, you can now log in.");
    window.location.href = "./index.html";
  }
  signupBtn.disabled = false;
}

/**
 * This function checks whether both passwords are identical
 * @returns {bolean} - password repeat correct
 */
function validatePassword() {
  if (signupPassword.value !== signupConfirmPassword.value) {
    alert("Passwords don't match");
    return false;
  }
  return true;
}

/**
 * This function clears the Signup form.
 */
function resetFormSignup() {
  signupUsername.value = "";
  signupEmail.value = "";
  signupPassword.value = "";
  signupConfirmPassword.value = "";
  signupCheckBox.checked = false;
}

/**
 * This function moves the logo from the centre to the top left
 */
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

// GLOBAL

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function changeInputTextColor(input) {
  var inputElement = document.getElementById(input);

  if (inputElement.value.trim() !== "") {
    inputElement.style.color = "var(--black)";
  } else {
    inputElement.style.color = "";
  }
}
