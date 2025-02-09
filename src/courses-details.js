import { updateCart, updateCartItems } from "../utilities/utilities.js";

const addToCartButton = document.querySelector("#addToCart");
let course;

const initApp = () => {
  const id = location.search.split("=")[1];
  loadCoursesDetails(id);
};

const loadCoursesDetails = async (id) => {
  const url = "http://localhost:3001/courses/" + id;
  const response = await fetch(url);

  if (response.ok) {
    course = await response.json();
    console.log("Kursdata:", course);
    console.log("Bilddata:", course.bil);
    displayCourseDetails(course);
  }
};

const addToCart = () => {
  updateCart(course);
};

const generateHtml = (course) => {
  const pageHeader = createPageHeader(course.kurstitel);
  pageHeader.classList.add("page-title");
  document
    .querySelector("main")
    ?.insertAdjacentElement("afterbegin", pageHeader);
};

const createText = (text) => {
  const div = document.createElement("div");
  div.appendChild(document.createTextNode(text));
  return div;
};

const displayCourseDetails = (course) => {
  const courseDetails = document.querySelector(".details");
  courseDetails.innerHTML = `
    <h1>${course.kurstitel}</h1>
    <img src='../assets/images/${course.kursnummer.toLowerCase()}.jpg' alt='${course.kurstitel}' class='course-image' />
    `;
  courseDetails.appendChild(createText(`Artikelnr: ${course.kursnummer}`));
  courseDetails.appendChild(createText(`Produktnamn:${course.kurstitel}`));
  courseDetails.appendChild(createText(`Pris: ${course.price.toFixed(2)} kr`));
  courseDetails.appendChild(createText(`Beskrivning: ${course.beskrivning}`));
  courseDetails.appendChild(createText(`Kurslängd: ${course.kurslängd}`));
};

document.addEventListener("DOMContentLoaded", initApp);
addToCartButton?.addEventListener("click", addToCart);
