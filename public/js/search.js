// pulls search paramaters from the search bar and performs a fetch request to openlibrary.org
const searchFormHandler = async (event) => {
  event.preventDefault();

  // base url for openlibrary.org
  const OpenLibBaseURL = "https://openlibrary.org/search.json?";

  // get search parameters from the search bar fields
  const title = document.querySelector("book-name").value.trim();
  const author = document.querySelector("author").value.trim();

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

  console.log(data);
};
