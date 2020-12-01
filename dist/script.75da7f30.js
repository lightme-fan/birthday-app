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
exports.resetBtn = exports.searchByMonth = exports.searchBtn = exports.searchByName = exports.addButton = exports.container = void 0;
var container = document.querySelector('.container');
exports.container = container;
var addButton = document.querySelector('.addPerson');
exports.addButton = addButton;
var searchByName = document.querySelector('.search-by-name');
exports.searchByName = searchByName;
var searchBtn = document.querySelector('.search-btn');
exports.searchBtn = searchBtn;
var searchByMonth = document.querySelector('#months');
exports.searchByMonth = searchByMonth;
var resetBtn = document.querySelector('.resetBtn');
exports.resetBtn = resetBtn;
},{}],"fetchData.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchPeople = fetchPeople;

var _localStorage = require("./localStorage.js");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

// Fetch people
function fetchPeople() {
  return _fetchPeople.apply(this, arguments);
}

function _fetchPeople() {
  _fetchPeople = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var res, dataPerson;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return fetch('./people.json');

          case 2:
            res = _context.sent;
            _context.next = 5;
            return res.json();

          case 5:
            dataPerson = _context.sent;
            return _context.abrupt("return", dataPerson);

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _fetchPeople.apply(this, arguments);
}
},{"./localStorage.js":"localStorage.js"}],"destroyPopup.js":[function(require,module,exports) {
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
},{}],"getAge.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAge = void 0;

// Get age of a person
var getAge = function getAge(date1, date2) {
  // This is a condition like if statement
  date2 = date2 || new Date(); //Calculation

  var diff = date2.getTime() - date1.getTime();
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
var filterList = function filterList(e) {
  displayData(e, _usefulvariables.searchByName.value, _usefulvariables.searchByMonth.value);
}; // Reset filter


var resetFilters = function resetFilters(e) {
  var reseting = e.target;

  _usefulvariables.container.dispatchEvent(new CustomEvent('updatedBirthday'));
}; // Event listener for the filters


_usefulvariables.searchByName.addEventListener('keyup', filterList);

_usefulvariables.searchByMonth.addEventListener('change', filterList);

_usefulvariables.resetBtn.addEventListener('click', resetFilters); // Displaying the data form the local storage


var displayData = function displayData(event, filterName, filterMonth) {
  var sortedPeople = _localStorage.data.sort(function (a, b) {
    return a.birthday - b.birthday;
  }); // Filter by name


  if (filterName) {
    sortedPeople = _localStorage.data.filter(function (person) {
      var lowerCaseName = person.lastName.toLowerCase();
      var lowerCaseFilterName = filterName.toLowerCase();

      if (lowerCaseName.includes(lowerCaseFilterName)) {
        return true;
      } else {
        return false;
      }
    });
  } // Filter by Month
  else if (filterMonth) {
      sortedPeople = _localStorage.data.filter(function (person) {
        var date = new Date(person.birthday);
        var month = date.toLocaleString('en-us', {
          month: 'long'
        });
        var lowerCaseMonth = month.toLowerCase();
        var lowerCaseFilterMonth = filterMonth.toLowerCase();

        if (lowerCaseMonth.includes(lowerCaseFilterMonth)) {
          return true;
        } else {
          return false;
        }
      });
    } // Mapping the data,   


  var persons = sortedPeople.map(function (person) {
    // Age
    var birthdate = (0, _getAge.getAge)(new Date(person.birthday)); // Birthdate, Date now, 

    var date1 = new Date(person.birthday);
    var date2 = new Date();
    var oneDay = 1000 * 60 * 60 * 24;
    var birthdayMonth = date1.getMonth() + 1; // get current year 

    var yearNow = date2.getFullYear();
    var longMonth = date1.toLocaleString('en-us', {
      month: 'long'
    });
    var getDay = date1.getDay() + 1;
    var birthdays;

    if (getDay === 1) {
      birthdays = "".concat(getDay, "st");
    } else if (getDay === 2) {
      birthdays = "".concat(getDay, "nd");
    } else if (getDay === 3) {
      birthdays = "".concat(getDay, "rd");
    } else {
      birthdays = "".concat(getDay, "th");
    }

    var actualBirthday = "".concat(birthdays, " of ").concat(longMonth);
    var year;

    if (date2.getMonth() > birthdayMonth) {
      year = yearNow + 1;
    } else if (date2.getMonth() === birthdayMonth && date2.getDate() > getDay) {
      year = yearNow;
    } else {
      year = yearNow;
    }

    var convertedBirthdate = "".concat(getDay, "/").concat(birthdayMonth, "/").concat(year); // Get distance days between today and the birthday

    var newDate = new Date(convertedBirthdate);
    var diffDays = Math.floor((newDate - date2) / oneDay);
    return "\n        <div class=\"d-flex flex-row justify-content-between border m-4 person\" data-id=\"".concat(person.id, "\" value= \"").concat(person.id, "\">\n          <div>\n            <img class=\"rounded-circle profile\" width=\"70px\" src=\"").concat(person.picture, "\" alt=\"Person's profile\">\n          </div>\n        \n          <div>\n            <p class=\"name\"><b>").concat(person.lastName, " ").concat(person.firstName, "</b><br>\n            turns to <b class=\"age text-primary\">").concat(birthdate, "</b> years old on <b class=\"birthday text-primary\">").concat(actualBirthday, "</b></p>\n          </div>\n        \n          <div>\n            <b class=\"day text-primary\">").concat(diffDays, "</b> days\n          </div>\n        \n          <div>\n            <button type=\"button\" class=\"btn edit\" data-toggle=\"modal\" data-target=\"#exampleModal\" value=\"").concat(person.id, "\">\n              <img class=\"edit icon\" width=\"15px\" src=\"../icons/edit-icon.png\" alt=\"Edit\">\n            </button>\n            <button type=\"button\" class=\"btn delete\" data-toggle=\"modal\" data-target=\"#exampleModal\" value=\"").concat(person.id, "\">\n              <img class=\"delete icon\" width=\"15px\" src=\"../icons/trash_icon.png\" alt=\"Delete\">\n            </button>\n          </div>\n      </div>\n    ");
  });
  _usefulvariables.container.innerHTML = persons.join(''); // container.dispatchEvent(new CustomEvent('updatedBirthday'))
};

exports.displayData = displayData;
},{"./localStorage.js":"localStorage.js","./usefulvariables.js":"usefulvariables.js","./getAge.js":"getAge.js"}],"localStorage.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deletePopup = exports.initialLocalStorage = exports.updatedLocalStorage = exports.data = void 0;

