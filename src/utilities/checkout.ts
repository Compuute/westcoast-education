import { ICourse } from "../models/ICourse.js";
import { ICustomer } from "../models/ICustomer.js";
import { IOrder } from "../models/IOrder.js";
import { getMinaVal, updateMinaValDisplay, clearMinaVal } from "./utilities.js";
import { createRow, createRowItem } from "./dom.js";

const productList = document.querySelector("#courses");
const checkoutForm = document.querySelector<HTMLFormElement>("#form");

let products: ICourse[];

const initApp = () => {
  loadOrders();
};

const loadOrders = () => {
  updateMinaValDisplay();
  products = getMinaVal();
  console.log(products);
  createProductListDisplay(products);
};

const checkout = async (e: any) => {
  e.preventDefault();

  if (checkoutForm === null) return;

  const data = new FormData(checkoutForm);
  const formData = Object.fromEntries(data);

  formData.id = crypto.randomUUID();

  const customer: ICustomer = {
    id: Number(formData.id),
    firstName: formData.firstName.toString(),
    lastName: formData.lastName.toString(),
    email: formData.email.toString(),
  };

  const order: IOrder = {
    id: crypto.randomUUID(),
    orderDate: new Date().toLocaleDateString("sv-SE"),
    customer: customer,
    courses: products,
  };

  try {
    await fetch("http://localhost:3000/customerOrders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
    });

    clearMinaVal();
    updateMinaValDisplay();
    location.href = "./confirmation.html";
  } catch (error) {
    console.error(error);
  }
};

const createProductListDisplay = (products: ICourse[]): void => {
  productList!.innerHTML = "";

  if (products.length === 0) {
    productList!.innerHTML =
      '<li style="color: red; font-weight: bold; text-align: center;">Din varukorg är tom</li>';
    return;
  }

  products.forEach((product) => {
    const row = createRow("row");
    row.appendChild(
      createRowItem({ text: product.kurstitel, class: "course-title" })
    );
    row.appendChild(
      createRowItem({ text: product.price.toFixed(2), class: "course-price" })
    );

    productList!.appendChild(row);
  });
};
document.addEventListener("DOMContentLoaded", initApp);
document.addEventListener("submit", checkout);
