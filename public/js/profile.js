import { getBookshelf, getUserId } from "./bookshelfHandler.js";
const button = document.getElementById("render-bs");
// If

button.addEventListener("click", async () => {
  const userId = await getUserId();
  const bookshelf = await getBookshelf(userId);
  console.log(bookshelf);

  // itterate through the array with a for loop and make a call to the satabase for each book
  // then render the books
  // const bookshelfContainer = document.getElementById("bookshelf-list");

  for (let i = 0; i < bookshelf.length; i++) {
    // call to the database through the api
    const bookId = bookshelf[i];
    console.log(bookId);
    const response = await fetch(`/api/books/${bookId}`);
    const book = await response.json();
    console.log(book);
    // render the book
    const bookshelfContainer = document.getElementById("bookshelf-list");
    const title = await book.title;
    const author = await book.author;
    const cover =
      await `https://covers.openlibrary.org/b/isbn/${book.isbn}-L.jpg`;

    const card = document.createElement("div");
    card.classList.add("card", "border-sm", "border-black");
    card.innerHTML = `
        <img src="${cover}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${title}</h5>
          <h5 class="card-subtitle mb-2 text-muted">${author}</h5>
        </div>
      `;
    bookshelfContainer.appendChild(card);
  }
});
