export let data = []

import { root } from "./usefulvariables.js";
import { fetchPeople } from "./fetchData.js";
import { displayData } from './displayData.js'
import { destroyPopup } from "./destroyPopup.js";

// Local storage
export const initialLocalStorage = async () => {
  const storedPersons = JSON.parse(localStorage.getItem('data'));
  if (storedPersons) {
    data = storedPersons;
  } else {
    data = await fetchPeople();
  }
  root.dispatchEvent(new CustomEvent('updatedBirthday'));
}

// Update local storage
export const updatedLocalStorage = () => {
  localStorage.setItem('data', JSON.stringify(data));
}

// Delete
export const deletePopup = (id) => {
  // Delete element
  const person = data.find(perso => perso.id.toString() === id)

  const deleteForm = document.createElement('div');
  deleteForm.classList.add('popup');
  
  // Delete html
  const popupHTML = `
    <div class="delete-container">
      <div class="delete-wrapper shadow-sm position-relative">
        <svg class="position-absolute cancel border-0 cancelBtn" data-dismiss="modal" width="58" height="58" viewBox="0 0 58 58" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M43.5 14.5L14.5 43.5" stroke="#094067" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M14.5 14.5L43.5 43.5" stroke="#094067" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <div tabindex="-1" role="dialog">
          <p class="h4">Are sure you want to remove <b>${person?.lastName} ${person?.firstName}</b>?</p>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary ok">OK</button>
            <button type="button" class="btn btn-primary bg-transparent text-dark cancel border" data-dismiss="modal">Cancel</button>                      
          </div>
        </div>
      </div>
    </div>
      `;

  deleteForm.innerHTML = popupHTML
  document.body.appendChild(deleteForm);
  deleteForm.classList.add('open');
  
  // Handle clik
  const confirmBtn = (e) => {
    // Confirm deletion
    if (e.target.matches('button.ok')) {
      data = data.filter(perso => perso.id !== person?.id);

      displayData();
      destroyPopup(deleteForm);
      root.dispatchEvent(new CustomEvent('updatedBirthday'));      
    }

    // Cancel delete
    if (e.target.matches('button.cancel')) {
      destroyPopup(deleteForm);
      root.dispatchEvent(new CustomEvent('updatedBirthday'));
    }

    if (e.target.matches('svg[data-dismiss="modal"]')) {
      destroyPopup(deleteForm);
      root.dispatchEvent(new CustomEvent('updatedBirthday'));
    }

    root.dispatchEvent(new CustomEvent('updatedBirthday'));
  };

  // Event listener for delete button 
  window.addEventListener('click', confirmBtn)
}
