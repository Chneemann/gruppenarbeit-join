let users = [];

async function initLogin() {
  loadUsers();
  moveLogoToTopLeft();
  if (JSON.parse(localStorage.getItem("currentUser"))) {
    loadMainpage();
  }
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

function resetFormLogin() {
  loginBtn.disabled = false;
  guestLoginBtn.disabled = false;
  loginEmail.value = "";
  loginPassword.value = "";
  loginCheckBox.checked = false;
}

function loadMainpage() {
  //window.location.href = "./mainpage.html";
  document.getElementById("loginpage").classList.add("d-none");
  document.getElementById("mainpage").classList.remove("d-none");
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
    resetFormSignup();
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

function resetFormSignup() {
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

// GLOBAL

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
