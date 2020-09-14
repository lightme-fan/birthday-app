import { format } from "./data-fns";
console.log(format);

const container = document.querySelector('.container')
// Fetch people
async function fetchPeople() {
  const people = await fetch('./people.json');
  const data = await people.json();
  console.log(data);
  return data;
}


// Display the list of people
async function displayPeople() {
  // Grabbing the feched people
  const listOfPeople = await fetchPeople();

  // Mapping the list of people
  const html = listOfPeople.map(person => {

    const date = new Date(person.birthday);
    // const sortedBirthday = birthday.sort((a, b) => b.birthday - a.birthday);
    const getDate = date.getDate();
    const getMonth = date.getMonth();
    const getFullYear = date.getFullYear();
    const birthday = `${getMonth} ${getDate}th`;
    return `
      <div class="row border-bottom m-4">
        <div class="col-sm">
          <img class="rounded-circle profile" width="70px" src="${person.picture}" alt="Person's profile">
        </div>
        <div class="col-sm">
          <p class="h5">${person.lastName} ${person.firstName}</p>
          <p>Turn to this age on <b>${birthday}</b></p>
        </div>
        <div class="col-sm">
          Days
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
}

const editButton = async (id) => {
  console.log(id);
  const findPeopleById = await fetchPeople();
  const foundPerson = findPeopleById.find(person => person.id);
  // console.log(foundPerson);
}

// Handling buttons 
const handleClickButtons = async (e) => {
  if (e.target.closest('button.edit')) {
    console.log('Clicked', e.target);
    editButton();
  }
}
window.addEventListener('click', handleClickButtons)

// 
displayPeople();