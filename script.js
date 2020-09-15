// import { format } from "./date";
// console.log(format);

const container = document.querySelector('.container')
// Fetch people
async function fetchPeople() {
  const people = await fetch('./people.json');
  const data = await people.json();
  return data;
}

// Display the list of people
async function displayPeople() {
  // Grabbing the feched people
  const listOfPeople = await fetchPeople();

  // Mapping the list of people
  const html = listOfPeople.map(person => {

    const date = new Date(person.birthday);
    const getDate = date.getDate();
    const getMonth = date.getMonth();
    const getFullYear = date.getFullYear();
    const birthday = `${getDate}th - ${getMonth} - ${getFullYear}`;

    const dateNow = new Date();
    const birthdate = new Date(person.birthday);
    const day = (dateNow.getDate() - birthdate.getDate()) *dateNow.getMonth() - birthdate.getMonth();
    // const month = dateNow.getMonth() - birthdate.getMonth();  

    // const fulldays = day * month;);

    return `
      <div class="row border-bottom m-4 person" data-id="${person.id}" value= "${person.id}">
        <div class="col-sm">
          <img class="rounded-circle profile" width="70px" src="${person.picture}" alt="Person's profile">
        </div>
        <div class="col-sm">
          <p class="h5 name">${person.lastName} ${person.firstName}</p>
          <p>Turn to this age on<br> <b class="birthday">${birthday}</b></p>
        </div>
        <div class="col-sm">
          <b>${day}</b> days
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
  container.insertAdjacentHTML('beforeend', html.join(''));
  container.dispatchEvent(new CustomEvent('updatedBirthday'))
}

// Destroy form popup
async function destroyPopup(formPopup) {
	formPopup.remove();
	formPopup = null;
}

// Handling buttons 
const handleClickButtons = async (e) => {
  // Handling Edit button
  if (e.target.closest('button.edit')) {
    const closestEl = e.target.closest('.person');
    const id = closestEl.dataset.id;
    editButton(id);
  }

  // Handling Delete button
  if (e.target.closest('button.delete')) {
    const closestEl = e.target.closest('.person');
    const button = closestEl.querySelector('button.delete')
    const id = button.value;
    deleteButton(id);
  }
}

// Edit person
const editButton = async (id) => {
  // Grabbing the list of people
  const people = await fetchPeople();
  // Find person by id
  const persons = people.find(person => person.id === id);

  // New promisse
  return new Promise(async function (resolve) {
    // Creating form popup
    const formPopup = document.createElement('form');
    formPopup.classList.add('popup');
  
    // Popup HTML
    const popupHtml = `
    <div>
      <p class="modal-title h3 text-white" id="exampleModalLabel">Edit <i>${persons.lastName}</i><p>
      <fieldset class="form-group d-flex flex-column">
        <label class="text-white h5" for="lastname">Last name</label>
        <input type="text" name="lastname" id="lastname" value="${persons.lastName}">
      </fieldset>
      <fieldset class="form-group d-flex flex-column">
        <label class="text-white h5" for="firstname">First name</label>
        <input type="text" name="firstname" id="firstname" value="${persons.firstName}">
      </fieldset>
      <fieldset class="form-group d-flex flex-column">
        <label class="text-white h5" for="jobTitle">Birthday</label>
        <input type="text" name="jobTitle" id="jobTitle" value="${persons.birthday}">
      </fieldset>
      <fieldset class="form-group d-flex flex-column">
        <label class="text-white h5" for="jobArea">Job area</label>
        <input type="text" name="jobArea" id="jobArea" value="${persons}">
      </fieldset>
      <div class="modal-footer">
        <button type="submit" class="btn btn-primary submit" value="${persons.id}">Save changes</button>
        <button type="button" class="btn btn-secondary" data-dismiss="modal" value="${persons.id}">Close</button>
      </div>      
    </div>	
    `;
    formPopup.insertAdjacentHTML('afterbegin', popupHtml);
    document.body.appendChild(formPopup);
    formPopup.classList.add('open');

    // Submitting the values from the input form
    formPopup.addEventListener('submit', (e) => {
      e.preventDefault();
      const form = e.target;
      people.lastName = form.lastname.value;
      people.firstName = form.firstname.value; 
      console.log(formPopup);

      destroyPopup(formPopup);
      displayPeople();

      container.dispatchEvent(new CustomEvent('updatedBirthday'));
    }, { once: true });

    // Close popup
    window.addEventListener('click', (e) => {
      if (e.target.closest('button[data-dismiss="modal"]')) {
        destroyPopup(formPopup);
      container.dispatchEvent(new CustomEvent('updatedBirthday'));

      }
    }, { once: true });

  });

}

// Delete persons
const deleteButton = async (id) => {
  const persons = await fetchPeople();
  const findPerson = persons.find(person => person.id === id);

  return new Promise(async function (resolve) { 
    const deleteForm = document.createElement('div');
    deleteForm.classList.add('popup');
    deleteForm.style.height = '100px';

    // Delete html
    deleteForm.innerHTML = `
    <div tabindex="-1" role="dialog">
      <p class="h4 text-white">Are sure ${findPerson.lastName} ${findPerson.firstName}?</p>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary ok">OK</button>
        <button type="button" class="btn btn-secondary cancel" data-dismiss="modal">Close</button>
      </div>
    </div>
    `;
    
    document.body.appendChild(deleteForm);
    deleteForm.classList.add('open');

    // Handle clik
    window.addEventListener('click', (e) => {

      // Confirm deletion
      if (e.target.closest('.ok')) {
        persons = persons.filter(person => person.id !== id);
        destroyPopup(deleteForm);
      }

      // Cancel delete
      if (e.target.closest('.cancel')) {
        destroyPopup(deleteForm);
      }

      container.dispatchEvent(new CustomEvent('updatedBirthday'));
    })
  }, { once: true });
  
}

// Local storage
const initialLocalStorage = async () => {
  const fetchedPeople = await fetchPeople();
  JSON.parse(localStorage.getItem('fetchedPeople'));
  container.dispatchEvent(new CustomEvent('updatedBirthday'))
}

// Update local storage
const updatedLocalStorage = async () => {
  const fetchedPeople = await fetchPeople(); 
  localStorage.setItem('fetchedPeople', JSON.stringify(fetchedPeople));
}

// Updating local storage 
container.addEventListener('updatedBirthday', updatedLocalStorage);

// Click event listener
window.addEventListener('click', handleClickButtons);

// Display list of people
displayPeople();

// Initial Local Storage 
initialLocalStorage();