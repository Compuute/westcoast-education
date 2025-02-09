const loginInput = document.querySelector("#email");
const loginButton = document.querySelector("#login");

const initApp = () => {
    findStudent();
};

const findStudent = async () => {
    const url = "http://localhost:3000/students";
    const response = await fetch(url);
    if (!response.ok) {
    const students = await response.json();
    if (students.length === 0) {
        console.log("Dags att registrera sig");
        location.href = "./register.html";
    } else {
        console.log("Du är inloggad");
    }
}
};

const handleLogin = () => {
    const login = loginInput.value;
    console.log(login);
    const email = loginInput.value; 
}

document.addEventListener("DOMContentLoaded", initApp);
loginButton.addEventListener("click", handleLogin);
