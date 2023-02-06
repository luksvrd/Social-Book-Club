import { getBookshelf, getUserId } from "./bookshelfHandler.js";
const button = document.getElementById("render-bs");

button.addEventListener("click", async () => {
  const userId = await getUserId();
  const bookshelf = await getBookshelf(userId);

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
    card.classList.add("card", "border-sm", "gap-y-2", "border-black");
    card.innerHTML = `<div class="grid grid-cols-2 gap-4 max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
<a href="#">
    <img class="p-4 rounded-t-lg" src="${cover}" alt="" />
</a>
<div class="p-2 grid grid-flow-row auto-rows-max">
    <p class="mb-3 font-bold text-gray-700 dark:text-gray-400">${title}</p>
    <p class="inline-flex items-center p-2 m-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">${author}</p>
    <button id="delete-book" class="inline-flex items-center p-2 m-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">Remove from Bookshelf</button>
</div>
</div>`;
    //   <img src="${cover}" class="card-img-top" alt="...">
    //   <div class="card-body">
    //     <h5 class="card-title">${title}</h5>
    //     <h5 class="card-subtitle mb-2 text-muted">${author}</h5>
    //   </div>
    // `
    bookshelfContainer.appendChild(card);
  }
});
