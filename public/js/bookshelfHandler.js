// function to check if a book is in the database and add it if it is not
export async function addBook(event) {
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
    // return the book id from the data
    return data.id;
  }
}

// function to get a user's id
export async function getUserId() {
  // get the user's id
  const response = await fetch("/api/user/get-id");
  const userData = await response.json();

  return userData.userID;
}

// function to get a user's bookshelf
export async function getBookshelf(userId) {
  // get the user's bookshelf using userID in the req params
  const response = await fetch(`/api/bookshelf/user/${userId}`);
  const bookshelfData = await response.json();
  // return the bookshelf object
  const bookshelfObj = bookshelfData[0];
  // get bookshelf_content from the bookshelf object
  const bookshelfContent = bookshelfObj.bookshelf_content;
  // if the bookshelf length is 0, set it to an empty array
  if (bookshelfContent.length === 0) {
    const bookIds = [];
    return bookIds;
  } else {
    // make an array of the book ids in the bookshelf
    const bookIds = bookshelfContent.split(",");
    return bookIds;
  }
}

// function to check if a user is logged in
export async function checkLogin() {
  // get the user's id
  const response = await fetch("/api/user/get-id");
  const userData = await response.json();
  // if the user is not logged in, redirect to the login page
  if (!userData.userID) {
    window.location.replace("/login");
  }
}
