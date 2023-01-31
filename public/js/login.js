const loginFormHandler = async function (event) {
  event.preventDefault();

  // Collect values from the login form
  const emailEl = document.querySelector("#email-login").value.trim();
  const passwordEl = document.querySelector("#password-login").value.trim();

  if (emailEl && passwordEl) {
    // Send a POST request to the API endpoint
    const response = await fetch("/api/user/login", {
      method: "POST",
      body: JSON.stringify({ email: emailEl, password: passwordEl }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      // If successful, redirect the browser to the profile page
      document.location.replace("/profile");
    } else {
      alert(response.statusText);
    }
  }
};

document
  .querySelector("#login-btn")
  .addEventListener("submit", loginFormHandler);
