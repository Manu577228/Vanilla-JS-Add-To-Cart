const productGrid = document.querySelector(".product-grid");
const cartItems = document.querySelector(".cart-items");
const cartCount = document.querySelector(".cart-count");
const totalPrice = document.querySelector("#totalPrice");
const checkoutButton = document.getElementById("checkoutButton");

let cart = [];

const products = [
  {
    id: 1,
    name: "Men's T-Shirt",
    price: 1200,
    image: "images/tshirt.jpg",
  },
  { id: 2, name: "Tea Mug", price: 450, image: "images/mug.jpg" },
  { id: 3, name: "Hat", price: 1800, image: "images/hat.jpg" },
  {
    id: 4,
    name: "Women's T-Shirt",
    price: 780,
    image: "images/womens-tshirt.jpg",
  },
  { id: 5, name: "Sofa", price: 8800, image: "images/sofa.jpg" },
  { id: 6, name: "Watch", price: 6700, image: "images/watch.jpg" },
];

// Function to display products on the page
function displayProducts() {
  // Looping through the products, displaying them
  for (let i = 0; i < products.length; i += 3) {
    const row = document.createElement("div");
    row.classList.add("row");
    for (let j = i; j < i + 3 && j < products.length; j++) {
      const product = products[j];
      const productElement = document.createElement("div");
      productElement.classList.add("product");
      productElement.innerHTML = `
            <img src="${product.image}" alt="${product.name}" />
            <h3>${product.name}</h3>
            <p>₹${product.price.toFixed(2)}</p>
            <button data-product-id="${product.id}">Add to Cart</button>
            `;
      row.appendChild(productElement);
    }
    productGrid.appendChild(row);
  }
}

// Event Listener for adding products to the cart when the "Add to cart" button is clicked
productGrid.addEventListener("click", (event) => {
  if (event.target.tagName === "BUTTON") {
    const productId = parseInt(event.target.dataset.productId, 10);
    const product = products.find((p) => p.id === productId);
    addtocart(product);
  }
});

// Function to update the display of the cart
function addtocart(product) {
  const existingProduct = cart.find((p) => p.id === product.id);
  if (existingProduct) {
    existingProduct.quantity++;
  } else {
    product.quantity = 1;
    cart.push(product);
  }
  updateCartDisplay();
}

// Function to update the display of the cart
function updateCartDisplay() {
  cartItems.innerHTML = "";
  cartCount.textContent = cart.reduce(
    (total, product) => total + product.quantity,
    0
  );

  if (cart.length === 0) {
    cartItems.innerHTML = "<p>Your cart is empty</p>";
    totalPrice.textContent = "0.00";
    checkoutButton.disabled = true;
  } else {
    let total = 0;
    cart.forEach((product) => {
      const cartItem = document.createElement("div");
      cartItem.classList.add("cart-item");
      cartItem.innerHTML = `
        <img src="${product.image}" alt="${product.name}" />
        <div>
        <h3>${product.name}</h3>
    <p>Quantity: ${product.quantity}</p>
    <p>$${(product.price * product.quantity).toFixed(2)}</p>
        </div>
        <button data-product-id = "${product.id}">Remove</buuton>
        `;
      cartItems.appendChild(cartItem);
      total += product.price * product.quantity;
    });
    totalPrice.textContent = total.toFixed(2);
    checkoutButton.disabled = false;
  }
}

// Event Listener for removing products from the cart when the "Remove" button is clicked
cartItems.addEventListener("click", (event) => {
  if (event.target.tagName === "BUTTON") {
    const productId = parseInt(event.target.dataset.productId, 10);
    removeFromCart(productId);
  }
});

// function to remove a product from the cart
function removeFromCart(productId) {
  // removing the product from the cart Array
  const productIndex = cart.findIndex((p) => p.id === productId);
  if (productIndex !== -1) {
    cart.splice(productIndex, 1);
  }
  updateCartDisplay();
}

// event Listener for the checkout button
checkoutButton.addEventListener("click", () => {
  if (cart.length === 0) {
    alert("please add an item to the cart!");
  } else {
    alert("Thanks for your order!");
  }
});

displayProducts();
