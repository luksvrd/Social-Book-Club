// array to store search results
const searchResults = [];

// form submit event listener to get search parameters and make a request to openlibrary.org
document
  .getElementById("search-form")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

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
      };
      // push book object to searchResults array
      searchResults.push(book);
    }
  });