var _usefulvariables = require("./usefulvariables.js");

var _fetchData = require("./fetchData.js");

var _destroyPopup = require("./destroyPopup.js");

var _displayData = require("./displayData.js");

var data = []; // import container

exports.data = data;

// Update local storage
var updatedLocalStorage = function updatedLocalStorage() {
  localStorage.setItem('data', JSON.stringify(data));
}; // Local storage


exports.updatedLocalStorage = updatedLocalStorage;

var initialLocalStorage = function initialLocalStorage() {
  var storedPersons = JSON.parse(localStorage.getItem('data'));

  if (storedPersons) {
    exports.data = data = storedPersons;
  }

  _usefulvariables.container.dispatchEvent(new CustomEvent('updatedBirthday'));
}; // Import destroy popup


exports.initialLocalStorage = initialLocalStorage;

// Delete
var deletePopup = function deletePopup(id) {
  // Delete element
  var deleteForm = document.createElement('div');
  deleteForm.classList.add('popup');
  deleteForm.style.height = '200px';
  deleteForm.style.width = '400px'; // Delete html

  deleteForm.innerHTML = "\n      <div tabindex=\"-1\" role=\"dialog\">\n        <p class=\"h4 text-white\">Are sure you want to delete thi person?</p>\n        <div class=\"modal-footer\">\n          <button type=\"button\" class=\"btn btn-primary ok\">OK</button>\n          <button type=\"button\" class=\"btn btn-secondary cancel\" data-dismiss=\"modal\">Close</button>\n        </div>\n      </div>\n      ";
  document.body.appendChild(deleteForm);
  deleteForm.classList.add('open'); // Handle clik

  var confirmBtn = function confirmBtn(e) {
    // Confirm deletion
    if (e.target.matches('button.ok')) {
      exports.data = data = data.filter(function (person) {
        return person.id !== id;
      });
      (0, _displayData.displayData)();
      (0, _destroyPopup.destroyPopup)(deleteForm);

      _usefulvariables.container.dispatchEvent(new CustomEvent('updatedBirthday'));
    } // Cancel delete


    if (e.target.matches('button.cancel')) {
      (0, _destroyPopup.destroyPopup)(deleteForm);
    }

    _usefulvariables.container.dispatchEvent(new CustomEvent('updatedBirthday'));
  }; // Event listener for delete button 


  window.addEventListener('click', confirmBtn);
};

exports.deletePopup = deletePopup;
},{"./usefulvariables.js":"usefulvariables.js","./fetchData.js":"fetchData.js","./destroyPopup.js":"destroyPopup.js","./displayData.js":"displayData.js"}],"editPopup.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.editPopup = void 0;

var _localStorage = require("./localStorage.js");

var _usefulvariables = require("./usefulvariables.js");

var _destroyPopup = require("./destroyPopup.js");

var _displayData = require("./displayData.js");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

