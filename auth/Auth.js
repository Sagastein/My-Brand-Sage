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
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    console.log(email, password);

    var users = JSON.parse(localStorage.getItem("users")) || [];
    var user = users.find(function (user) {
      return user.email === email && user.password === password;
    });
    if (user) {
      localStorage.setItem("auth", JSON.stringify(user));
      navigateToDashboard();
    } else {
      swal({
        title: "Invalid credentials",
        text: "Please enter a valid email and password",
        icon: "error",
        button: "Try again",
      });
    }
  }
});

window.addEventListener("load", function () {
  const loader = document.getElementById("loading-wrapper");
  setTimeout(() => {
    loader.style.opacity = 0;
    setTimeout(() => {
      loader.style.display = "none";
    }, 1000);
  }, 1000);
});
