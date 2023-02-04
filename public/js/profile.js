// const { Bookshelf } = require("../../models");
// const { User } = require("../../models");
// const { Book } = require("../../models");
//  Get the user _id from our database and through that access their bookshelf

// GET user_id -> GET bookshelf contents->
// const bookshelfHandler = async function (event) {
//   event.preventDefault();

//   console.log("Bookshelf btn was clicked");

//   const response = await fetch("/api/bookshelf/", {
//     method: "GET",
//     headers: { "Content-Type": "application/json" },
//   });

//   if (response.ok) {
//     console.log(response);
//     // If successful, redirect the browser to the profile page
//     const bookshelf = await response.json();
//     const contents = bookshelf.bookshelf_contents;
//     const bookshelfArray = contents.split(",");
//     console.log(bookshelfArray);
//   } else {
//     alert(response.statusText);
//   }
// };

// // Add event listener to load the html
// document.addEventListener("DOMContentLoaded", bookshelfHandler);
// document
//   .querySelector("#render-bs")
//   .addEventListener("submit", bookshelfHandler);

// stringify -> arrayFrom(string)->
// iterate over array making calls to our database for the books->
// generate cards from that data
// When lookingfor img ling its in the search.js file

// Request user form our db & Access their bookshelf
// GET user_id ->

const button = document.getElementById("render-bs");

async function getUserId() {
  // make a call to api/user/get-id
  // return the user id
  const response = await fetch("/api/user/get-id");
  const userData = await response.json();
  return userData.userID;
}

async function queryBookshelf(userId) {
  // Query the database for the user's bookshelf
  const response = await fetch(`/api/bookshelf/${userId}`);
  const bookshelf = await response.json();
  return bookshelf;
}

async function queryBooks(bookshelf) {
  // Query the database for the books in the user's bookshelf
  const response = await fetch(`/api/books?bookshelfId=${bookshelf.id}`);
  const books = await response.json();
  return books;
}

button.addEventListener("click", async () => {
  // Get the user ID from your authentication system which is stored in the session cookie
  // getUserID() need to be ca
  // const userId = getUserId(); // Get the user ID from your authentication system
  const bookshelf = await queryBookshelf(getUserId); // Query the database for the user's bookshelf
  const books = await queryBooks(bookshelf); // Query the database for the books in the user's bookshelf

  // Generate the bookshelf in the front end
  const bookshelfContainer = document.getElementById("render-bs");
  books.forEach((book) => {
    const bookElement = document.createElement("div");
    bookElement.innerHTML = book.title;
    bookshelfContainer.appendChild(bookElement);
  });
});
