// Import handleClick function
import { editPopup } from "./editPopup.js";

// Import handleClick function
import { deletePopup } from "./localStorage.js";

import { root, addButton } from "./usefulvariables.js";

// Handling buttons 
export const handleClickButtons = (e) => {

  const listPerso = document.querySelector('.person');
  const searchForm = document.querySelector('.formSearch');
  console.log(searchForm);
  
  // Handling Edit button
  if (e.target.closest('button.edit')) {
      const closestEl = e.target.closest('.person');
      const id = closestEl.dataset.id;
      editPopup(id);
  }

  // Handling Delete button
  if (e.target.closest('button.delete')) {
      const closestEl = e.target.closest('.person');
      const id = closestEl.dataset.id;
      deletePopup(id);
  }
}
