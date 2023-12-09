const STORAGE_TOKEN = "0Z1Q9HE43ON0A54CI84FYNGARJ24D5UQ0NVE4O98";
const STORAGE_URL = "https://remote-storage.developerakademie.org/item";

/**
 * Saves an item in the backend.
 *
 * @param {string} key - The key of the item.
 * @param {any} value - The value of the item.
 * @returns {promise} A Promise containing the server response in JSON format.
 */
async function setItem(key, value) {
  const payload = { key, value, token: STORAGE_TOKEN };
  return fetch(STORAGE_URL, {
    method: "POST",
    body: JSON.stringify(payload),
  }).then((res) => res.json());
}

/**
 * Retrieves an item from the backend.
 *
 * @param {string} key - The key of the item to be retrieved.
 * @returns {promise} A Promise containing the retrieved value in JSON format.
 */
async function getItem(key) {
  const url = `${STORAGE_URL}?key=${key}&token=${STORAGE_TOKEN}`;
  return fetch(url)
    .then((res) => res.json())
    .then((res) => {
      if (res.data) {
        return res.data.value;
      }
      throw `Could not find data with key "${key}".`;
    });
}
