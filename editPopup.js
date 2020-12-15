// Importing the empty array
import { data } from "./localStorage.js";

// import Variables
import { root, addButton, formSearch,mainArticle } from "./usefulvariables.js";

// Import destroy popup
import { destroyPopup } from "./destroyPopup.js";

// Import display data function
import { displayData } from "./displayData.js";

// Edit
export const editPopup = (id, e) => {
  
    const listPerso = document.querySelector('.person');

    const searchForm = document.querySelector('.formSearch');

    const age = listPerso.querySelector('.age');
    const differenceDay = listPerso.querySelector('.day');
  
    // Find person by id
    const people = data.find(person => person.id.toString() === id);
    console.log(people)
    const birthday = new Date(people.birthday).toLocaleDateString()
    
    return new Promise(async function (resolve) {
      // Creating form popup
      const formPopup = document.createElement('form');
      formPopup.classList.add('popup');
  
      // Popup HTML
      const popupHtml = `
        <div class="wrapper shadow-sm">
          <p class="modal-title h3" id="exampleModalLabel">Edit ${people.lastName}<p>
          <fieldset class="form-group d-flex flex-column">
            <label class="h5" for="lastname">Last name</label>
            <input type="text" class="w-100 border border-white bg-info text-white p-2" name="lastname" id="lastname" value="${people.lastName}">
          </fieldset>
          
          <fieldset class="form-group d-flex flex-column">
            <label class="h5" for="firstname">First name</label>
            <input type="text" class="w-100 border border-white bg-info text-white p-2"  name="firstname" id="firstname" value="${people.firstName}">
          </fieldset>
          
          <fieldset class="form-group d-flex flex-column">
            <label class="h5" for="picture">Picture</label>
            <input type="url" class="w-100 border border-white bg-info text-white p-2" name="picture" id="picture" value="${people.picture}">
          </fieldset>

          <fieldset class="form-group d-flex flex-column">
            <label class="h5" for="birthday">Birthday</label>
            <input type="text" class="w-100 border border-white bg-info text-white p-2" name="birthday" id="birthday" value="${birthday}" disabled>
          </fieldset>
    
          <div>
            <button type="submit" class="btn btn-danger submit" value="${people.id}">Save changes</button>
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
        const newBirthday = new Date(people.birthday).toLocaleDateString()
        
        // Chanring the textContent of a person by value of form popup
        people.lastName = formPopup.lastname.value;
        people.firstName = formPopup.firstname.value;
        people.picture = formPopup.picture.value;
        
        displayData(data);
        destroyPopup(formPopup);
        root.dispatchEvent(new CustomEvent('updatedBirthday'));
      }, { once: true });
  
      // Close popup
      window.addEventListener('click', (e) => {
        if (e.target.closest('button[data-dismiss="modal"]')) {
          destroyPopup(formPopup);
          root.dispatchEvent(new CustomEvent('updatedBirthday'));
        }
      })
    });
  }