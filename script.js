// import Variables
import { container } from "./usefulvariables.js";
import { addButton } from "./usefulvariables.js";

// Importing the empty array
import { data } from "./localStorage.js";

// Import fetch people function
import { fetchPeople } from "./fetchData.js";

// Importing local storage
import { updatedLocalStorage } from "./localStorage.js";
import { initialLocalStorage } from "./localStorage.js";

// Import display data function
import { displayData } from "./displayData.js";

// Import destroy popup
import { destroyPopup } from "./destroyPopup.js";

// Import handleClick function
import { handleClickButtons } from "./handleclick.js";

// Import handleAdd button
import { handleAddBtn } from "./addBtn.js";

window.addEventListener('click', handleClickButtons);
// Event listner for localStorage
container.addEventListener('updatedBirthday', updatedLocalStorage);
// Initialising local storage
initialLocalStorage();
addButton.addEventListener('click', handleAddBtn);

displayData();

fetchPeople()
