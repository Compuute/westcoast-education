//import { listAllCourses } from "../"




const initApp = async () => {
  const url = "http://localhost:3001/courses";
  const response = await fetch(url);
  if (response.ok) {
    const courses = await response.json();
    //console.log(courses);
    displayCourses(courses);
  }
  // loadCourses();
  // updateMinaValDisplay();
};

const loadCourses = async () => {
  const courses = await listAllCourses();
  console.log(courses);
  createCourseListDisplay(courses);
  //console.log("loadCourses");
};

const displayCourses = (courses) => {
  let html = "";
  for (let course of courses) {
    html += `
    <a href="courses-details.html?id=${course.id}">
    <div> ${course.kurstitel}</div>
    </a>`;
    console.log(course);

  }
  console.log(html);
  const courseList = document.querySelector("#courses");
  courseList.innerHTML = html;
};

document.addEventListener("DOMContentLoaded", initApp);
