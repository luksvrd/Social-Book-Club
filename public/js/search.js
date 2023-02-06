import { addBook, getBookshelf, getUserId } from "./bookshelfHandler.js";

// function to add the book to a bookshelf
const addToBookshelf = async (event) => {
  // call the addBook function to add the book to the database
  const book = await addBook(event);

  // get the user's id
  const userId = await getUserId();

  // use the userID to get the user's bookshelf
  const bookshelf = await getBookshelf(userId);

  // push the book id to the bookshelf array
  bookshelf.push(book);

  // join the bookshelf array into a string
  const bookshelfString = bookshelf.join(",");

  // update the bookshelf in the database
  const response = await fetch(`/api/bookshelf/user/${userId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ bookshelf_content: bookshelfString }),
  });
  const bookshelfData = await response.json();
  console.log(bookshelfData);

  // remove the add to bookshelf button
  event.target.parentNode.removeChild(event.target);
};

// form submit event listener to get search parameters and make a request to openlibrary.org
document
  .getElementById("search-form")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    // clear the search results container
    document.getElementById("search-results").innerHTML = "";

    // add a loading spinner
    const spinner = document.createElement("div");
    spinner.classList.add("spinner-border");
    spinner.setAttribute("role", "status");
    spinner.innerHTML = `
      <span class="visually-hidden">Loading...</span>
    `;
    document.getElementById("search-results").appendChild(spinner);

    // base url for openlibrary.org
    const OpenLibBaseURL = "https://openlibrary.org/search.json?";

    // get search parameters from the search bar fields
    const title = document.getElementById("book-name").value.trim();
    const author = document.getElementById("author").value.trim();

    // build the url for the request based on not null search parameters
    let url = OpenLibBaseURL;
    if (title && !author) {
      url += `title=${title}`;
    }
    if (author && !title) {
      url += `author=${author}`;
    }
    if (title && author) {
      url += `title=${title}` + `&author=${author}`;
    }

    // fetch request to openlibrary.org
    const response = await fetch(url);
    const data = await response.json();

    // create book object from the first 10 results
    for (let i = 0; i < 10; i++) {
      // book object
      const book = {
        title: data.docs[i].title,
        author: data.docs[i].author_name[0],
        isbn: data.docs[i].isbn[0],
        cover: `https://covers.openlibrary.org/b/isbn/${data.docs[i].isbn[0]}-M.jpg`,
      };
      // create a card for each book
      const card = document.createElement("div");
      card.classList.add("card", "gap-y-2", "border-sm", "border-black");
      card.innerHTML = `
<div class="grid grid-cols-2 gap-4 max-w-sm bg-gradient-to-r from-orange-100 to-orange-200 border border-black rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 m-1">
    <img class="p-4 rounded-t-lg" src="${book.cover}" alt="" />
</a>
<div class="p-5 grid grid-flow-row auto-rows-max">
    <p class="card-title mb-3 font-bold text-gray-700 dark:text-gray-400">${book.title}</p>
    <p class="card-subtitle inline-flex items-center p-2 text-sm font-medium text-center text-gray-700">${book.author}</p>
    <p class=" card-text hidden items-center p-2 text-sm font-medium text-center text-gray-700">${book.isbn}</p>
    <button class="card-button inline-flex items-center p-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
    Add to Bookshelf </button>
</div>
</div>`;
      // add events to the card buttons
      card
        .querySelector(".card-button")
        .addEventListener("click", addToBookshelf);

      // append the cards to the search results container
      document.getElementById("search-results").appendChild(card);
    }

    // remove the loading spinner
    document.getElementById("search-results").removeChild(spinner);

    // clear the search bar fields
    document.getElementById("book-name").value = "";
    document.getElementById("author").value = "";
  });
