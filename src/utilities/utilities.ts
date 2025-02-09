import { ICourse } from "../models/ICourse.js";

export const updateMinaVal = (product: ICourse): void => {
  let products: ICourse[] = JSON.parse(localStorage.getItem("minaVal") || "[]");
  products.push(product);
  localStorage.setItem("minaVal", JSON.stringify(products));
  products = JSON.parse(localStorage.getItem("minaVal") || "[]");
  document.querySelector("#minaVal")!.textContent = products.length.toString();
};

export const updateMinaValDisplay = (): void => {
  const products: ICourse[] = JSON.parse(
    localStorage.getItem("minaVal") || "[]"
  );
  if (products) {
    document.querySelector("#minaVal")!.textContent =
      products.length.toString();
  }
};

export const getMinaVal = (): ICourse[] => {
  const products: ICourse[] = JSON.parse(
    localStorage.getItem("minaVal") || "[]"
  );
  return products;
};

export const clearMinaVal = (): void => {
  localStorage.removeItem("minaVal");
  document.querySelector("#minaVal")!.textContent = "0";
};
