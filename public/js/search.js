// function to add a book to the database
const addBook = async (event) => {
  // get the book info from the card
  const book = {
    title: event.target.parentNode.querySelector(".card-title").textContent,
    author: event.target.parentNode.querySelector(".card-subtitle").textContent,
    isbn: event.target.parentNode.querySelector(".card-text").textContent,
  };

  // check if the book is already in the database by isbn
  const response = await fetch(`/api/books/isbn/${book.isbn}`);
  const data = await response.json();

  // if the book is not in the database, add it
  if (!data) {
    const response = await fetch("/api/books", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(book),
    });
    const bookData = await response.json();
    // return just the book id from the bookData
    return bookData.id;
  } else {
    console.log("Book already in database");
  }
};

// function to get a user's bookshelf
const getBookshelf = async (userId) => {
  // get the user's bookshelf
  const response = await fetch("/api/bookshelf");
  const bookshelfData = await response.json();
  // get only the bookshelf_contents from the bookshelfData
  const bookshelf = bookshelfData.bookshelf_contents;
  // turn the bookshelf_contents into an array
  const bookshelfArray = bookshelf.split(",");
  // return the bookshelf array
  return bookshelfArray;
};

// function to check if there is a user logged in
const getUserId = async () => {
  // get the user's id
  const response = await fetch("/api/user/get-id");
  const userData = await response.json();

  return userData.userID;
};

// function to add the book to a bookshelf
const addToBookshelf = async (event) => {
  // call the addBook function to add the book to the database
  const book = await addBook(event);
  console.log(book);

  // get the user's id
  const userId = await getUserId();
  console.log(userId);
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
      card.classList.add("card", "border-sm", "border-black");
      card.innerHTML = `
        <img src="${book.cover}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${book.title}</h5>
          <h5 class="card-subtitle mb-2 text-muted">${book.author}</h5>
          <p class="card-text"> ISBN: ${book.isbn}</p>
          <button class="card-button">
          Add to Bookshelf </button>
        </div>
      `;

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
