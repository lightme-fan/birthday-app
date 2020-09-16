const container = document.querySelector('.container')
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

  // Get birthdate
  // const actualBirthdate = () => {
  //   const date = new Date();
  //   const getDay = date.getDay();
  //   const getMonth = date.getMonth();
  //   // const getYear = date.getFullYear();
  //   return `${getDay}th - ${getMonth}`;
  // }

  // Destroy form popup
  function destroyPopup(formPopup) {
    formPopup.remove();
    formPopup = null;
  }

  // Template
  const template = (arr) => {
    // Mapping the list of people
    return arr.map(person => {
      const birthdate = getAge(new Date(person.birthday));
    
      // Get date of birthday
      // const today = new Date();
      const date = new Date(person.birthday);
      const birthday = `${date.getDate()}th of ${date.getMonth().toString()}`;
      console.log(birthday);
      // const birthdayParty = today - date;
      // console.log(birthdayParty.toLocaleDateString());

      return `
        <div class="row border-bottom m-4 person" data-id="${person.id}" value= "${person.id}">
          <div class="col-sm">
            <img class="rounded-circle profile" width="70px" src="${person.picture}" alt="Person's profile">
          </div>
          <div class="col-sm">
            <p class="h5 name">${person.lastName} ${person.firstName}</p>
            <p>Turn to <b>${birthdate}</b> years old on <b class="birthday"></b></p>
          </div>
          <div class="col-sm">
            <b>${person.birthday}</b> days
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
    const runTemplate = template(dataPerson);
    container.innerHTML = runTemplate;
  }

  // Display people
  const displayListOfPeople = () => {
    const generatePeople = template(dataPerson);
    container.insertAdjacentHTML('beforeend', generatePeople);
    container.dispatchEvent(new CustomEvent('updatedBirthday'))
  }

  // Update local storage
  const updatedLocalStorage = () => {
    localStorage.setItem('data', JSON.stringify(dataPerson));
  }

  // Local storage
  const initialLocalStorage = () => {
    const storedPersons = JSON.parse(localStorage.getItem('dataPerson'));
    if (storedPersons) {
      dataPerson = storedPersons;
      
      // Call the display array
      displayArr();
      container.dispatchEvent(new CustomEvent('updatedBirthday'));
    }
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
        <fieldset class="form-group d-flex flex-column">
          <label class="text-white h5" for="age">Age</label>
          <input type="text" name="jobArea" id="jobArea" value="${people}">
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
        displayArr();
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

        // Call the display arr
        displayArr();

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

  // Running the template
  displayArr();

  // Event listner for localStorage
  container.addEventListener('updatedBirthday', updatedLocalStorage);
  // Initialising local storage
  initialLocalStorage();

  // Display people
  displayListOfPeople();

  // Even listener
  window.addEventListener('click', handleClickButtons);
}

fetchPeople();
