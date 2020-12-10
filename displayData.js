import {
  isPast, 
  addYears, 
  setYear, 
  isToday,
  lightFormat,
	differenceInCalendarYears,
	differenceInCalendarDays,
	compareAsc
} from 'date-fns';

import editIcon from './icons/edit-icon.png';
import trashIcon from './icons/trash_icon.png';

// Importing the empty array
import { data } from "./localStorage.js";
// import Variables
import { root, searchByName,searchByMonth, resetBtn } from "./usefulvariables.js";

// Date fns


// Importing the calculation of age
import { getAge } from "./getAge.js";

// Filter function
const filterList = (e) => {
  displayData(e, searchByName.value, searchByMonth.value);
}

// Reset filter
const resetFilters = (e) => {
  const reseting = e.target;
  root.dispatchEvent(new CustomEvent('updatedBirthday'))
}

// Event listener for the filters
searchByName.addEventListener('keyup', filterList);
searchByMonth.addEventListener('change', filterList);
resetBtn.addEventListener('click', resetFilters);

// Displaying the data form the local storage
export const displayData = (event, filterName, filterMonth) => {
  let sortedPeople = data.sort((a,b) => a.birthday - b.birthday);

  // Filter by name
  if (filterName) {
    sortedPeople = data.filter(person => {
      let lowerCaseName = person.lastName.toLowerCase();
      let lowerCaseFilterName = filterName.toLowerCase();
      if (lowerCaseName.includes(lowerCaseFilterName.toLowerCase())) {
          return true;
      } else {
          return false;
      }
    })
  }

  // Filter by Month
  else if (filterMonth) {
    sortedPeople = data.filter(person => {
      let date = new Date(person.birthday);
      let month = date.toLocaleString('en-us', { month: 'long' });
      let lowerCaseMonth = month.toLowerCase();
      let lowerCaseFilterMonth = filterMonth.toLowerCase();
      if (lowerCaseMonth.includes(lowerCaseFilterMonth.toLowerCase())) {
        return true;
      } else {
          return false;
      }
    })
  }

  // Mapping the data,   
  const persons = sortedPeople.map(person => {
    // Age
    const birthdate = getAge(new Date(person.birthday));

    const birthday = new Date(person.birthday);
    
    const today = new Date();

    let nextBirthday = setYear(birthday, today.getFullYear())
    
    if (isToday(nextBirthday)) {
      return nextBirthday;
    }
    // if the date is already behind us, we add + 1 to the year
    if (isPast(nextBirthday)) {
      nextBirthday = addYears(nextBirthday, 1);
    }

    const diffDays = differenceInCalendarDays(nextBirthday, today)
    
    return `
        <div class="person d-flex justify-content-between bg-white mt-4 p-5 rounded shadow-lg" data-id="${person.id}" value= "${person.id}">
          <div>
            <img class="rounded-circle profile" width="70px" src="${person.picture}" alt="Person's profile">
          </div>
        
          <div>
            <p class="name">
              <b>${person.lastName} ${person.firstName}</b><br>
            turns to 
            <b class="age text-primary">${birthdate}</b> 
            years old on <b class="birthday text-primary">${nextBirthday.toLocaleDateString()}</b>
            </p>
          </div>       
          
          <div>
            <div>
              <b class="day text-primary">In ${diffDays}</b> days
            </div>
            <div>
              <button type="button" class="btn edit" data-toggle="modal" data-target="#exampleModal" value="${person.id}">
                <img class="edit icon" width="15px" src=${editIcon} alt="Edit">
              </button>
              <button type="button" class="btn delete" data-toggle="modal" data-target="#exampleModal" value="${person.id}">
                <img class="delete icon" width="15px" src=${trashIcon} alt="Delete">
              </button>
            </div>
          </div>
      </div>
    `});

  root.innerHTML = persons.join('');
  // root.dispatchEvent(new CustomEvent('updatedBirthday'))
}  