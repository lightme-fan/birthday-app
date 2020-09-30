import { data } from "./localStorage.js";

// Fetch people
export async function fetchPeople() {
  const res = await fetch('./people.json');
  const dataPerson = await res.json();
  return dataPerson;
}
