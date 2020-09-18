const container = document.querySelector('.container');
const addButton = document.querySelector('.addPerson');
console.log(addButton);

let data = [];
// Fetch people
async function fetchPeople() {

  const res = await fetch('./people.json');
  const dataPerson = await res.json();
  data = dataPerson;

  // Update local storage
  const updatedLocalStorage = () => {
    localStorage.setItem('data', JSON.stringify(data));
  }

  // Local storage
  const initialLocalStorage = () => {
    const storedPersons = JSON.parse(localStorage.getItem('data'));

    if (storedPersons) {
      data = storedPersons;
      displayData(data);
      // container.dispatchEvent(new CustomEvent('updatedBirthday'));
    }
  }

  // Get age of a person
  const getAge = (date1, date2) => {
    // This is a condition like if statement
    date2 = date2 || new Date();
    //Calculation
    const diff = date2.getTime() - date1.getTime();
    return Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
  }
 
  // Displaying the data form the local storage
  const displayData = () => {
    // Mapping the data,   
    const persons = data.map(person => { 
      // Birthdate, Date now, 
      const date1 = new Date(person.birthday);
      const date2 = new Date();
      const oneDay = 1000 * 60 * 60 * 24;

      // get current year 
      const yearNow = date2.getFullYear();
      
      // Age
      const birthdate = getAge(new Date(person.birthday));
      const longMonth = date1.toLocaleString('en-us', { month: 'long' });
      const getDay = date1.getDay() + 1;
      
      const actualBirthday = `${getDay} - ${longMonth}`;
      
      // Birthday
      const convertedBirthdate = `${getDay}/${longMonth}/${yearNow}`;

      // Get distance days between today and the birthday
      const newDate = new Date(convertedBirthdate).getTime();
      const diffDays = Math.floor((newDate - date2) / oneDay);
      
      return `
        <div class="row border-bottom m-4 person" data-id="${person.id}" value= "${person.id}">
          <div class="col-sm">
            <img class="rounded-circle profile" width="70px" src="${person.picture}" alt="Person's profile">
          </div>
          <div class="col-sm">
            <p class="h5 name text-primary"><i class="last-name">${person.lastName}</i> <i class="first-name">${person.firstName}</i></p>
            <p>Turn to <b class="age text-primary">${birthdate}</b> years old on <b class="birthday text-primary">${actualBirthday}</b></p>
          </div>
          <div class="col-sm">
            <b class="day text-primary">${diffDays}</b> days
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

    container.innerHTML = persons.join('');
    
  }
  
  // Destroy form popup
  function destroyPopup(formPopup) {
    formPopup.remove();
    formPopup = null;
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
    const listPerso = document.querySelector('.person');
    const birthday = listPerso.querySelector('.birthday');
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
          <input type="text" name="birthday" id="birthday" value="${birthday.textContent}">
        </fieldset>

        <fieldset class="form-group d-flex flex-column">
          <label class="text-white h5" for="age">Age</label>
          <input type="text" name="age" id="age" value="${age.textContent}">
        </fieldset>

        <fieldset class="form-group d-flex flex-column">
          <label class="text-white h5" for="day">Day</label>
          <input type="text" name="day" id="day" value="${differenceDay.textContent}">
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
        id = id
        age.textContent = formPopup.age.value,
        differenceDay.textContent = formPopup.day.value

        displayData(data);
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
        data = data.filter(person => person.id !== id);
        destroyPopup(deleteForm);
        displayData(data);
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

  // Add a new person
  const handleAddBtn = () => {
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

  window.addEventListener('click', handleClickButtons);
  // Event listner for localStorage
  container.addEventListener('updatedBirthday', updatedLocalStorage);
  // Initialising local storage
  initialLocalStorage();
  addButton.addEventListener('click', handleAddBtn);

  displayData();
}
fetchPeople()

  