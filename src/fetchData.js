import { data } from "./localStorage.js";

const API_URL = 'https://gist.githubusercontent.com/Pinois/e1c72b75917985dc77f5c808e876b67f/raw/b17e08696906abeaac8bc260f57738eaa3f6abb1/birthdayPeople.json'
// Fetch people

export async function fetchPeople() {
  const res = await fetch(API_URL);
  const dataPerson = await res.json();
  return dataPerson;
}
