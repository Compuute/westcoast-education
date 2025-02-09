import { createCourseDisplay } from "./utilities/dom.js";

const list = document.querySelector("#course-list");
const form = document.querySelector("#new-course");

const deleteButton = document.querySelector("#delete-course");
const updateButton = document.querySelector("#update-course");

const initApp = () => {
  loadCourses();
};

const loadCourses = async () => {
  const url = "http://localhost:3001/courses";
  const response = await fetch(url); // GET ANROP... hämta data från server...

  if (response.ok) {
    const courses = await response.json(); // Hämta ut data ur body...
    displayCourses(courses);
   
  }
};

const displayCourses = (courses) => {
  list.innerHTML = "";
  list.insertAdjacentHTML("beforeend", createCourseDisplay(courses));
};

const handleSaveCourse = async (e) => {
  e.preventDefault();

  const data = new FormData(form);
  data.append("imageUrl", "default.jpg");
  // Object.fromEntries gör om data till ett JavaScript objekt...
  const body = Object.fromEntries(data);
  console.log(body);

  try {
    const response = await fetch("http://localhost:3001/courses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });


    console.log(await response.json());
    await loadCourses();
  } catch (error) {
    console.log(error);
  }
};

const handleDeleteCourse = async (e) => {
  e.preventDefault();
  console.log("Ta bort");

  const url = "http://localhost:3001/courses/WEB101";

  try {
    const response = await fetch(url, {
      method: "DELETE",
    });
    await loadCourses();
    console.log(response)
  } catch (error) {
    console.error(error);
  }
};

const handleUpdateCourse = async (e) => {
  e.preventDefault();
  console.log("Uppdatera");

  const url = "http://localhost:3001/courses/12324";

  const course = {
    courseCode: "DB200",
    title: "Database Management",
    department: "Information Technology",
    level: "Intermediate",
    imageUrl: "db200.jpg",  
    credits: 15,
  }
  
  try {
    const response = await fetch(url, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(body)
    });
    await loadCourses();
    console.log(response);
  } catch (error) {
    console.error(error);
  }
};

document.addEventListener("DOMContentLoaded", initApp);

form.addEventListener("submit", handleSaveCourse);
deleteButton.addEventListener("click", handleDeleteCourse);
updateButton.addEventListener("click", handleUpdateCourse);

