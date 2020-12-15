<h1 align="center">Birthday app</h1>

<div align="center">
  <h3>
    <a href="https://fanilo-birthday-app.netlify.app/">
      Demo
    </a>
    <span> | </span>
    <a href="https://github.com/lightme-fan/birthday-app">
      Solution
    </a>
  </h3>
</div>

<!-- TABLE OF CONTENTS -->

## Table of Contents

-   [Overview](#overview)
    -   [Built With](#built-with)
-   [Features](#features)
-   [How to use](#how-to-use)
-   [Contact](#contact)
-   [Acknowledgements](#acknowledgements)

<!-- OVERVIEW -->

## Overview

![screenshot](./assets/birthday.png)

You can see my demo by clicking this [link](https://fanilo-birthday-app.netlify.app/)

- Firstly, I could not import the **date-fns** in my script page.

- I set all my work in one big function.

1. I declare an empty array 
2. I fetch the list of people, the push it as the value of the empty array.
3. I set the new array of object to local storage.
4. I create a template to calculate the age of those people in new array of oject. 
5. I display the new array of object from local storage by mapping it. I also call the created age template to get the age of everybody.
6. I declare a destroy popup function.
7. After that the edit function
8. Delete function
9. Add function

#### NB: I tried to calculate the days from today untill the next birthday, but I only got the days from today to the birthday this year. So I have got some negative number of days.

**I separated all my functions into different files.**

### The most challenging in this project are: 
 - to work with the date.
 - Sorting those people by the soonest birthday.

*I tried to calculate the number of days from now untill the birthday. I got numbers but it is the birthday this year. Some of the birthdays have gone, so some are negative numbers.*

## What I still need to improve is:
* to search a person by lastName or firstName or month of birthday. I still want a short explanation because I don't fully understand it.

### Built With

-   [Vanilla](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

## Features

- I have a component folder. In this folder, I have two folders which are Custom-hooks and Pages as well as App.js file
- In Custom hooks folder, there are two files, useFunctionalities.js and useFetch.
- The Pages folder contains 5 files: DisplayQuiz.js, HomePage.js, NextButton.js, Quiz-question.js and TryAgain.js.
- I also have few svg files.
- Lastly, I have index.css

## How To Use

<!-- Example: -->

To clone and run this application, you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer. From your command line:

```bash
# Clone this repository
$ git clone https://github.com/lightme-fan/birthday-app

# Install dependencies
$ npm install date-fns

# Run the app
$ Reveal in browser
```

## Contact

-   Website [Bithday App](https://fanilo-birthday-app.netlify.app/)
-   GitHub [lightme-fan](https://{github.com/lightme-fan})
