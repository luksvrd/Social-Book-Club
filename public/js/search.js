// function to add a book to the bookshelf
const addToBookshelf = async (event) => {
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
  if (data === null) {
    const response = await fetch("/api/books", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(book),
    });
    const data = await response.json();
    console.log(data);
  } else {
    // if the book is already in the database, do nothing
    console.log("Book already in database");
  }
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
