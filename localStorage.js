export let data = []

import { root, formSearch, addButton } from "./usefulvariables.js";

import { fetchPeople } from "./fetchData.js";
import { displayData } from './displayData.js'


// Local storage
export const initialLocalStorage = async () => {
  const storedPersons = JSON.parse(localStorage.getItem('data'));
  if (storedPersons) {
    data = storedPersons;
  } else {
    data = await fetchPeople();
  }
  
  // displayData(data)
  // console.log(await fetchPeople());
  root.dispatchEvent(new CustomEvent('updatedBirthday'));
}

// Update local storage
export const updatedLocalStorage = () => {
  localStorage.setItem('data', JSON.stringify(data));
}
// Import destroy popup
import { destroyPopup } from "./destroyPopup.js";

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
        <button type="button" class="btn btn-primary position-absolute top-0 bg-transparent border-white text-dark cancel cancelBtn border" data-dismiss="modal">X</button>

        <div tabindex="-1" role="dialog">
          <p class="h4">Are sure you want to remove ${person.lastName} ${person.firstName}?</p>
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
      data = data.filter(perso => perso.id !== person.id);

      displayData();
      destroyPopup(deleteForm);
      root.dispatchEvent(new CustomEvent('updatedBirthday'));      
    }

    // Cancel delete
    if (e.target.matches('button.cancel')) {
      destroyPopup(deleteForm);
      root.dispatchEvent(new CustomEvent('updatedBirthday'));
    }

    root.dispatchEvent(new CustomEvent('updatedBirthday'));
  };

  // Event listener for delete button 
  window.addEventListener('click', confirmBtn)
}
