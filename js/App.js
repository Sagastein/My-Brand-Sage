// function handleSubmit() {
//   var name = document.getElementById("name");
//   var email = document.getElementById("email");
//   var subject = document.getElementById("subject");
//   var message = document.getElementById("message");
//   var isValid = true;
//   if (name.value === "") {
//     isValid = false;
//     name.nextElementSibling.innerHTML = "Name is required";
//   }
//   if (email.value === "" || email.value.indexOf("@") === -1) {
//     isValid = false;
//     email.nextElementSibling.innerHTML = "Email must be valid";
//   }
//   if (subject.value === "") {
//     isValid = false;
//     subject.nextElementSibling.innerHTML = "Subject is required";
//   }
//   if (message.value === "") {
//     isValid = false;
//     message.nextElementSibling.innerHTML = "Message is required";

//     const date = new Date();
//     const formattedTime = date.toLocaleTimeString([], {
//       hour: "2-digit",
//       minute: "2-digit",
//     });
//     if (isValid)
//       //get element by tagname form and reset it to empty
//       document.getElementsByTagName("form")[0].reset();

//     alert("Form Submitted Successfully");
//   }
//   return false;
// }

function handleSubmit() {
  // Prevent default form submission behavior

  const name = document.getElementById("name");
  const email = document.getElementById("email");
  const subject = document.getElementById("subject");
  const message = document.getElementById("message");

  let isValid = true;

  // Clear existing error messages:
  const errorSpans = document.querySelectorAll(".error-message");
  errorSpans.forEach((span) => (span.textContent = ""));

  // On-key validation with real-time error messages:
  const validateField = (element) => {
    const errorMessageSpan = element.nextElementSibling;
    let errorMessage = "";

    switch (element) {
      case name:
        if (!name.value) {
          errorMessage = "Name is required";
        }
        break;
      case email:
        if (!email.value) {
          errorMessage = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(email.value)) {
          errorMessage = "Invalid email format";
        }
        break;
      case subject:
        if (!subject.value) {
          errorMessage = "Subject is required";
        }
        break;
      case message:
        if (!message.value) {
          errorMessage = "Message is required";
        }
        break;
    }

    errorMessageSpan.textContent = errorMessage;
    isValid = errorMessage === "";
  };

  validateField(name);
  name.onkeyup = () => validateField(name);
  validateField(email);
  email.onkeyup = () => validateField(email);
  validateField(subject);
  subject.onkeyup = () => validateField(subject);
  validateField(message);
  message.onkeyup = () => validateField(message);
  const date = new Date();
  const formattedTime = date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  if (isValid) {
    let newMessage = {
      uuid: Math.random().toString(36).substr(2, 9),
      name: name.value,
      email: email.value,
      subject: subject.value,
      message: message.value,
      time: formattedTime,
    };
    console.log("Form Submitted Successfully");
    document.getElementsByTagName("form")[0].reset();
    let messages = [];
    let storedMessages = JSON.parse(localStorage.getItem("messages"));
    if (storedMessages) {
      messages = storedMessages;
    }
    messages.push(newMessage);
    localStorage.setItem("messages", JSON.stringify(messages));
    swal({
      title: "Well Done",
      text: "Sent message successfully",
      icon: "success",
      button: "Done",
    });
  }

  return false; // Not strictly necessary after `event.preventDefault()`, but avoids potential issues
}

var likeButtons = document.querySelectorAll(".like");
console.log(likeButtons);
// use class name of like because they are many and get children i element make color of red
// like.forEach(function (like) {
//   like.addEventListener("click", function (e) {
//     e.preventDefault();
//     console.log("like clicked");
//     //counter is a span inside  click element
//     var counter = like.querySelector("span");
//     var heart = like.querySelector("i");
//     counter.innerHTML++;
//     heart.style.color = "red";
//     like.disabled = true;
//   });
// });
likeButtons.forEach(function (likeButton) {
  likeButton.addEventListener("click", function (e) {
    e.preventDefault();

    // Parse `auth` string (assuming JSON format):
    let authObject;
    try {
      authObject = JSON.parse(localStorage.getItem("auth"));
    } catch (error) {
      console.error("Error parsing auth data:", error);
      return; // Prevent further execution if parsing fails
    }

    const email = authObject && authObject.email ? authObject.email : "";

    if (email) {
      // User is authenticated: Proceed with liking
      console.log("Liking content as authenticated user:", email);

      // Your original like functionality here:
      const counter = likeButton.querySelector("span");
      const heart = likeButton.querySelector("i");
      counter.innerHTML++;
      heart.style.color = "red";
      likeButton.disabled = true;
    } else {
      // User is not authenticated: Redirect to login
      console.log("User not authenticated. Redirecting to login.");
      window.location.href = "../auth/Login.html"; // Replace with your actual login page URL
    }
  });
});
// toggle navbar show and hide on  click hamburger icon
document
  .querySelector("#hamburger-icon")
  .addEventListener("click", function () {
    console.log("humber clicked");
    document.querySelector(".nav-links").classList.toggle("show");
  });

// Retrieve blog data from LocalStorage
const storedBlogs = JSON.parse(localStorage.getItem("blogs")) || [];

// // Reference the main container where blog cards will be added
// console.log(storedBlogs);
// const blogContainer = document.querySelector(".blog-cards");

// // Iterate through each blog entry and create a card
// storedBlogs.forEach((blog) => {
//   const blogCard = document.createElement("div");
//   blogCard.classList.add("blog-card");

//   blogCard.innerHTML = `
//     <div class="like">
//       <i class="fa-solid fa-2xl fa-heart"></i> <span>${blog.likes || 0}</span>
//     </div>
//     <img src="${blog.image}" alt="blog-image" />
//     <h3>${blog.title}</h3>
//     <p>${blog.content}</p>
//     <article>
//       <span>${blog.createdAt}</span>
//       <a href="./blog-detail.html">Read more</a>
//     </article>
//   `;

//   // Append the blog card to the container
//   blogContainer.appendChild(blogCard);
// });

function displayPage(pageNumber) {
  const itemsPerPage = 5; // Adjust as needed
  const startIndex = (pageNumber - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  let blogData = JSON.parse(localStorage.getItem("blogs")) || [];
  const blogContainer = document.querySelector(".blog-cards");
  blogContainer.innerHTML = ""; // Clear existing content

  for (let i = startIndex; i < endIndex && i < blogData.length; i++) {
    const blog = blogData[i];
    const blogCard = document.createElement("div");
    blogCard.classList.add("blog-card");
    blogCard.innerHTML = `
          <div class="like">
            <i class="fa-solid fa-2xl fa-heart"></i> <span>${
              blog.likes || 0
            }</span>
          </div>
          <img src="${blog.image}" alt="blog-image" />
          <h3>${blog.title}</h3>
          <p>
           ${blog.content.slice(0, 50) + "..."}
          </p>
          <article>
            <span>${blog.createdAt}</span>
            <a href="blog/blog-detail.html?blogId=${blog.uuid}">Read more</a>
          </article>
  `;
    blogContainer.appendChild(blogCard);
  }
}
displayPage(1);

const paginationLinks = document.querySelectorAll(".pagination a");
paginationLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    const pageNumber = parseInt(link.textContent);
    displayPage(pageNumber);
  });
});

const urlParams = new URLSearchParams(window.location.search);
const blogId = urlParams.get("blogId");
console.log("blog id", blogId);
