// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"usefulvariables.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resetBtn = exports.searchByMonth = exports.searchBtn = exports.searchByName = exports.addButton = exports.root = void 0;
const root = document.querySelector('.root');
exports.root = root;
const addButton = document.querySelector('.addPerson');
exports.addButton = addButton;
const searchByName = document.querySelector('.search-by-name');
exports.searchByName = searchByName;
const searchBtn = document.querySelector('.search-btn');
exports.searchBtn = searchBtn;
const searchByMonth = document.querySelector('#months');
exports.searchByMonth = searchByMonth;
const resetBtn = document.querySelector('.resetBtn');
exports.resetBtn = resetBtn;
},{}],"fetchData.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchPeople = fetchPeople;

var _localStorage = require("./localStorage.js");

const API_URL = 'https://gist.githubusercontent.com/Pinois/e1c72b75917985dc77f5c808e876b67f/raw/93debb7463fbaaec29622221b8f9e719bd5b119f/birthdayPeople.json'; // Fetch people

async function fetchPeople() {
  const res = await fetch(API_URL);
  const dataPerson = await res.json();
  return dataPerson;
}
},{"./localStorage.js":"localStorage.js"}],"getAge.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAge = void 0;

// Get age of a person
const getAge = (date1, date2) => {
  // This is a condition like if statement
  date2 = date2 || new Date(); //Calculation

  const diff = date2.getTime() - date1.getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
};

exports.getAge = getAge;
},{}],"displayData.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.displayData = void 0;

var _localStorage = require("./localStorage.js");

var _usefulvariables = require("./usefulvariables.js");

var _getAge = require("./getAge.js");

// Importing the empty array
// import Variables
// Importing the calculation of age
// Filter function
const filterList = e => {
  displayData(e, _usefulvariables.searchByName.value, _usefulvariables.searchByMonth.value);
}; // Reset filter


const resetFilters = e => {
  const reseting = e.target;

  _usefulvariables.root.dispatchEvent(new CustomEvent('updatedBirthday'));
}; // Event listener for the filters


_usefulvariables.searchByName.addEventListener('keyup', filterList);

_usefulvariables.searchByMonth.addEventListener('change', filterList);

_usefulvariables.resetBtn.addEventListener('click', resetFilters); // Displaying the data form the local storage


const displayData = (event, filterName, filterMonth) => {
  let sortedPeople = _localStorage.data.sort((a, b) => a.birthday - b.birthday); // Filter by name


  if (filterName) {
    sortedPeople = _localStorage.data.filter(person => {
      let lowerCaseName = person.lastName.toLowerCase();
      let lowerCaseFilterName = filterName.toLowerCase();

      if (lowerCaseName.includes(lowerCaseFilterName.toLowerCase())) {
        return true;
      } else {
        return false;
      }
    });
  } // Filter by Month
  else if (filterMonth) {
      sortedPeople = _localStorage.data.filter(person => {
        let date = new Date(person.birthday);
        let month = date.toLocaleString('en-us', {
          month: 'long'
        });
        let lowerCaseMonth = month.toLowerCase();
        let lowerCaseFilterMonth = filterMonth.toLowerCase();

        if (lowerCaseMonth.includes(lowerCaseFilterMonth.toLowerCase())) {
          return true;
        } else {
          return false;
        }
      });
    } // Mapping the data,   


  const persons = sortedPeople.map(person => {
    // Age
    const birthdate = (0, _getAge.getAge)(new Date(person.birthday)); // Birthdate, Date now, 

    const date1 = new Date(person.birthday);
    const date2 = new Date();
    const oneDay = 1000 * 60 * 60 * 24;
    const birthdayMonth = date1.getMonth() + 1; // get current year 

    const yearNow = date2.getFullYear();
    const longMonth = date1.toLocaleString('en-us', {
      month: 'long'
    });
    const getDay = date1.getDay() + 1;
    let birthdays;

    if (getDay === 1) {
      birthdays = `${getDay}st`;
    } else if (getDay === 2) {
      birthdays = `${getDay}nd`;
    } else if (getDay === 3) {
      birthdays = `${getDay}rd`;
    } else {
      birthdays = `${getDay}th`;
    }

    const actualBirthday = `${birthdays} of ${longMonth}`;
    let year;

    if (date2.getMonth() > birthdayMonth) {
      year = yearNow + 1;
    } else if (date2.getMonth() === birthdayMonth && date2.getDate() > getDay) {
      year = yearNow;
    } else {
      year = yearNow;
    }

    const convertedBirthdate = `${getDay}/${birthdayMonth}/${year}`; // Get distance days between today and the birthday

    const newDate = new Date(convertedBirthdate);
    const diffDays = Math.floor((newDate - date2) / oneDay);
    return `
        <div class="d-flex justify-content-between bg-white mt-4 p-5 rounded shadow-lg" data-id="${person.id}" value= "${person.id}">
          <div>
            <img class="rounded-circle profile" width="70px" src="${person.picture}" alt="Person's profile">
          </div>
        
          <div>
            <p class="name"><b>${person.lastName} ${person.firstName}</b><br>
            turns to <b class="age text-primary">${birthdate}</b> years old on <b class="birthday text-primary">${actualBirthday}</b></p>
          </div>
        
          <div>
            <b class="day text-primary">${diffDays}</b> days
          </div>
        
          <div>
            <button type="button" class="btn edit" data-toggle="modal" data-target="#exampleModal" value="${person.id}">
              <img class="edit icon" width="15px" src="../icons/edit-icon.png" alt="Edit">
            </button>
            <button type="button" class="btn delete" data-toggle="modal" data-target="#exampleModal" value="${person.id}">
              <img class="delete icon" width="15px" src="../icons/trash_icon.png" alt="Delete">
            </button>
          </div>
      </div>
    `;
  });
  _usefulvariables.root.innerHTML = persons.join(''); // container.dispatchEvent(new CustomEvent('updatedBirthday'))
};

