users = [];
let localContactIds = [];

/**
 * Loads all required functions of the page
 */
function init() {
  includeHTML();
  loadAllUsers();
  loadAllContacts();
  currentUserBadged();
}

/**
 * This function loads all users from the backend.
 */
async function loadAllUsers() {
  try {
    users = JSON.parse(await getItem("users"));
  } catch (e) {
    console.error("Loading error:", e);
  }
}

/**
 * This function loads all contacts from the backend.
 */
async function loadAllContacts() {
  try {
    contacts = JSON.parse(await getItem("contacts"));
  } catch (e) {
    console.error("Loading error:", e);
  }
}

/**
 * This function loads all tasks from the backend.
 *
 */
async function loadAllTasks() {
  try {
    tasks = JSON.parse(await getItem("tasks"));
  } catch (e) {
    console.error("Loading error:", e);
  }
}

/**
 * Gives all img-files the draggable value false, so that only the intended ones can be moved
 */
document.addEventListener("DOMContentLoaded", function () {
  const imgElements = document.querySelectorAll("img");

  imgElements.forEach(function (img) {
    img.draggable = false;
  });
});

async function openInformationWindow(infoTxt, sleeptime) {
  var overlay = document.getElementById("information-window");
  overlay.classList.remove("d-none");
  await sleep(10);
  overlay.classList.add("dialog-show");
  overlay.classList.remove("dialog-hide");
  changeBackground(overlay);
  document.getElementById("information-msg").innerHTML = infoTxt;
  await sleep(sleeptime);
  document.body.style.overflow = "auto";
  overlay.classList.add("dialog-hide");
  overlay.classList.remove("dialog-show");
  overlay.style.backgroundColor = "";
  await sleep(100);
  overlay.classList.add("d-none");
}

/**
 * This function loads the new file into the content of the main page
 *
 * @param {string} path = Path of the file to be loaded
 * @param {*} func = TODO: ! LAURA - BITTE EINFÜGEN !
 */
function renderMainpageContent(path, func) {
  fetch(path)
    .then((response) => response.text())
    .then((html) => {
      document.getElementById("mainpage-content").innerHTML = html;
      if (path == "./html/board.html") {
        initBoard();
      } else if (path == "./html/add_task.html") {
        initAddTask();
      } else if (path == "./html/adress-innerframe.html") {
      }
    })
    .catch((error) => {
      console.error("Error loading:", error);
    })
    .then(() => {
      if (func) {
        console.log("test then func");
        func();
      }
    });
}

/**
 * Changes the navbar depending on the display size of the browser
 */
window.addEventListener("DOMContentLoaded", (event) => {
  if (window.location.pathname.includes("join.html")) {
    function handleResize() {
      if (window.innerWidth < 860) {
        document.getElementById("mobile-header").classList.remove("d-none");
        document.getElementById("navbar").classList.add("d-none");
        document.getElementById("mobile-navbar").classList.remove("d-none");
      } else {
        document.getElementById("mobile-header").classList.add("d-none");
        document.getElementById("navbar").classList.remove("d-none");
        document.getElementById("mobile-navbar").classList.add("d-none");
      }
    }
    handleResize();
    window.addEventListener("resize", handleResize);
  }
});

// HTML Include

async function includeHTML() {
  const elementsToInclude = document.querySelectorAll("[w3-include-html]");
  for (const elmnt of elementsToInclude) {
    const file = elmnt.getAttribute("w3-include-html");
    if (file) {
      try {
        const response = await fetch(file);
        if (response.ok) {
          const htmlText = await response.text();
          elmnt.innerHTML = htmlText;
        } else {
          elmnt.innerHTML = "Page not found.";
        }
      } catch (error) {
        console.error("Error fetching HTML:", error);
      }
    }
  }
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function changeBackground(overlay) {
  overlay.addEventListener(
    "transitionend",
    function () {
      overlay.style.backgroundColor = "rgba(0, 0, 0, 0.1)";
    },
    { once: true }
  );
}

function changeInputTextColor(input) {
  var inputElement = document.getElementById(input);

  if (inputElement.value.trim() !== "") {
    inputElement.style.color = "var(--black)";
  } else {
    inputElement.style.color = "";
  }
}
