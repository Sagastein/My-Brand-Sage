async function handleSubmit() {
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
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const subject = document.getElementById("subject").value;
    const message = document.getElementById("message").value;

    const newMessage = {
      name,
      email,
      subject,
      message,
    };

    try {
      showLoading();
      const response = await fetch(
        "https://my-brand-bankend.onrender.com/api/v1/messages",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newMessage),
        }
      );

      const data = await response.json();

      if (response.ok) {
        // Message sent successfully
        console.log("Form Submitted Successfully");
        document.getElementsByTagName("form")[0].reset();
        swal({
          title: "Well Done",
          text: data.message || "Sent message successfully",
          icon: "success",
          button: "Done",
        });
      } else {
        // Error sending message
        swal({
          title: "Error",
          text: data.message || "Failed to send message",
          icon: "error",
          button: "Try again",
        });
      }
    } catch (error) {
      swal({
        title: "Error",
        text: "An error occurred while sending the message. Please try again later.",
        icon: "error",
        button: "OK",
      });
    } finally {
      hideLoading();
    }
  }

  return false;
}
function showLoading() {
  const loginBtn = document.getElementById("send-message");
  loginBtn.disabled = true;
  loginBtn.innerHTML = "Loading...";
}

function hideLoading() {
  const loginBtn = document.getElementById("send-message");
  loginBtn.disabled = false;
  loginBtn.innerHTML = "LETS CONNECT";
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


async function fetchBlogs() {
  try {
    // Show loading indicator
    console.log("loading");

    const response = await fetch(
      "https://my-brand-bankend.onrender.com/api/v1/blogs"
    );
    const data = await response.json();

    if (response.ok) {
      console.log(data);
      displayBlogs(data);
    } else {
      // Handle error
      swal({
        title: "Error",
        text: data.message || "Failed to fetch blogs",
        icon: "error",
        button: "Try again",
      });
    }
  } catch (error) {
    // Handle network errors or other exceptions
    swal({
      title: "Error",
      text: "An error occurred while fetching blogs. Please try again later.",
      icon: "error",
      button: "OK",
    });
  } finally {
    // Hide loading indicator
    console.log("done");
  }
}

function displayBlogs(blogs) {
  const blogContainer = document.querySelector(".blog-cards");
  blogContainer.innerHTML = "";

  blogs.forEach((blog) => {
    const blogCard = document.createElement("div");
    blogCard.classList.add("blog-card");
    blogCard.innerHTML = `
      <div class="like">
        <i id="like-icon" class="fa-solid fa-xl fa-heart"></i>
        <span id="like-count">${blog.likes.length}</span>
      </div>
      <img src="${blog.image}" alt="blog-image" />
      <h3>${blog.title}</h3>
      <p>${blog.content.slice(0, 50) + "..."}</p>
      <article>
        <span>${new Date(blog.createdAt).toLocaleDateString()}</span>
        <a id="read-more-link" href="/blog/blog-detail.html?blogId=${
          blog._id
        }">Read more</a>
      </article>
    `;
    blogContainer.appendChild(blogCard);
  });
}

fetchBlogs();

const urlParams = new URLSearchParams(window.location.search);
const blogId = urlParams.get("blogId");
console.log("blog id", blogId);

let blogs = localStorage.getItem("blogs")
  ? JSON.parse(localStorage.getItem("blogs"))
  : [];

const blog = blogs.find((b) => b.uuid === blogId);


