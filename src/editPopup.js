// Importing the empty array
import { data } from "./localStorage.js";

// import Variables
import { root, addButton, formSearch,mainArticle } from "./usefulvariables.js";

// Import destroy popup
import { destroyPopup } from "./destroyPopup.js";

// Import display data function
import { displayData } from "./displayData.js";
import format from "date-fns/format";

// Edit
export const editPopup = (id, e) => {
  
    const listPerso = document.querySelector('.person');

    const searchForm = document.querySelector('.formSearch');

    const age = listPerso.querySelector('.age');
    const differenceDay = listPerso.querySelector('.day');
  
    // Find person by id
    const people = data.find(person => person.id.toString() === id);
    const birthdayDate = new Date(people?.birthday).toISOString().slice(0, 10);  
    const maxDate = new Date().toISOString().slice(0, 10)
    const birthday = `${format(new Date(people.birthday), 'dd')}/${format(new Date(people.birthday), 'II')}/${format(new Date(people.birthday), 'yy')}`
    
    return new Promise(async function (resolve) {
      // Creating form popup
      const formPopup = document.createElement('form');
      formPopup.classList.add('popup');
  
      // Popup HTML
      const popupHtml = `
        <div class="edit-container">
          <div class="edit-wrapper shadow-sm position-relative">
            <button type="button" class="btn btn-primary position-absolute top-0 end-0 bg-transparent border-white text-dark cancel cancelBtn border" data-dismiss="modal">X</button>
            <p class="modal-title h3" id="exampleModalLabel">Edit ${people?.lastName} ${people?.firstName}<p>
            <fieldset class="form-group d-flex flex-column">
              <label style="margin: 0" for="lastname">First name</label>
              <input type="text" class="edit-input w-100 border border-white text-dark p-1" name="lastname" id="lastname" value="${people?.firstName}">
            </fieldset>
            
            <fieldset class="form-group d-flex flex-column">
              <label style="margin: 0" for="firstname">Last name</label>
              <input type="text" class="edit-input w-100 border border-white text-dark p-1"  name="firstname" id="firstname" value="${people?.lastName}">
            </fieldset>
            
            <fieldset class="form-group d-flex flex-column">
              <label style="margin: 0" for="picture">Picture</label>
              <input type="url" class="edit-input w-100 border border-white text-dark p-1" name="picture" id="picture" value="${people?.picture}">
            </fieldset>

            <fieldset class="form-group d-flex flex-column">
              <label style="margin: 0" for="birthday">Birthday</label>
              <input type="date" class="edit-input w-100 border border-white text-dark p-1" name="birthday" id="birthday" 
                value=${new Date(people?.birthday).toISOString().substring(0, 10)} 
                max=${maxDate}
              >
            </fieldset>
      
            <div 
              style="display: flex; gap: 20px;"
              >
              <button style="width: 158px; height: 50px" type="submit" class="btn btn-danger submit mb-1" value="${people?.id}">Save changes</button>
              <button style="width: 158px; height: 50px" type="button" class="btn btn-primary bg-transparent text-dark cancel border" data-dismiss="modal">Cancel</button>            
            </div>      
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
        
        const toTimestamp=(strDate)=>{
          let datum = Date.parse(strDate);
          return datum;
        } 
        people.birthday = toTimestamp(formPopup.birthday.value);
      
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