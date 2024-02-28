document.addEventListener("DOMContentLoaded", () => {
  const cart = getCartFromStorage();
  renderCart(cart);
  fetchBooks();
});

function getCartFromStorage() {
  return JSON.parse(localStorage.getItem("cart"));
}

function updateCartInStorage(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function renderCart(cart) {
  const cartElement = document.getElementById("cart");
  cartElement.innerHTML = "";
  cart.forEach((item, i) => {
    const listItem = document.createElement("li");
    listItem.classList.add("dropdown-item", "d-flex", "justify-content-between", "align-items-center");
    listItem.innerText = `${item.title} - $${item.price}`;

    const removeBtn = document.createElement("button");
    removeBtn.classList.add("btn", "btn-danger", "btn-sm");
    removeBtn.innerText = "Remove";
    removeBtn.addEventListener("click", () => {
      cart.splice(i, 1);
      updateCartInStorage(cart);
      renderCart(cart);
    });

    listItem.appendChild(removeBtn);
    cartElement.appendChild(listItem);
  });
}

function fetchBooks() {
  fetch("https://striveschool-api.herokuapp.com/books")
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Errore nella richiesta HTTP");
      }
    })
    .then((booksData) => {
      console.log("BOOKSDATA", booksData);

      const bookList = document.getElementById("book-list");

      booksData.forEach((book) => {
        const col = document.createElement("div");
        col.classList.add("col-lg-3", "col-md-4", "col-sm-6", "mb-4");

        const card = document.createElement("div");
        card.classList.add("card");

        const img = document.createElement("img");
        img.src = book.img;
        img.classList.add("card-img-top");
        img.style = "height: 450px; object-fit:cover";

        const cardBody = document.createElement("div");
        cardBody.classList.add("card-body", "text-center");

        const title = document.createElement("h6");
        title.classList.add("card-title");
        title.innerText = book.title;

        const price = document.createElement("p");
        price.classList.add("card-text");
        price.innerText = `Price $${book.price}`;

        const discardBtn = document.createElement("button");
        discardBtn.classList.add("btn", "btn-danger");
        discardBtn.innerText = "Discard";
        discardBtn.addEventListener("click", () => {
          col.remove();
        });

        const buyBtn = document.createElement("button");
        buyBtn.classList.add("btn", "btn-primary");
        buyBtn.innerText = "Add to cart";
        buyBtn.addEventListener("click", () => {
          addToCart(book);
        });

        cardBody.appendChild(title);
        cardBody.appendChild(price);
        cardBody.appendChild(discardBtn);
        cardBody.appendChild(buyBtn);

        card.appendChild(img);
        card.appendChild(cardBody);

        col.appendChild(card);
        bookList.appendChild(col);
      });
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function addToCart(book) {
  const cartItem = { title: book.title, price: book.price };
  const cart = getCartFromStorage();
  cart.push(cartItem);
  updateCartInStorage(cart);
  renderCart(cart);
}
