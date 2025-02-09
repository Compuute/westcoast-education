import { ICourse } from "../models/ICourse.js";
import { listAllCourses } from "../../services/courses-services.js";
import { createRow, createRowItem } from "./dom.js";
import { updateMinaValDisplay } from "./utilities.js";

const courseList = document.querySelector("#courses");

const initApp = () => {
  loadCourses();
  updateMinaValDisplay();
};

const loadCourses = async () => {
  const courses = await listAllCourses();
  console.log(courses);
  createCourseListDisplay(courses);
};
const displayCoursesDetails = (e: any) => {
  console.log(e.currentTarget.id);
  const kursNummer = e.currentTarget.id;
  console.log(kursNummer);
  location.href = `./coursesDetails.html?id=${kursNummer}`;
};

const createCourseListDisplay = (courses: ICourse[]): void => {
  courseList!.innerHTML = "";

  courses.forEach((course) => {
    const row = createRow("row");
    row.appendChild(
      createRowItem({
        text: "Kurskod: " + course.kursnummer,
      })
    );
    row.appendChild(createRowItem({ text: course.kurstitel }));
    row.appendChild(createRowItem({ text: course.description }));
    row.appendChild(createRowItem({ text: course.price.toFixed(2) + " kr" }));

    row.id = course.kursnummer;
    row.addEventListener("click", displayCoursesDetails);

    courseList!.appendChild(row);
  });
};

document.addEventListener("DOMContentLoaded", initApp);
