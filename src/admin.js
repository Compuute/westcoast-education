import {
  clearCartItems,
  getCartItems,
  updateCartItems,
  updateCart,
} from "../utilities/utilities.js";

const productsInAdmin = document.querySelector("#courseList");
const adminForm = document.querySelector("#form");

let courses;

const initApp = () => {
  loadCourseList();
};

const loadCourseList = async () => {
  try {
    const response = await fetch("http://localhost:3001/courses");
    courses = await response.json();
    console.log("Loaded courses:", courses); // Debug log
    if (!Array.isArray(courses)) {
      console.log("Courses is not an array:", courses);
      courses = [];
    }
    createProductListDisplay(courses);
  } catch (error) {
    console.log("Error loading courses:", error);
    productsInAdmin.innerHTML = "<p>Kunde inte ladda kurser</p>";
  }
};

const addCourse = async (e) => {
  e.preventDefault();
  if (adminForm === null) return;

  const data = new FormData(adminForm);
  const formData = Object.fromEntries(data);

  const course = {
    id: crypto.randomUUID(),
    kursnummer: formData.kursnummer.toString(),
    kurstitel: formData.kurstitel.toString(),
    beskrivning: formData.beskrivning?.toString() || "",
    pris: parseFloat(formData.pris),
    orderDate: new Date().toLocaleDateString("sv-SE"), // Samma datumformat som i checkout
  };

  try {
    await fetch("http://localhost:3001/courses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(course),
    });
    adminForm.reset();
    loadCourseList(); // Använder samma namnkonvention
  } catch (error) {
    console.log("Error adding course:", error);
  }
};

const createProductListDisplay = (courses) => {
  if (!courses || !Array.isArray(courses)) {
    console.log("Invalid courses data:", courses);
    return;
  }

  productsInAdmin.innerHTML = "";

  courses.forEach((course) => {
    if (!course) {
      console.log("Invalid course object:", course);
      return;
    }

    const price = parseFloat(course.pris) || 0;

    const row = createRow("row");
    row.appendChild(
      createRowItem({
        text: "Artikelnr: " + (course.kursnummer || "Saknas"),
      })
    );
    row.appendChild(
      createRowItem({
        text: "Kursnamn: " + (course.kurstitel || "Saknas"),
      })
    );
    row.appendChild(
      createRowItem({
        text: "Pris: " + price.toFixed(2) + " kr",
      })
    );

    row.appendChild(createDeleteButton(course.id));

    productsInAdmin.appendChild(row);
  });
};

const createRow = (className) => {
  const row = document.createElement("div");
  row.classList.add(className);
  return row;
};

const createRowItem = ({ text }) => {
  const div = document.createElement("div");
  div.textContent = text;
  return div;
};

const createDeleteButton = (id) => {
  const div = document.createElement("div");
  const button = document.createElement("button");
  button.textContent = "Ta bort";
  button.onclick = () => deleteCourse(id);
  div.appendChild(button);
  return div;
};

const deleteCourse = async (id) => {
  try {
    await fetch(`http://localhost:3001/courses/${id}`, {
      method: "DELETE",
    });
    loadCourseList();
  } catch (error) {
    console.log("Error deleting course:", error);
  }
};

document.addEventListener("DOMContentLoaded", initApp);
adminForm?.addEventListener("submit", addCourse);