exports.displayData = displayData;
},{"./localStorage.js":"localStorage.js","./usefulvariables.js":"usefulvariables.js","./getAge.js":"getAge.js"}],"destroyPopup.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.destroyPopup = destroyPopup;

// Destroy form popup
function destroyPopup(formPopup) {
  formPopup.remove();
  formPopup = null;
}
},{}],"localStorage.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deletePopup = exports.updatedLocalStorage = exports.initialLocalStorage = exports.data = void 0;

var _usefulvariables = require("./usefulvariables.js");

var _fetchData = require("./fetchData.js");

var _displayData = require("./displayData.js");

var _destroyPopup = require("./destroyPopup.js");

let data = []; // import container

exports.data = data;

// Local storage
const initialLocalStorage = async () => {
  const storedPersons = JSON.parse(localStorage.getItem('data'));

  if (storedPersons) {
    exports.data = data = storedPersons;
  } else {
    exports.data = data = await (0, _fetchData.fetchPeople)();
  } // displayData(data)
  // console.log(await fetchPeople());


  _usefulvariables.root.dispatchEvent(new CustomEvent('updatedBirthday'));
}; // Update local storage


exports.initialLocalStorage = initialLocalStorage;

const updatedLocalStorage = () => {
  localStorage.setItem('data', JSON.stringify(data));
}; // Import destroy popup


exports.updatedLocalStorage = updatedLocalStorage;

// Import display data function
// import { displayData } from "./displayData.js";
// Delete
const deletePopup = id => {
  // Delete element
  const deleteForm = document.createElement('div');
  deleteForm.classList.add('popup');
  deleteForm.style.height = '200px';
  deleteForm.style.width = '400px'; // Delete html

  deleteForm.innerHTML = `
      <div tabindex="-1" role="dialog">
        <p class="h4 text-white">Are sure you want to delete thi person?</p>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary ok">OK</button>
          <button type="button" class="btn btn-secondary cancel" data-dismiss="modal">Close</button>
        </div>
      </div>
      `;
  document.body.appendChild(deleteForm);
  deleteForm.classList.add('open'); // Handle clik

  const confirmBtn = e => {
    // Confirm deletion
    if (e.target.matches('button.ok')) {
      exports.data = data = data.filter(person => person.id !== id);
      (0, _displayData.displayData)();
      (0, _destroyPopup.destroyPopup)(deleteForm);
      container.dispatchEvent(new CustomEvent('updatedBirthday'));
    } // Cancel delete


    if (e.target.matches('button.cancel')) {
      (0, _destroyPopup.destroyPopup)(deleteForm);
    }

    container.dispatchEvent(new CustomEvent('updatedBirthday'));
  }; // Event listener for delete button 


  window.addEventListener('click', confirmBtn);
};

exports.deletePopup = deletePopup;
},{"./usefulvariables.js":"usefulvariables.js","./fetchData.js":"fetchData.js","./displayData.js":"displayData.js","./destroyPopup.js":"destroyPopup.js"}],"editPopup.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.editPopup = void 0;

var _localStorage = require("./localStorage.js");

var _usefulvariables = require("./usefulvariables.js");

var _destroyPopup = require("./destroyPopup.js");

var _displayData = require("./displayData.js");