// Edit
var editPopup = function editPopup(id) {
  var listPerso = document.querySelector('.person');
  var birthday = listPerso.querySelector('.birthday');
  console.log(birthday);
  var age = listPerso.querySelector('.age');
  var differenceDay = listPerso.querySelector('.day'); // Find person by id

  var people = _localStorage.data.find(function (person) {
    return person.id === id;
  });

  return new Promise( /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(resolve) {
      var formPopup, popupHtml;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              // Creating form popup
              formPopup = document.createElement('form');
              formPopup.classList.add('popup'); // Popup HTML

              popupHtml = "\n        <div>\n          <p class=\"modal-title h3 text-white\" id=\"exampleModalLabel\">Edit <i>".concat(people.lastName, "</i><p>\n          <fieldset class=\"form-group d-flex flex-column\">\n            <label class=\"text-white h5\" for=\"lastname\">Last name</label>\n            <input type=\"text\" name=\"lastname\" id=\"lastname\" value=\"").concat(people.lastName, "\">\n          </fieldset>\n          \n          <fieldset class=\"form-group d-flex flex-column\">\n            <label class=\"text-white h5\" for=\"firstname\">First name</label>\n            <input type=\"text\" name=\"firstname\" id=\"firstname\" value=\"").concat(people.firstName, "\">\n          </fieldset>\n\n          <fieldset class=\"form-group d-flex flex-column\">\n            <label class=\"text-white h5\" for=\"birthday\">Birthday</label>\n            <input type=\"text\" name=\"birthday\" id=\"birthday\" value=\"").concat(people.birthday, "\">\n          </fieldset>\n    \n          <div class=\"modal-footer\">\n            <button type=\"submit\" class=\"btn btn-primary submit\" value=\"").concat(people.id, "\">Save changes</button>\n            <button type=\"button\" class=\"btn btn-secondary\" data-dismiss=\"modal\" value=\"").concat(people.id, "\">Close</button>\n          </div>      \n        </div>\t\n        ");
              formPopup.insertAdjacentHTML('afterbegin', popupHtml);
              document.body.appendChild(formPopup);
              formPopup.classList.add('open'); // Submitting the values from the input form

              formPopup.addEventListener('submit', function (e) {
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

              window.addEventListener('click', function (e) {
                if (e.target.closest('button[data-dismiss="modal"]')) {
                  (0, _destroyPopup.destroyPopup)(formPopup);

                  _usefulvariables.container.dispatchEvent(new CustomEvent('updatedBirthday'));
                }
              });

            case 8:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }());
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
var handleClickButtons = function handleClickButtons(e) {
  // Handling Edit button
  if (e.target.closest('button.edit')) {
    var closestEl = e.target.closest('.person');
    var id = closestEl.dataset.id;
    (0, _editPopup.editPopup)(id);
  } // Handling Delete button


  if (e.target.closest('button.delete')) {
    var _closestEl = e.target.closest('.person');

    var _id = _closestEl.dataset.id;
    (0, _localStorage.deletePopup)(_id);
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
var handleAddBtn = function handleAddBtn() {
  // Creating form popup
  var addPopup = document.createElement('form');
  addPopup.classList.add('popup'); // Popup HTML

  var popupHtml = "\n      <div>\n        <p class=\"modal-title h3 text-white\" id=\"exampleModalLabel\">Add a new person's birthday</i><p>\n        <fieldset class=\"form-group d-flex flex-column\">\n          <label class=\"text-white h5\" for=\"lastname\">Last name</label>\n          <input type=\"text\" name=\"lastname\" id=\"lastname\" require>\n        </fieldset>\n\n        <fieldset class=\"form-group d-flex flex-column\">\n          <label class=\"text-white h5\" for=\"firstname\">First name</label>\n          <input type=\"text\" name=\"firstname\" id=\"firstname\" require>\n        </fieldset>\n\n        <fieldset class=\"form-group d-flex flex-column\">\n          <label class=\"text-white h5\" for=\"birthday\">Birthday</label>\n          <input type=\"date\" name=\"birthday\" id=\"birthday\" require>\n        </fieldset>\n        \n        <fieldset class=\"form-group d-flex flex-column\">\n          <label class=\"text-white h5\" for=\"picture\">Image URL</label>\n          <input type=\"url\" name=\"picture\" id=\"picture\"require>\n        </fieldset>\n        \n        <div class=\"modal-footer\">\n          <button type=\"submit\" class=\"btn btn-primary submit\">Submit</button>\n          <button type=\"button\" class=\"btn btn-secondary cancel\" data-dismiss=\"modal\">Close</button>\n        </div>      \n      </div>\t\n      ";
  addPopup.insertAdjacentHTML('afterbegin', popupHtml);
  document.body.appendChild(addPopup);
  addPopup.classList.add('open'); // Submit form

  addPopup.addEventListener('submit', function (e) {
    e.preventDefault();
    var addForm = e.currentTarget;
    console.log(addForm.picture.value); // Declare a new object

    var newPerson = {
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

  window.addEventListener('click', function (e) {
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
var searchByNameFunction = function searchByNameFunction() {
  var html = "\n        \n    ";
  _usefulvariables.searchBtn.innerHTML = html;
  var inputSearch = document.querySelector('.search');

  var filterByName = function filterByName(e, filterName, filterStyle) {
    var sortedData = _localStorage.data.sort(function (a, b) {
      return b.birthday - a.birthday;
    });

    if (filterName) {
      sortedData = _localStorage.data.filter(function (person) {
        var lowerCaseName = person.lastName.toLowerCase();
        var lowerCaseFilterName = filterName.toLowerCase();

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

_usefulvariables.container.addEventListener('updatedBirthday', _localStorage.updatedLocalStorage);

_usefulvariables.container.addEventListener('updatedBirthday', _displayData.displayData); // Initialising local storage


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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "58634" + '/');

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