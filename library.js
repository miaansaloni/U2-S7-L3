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

    // DOM Manipulation
    const bookList = document.getElementById("book-list");

    booksData.forEach((book) => {
      const col = document.createElement("div");
      col.classList.add("col-lg-3", "col-md-4", "col-sm-6", "mb-4");

      const card = document.createElement("div");
      card.classList.add("card", "h-100");

      const img = document.createElement("img");
      img.src = book.img;
      img.classList.add("card-img-top");
      img.alt = book.title;

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

      cardBody.appendChild(title);
      cardBody.appendChild(price);
      cardBody.appendChild(discardBtn);

      card.appendChild(img);
      card.appendChild(cardBody);

      col.appendChild(card);
      bookList.appendChild(col);
    });
  })
  .catch((error) => {
    console.error("Error:", error);
  });
