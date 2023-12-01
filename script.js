// LOGOUT

/**
 * This function deletes the user from the LocalStorage and loads the login page, he is now logged out
 */
function signout() {
  localStorage.removeItem("currentUser");
  window.location.href = "./index.html";
  document.getElementById("loginpage").classList.remove("d-none");
  document.getElementById("mainpage").classList.add("d-none");
}

/**
 * This function loads the new file
 *
 * @param {string} path = Path of the file to be loaded
 * @param {*} func = !LAURA - BITTE EINFÜGEN!
 */
function renderMainpageContent(path, func) {
  fetch(path)
    .then((response) => response.text())
    .then((html) => {
      document.getElementById("mainpage-content").innerHTML = html;
    })
    .catch((error) => {
      console.error("Error loading:", error);
    });
}

// ADD & REMOVE NAVBAR

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

function includeNavbarHTML() {
  var z, i, elmnt, file, xhttp;
  /* Loop through a collection of all HTML elements: */
  z = document.getElementsByTagName("*");
  for (i = 0; i < z.length; i++) {
    elmnt = z[i];
    /*search for elements with a certain atrribute:*/
    file = elmnt.getAttribute("w3-include-html");
    if (file) {
      /* Make an HTTP request using the attribute value as the file name: */
      xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
          if (this.status == 200) {
            elmnt.innerHTML = this.responseText;
          }
          if (this.status == 404) {
            elmnt.innerHTML = "Page not found.";
          }
          /* Remove the attribute, and call this function once more: */
          elmnt.removeAttribute("w3-include-html");
          includeNavbarHTML();
        }
      };
      xhttp.open("GET", file, true);
      xhttp.send();
      /* Exit the function: */
      return;
    }
  }
}
