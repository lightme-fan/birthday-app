export let data = [];

// import container
import { container } from "./usefulvariables.js";

// Update local storage
export const updatedLocalStorage = () => {
  localStorage.setItem('data', JSON.stringify(data));
}

// Local storage
export const initialLocalStorage = () => {
  const storedPersons = JSON.parse(localStorage.getItem('data'));
  if (storedPersons) {
      data = storedPersons;
  }
  else {
      fetchPeople();
  }
  container.dispatchEvent(new CustomEvent('updatedBirthday'));
}
