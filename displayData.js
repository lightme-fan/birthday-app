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

import editIcon from './icons/edit.svg';
import trashIcon from './icons/delete.svg';

// Importing the empty array
import { data } from "./localStorage.js";
// import Variables
import { root, searchByName,searchByMonth, resetBtn } from "./usefulvariables.js";


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

// Displaying the data form the local storage
export const displayData = (event, filterName, filterMonth) => {
  let sortedPeople = data.sort((a,b) => {
    let first = differenceInCalendarDays(a.birthday, new Date())
    let last = differenceInCalendarDays(b.birthday, new Date())
    const rank = last - first;
    return rank
  })
  
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
        <div class="person d-flex justify-content-between bg-white mt-4 p-4 rounded shadow-lg" data-id="${person.id}" value= "${person.id}">
          <div>
            <img class="profile" width="70px" src="${person.picture}" alt="Person's profile">
          </div>
        
          <div class="aboutPerson">
            <p class="name">
              <b class="fs-1">${person.lastName} ${person.firstName}</b><br>
            Turns to 
            <b class="age text-danger">${birthdate}</b> 
            years old on <b class="birthday">${nextBirthday.toLocaleDateString()}</b>
            </p>
          </div>       
          
          <div>
            <div>
              <b class="day">In ${diffDays}</b> days
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