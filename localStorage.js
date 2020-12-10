export let data = []

import { root } from "./usefulvariables.js";

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

// Import display data function
// import { displayData } from "./displayData.js";

// Delete
export const deletePopup = (id) => {
  // Delete element
  const deleteForm = document.createElement('div');
  deleteForm.classList.add('popup');
  deleteForm.style.height = '200px';
  deleteForm.style.width = '400px';

  // Delete html
  deleteForm.innerHTML = `
      <div tabindex="-1" role="dialog">
        <p class="h4 text-white">Are sure you want to delete thi person?</p>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary ok">OK</button>
          <button type="button" class="btn btn-secondary cancel" data-dismiss="modal">Close</button>
        </div>
      </div>
      `;

  document.body.appendChild(deleteForm);
  deleteForm.classList.add('open');

  // Handle clik
  const confirmBtn = (e) => {
    // Confirm deletion
    if (e.target.matches('button.ok')) {
      data = data.filter(person => person.id !== id);
      displayData();
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
