// Importing the empty array
import { data } from "./localStorage.js";

// import Variables
import { container } from "./usefulvariables.js";

// Importing the calculation of age
import { getAge } from "./getAge.js";

// Displaying the data form the local storage
export const displayData = () => {
  // Mapping the data,   
  const persons = data.map(person => {
    // Age
    const birthdate = getAge(new Date(person.birthday));

    // Birthdate, Date now, 
    const date1 = new Date(person.birthday);
    const date2 = new Date();
    const oneDay = 1000 * 60 * 60 * 24;

    // get current year 
    const yearNow = date2.getFullYear();

    const longMonth = date1.toLocaleString('en-us', { month: 'long' });
    const getDay = date1.getDay() + 1;
    
    const actualBirthday = `${getDay}th - ${longMonth}`;

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