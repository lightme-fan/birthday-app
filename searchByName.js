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
        <div class="md-form mt-0">
            <input class="form-control search" type="text" placeholder="Search a person by name" aria-label="Search">
        </div>
    `
    searchBtn.innerHTML = html;
    const inputSearch = document.querySelector('.search');

    const filterByName = (e, filterName, filterStyle) => {
        // if (filterName) {
        //   console.log(data);
        //   console.log(filterName);
        //     data.filter(name => {
        //       let lowerCaseName = name.title.toLowerCase();
        //       console.log(lowerCaseName);
        //       let lowerCaseFilterName = filterTitle.toLowerCase();
        //       if (lowerCaseName.includes(lowerCaseFilterName)) {
        //           return true;
        //       } else {
        //           return false;
        //       }
        //     })
        // }
        console.log(e);
    }
    inputSearch.addEventListener('input', filterByName)
}
