import {
  clearCartItems,
  getCartItems,
  updateCartItems,
  updateCart,
} from "../utilities/utilities.js";

const productsInCart = document.querySelector("#products");
const checkoutForm = document.querySelector("#form");

let products;
const initApp = () => {
  loadOrderSummary();
};

const loadOrderSummary = () => {
  updateCartItems();
  products = getCartItems();
  createProductListDisplay(products);
};

const checkout = async (e) => {
  e.preventDefault();
  if (checkoutForm === null) return;
  const data = new FormData(checkoutForm);
  const formData = Object.fromEntries(data);
  formData.id = crypto.randomUUID();
  const customer = {
    id: formData.id,
    firstName: formData.firstName.toString(),
    lastName: formData.lastName.toString(),
    email: formData.email.toString(),
  };
  const order = {
    id: crypto.randomUUID(),
    orderDate: new Date().toLocaleDateString("sv-SE"),
    customer: customer,
    orderItems: products,
  };
  try {
    await fetch("http://localhost:3001/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
    });
    clearCartItems();
    updateCartItems();
    location.href = "./confirmation.html";
  } catch (error) {
    console.log("Error checking out:", error);
  }
};

const createProductListDisplay = (products) => {
  const row = createRow("row");
  row.appendChild(
    createRowItem({
      text: "Artikelnr:" + product.kursnummer,
    })
  );
  row.appendChild(
    createRowItem({
      text: "Produktnamn:" + product.kurstitel,
    })
  );
  row.appendChild(
    createRowItem({
      text: "Pris:" + product.pris.toFixed(2) + " kr",
    })
  );
  row.appendChild(
    createRowItem({
      text: "Antal:" + product.antal,
    })
  );
  row.appendChild(
    createRowItem({
      text: "Summa:" + (product.pris * product.antal).toFixed(2) + " kr",
    })
  );
  productsInCart.appendChild(row);
};

const createRow = (className) => {
  const row = document.createElement("div");
  row.classList.add(className);
  return row;
};

document.addEventListener("DOMContentLoaded", initApp);
checkoutForm?.addEventListener("submit", checkout);
