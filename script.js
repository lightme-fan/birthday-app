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

// Import searchByName variable
import { searchByName } from "./usefulvariables.js";

// Import searchByName Function
import { searchByNameFunction } from "./searchByName.js";


window.addEventListener('click', handleClickButtons);
// Event listner for localStorage
container.addEventListener('updatedBirthday', updatedLocalStorage);
// Initialising local storage
initialLocalStorage();

// event listner for handle Add button
addButton.addEventListener('click', handleAddBtn);

searchByName.addEventListener('click', searchByNameFunction);

displayData();

fetchPeople()
