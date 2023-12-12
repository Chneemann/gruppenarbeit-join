let users = [];

/**
 * Loads all required functions of the page
 */
async function initLogin() {
  loadUsers();
  includeHTML();
  moveLogoToTopLeft();
  checkRememberMe();
  ifAUserLogedin();
}

/**
 * Loads all users from the backend.
 */
async function loadUsers() {
  try {
    users = JSON.parse(await getItem("users"));
  } catch (e) {
    console.error("Loading error:", e);
  }
}

/**
 * Checks whether a user is logged in by searching the local storage for the current user.
 * If a current user exists, the user is redirected to the main page.
 */
function ifAUserLogedin() {
  if (JSON.parse(localStorage.getItem("currentUser"))) {
    loadJoin();
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
    if (loginEmail.value.toLowerCase() == users[i]["email"].toLowerCase()) {
      emailFound = true;
      if (loginPassword.value == users[i]["password"]) {
        if (loginCheckBox.checked) {
          localStorage.setItem(
            "rememberUserLoginData",
            JSON.stringify(users[i])
          );
        }
        let user = [];
        user.push({
          id: users[i].id,
          username: users[i].username,
          email: users[i].email,
        });
        localStorage.setItem("currentUser", JSON.stringify(user));
        redirectToIndex();
        break;
      } else {
        openInformationWindow("The password is incorrect.", 2000);
      }
    }
  }
  if (!emailFound) {
    openInformationWindow("The email address is not in our database.", 3000);
  }
  loginBtn.disabled = false;
  guestLoginBtn.disabled = false;
}

/**
 * This function places the guest user in the LocalStorage, the user is now logged in as a guest
 */
async function guestLogin() {
  let userGuest = [];
  loginEmail.value = "Guest";
  loginPassword.value = "Guest";
  loginBtn.disabled = true;
  guestLoginBtn.disabled = true;
  userGuest.push({
    id: 0,
    username: "Guest",
    email: "Guest",
  });
  localStorage.setItem("currentUser", JSON.stringify(userGuest));
  await sleep(1000);
  loadJoin();
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
function loadJoin() {
  window.location.href = "./join.html";
}

// SIGNUP

/**
 * This function pushes the new user data to the backend
 */
async function register() {
  await loadAllContacts();
  signupBtn.disabled = true;
  let newContactsArray = Array.from(
    { length: contacts.length },
    (_, index) => index
  );

  if (validatePassword() && checkNameValidity()) {
    users.push({
      id: users.length,
      username: signupUsername.value,
      email: signupEmail.value,
      password: signupPassword.value,
    });
    await setItem("users", JSON.stringify(users));
    resetFormSignup();
    openInformationWindow(
      "The user has been created. You can now log in.",
      3000
    );
    await sleep(3700);
    window.location.href = "./index.html";
  }
  signupBtn.disabled = false;
}

/**
 * Checks whether first name and surname have been entered
 * @returns {bolean} - name/surname input correct
 */
function checkNameValidity() {
  const fullNameValue = signupUsername.value.trim();
  const nameRegex = /^(\S+\s+\S+)$/;
  const isValidName = nameRegex.test(fullNameValue);
  if (!isValidName) {
    openInformationWindow("You must enter a first name and a surname.", 3000);
    return false;
  } else {
    return true;
  }
}

/**
 * This function checks whether both passwords are identical
 * @returns {bolean} - password repeat correct
 */
function validatePassword() {
  if (signupPassword.value !== signupConfirmPassword.value) {
    openInformationWindow("Passwords don't match.", 1500);
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
  }, "1000");
  setTimeout(() => {
    loadLoginPage();
  }, "3000");
}

/**
 * Loading the sign up page
 */
function loadSignupPage() {
  document.getElementById("signup-page").classList.remove("d-none");
  document.getElementById("login-page").classList.add("d-none");
}

/**
 * Loading the log in page
 */
function loadLoginPage() {
  document.getElementById("signup-page").classList.add("d-none");
  document.getElementById("login-page").classList.remove("d-none");
  document.getElementById("logo-loading").classList.add("d-none");
  document.getElementById("footer").classList.remove("d-none");
}
