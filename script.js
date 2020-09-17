const container = document.querySelector('.container');
const addButton = document.querySelector('.addPerson');
console.log(addButton);

// Fetch people
async function fetchPeople() {
  const people = await fetch('./people.json');
  let dataPerson = await people.json();

  // Get age of a person
  const getAge = (date1, date2) => {
    date2 = date2 || new Date();
    const diff = date2.getTime() - date1.getTime();
    return Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
  }

  // Destroy form popup
  function destroyPopup(formPopup) {
    formPopup.remove();
    formPopup = null;
  }

  // Template
  const template = (arr) => {
    // Mapping the list of people
    return arr.map(person => {
     
      // Birthdate, Date now, 
      const date1 = new Date(person.birthday);
      const date2 = new Date();
      const oneDay = 1000 * 60 * 60 * 24;
      // get current year 
      const yearNow = date2.getFullYear();

      // Age
      const birthdate = getAge(new Date(person.birthday));
      // const month = `${date1.getMonth() + 1}`
      const longMonth = date1.toLocaleString('en-us', { month: 'long' });

      const actualBirthday = `${date1.getDay() + 1}th of ${longMonth}`;
      // Birthday
      const convertedBirthdate = `${date1.getDay() + 1}-${date1.getMonth() + 1}-${yearNow}`;
      
      // Get distance days between today and the birthday
      const newDate = new Date(convertedBirthdate).getTime();
      const diffDays = Math.round(Math.abs((date2 - newDate)/(oneDay)));

      return `
        <div class="row border-bottom m-4 person" data-id="${person.id}" value= "${person.id}">
          <div class="col-sm">
            <img class="rounded-circle profile" width="70px" src="${person.picture}" alt="Person's profile">
          </div>
          <div class="col-sm">
            <p class="h5 name">${person.lastName} ${person.firstName}</p>
            <p>Turn to <b>${birthdate}</b> years old on <b class="birthday">${actualBirthday}</b></p>
          </div>
          <div class="col-sm">
            <b>${diffDays}</b> days
          </div>
          <div class="col-sm">
            <button type="button" class="btn edit" data-toggle="modal" data-target="#exampleModal" value="${person.id}">
              <img class="edit icon" width="15px" src="../icons/edit-icon.png" alt="Edit">
            </button>    
          </div>
          <div class="col-sm">
            <button type="button" class="btn delete" data-toggle="modal" data-target="#exampleModal" value="${person.id}">
              <img class="delete icon" width="15px" src="../icons/trash_icon.png" alt="Delete">
            </button>
          </div>
      </div>
    `});
  }

  // Append to body
  const displayArr = () => {
    const sortedPeople = dataPerson.sort((a, b) => a.birthday - b.birthday);
    const runTemplate = template(sortedPeople);
    container.innerHTML = runTemplate;

    // console.log(template(dataPerson).sort((a, b) => a.birthday - b.birthday));
  }

  // Display people
  const displayListOfPeople = () => {
    const generatePeople = template(dataPerson);
    container.insertAdjacentHTML('beforeend', generatePeople);
  }

  // Handling buttons 
  const handleClickButtons = (e) => {
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

  // Edit
  const editPopup = (id) => {
    // Find person by id
    const people = dataPerson.find(person => person.id === id);
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
          
        people.lastName = formPopup.lastname.value;
        people.firstName = formPopup.firstname.value;
        people.birthday = formPopup.birthday.value;

        // Call the display array
        // displayArr();
        // Destroy the popup form
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

  // Delete
  const deletePopup = (id) => {
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
        dataPerson = dataPerson.filter(person => person.id !== id);


        displayArr(dataPerson);

        // Destroy the popup form
        destroyPopup(deleteForm);
        container.dispatchEvent(new CustomEvent('updatedBirthday'));
      }

      // Cancel delete
      if (e.target.matches('button.cancel')) {
        destroyPopup(deleteForm);
      }

      container.dispatchEvent(new CustomEvent('updatedBirthday'));
    };

    // Event listener for delete button 
    window.addEventListener('click', confirmBtn)
  }

  // // Add a new person
  // const handleAddBtn = () => {
  //   // Creating form popup
  //   const addPopup = document.createElement('form');
  //   addPopup.classList.add('popup');

  //   // Popup HTML
  //   const popupHtml = `
  //   <div>
  //     <p class="modal-title h3 text-white" id="exampleModalLabel">Add a new person's birthday</i><p>
  //     <fieldset class="form-group d-flex flex-column">
  //       <label class="text-white h5" for="lastname">Last name</label>
  //       <input type="text" name="lastname" id="lastname" value="adjkdjal">
  //     </fieldset>

  //     <fieldset class="form-group d-flex flex-column">
  //       <label class="text-white h5" for="firstname">First name</label>
  //       <input type="text" name="firstname" id="firstname" value="fjalkfaj">
  //     </fieldset>

  //     <fieldset class="form-group d-flex flex-column">
  //       <label class="text-white h5" for="birthday">Birthday</label>
  //       <input type="text" name="birthday" id="birthday" value="ghlkfgslfk">
  //     </fieldset>

      
  //     <fieldset class="form-group d-flex flex-column">
  //       <label class="text-white h5" for="picture">Image URL</label>
  //       <input type="url" name="picture" id="picture" value="https://bit.ly/32DOwd6">
  //     </fieldset>
      
  //     <div class="modal-footer">
  //       <button type="submit" class="btn btn-primary submit">Submit</button>
  //       <button type="button" class="btn btn-secondary cancel" data-dismiss="modal">Close</button>
  //     </div>      
  //   </div>	
  //   `;
  //   addPopup.insertAdjacentHTML('afterbegin', popupHtml);
  //   document.body.appendChild(addPopup);
  //   addPopup.classList.add('open');

  //   // Submit form
  //   addPopup.addEventListener('submit', (e) => {
  //     e.preventDefault();
  //     const addForm = e.currentTarget;
      
  //     // Declare a new object
  //     const newPerson = {
  //       birthday: addForm.birthday.value,
  //       id: Date.now(),
  //       lastName: addForm.lastname.value,
  //       firstname: addForm.firstname.value,
  //       picture: addForm.picture
  //     }
      
  //     // Push the new object
  //     dataPerson.push(newPerson);
      
  //     container.dispatchEvent(new CustomEvent('updatedBirthday'));
  //     addPopup.reset();
  //     destroyPopup(addPopup); 
  //     // console.log(displayArr(newItem));
  //   })

  //   // Close button
  //   window.addEventListener('click', (e) => {
  //     if (e.target.closest('.cancel')) {
  //       destroyPopup(addPopup);
  //     }
  //   })
  // }

  // Update local storage
  const updatedLocalStorage = () => {
    localStorage.setItem('data', JSON.stringify(dataPerson));
  }

  // Local storage
  const initialLocalStorage = () => {
    const storedPersons = JSON.parse(localStorage.getItem('dataPerson'));
    if (storedPersons) {
      dataPerson = storedPersons;
      container.dispatchEvent(new CustomEvent('updatedBirthday'));
    }
  }
  
  // Add button
  // addButton.addEventListener('click', handleAddBtn);

  // Running the template
  // container.addEventListener('updatedBirthday', displayArr);

  displayArr();
  // Event listner for localStorage
  container.addEventListener('updatedBirthday', updatedLocalStorage);
  // Initialising local storage
  initialLocalStorage();

  // Display people
  container.addEventListener('updatedBirthday',   displayListOfPeople);

  // displayListOfPeople();

  // Even listener
  window.addEventListener('click', handleClickButtons);
}

fetchPeople();
