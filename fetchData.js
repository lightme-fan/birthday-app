import { data } from "./localStorage.js";

const API_URL = 'https://gist.githubusercontent.com/Pinois/e1c72b75917985dc77f5c808e876b67f/raw/93debb7463fbaaec29622221b8f9e719bd5b119f/birthdayPeople.json'
// Fetch people
export async function fetchPeople() {
  const res = await fetch(API_URL);
  const dataPerson = await res.json();
  return dataPerson;
}
