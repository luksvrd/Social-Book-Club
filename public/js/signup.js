const signupFormHandler = async (event) => {
  event.preventDefault();

  console.log("sign up form was called");

  const nameEl = document.querySelector("#name-signup").value.trim();
  const emailEl = document.querySelector("#email-signup").value.trim();
  const passwordEl = document.querySelector("#password-signup").value.trim();

  if (nameEl && emailEl && passwordEl) {
    const response = await fetch("/api/user", {
      method: "POST",
      body: JSON.stringify({
        name: nameEl,
        email: emailEl,
        password: passwordEl,
      }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/profile");
    } else {
      alert(response.statusText);
    }
  }
};

document
  .querySelector("#signup-btn")
  .addEventListener("submit", signupFormHandler);
