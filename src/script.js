// import Variables
import { root, addButton, searchByName, searchByMonth } from "./usefulvariables.js";

// Import fetch people function
import { fetchPeople } from "./fetchData.js";

// Importing local storage
import { updatedLocalStorage, initialLocalStorage } from "./localStorage.js";

// Import display data function
import { displayData } from "./displayData.js";

// Import handleClick function
import { handleClickButtons } from "./handleclick.js";

// Import handleAdd button
import { handleAddBtn } from "./addBtn.js";


window.addEventListener('click', handleClickButtons);
// Event listner for localStorage
root.addEventListener('updatedBirthday', updatedLocalStorage);
root.addEventListener('updatedBirthday', displayData);

// Initialising local storage
initialLocalStorage();

// event listner for handle Add button
addButton.addEventListener('click', handleAddBtn);

fetchPeople();
// searchByName.addEventListener('click', searchByNameFunction);
searchByName.addEventListener('input', () => displayData());
searchByMonth.addEventListener('change', () => displayData());

displayData();
