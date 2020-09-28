// Import handleClick function
import { editPopup } from "./editPopup.js";

// Import handleClick function
import { deletePopup } from "./deletePopup.js";

// Handling buttons 
export const handleClickButtons = (e) => {
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
