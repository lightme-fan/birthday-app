// import Variables
import { root, formSearch, addButton } from "./usefulvariables.js";

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
    <div class="add-container">
      <div class="add-wrapper shadow-sm position-relative">
        <button type="button" class="btn btn-primary position-absolute top-0 end-0 bg-transparent border-white text-dark cancel cancelBtn border" data-dismiss="modal">X</button>
        <p class="modal-title h3 fs-4" id="exampleModalLabel">Add a new person's birthday</i><p>
        <fieldset class="form-group d-flex flex-column">
          <label class="h5 add-label m-0" for="lastname">Last name</label>
          <input type="text" name="lastname" placeholder="Add your first name" id="lastname" class="add-input w-100 border border-white text-white p-2" required>
        </fieldset>

        <fieldset class="form-group d-flex flex-column">
          <label class="h5 add-label" for="firstname">First name</label>
          <input type="text" name="firstname" placeholder="Add your last name" id="firstname" class="add-input w-100 border border-white text-white p-2" required>
        </fieldset>

        <fieldset class="form-group d-flex flex-column">
          <label class="h5 add-label" for="birthday">Birthday</label>
          <input type="date" name="birthday" id="birthday" class="add-input w-100 border border-white text-white p-2" required>
        </fieldset>
        
        <fieldset class="form-group d-flex flex-column">
          <label class="h5 add-label" for="picture">Image URL</label>
          <input type="url" name="picture" placeholder="Image url" id="picture" class="add-input w-100 border border-white text-white p-2" required>
        </fieldset>
        
        <div class="d-flex" style="gap: 36px">
          <button style="width: 158px; height: 50px; text-align: center" type="submit" class="btn p-1 btn-danger submit">Submit</button>
          <button style="width: 158px; height: 50px; text-align: center" type="button" class="btn p-1 btn-primary bg-transparent text-dark cancel border" data-dismiss="modal">Cancel</button>
        </div>      
      </div>	
    </div>
      `;
    addPopup.insertAdjacentHTML('afterbegin', popupHtml);
    document.body.appendChild(addPopup)
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
        picture: addForm.picture.value
      }
      
      // Push the new object
      data.unshift(newPerson);
      displayData();
      addPopup.reset();
      destroyPopup(addPopup);
      root.dispatchEvent(new CustomEvent('updatedBirthday'));
    })
  
    // Close button
    window.addEventListener('click', (e) => {
      if (e.target.closest('.cancel')) {
        destroyPopup(addPopup);
        root.dispatchEvent(new CustomEvent('updatedBirthday'));
      }
    })
  }
  