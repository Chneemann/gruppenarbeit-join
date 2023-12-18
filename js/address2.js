/**
 * Opens a dialog-overlay
 */
async function openDialog(id) {
  let overlay = document.getElementById(id);
  await sleep(10);
  overlay.classList.add("dialog-show");
  overlay.classList.remove("dialog-hide");
}

/**
 * Closes the dialog-overlay
 */
async function closeDialog(id) {
  let overlay = document.getElementById(id);
  document.body.style.overflow = "auto";
  overlay.classList.add("dialog-hide");
  overlay.classList.remove("dialog-show");
  overlay.style.backgroundColor = "";
  await sleep(100);
  overlay.classList.add("d-none");
  document.getElementById("add-contact-overlay").classList.add("d-none");
}

/**
 * Splits Initials of the input name to create a badge
 */
function getInitials(name) {
  const allNames = name.split(" ");

  let initials = [];
  for (let index = 0; index < allNames.length; index++) {
    initials.push(allNames[index][0].toUpperCase());
  }
  return initials.join(""); //Methode entfernt das Komma
}

/**
 * Generates a random color used for the background of the userbadge
 */
function getRandomColor() {
  function getRandomComponent() {
    const component = Math.floor(Math.random() * 256).toString(16);
    return component.length === 1 ? "0" + component : component;
  }
  let color;
  do {
    const red = getRandomComponent();
    const green = getRandomComponent();
    const blue = getRandomComponent();
    color = `#${red}${green}${blue}`;
  } while (isGrayscale(color));
  return color;
}

/**
 * Filters gray tones from the random color
 */
function isGrayscale(color) {
  const hex = color.slice(1);
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  return r === g && g === b;
}
