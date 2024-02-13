function navigateToDashboard() {
  window.location.href = "../admin/index.html";
}
document.getElementById("login-form").addEventListener("submit", function (e) {
  e.preventDefault();

  var email = document.getElementById("email");
  var password = document.getElementById("password");

  var isValid = true;
  var numbers = /^[0-9]+$/;
  var letters = /^[A-Za-z]+$/;

  // Email validation
  if (email.value.trim() === "" || !email.value.includes("@")) {
    isValid = false;
    email.classList.add("error");
    email.nextElementSibling.textContent = "Enter a valid email address";
  } else {
    email.classList.remove("error");
    email.nextElementSibling.textContent = "";
  }
  if (password.value.trim() === "") {
    isValid = false;
    password.classList.add("error");
    password.nextElementSibling.textContent = "Password is required";
  }

  password.onkeyup = function () {
    console.log(password);
    if (password.value.trim() === "") {
      isValid = false;
      password.classList.add("error");
      password.nextElementSibling.textContent = "Password is required";
    } else if (password.value.trim().length < 8) {
      isValid = false;
      password.classList.add("error");
      password.nextElementSibling.textContent =
        "Password must be at least 8 characters";
    } else if (password.value.match(numbers)) {
      isValid = false;
      password.classList.add("error");
      password.nextElementSibling.textContent = "Password must contain letters";
    } else if (password.value.match(letters)) {
      isValid = false;
      password.classList.add("error");
      password.nextElementSibling.textContent = "Password must contain numbers";
    } else {
      password.classList.remove("error");
      password.nextElementSibling.textContent = "";
    }
  };

  if (isValid) {
    // If form is valid, you can submit it here
    console.log("Form is valid");
    // You can call your navigateToDashboard function here if the form is valid
    navigateToDashboard();
  }
});

function handleSignUp() {
  console.log("Sign up form submitted");
  
}
  window.addEventListener("load", function () {
    const loader = document.getElementById("loading-wrapper");
    setTimeout(() => {
      loader.style.opacity = 0;
      setTimeout(() => {
        loader.style.display = "none";
      }, 1000);
    }, 1000);
  });