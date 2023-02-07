import { getBookshelf, getUserId } from "./bookshelfHandler.js";
const button = document.getElementById("render-bs");

async function deleteBook() {
  // get the book id from the card
  const bookId = this.parentElement.querySelector("p").innerText;

  // get the user id
  const userId = await getUserId();

  // get the user's bookshelf
  let bookshelf = await getBookshelf(userId);

  // remove the book id from the bookshelf array
  const bookshelfIndex = await bookshelf.indexOf(bookId);
  bookshelf.splice(bookshelfIndex, 1);

  // if the bookshelf is empty, set it to an empty string
  if (bookshelf.length === 0) {
    bookshelf = "";
  }
  if (bookshelf.length === 1) {
    bookshelf = bookshelf[0];
  } else {
    // join the bookshelf array into a string
    bookshelf = bookshelf.join(",");
  }

  // update the bookshelf in the database
  const response = await fetch(`/api/bookshelf/user/${userId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ bookshelf_content: bookshelf }),
  });
  const bookshelfData = await response.json();

  // get the full card and remove it from the page
  const card = this.parentElement.parentElement.parentElement;
  card.remove();
}

button.addEventListener("click", async () => {
  const userId = await getUserId();
  const bookshelf = await getBookshelf(userId);

  // clear the bookshelf list
  const bookshelfContainer = document.getElementById("bookshelf-list");
  bookshelfContainer.innerHTML = "";

  // loop through the bookshelf array and render each book
  for (let i = 0; i < bookshelf.length; i++) {
    // call to the database through the api
    const bookId = bookshelf[i];
    const response = await fetch(`/api/books/${bookId}`);
    const book = await response.json();
    // render the book
    const bookshelfContainer = document.getElementById("bookshelf-list");
    const title = await book.title;
    const author = await book.author;
    const cover =
      await `https://covers.openlibrary.org/b/isbn/${book.isbn}-L.jpg`;

    const card = document.createElement("div");
    card.classList.add(
      "card",
      "border-sm",
      "gap-y-2",
      "border-black",
      "border",
      "rounded-md",
      "m-2"
    );
    card.innerHTML = `<div class="grid grid-cols-2 gap-4 max-w-sm bg-gradient-to-r from-orange-100 to-orange-200 border border-black rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 p-1">
    <img class="p-4 rounded-t-lg" src="${cover}" alt="" />
<div class="p-2 grid grid-flow-row auto-rows-max">
    <p class="hidden">${bookId}</p>
    <p class="mb-3 font-bold text-gray-700 dark:text-gray-400">${title}</p>
    <p class="inline-flex items-center p-2 m-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">${author}</p>
    <button id="delete-book" class="card-button inline-flex items-center p-2 m-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">Remove from Bookshelf</button>
</div>
</div>`;
    // add events to the card buttons
    card.querySelector(".card-button").addEventListener("click", deleteBook);

    bookshelfContainer.appendChild(card);
  }
});
