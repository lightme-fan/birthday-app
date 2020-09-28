// Import searchByName variable
import { searchByName } from "./usefulvariables.js";

// Import data variable
import { data } from "./localStorage.js";

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
        if (filterName) {
            data.filter(name => {
                let lowerCase
            })
        }
    }
    inputSearch.addEventListener('input', filterByName)
}
