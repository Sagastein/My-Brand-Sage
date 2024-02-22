function handleSubmit() {
  const name = document.getElementById("name");
  const email = document.getElementById("email");
  const subject = document.getElementById("subject");
  const message = document.getElementById("message");
  let isValid = true;
  const errorSpans = document.querySelectorAll(".error-message");
  errorSpans.forEach((span) => (span.textContent = ""));
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

  return false;
}
var likeButtons = document.querySelectorAll(".like");
console.log(likeButtons);
likeButtons.forEach(function (likeButton) {
  likeButton.addEventListener("click", function (e) {
    e.preventDefault();
    let authObject;
    try {
      authObject = JSON.parse(localStorage.getItem("auth"));
    } catch (error) {
      console.error("Error parsing auth data:", error);
      return;
    }
    const email = authObject && authObject.email ? authObject.email : "";
    if (email) {
      console.log("Liking content as authenticated user:", email);
      const counter = likeButton.querySelector("span");
      const heart = likeButton.querySelector("i");
      counter.innerHTML++;
      heart.style.color = "red";
      likeButton.disabled = true;
    } else {
      console.log("User not authenticated. Redirecting to login.");
      window.location.href = "../auth/Login.html";
    }
  });
});

document
  .querySelector("#hamburger-icon")
  .addEventListener("click", function () {
    console.log("humber clicked");
    document.querySelector(".nav-links").classList.toggle("show");
  });

function displayPage(pageNumber) {
  const itemsPerPage = 5;
  const startIndex = (pageNumber - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  let blogData = JSON.parse(localStorage.getItem("blogs")) || [];
  const blogContainer = document.querySelector(".blog-cards");
  blogContainer.innerHTML = "";

  for (let i = startIndex; i < endIndex && i < blogData.length; i++) {
    const blog = blogData[i];
    const blogCard = document.createElement("div");
    blogCard.classList.add("blog-card");
    blogCard.innerHTML = `
          <div class="like">
  <i id="like-icon" class="fa-solid fa-xl fa-heart"></i>
  <span id="like-count">${blog.likes.length}</span>
</div>
          <img src="${blog.image}" alt="blog-image" />
          <h3>${blog.title}</h3>
          <p>
           ${blog.content.slice(0, 50) + "..."}
          </p>
          <article>
            <span>${blog.createdAt}</span>
            <a id="read-more-link" href="/blog/blog-detail.html?blogId=${
              blog.uuid
            }">Read more</a>
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

let blogs = localStorage.getItem("blogs")
  ? JSON.parse(localStorage.getItem("blogs"))
  : [];

const blog = blogs.find((b) => b.uuid === blogId);

if (!blog?.readCount) {
  blog.readCount = 0;
}

const readCountElement = document.createElement("div");
readCountElement.textContent = blog?.readCount;
const readMoreLink = document.getElementById("read-more-link");

readMoreLink.addEventListener("click", () => {
  blog.readCount++;
  readCountElement.textContent = blog?.readCount;
  localStorage.setItem("blogs", JSON.stringify(blogs));
});
