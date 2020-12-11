import { data } from "./localStorage.js";

// import root
import { root } from "./usefulvariables.js";

import { fetchPeople } from "./fetchData.js";

// Import destroy popup
import { destroyPopup } from "./destroyPopup.js";

// Import display data function
import { displayData } from "./displayData.js";

// Delete
export const deletePopup = (id) => {
  // Delete element
  const deleteForm = document.createElement('div');
  deleteForm.classList.add('popup');
  deleteForm.style.height = '200px';
  deleteForm.style.width = '50%';

  // <p class="h4 text-secondary">Are sure you want to delete this person?</p>

  // Delete html
  deleteForm.innerHTML = `
      <div tabindex="-1" role="dialog">
        <div class="modal-footer">
          <button type="button" class="btn btn-primary ok">OK</button>
          <button type="button" class="btn btn-secondary cancel" data-dismiss="modal">Close</button>
        </div>
      </div>
      `;

  document.body.innerHTML = deleteForm;
  deleteForm.classList.add('open');

  // Handle clik
  const confirmBtn = (e) => {
    // Confirm deletion
    if (e.target.matches('button.ok')) {
      data = data.filter(person => person.id !== id);
      console.log(data.filter(person => person.id));
      console.log(id);
      displayData(data);
      destroyPopup(deleteForm);
      root.dispatchEvent(new CustomEvent('updatedBirthday'));
    }

    // Cancel delete
    if (e.target.matches('button.cancel')) {
      destroyPopup(deleteForm);
    }

    root.dispatchEvent(new CustomEvent('updatedBirthday'));
  };

  // Event listener for delete button 
  window.addEventListener('click', confirmBtn)
}
