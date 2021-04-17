import {
  isPast, 
  addYears, 
  setYear, 
  isToday,
  differenceInCalendarDays,
	compareAsc,
  format,
} from 'date-fns';

// Get next birthday
export function getNextBirthday(birthday) {
	const birthdayDate = new Date(birthday);
	const today = new Date();
  let nextBirthDay = setYear(birthdayDate, today.getFullYear());
  
  if (isToday(nextBirthDay)) {
		return nextBirthDay;
	}
	
  if (isPast(nextBirthDay)) {
		nextBirthDay = addYears(nextBirthDay, 1);
	}
	return nextBirthDay;
}

import editIcon from '../icons/edit.svg';
import trashIcon from '../icons/delete.svg';
import happyBirthday from '../icons/happy-birthday.jpg';

// Importing the empty array
import { data } from "./localStorage.js";

// import Variables
import { root, searchByName, searchByMonth } from "./usefulvariables.js";


// Importing the calculation of age
import { getAge } from "./getAge.js";

// Displaying the data form the local storage
export const displayData = () => {
  let sortedPeople = data

  // Fiter by name
  const filterByName = sortedPeople.filter(person => {
    const fullNameLowercase =
      person.firstName.toLowerCase() + ' ' + person.lastName.toLowerCase();
    return fullNameLowercase.includes(searchByName.value.toLowerCase());
  });
  
  // Filter by name and month
  const filteredByMonthAndName = filterByName.filter(person => {
    let birthday = format(new Date(person.birthday), 'MMMM');
    if (searchByMonth.value === "null") {
      return true;
    }
    return birthday.toLocaleLowerCase() === searchByMonth.value;
  })
  
  sortedPeople = filterByName 
  sortedPeople = filteredByMonthAndName;

  // Sort persons
  sortedPeople.sort((a,b) => {
    let first = differenceInCalendarDays(getNextBirthday(a.birthday), new Date())
    let last = differenceInCalendarDays(getNextBirthday(b.birthday), new Date())
    return compareAsc(first, last)
  })

  // Mapping the data,   
  const persons = sortedPeople.map(person => {
    // Age
    const birthdate = getAge(new Date(person.birthday));

    const birthday = new Date(person.birthday);
    
    const today = new Date();

    let nextBirthday = getNextBirthday(birthday)
    
    const onesBirthday = new Date(person.birthday).toISOString().substring(0, 10);
    const birthdayMonth= format(new Date(onesBirthday), 'MMMM');
    const dayOfBirthday = new Date(nextBirthday).getDate();
    let birthdayDate;
    if (dayOfBirthday === 1) {
      birthdayDate = dayOfBirthday + 'st'
    }
    if (dayOfBirthday === 2) {
      birthdayDate = dayOfBirthday + 'nd'
    }
    if (dayOfBirthday === 3) {
      birthdayDate = dayOfBirthday + 'rd'
    }
    else {
      birthdayDate = dayOfBirthday + 'th'
    }

    // console.log(birthday);
    // console.log(new Date());
    const diffDays = differenceInCalendarDays(nextBirthday, today)
    

    return (
        `<div class="person bg-white rounded" style="margin-bottom: 31px" data-id="${person.id}" value= "${person.id}">
          <div class="align-self-start">
            <img class="profile" id=${diffDays === 0 && 'present-birthday-img'} width="92px" height="94px" style="border-radius: 5px;" src="${person.picture}" alt="Person's profile">
          </div>
          
          <div class="aboutPerson" id=${diffDays === 0 && 'present-birthday'}>
            ${diffDays === 0 ? `<div><img src=${happyBirthday} style="height: 71px; width: 141px;" alt="Happy Birthday"/></div>`: ''}
            <div class="name" style="font-weight: bold" id=${diffDays === 0 && 'present-birthday-aboutPerson'}>
              <b class="fs-3" style="font-weight: bold; color: #000000">${person.lastName} ${person.firstName}</b><br>
              <span style="color: #5F6C7B; opacity: 0.7">Turns</span> 
              <b class="age text-danger" style="font-size: 24px; opacity: 0.7; color: #5F6C7B; font-weight: bold">${birthdate}</b>  
              <span style="color: #5F6C7B; opacity: 0.7;">
                ${diffDays === 0 ? 'today' : `on ${birthdayMonth} ${birthdayDate}`}
              </span>
            </div>
          </div>       
          
          <div style="justify-self: end; font-size: 22px;">
            <div style="font-weight: 500" id=${diffDays !== 0 ? '' : 'your-birthday'}>
              ${diffDays !== 0 ? 'In' : "Today is your birthday."} ${diffDays !== 0 ? diffDays : ''} ${diffDays !== 0 ? 'days' : ''}
            </div>
            <div >
              <button type="button" class="btn edit" data-toggle="modal" data-target="#exampleModal" value="${person.id}">
                <img class="edit icon" width="30px" height="30px;" src=${editIcon} alt="Edit">
              </button>
              <button type="button" class="btn delete pr-0" data-toggle="modal" data-target="#exampleModal" value="${person.id}">
                <img class="delete icon" width="30px" height="30px;" src=${trashIcon} alt="Delete">
              </button>
            </div>
          </div>
        </div>
    `
  )});

  root.innerHTML = persons.join('');
}  