const loginFormHandler = async function (event) {
  event.preventDefault();

  // Collect values from the login form
  const emailEl = document.querySelector("#email-login").value.trim();
  const passwordEl = document.querySelector("#password-login").value.trim();
  console.log(emailEl, passwordEl);
  if (emailEl && passwordEl) {
    // Send a POST request to the API endpoint
    const response = await fetch("/api/user/login", {
      method: "POST",
      body: JSON.stringify({ email: emailEl, password: passwordEl }),
      headers: { "Content-Type": "application/json" },
    });
    // debugger;
    if (response.ok) {
      console.log(response);
      // If successful, redirect the browser to the profile page
      document.location.replace("/homepage/profile");
    } else {
      alert(response.statusText);
    }
  }
};

document
  .querySelector("#login-form")
  .addEventListener("submit", loginFormHandler);
