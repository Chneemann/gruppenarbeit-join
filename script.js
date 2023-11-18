function moveLogo() {
  console.log("test");
  let logo = document.getElementById("logo").classList.add("move-up");
}

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
