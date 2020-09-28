// import Variables
import { container } from "./usefulvariables.js";
import { addButton } from "./usefulvariables.js";

// Importing the empty array
import { data } from "./localStorage.js";

// Import display data function
import { displayData } from "./displayData.js";

// Import destroy popup
import { destroyPopup } from "./destroyPopup.js";

// Add a new person
export const handleAddBtn = () => {
    // Creating form popup
    const addPopup = document.createElement('form');
    addPopup.classList.add('popup');
  
    // Popup HTML
    const popupHtml = `
      <div>
        <p class="modal-title h3 text-white" id="exampleModalLabel">Add a new person's birthday</i><p>
        <fieldset class="form-group d-flex flex-column">
          <label class="text-white h5" for="lastname">Last name</label>
          <input type="text" name="lastname" id="lastname" require>
        </fieldset>
        <fieldset class="form-group d-flex flex-column">
          <label class="text-white h5" for="firstname">First name</label>
          <input type="text" name="firstname" id="firstname" require>
        </fieldset>
        <fieldset class="form-group d-flex flex-column">
          <label class="text-white h5" for="birthday">Birthday</label>
          <input type="date" name="birthday" id="birthday" require>
        </fieldset>
        
        <fieldset class="form-group d-flex flex-column">
          <label class="text-white h5" for="picture">Image URL</label>
          <input type="url" name="picture" id="picture"require>
        </fieldset>
        
        <div class="modal-footer">
          <button type="submit" class="btn btn-primary submit">Submit</button>
          <button type="button" class="btn btn-secondary cancel" data-dismiss="modal">Close</button>
        </div>      
      </div>	
      `;
    addPopup.insertAdjacentHTML('afterbegin', popupHtml);
    document.body.appendChild(addPopup);
    addPopup.classList.add('open');
  
    // Submit form
    addPopup.addEventListener('submit', (e) => {
      e.preventDefault();
      const addForm = e.currentTarget;
  
      // Declare a new object
      const newPerson = {
        birthday: addForm.birthday.value,
        id: Date.now(),
        lastName: addForm.lastname.value,
        firstName: addForm.firstname.value,
        picture: addForm.picture
      }
  
      // Push the new object
      data.push(newPerson);
  
      displayData(data);
      container.dispatchEvent(new CustomEvent('updatedBirthday'));
      addPopup.reset();
      destroyPopup(addPopup);
      // console.log(displayArr(newItem));
    })
  
    // Close button
    window.addEventListener('click', (e) => {
      if (e.target.closest('.cancel')) {
        destroyPopup(addPopup);
      }
    })
  }
  