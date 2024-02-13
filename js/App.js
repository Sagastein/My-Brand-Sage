function handleSubmit() {
  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var subject = document.getElementById("subject").value;
  var message = document.getElementById("message").value;
  let error = document.getElementById("error-messages");

  document.getElementById("name").onchange = function () {
    if (name === "") {
      error.innerHTML = "<p>Name is required</p>";
    }
    error.innerHTML = "";
  };
  document.getElementById("email").onchange = function () {
    error.innerHTML = "";
  };
  document.getElementById("subject").onchange = function () {
    error.innerHTML = "";
  };
  document.getElementById("message").onchange = function () {
    error.innerHTML = "";
  };

  error.innerHTML = "";
  if (name === "") {
    error.innerHTML += "<p>Name is required</p>";
  }
  if (email === "") {
    error.innerHTML += "<p>Email is required</p>";
  }
  //handle invalid email
  if (email !== "") {
    var Athos = email.indexOf("@");
    var topos = email.lastIndexOf(".");
    if (Athos < 1 || topos < Athos + 2 || topos + 2 >= email.length) {
      error.innerHTML += "<p>Invalid Email</p>";
    }
  }

  if (subject === "") {
    error.innerHTML += "<p>Subject is required</p>";
  }
  if (message === "") {
    error.innerHTML += "<p>Message is required</p>";
  }
  if (error.innerHTML === "") {
    alert("Form Submitted Successfully");
  }
  return false;
}

//get element by id like then on click on it get element by id counter and increment the value by one then disable the like element
// Path: js/App.js

var like = document.querySelectorAll(".like");
console.log(like);
// use class name of like because they are many and get children i element make color of red
like.forEach(function (like) {
  like.addEventListener("click", function (e) {
    e.preventDefault();
    console.log("like clicked");
    //counter is a span inside  click element
    var counter = like.querySelector("span");
    var heart = like.querySelector("i");
    counter.innerHTML++;
    heart.style.color = "red";
    like.disabled = true;
  });
});
