import { ICourse } from "../models/ICourse";
import { getCourse } from "../../services/courses-services";
import { createPageHeader, createText } from "./dom.js";
import { updateMinaVal, updateMinaValDisplay } from "./utilities.js";

const addToCartButton = document.querySelector("#addToCart");
let course: ICourse;

const initApp = () => {
  updateMinaValDisplay();
  const kursNummer = location.search.split("=")[1];
  findCourse(kursNummer);
};

const findCourse = async (kursNummer: string) => {
  course = await getCourse(kursNummer);
  console.log(course);
  generateHTML(course);
};

const addToCart = () => {
  updateMinaVal(course);
};

const generateHTML = (course: ICourse) => {
  // Generate HTML for the course details page
  const pageHeader = createPageHeader(course.kurstitel);
  pageHeader.classList.add("page-title");
  document
    .querySelector("main")
    ?.insertAdjacentElement("afterbegin", pageHeader);

  // Create a row for the course details
  // Get the section form html page.....
  const details = document.querySelector(".details");
  details!.appendChild(createText(`Kursnummer: ${course.kursnummer}`));
  details!.appendChild(createText(`Kurstitel: ${course.kurstitel}`));
  details!.appendChild(createText(`kursPris: ${course.price.toFixed(2)} kr`));
  details!.appendChild(createText(`Beskrivning: ${course.description}`));
};

document.addEventListener("DOMContentLoaded", initApp);
addToCartButton!.addEventListener("click", addToCart);
