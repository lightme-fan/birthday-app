// Import searchByName variable
import { searchByName } from "./usefulvariables.js";

// Import data variable
import { data } from "./localStorage.js";

// Import local storage
import { updatedLocalStorage } from "./localStorage.js";
import {  } from "./localStorage.js";

// Import searchBtn variable
import { searchBtn } from "./usefulvariables.js";

export const searchByNameFunction = () => {
    const html = `
        
    `
    searchBtn.innerHTML = html;
    const inputSearch = document.querySelector('.search');

    const filterByName = (e, filterName, filterStyle) => {
        let sortedData = data.sort((a, b) => b.birthday - a.birthday);
        if (filterName) {
            sortedData = data.filter(person => {
                let lowerCaseName = person.lastName.toLowerCase();
                let lowerCaseFilterName = filterName.toLowerCase();        
                if (lowerCaseName.includes(lowerCaseFilterName)) {
                    return true;
                } else {
                    return false;
                }
            })
        }

    }
    inputSearch.addEventListener('input', filterByName)
}