// Importing the empty array
// import Variables
// Import destroy popup
// Import display data function
// Edit
const editPopup = id => {
  const listPerso = document.querySelector('.person');
  const birthday = listPerso.querySelector('.birthday');
  console.log(birthday);
  const age = listPerso.querySelector('.age');
  const differenceDay = listPerso.querySelector('.day'); // Find person by id

  const people = _localStorage.data.find(person => person.id === id);

  return new Promise(async function (resolve) {
    // Creating form popup
    const formPopup = document.createElement('form');
    formPopup.classList.add('popup'); // Popup HTML

    const popupHtml = `
        <div>
          <p class="modal-title h3 text-white" id="exampleModalLabel">Edit <i>${people.lastName}</i><p>
          <fieldset class="form-group d-flex flex-column">
            <label class="text-white h5" for="lastname">Last name</label>
            <input type="text" name="lastname" id="lastname" value="${people.lastName}">
          </fieldset>
          
          <fieldset class="form-group d-flex flex-column">
            <label class="text-white h5" for="firstname">First name</label>
            <input type="text" name="firstname" id="firstname" value="${people.firstName}">
          </fieldset>

          <fieldset class="form-group d-flex flex-column">
            <label class="text-white h5" for="birthday">Birthday</label>
            <input type="text" name="birthday" id="birthday" value="${people.birthday}">
          </fieldset>
    
          <div class="modal-footer">
            <button type="submit" class="btn btn-primary submit" value="${people.id}">Save changes</button>
            <button type="button" class="btn btn-secondary" data-dismiss="modal" value="${people.id}">Close</button>
          </div>      
        </div>	
        `;
    formPopup.insertAdjacentHTML('afterbegin', popupHtml);
    document.body.appendChild(formPopup);
    formPopup.classList.add('open'); // Submitting the values from the input form

    formPopup.addEventListener('submit', e => {
      e.preventDefault(); // Chanring the textContent of a person by value of form popup

      people.lastName = formPopup.lastname.value;
      people.firstName = formPopup.firstname.value;
      people.birthday = formPopup.birthday.value, birthday.textContent = people.birthday;
      (0, _displayData.displayData)(_localStorage.data);
      (0, _destroyPopup.destroyPopup)(formPopup);

      _usefulvariables.container.dispatchEvent(new CustomEvent('updatedBirthday'));
    }, {
      once: true
    }); // Close popup

    window.addEventListener('click', e => {
      if (e.target.closest('button[data-dismiss="modal"]')) {
        (0, _destroyPopup.destroyPopup)(formPopup);

        _usefulvariables.container.dispatchEvent(new CustomEvent('updatedBirthday'));
      }
    });
  });
};

exports.editPopup = editPopup;
},{"./localStorage.js":"localStorage.js","./usefulvariables.js":"usefulvariables.js","./destroyPopup.js":"destroyPopup.js","./displayData.js":"displayData.js"}],"handleclick.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleClickButtons = void 0;

var _editPopup = require("./editPopup.js");

var _localStorage = require("./localStorage.js");

// Import handleClick function
// Import handleClick function
// Handling buttons 
const handleClickButtons = e => {
  // Handling Edit button
  if (e.target.closest('button.edit')) {
    const closestEl = e.target.closest('.person');
    const id = closestEl.dataset.id;
    (0, _editPopup.editPopup)(id);
  } // Handling Delete button


  if (e.target.closest('button.delete')) {
    const closestEl = e.target.closest('.person');
    const id = closestEl.dataset.id;
    (0, _localStorage.deletePopup)(id);
  }
};

exports.handleClickButtons = handleClickButtons;
},{"./editPopup.js":"editPopup.js","./localStorage.js":"localStorage.js"}],"addBtn.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleAddBtn = void 0;

var _usefulvariables = require("./usefulvariables.js");

var _localStorage = require("./localStorage.js");

var _displayData = require("./displayData.js");

var _destroyPopup = require("./destroyPopup.js");

