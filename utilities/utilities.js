export const updateCart = (course) => {
  let courseInCart = JSON.parse(localStorage.getItem("cart")) ?? [];
  courseInCart.push(course);
  localStorage.setItem("cart", JSON.stringify(courseInCart));
  courseInCart = JSON.parse(localStorage.getItem("cart"));
  document.querySelector("#cartItem").textContent =
    courseInCart.length.toString();
    cartItem
};

export const updateCartItems = () => {
  const courseInCart = JSON.parse(localStorage.getItem("cart"));
  if (courseInCart) {
    document.querySelector("#cartItem").textContent =
      courseInCart.length.toString();
  }
};

export const getCartItems = () => {
  const courseInCart = JSON.parse(localStorage.getItem("cart")) ?? [];
  return courseInCart;
};

export const clearCartItems = () => {
  localStorage.removeItem("cart");
  document.querySelector("#cartItem").textContent = "0";
};
