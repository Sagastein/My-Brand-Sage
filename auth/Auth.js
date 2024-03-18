var url = "https://my-brand-bankend.onrender.com/api/v1";
function navigateToDashboard() {
  window.location.href = "../admin/index.html";
}
document
  .getElementById("login-form")
  .addEventListener("submit", async function (e) {
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
      hideLoading();
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
        password.nextElementSibling.textContent =
          "Password must contain letters";
      } else if (password.value.match(letters)) {
        isValid = false;
        password.classList.add("error");
        password.nextElementSibling.textContent =
          "Password must contain numbers";
      } else {
        password.classList.remove("error");
        password.nextElementSibling.textContent = "";
        hideLoading();
      }
    };
    showLoading();
    // if (isValid) {
    //   var email = document.getElementById("email").value;
    //   var password = document.getElementById("password").value;
    //   console.log(email, password);

    //   var users = JSON.parse(localStorage.getItem("users")) || [];
    //   var user = users.find(function (user) {
    //     return user.email === email && user.password === password;
    //   });
    //   if (!user) {
    //     swal({
    //       title: "Invalid credentials",
    //       text: "Please enter a valid email and password",
    //       icon: "error",
    //       button: "Try again",
    //     });
    //   } else if (user.role != "admin") {
    //     swal({
    //       title: "User Authenticated",
    //       text: "You have been authenticated successfully!",
    //       icon: "success",
    //       button: "Done",
    //     });
    //     localStorage.setItem("auth", JSON.stringify(user));
    //     window.location.href = "../index.html";
    //   } else {
    //     localStorage.setItem("auth", JSON.stringify(user));
    //     navigateToDashboard();
    //   }
    // }
    if (isValid) {
      try {
        console.log(email, password);
        const response = await fetch(
          "https://my-brand-bankend.onrender.com/api/v1/users/login",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: email.value,
              password: password.value,
            }),
          }
        );

        const data = await response.json();
        console.log(data);
        if (response.ok) {
          // Login successful
          if (data.user.role === "admin") {
            // Handle admin user
            localStorage.setItem("accessToken", data.accessToken);
            localStorage.setItem("auth", JSON.stringify(data.user));
            navigateToDashboard();
          } else {
            // Handle regular user
            swal({
              title: "User Authenticated",
              text: "You have been authenticated successfully!",
              icon: "success",
              button: "Done",
            });
            localStorage.setItem("accessToken", data.accessToken);
            localStorage.setItem("auth", JSON.stringify(data.user));
            window.location.href = "../index.html";
          }
        } else {
          // Login failed
          swal({
            title: "Invalid credentials",
            text: data.message || "Please enter a valid email and password",
            icon: "error",
            button: "Try again",
          });
        }
      } catch (error) {
        // Handle network errors or other exceptions
        swal({
          title: "Error",
          text: "An error occurred while logging in. Please try again later.",
          icon: "error",
          button: "OK",
        });
      } finally {
        // Hide loading indicator
        hideLoading();
      }
    }
  });
function showLoading() {
  const loginBtn = document.getElementById("login-btn");
  loginBtn.disabled = true;
  loginBtn.innerHTML = "Loading...";
  // You can also add a spinner or other loading indicator here
}

function hideLoading() {
  const loginBtn = document.getElementById("login-btn");
  loginBtn.disabled = false;
  loginBtn.innerHTML = "Login";
  // Remove any additional loading indicators added in showLoading
}
window.addEventListener("load", function () {
  const loader = document.getElementById("loading-wrapper");
  var auth = JSON.parse(localStorage.getItem("auth"));
  if (auth) {
    if (auth.role === "admin") {
      navigateToDashboard();
    } else {
      window.location.href = "../index.html";
    }
  }
  setTimeout(() => {
    loader.style.opacity = 0;
    setTimeout(() => {
      loader.style.display = "none";
    }, 1000);
  }, 1000);
});
