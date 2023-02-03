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
      card.classList.add("card");
      card.innerHTML = `
        <img src="${book.cover}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${book.title}</h5>
          <h6 class="card-subtitle mb-2 text-muted">${book.author}</p>
          <p class="card-text"> ISBN: ${book.isbn}</p>
          <a class="btn btn-blue">Add to Bookshelf</a>
        </div>
      `;

      // append the cards to the search results container
      document.getElementById("search-results").appendChild(card);
    }

    // remove the loading spinner
    document.getElementById("search-results").removeChild(spinner);

    // clear the search bar fields
    document.getElementById("book-name").value = "";
    document.getElementById("author").value = "";
  });

// // function to add a book to the bookshelf
// function addToBookshelf() {
//   // get the book data from the card
//   const book = {
//     title: this.parentElement.children[1].children[0].innerText,
//     author: this.parentElement.children[1].children[1].innerText,
//     isbn: this.parentElement.children[1].children[2].innerText,
//   };

//   // create a new book object
//   const newBook = new Book(book.title, book.author, book.isbn);

//   // create a loading spinner
//   const spinner = document.createElement("div");
//   spinner.classList.add("spinner-border");
//   spinner.setAttribute("role", "status");
//   spinner.innerHTML = `
//     <span class="visually-hidden">Loading...</span>
//   `;
//   this.parentElement.appendChild(spinner);

//   // send book to "/api/books" route with a check by isbn to see if it already exists
//   fetch("/api/books", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(newBook),
//   })
//     .then((response) => response.json())
//     .then((data) => {
//       // if the book already exists, display a message
//       if (data.message) {
//         alert(data.message);
//       } else {
//         // if the book doesn't exist, save it to the database and display a message
//         alert("Book added to bookshelf!");
//       }
//     })
//     .catch((error) => {
//       console.error("Error:", error);
//     });

//   // get book_id of new book from the database
//   fetch("/api/books", {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//     },
//   })
//     .then((response) => response.json())
//     .then((data) => {
//       // get the book_id of the book that was just added
//       const book_id = data[data.length - 1].book_id;
//       // create a new bookshelf object
//       const newBookshelf = new Bookshelf(book_id, 1);
//       // add to user's bookshelf in the database using the book_id
//       fetch("/api/bookshelf", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(newBookshelf),
//       })
//         .then((response) => response.json())
//         .then((data) => {
//           console.log(data);
//         })
//         .catch((error) => {
//           console.error("Error:", error);
//         });
//     })
//     .catch((error) => {
//       console.error("Error:", error);
//     });

//   // remove the loading spinner
//   this.parentElement.removeChild(spinner);

//   // remove the add to bookshelf button
//   this.remove();
// }

// // add event listener to the add to bookshelf button
// document.querySelectorAll(".btn-blue").forEach((button) => {
//   button.addEventListener("click", addToBookshelf);
// });
