users = [];
let tasks = [];
let localContactIds = [];
let currentSite;
let currentUser = JSON.parse(localStorage.getItem("currentUser"));

/**
 * Loads all required functions of the page
 */
async function init() {
  welcomeMsg();
  await loadAllDatasFromBackend();
  ifCurrentUserLogin();
  currentUserBadged();
  renderMainpageContent("./html/summary.html");
}

/**
 * This function loads all users from the backend.
 */
async function loadAllDatasFromBackend() {
  try {
    users = JSON.parse(await getItem("users"));
    contacts = JSON.parse(await getItem("contacts"));
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

/**
 * Checks whether a user is logged in at all (currentUser available in LocalStorage?)
 * if not, you will be redirected to the login page.
 */
function ifCurrentUserLogin() {
  if (!currentUser) {
    window.location = "./index.html";
  }
}

/**
 * Activates the active CSS class for the specified navigation bar (navbar) link.
 *
 * @param {string} link - The name of the navigation bar (navbar) link to be activated.
 */
function navbarLinkActive(link) {
  if (link == "summary") {
    navLinkSummary.classList.add("nav-link-active");
  } else if (link == "addtask") {
    navLinkAddtask.classList.add("nav-link-active");
  } else if (link == "board") {
    navLinkBoard.classList.add("nav-link-active");
  } else if (link == "contacts") {
    navLinkContacts.classList.add("nav-link-active");
  }
}

/**
 * Removes the active CSS class from all navigation bar (navbar) links.
 */
function navbarLinkRemove() {
  navLinkSummary.classList.remove("nav-link-active");
  navLinkAddtask.classList.remove("nav-link-active");
  navLinkBoard.classList.remove("nav-link-active");
  navLinkContacts.classList.remove("nav-link-active");
}

/**
 * This function allows a dialogue to be displayed from the right in the middle of the screen
 * where a user-defined text is displayed, the display duration is just as variable.
 *
 * @param {Sring} infoTxt - der anzuzeigende Text.
 * @param {Number} sleeptime - die Anzeigedauer, bis die Einblendung verschwindet.
 */
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
 * Displays a welcome message and hides it after a delay.
 */
async function welcomeMsg() {
  var overlay = document.getElementById("welcome-msg");
  overlay.classList.remove("d-none");
  document.getElementById("welcome-msg").innerHTML = /*HTML*/ `
  <span>Welcome</span><p>${currentUser[0].username}</p>`;
  await sleep(3000);
  overlay.classList.add("d-none");
}

/**
 * This function loads the new file into the content of the main page
 *
 * @param {string} path = Path of the file to be loaded
 * @param {*} func = function to load and render contact list !
 */
function renderMainpageContent(path) {
  navbarLinkRemove();
  fetch(path)
    .then((response) => response.text())
    .then((html) => {
      document.getElementById("mainpage-content").innerHTML = html;
      if (path == "./html/summary.html") {
        initSummary();
      } else if (path == "./html/add_task.html") {
        initAddTask();
      } else if (path == "./html/board.html") {
        initBoard();
      } else if (path == "./html/adress-innerframe.html") {
        initAdress();
      }
    })
    .catch((error) => {
      console.error("Error loading:", error);
    });
}

/**
 * Retrieves the content of the privacy policy from the specified URL and renders it on the page.
 */
function renderPrivacyPolicyLegalNotice(path) {
  fetch(path)
    .then((response) => response.text())
    .then((html) => {
      document.getElementById("loginpage").innerHTML = html;
    })
    .catch((error) => {
      console.error("Error loading:", error);
    });
}

/**
 * Navigates back to the previous page or to the main page, depending on the current page.
 */
function goBack() {
  let pathArray = window.location.pathname.split("/");
  let currentPage = pathArray[pathArray.length - 1];
  if (currentPage == "join.html") {
    renderMainpageContent("./html/summary.html");
  } else {
    window.location.href = "./index.html";
  }
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

/**
 * This function loads HTML content asynchronously into elements that contain the "w3-include-html" attribute.
 */
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

/**
 * Delays the execution of the programme for the specified time.
 *
 * @param {number} ms - The time in milliseconds to delay the execution.
 * @returns {Promise<void>} A promise that will be fulfilled when the delay is complete.
 */
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Changes the background of the transferred overlay element after a CSS transition has been completed.
 *
 * @param {HTMLElement} overlay - The overlay element whose background is to be changed.
 */
function changeBackground(overlay) {
  overlay.addEventListener(
    "transitionend",
    function () {
      overlay.style.backgroundColor = "rgba(0, 0, 0, 0.1)";
    },
    { once: true }
  );
}

/**
 * Changes the text colour of an HTML input field based on the text entered.
 *
 * @param {string} input - The ID of the HTML input field.
 */
function changeInputTextColor(input) {
  var inputElement = document.getElementById(input);

  if (inputElement.value.trim() !== "") {
    inputElement.style.color = "var(--black)";
  } else {
    inputElement.style.color = "";
  }
}