// import Variables
// Importing the empty array
// Import display data function
// Import destroy popup
// Add a new person
const handleAddBtn = () => {
  // Creating form popup
  const addPopup = document.createElement('form');
  addPopup.classList.add('popup'); // Popup HTML

  const popupHtml = `
      <div>
        <p class="modal-title h3 text-white" id="exampleModalLabel">Add a new person's birthday</i><p>
        <fieldset class="form-group d-flex flex-column">
          <label class="text-white h5" for="lastname">Last name</label>
          <input type="text" name="lastname" id="lastname" require>
        </fieldset>

        <fieldset class="form-group d-flex flex-column">
          <label class="text-white h5" for="firstname">First name</label>
          <input type="text" name="firstname" id="firstname" require>
        </fieldset>

        <fieldset class="form-group d-flex flex-column">
          <label class="text-white h5" for="birthday">Birthday</label>
          <input type="date" name="birthday" id="birthday" require>
        </fieldset>
        
        <fieldset class="form-group d-flex flex-column">
          <label class="text-white h5" for="picture">Image URL</label>
          <input type="url" name="picture" id="picture"require>
        </fieldset>
        
        <div class="modal-footer">
          <button type="submit" class="btn btn-primary submit">Submit</button>
          <button type="button" class="btn btn-secondary cancel" data-dismiss="modal">Close</button>
        </div>      
      </div>	
      `;
  addPopup.insertAdjacentHTML('afterbegin', popupHtml);
  document.body.appendChild(addPopup);
  addPopup.classList.add('open'); // Submit form

  addPopup.addEventListener('submit', e => {
    e.preventDefault();
    const addForm = e.currentTarget;
    console.log(addForm.picture.value); // Declare a new object

    const newPerson = {
      birthday: addForm.birthday.value,
      id: _localStorage.data.id,
      lastName: addForm.lastname.value,
      firstName: addForm.firstname.value,
      picture: addForm.picture.value
    }; // Push the new object

    _localStorage.data.push(newPerson);

    (0, _displayData.displayData)();
    addPopup.reset();
    (0, _destroyPopup.destroyPopup)(addPopup);

    _usefulvariables.container.dispatchEvent(new CustomEvent('updatedBirthday')); // console.log(displayArr(newItem));

  }); // Close button

  window.addEventListener('click', e => {
    if (e.target.closest('.cancel')) {
      (0, _destroyPopup.destroyPopup)(addPopup);
    }
  });
};

exports.handleAddBtn = handleAddBtn;
},{"./usefulvariables.js":"usefulvariables.js","./localStorage.js":"localStorage.js","./displayData.js":"displayData.js","./destroyPopup.js":"destroyPopup.js"}],"searchByName.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.searchByNameFunction = void 0;

var _usefulvariables = require("./usefulvariables.js");

var _localStorage = require("./localStorage.js");

// Import searchByName variable
// Import data variable
// Import local storage
// Import searchBtn variable
const searchByNameFunction = () => {
  const html = `
        
    `;
  _usefulvariables.searchBtn.innerHTML = html;
  const inputSearch = document.querySelector('.search');

  const filterByName = (e, filterName, filterStyle) => {
    let sortedData = _localStorage.data.sort((a, b) => b.birthday - a.birthday);

    if (filterName) {
      sortedData = _localStorage.data.filter(person => {
        let lowerCaseName = person.lastName.toLowerCase();
        let lowerCaseFilterName = filterName.toLowerCase();

        if (lowerCaseName.includes(lowerCaseFilterName)) {
          return true;
        } else {
          return false;
        }
      });
    }
  };

  inputSearch.addEventListener('input', filterByName);
};

exports.searchByNameFunction = searchByNameFunction;
},{"./usefulvariables.js":"usefulvariables.js","./localStorage.js":"localStorage.js"}],"script.js":[function(require,module,exports) {
"use strict";

var _usefulvariables = require("./usefulvariables.js");

var _localStorage = require("./localStorage.js");

var _fetchData = require("./fetchData.js");

var _displayData = require("./displayData.js");

var _destroyPopup = require("./destroyPopup.js");

var _handleclick = require("./handleclick.js");

var _addBtn = require("./addBtn.js");

var _searchByName = require("./searchByName.js");

// import Variables
// Importing the empty array
// Import fetch people function
// Importing local storage
// Import display data function
// Import destroy popup
// Import handleClick function
// Import handleAdd button
// Import searchByName variable
// Import searchByName Function
window.addEventListener('click', _handleclick.handleClickButtons); // Event listner for localStorage

_usefulvariables.root.addEventListener('updatedBirthday', _localStorage.updatedLocalStorage);

_usefulvariables.root.addEventListener('updatedBirthday', _displayData.displayData); // Initialising local storage


(0, _localStorage.initialLocalStorage)(); // event listner for handle Add button

_usefulvariables.addButton.addEventListener('click', _addBtn.handleAddBtn); // searchByName.addEventListener('click', searchByNameFunction);


(0, _displayData.displayData)();
(0, _fetchData.fetchPeople)();
},{"./usefulvariables.js":"usefulvariables.js","./localStorage.js":"localStorage.js","./fetchData.js":"fetchData.js","./displayData.js":"displayData.js","./destroyPopup.js":"destroyPopup.js","./handleclick.js":"handleclick.js","./addBtn.js":"addBtn.js","./searchByName.js":"searchByName.js"}],"../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "64341" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","script.js"], null)
//# sourceMappingURL=/script.75da7f30.js.map