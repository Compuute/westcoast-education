export const getAllCourses = async () => {
    const response = await fetch("http://localhost:3001/courses");
    const courses = await response.json();
    return courses;
};

export const getCourseById = async (courseId) => {
    const courses = await getAllCourses();
    return courses.find(course => course.id === courseId);  
    console.log(courseId);
}

export const createCourseDisplay = (courses) => {
    const courseList = document.querySelector("#courses");
    let html = "";
    
}

