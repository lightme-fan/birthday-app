// Importing the empty array
import { data } from "./localStorage.js";

// import Variables
import { container } from "./usefulvariables.js";

// Import destroy popup
import { destroyPopup } from "./destroyPopup.js";

// Import display data function
import { displayData } from "./displayData.js";

// Edit
export const editPopup = (id) => {
    const listPerso = document.querySelector('.person');
    const birthday = listPerso.querySelector('.birthday');
    console.log(birthday);
    const age = listPerso.querySelector('.age');
    const differenceDay = listPerso.querySelector('.day');
  
    // Find person by id
    const people = data.find(person => person.id === id);
    return new Promise(async function (resolve) {
      // Creating form popup
      const formPopup = document.createElement('form');
      formPopup.classList.add('popup');
  
      // Popup HTML
      const popupHtml = `
        <div>
          <p class="modal-title h3 text-white" id="exampleModalLabel">Edit <i>${people.lastName}</i><p>
          <fieldset class="form-group d-flex flex-column">
            <label class="text-white h5" for="lastname">Last name</label>
            <input type="text" name="lastname" id="lastname" value="${people.lastName}">
          </fieldset>
          
          <fieldset class="form-group d-flex flex-column">
            <label class="text-white h5" for="firstname">First name</label>
            <input type="text" name="firstname" id="firstname" value="${people.firstName}">
          </fieldset>

          <fieldset class="form-group d-flex flex-column">
            <label class="text-white h5" for="birthday">Birthday</label>
            <input type="text" name="birthday" id="birthday" value="${people.birthday}">
          </fieldset>
    
          <div class="modal-footer">
            <button type="submit" class="btn btn-primary submit" value="${people.id}">Save changes</button>
            <button type="button" class="btn btn-secondary" data-dismiss="modal" value="${people.id}">Close</button>
          </div>      
        </div>	
        `;
      formPopup.insertAdjacentHTML('afterbegin', popupHtml);
      document.body.appendChild(formPopup);
      formPopup.classList.add('open');
  
      // Submitting the values from the input form
      formPopup.addEventListener('submit', (e) => {
        e.preventDefault();
  
        // Chanring the textContent of a person by value of form popup
        people.lastName = formPopup.lastname.value;
        people.firstName = formPopup.firstname.value;
        people.birthday = formPopup.birthday.value,
        
        displayData();
        destroyPopup(formPopup);
        container.dispatchEvent(new CustomEvent('updatedBirthday'));
      }, { once: true });
  
      // Close popup
      window.addEventListener('click', (e) => {
        if (e.target.closest('button[data-dismiss="modal"]')) {
          destroyPopup(formPopup);
          container.dispatchEvent(new CustomEvent('updatedBirthday'));
        }
      })
    });
  }
  