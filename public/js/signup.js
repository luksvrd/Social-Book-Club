import { getUserId } from "./bookshelfHandler.js";

// This is the code that runs when the page loads
const signupFormHandler = async (event) => {
  event.preventDefault();

  console.log("sign up form was called");

  const nameEl = document.querySelector("#name-signup").value.trim();
  const emailEl = document.querySelector("#email-signup").value.trim();
  const passwordEl = document.querySelector("#password-signup").value.trim();

  if (nameEl && emailEl && passwordEl) {
    const response = await fetch("/api/user/signup", {
      method: "POST",
      body: JSON.stringify({
        name: nameEl,
        email: emailEl,
        password: passwordEl,
      }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      // get the user's id
      const userId = await getUserId();
      // make a bookshelf for the user
      const response = await fetch("/api/bookshelf", {
        method: "POST",
        body: JSON.stringify({
          user_id: userId,
          bookshelf_name: "My Bookshelf",
          bookshelf_content: "",
        }),
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) {
        console.log("bookshelf created");
      }
      document.location.replace("/profile");
    } else {
      alert(response.statusText);
    }
  }
};
// This selects the entire form element and adds an event listener to it.
document
  .querySelector("#signup-form")
  .addEventListener("submit", signupFormHandler);
