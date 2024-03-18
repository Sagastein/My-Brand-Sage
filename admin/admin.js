const sidebar = document.getElementById("sidebar");
const content = document.getElementById("content");
const sections = content.querySelectorAll("section[id]");
console.log(sections);

sidebar.addEventListener("click", () => {
  sidebar.classList.toggle("closed");
});
console.log("started");
sidebar.addEventListener("click", (event) => {
  if (event.target.matches("a[data-section]")) {
    console.log("section link clicked");

    const links = sidebar.querySelectorAll("a[data-section]");
    links.forEach((link) => {
      link.parentElement.classList.remove("active-link");
    });
    event.target.parentElement.classList.add("active-link");
    if (window.innerWidth <= 768) {
      sidebar.classList.remove("show");
    }
    const sectionId = event.target.dataset.section;
    sections.forEach((section) => {
      section.classList.remove("active");
      if (section.id === `${sectionId}-section`) {
        section.classList.add("active");
      }
    });
  } else {
    console.log("section not found");
  }
});


function EditBlog(event) {
  console.log("Edit Blog");

  sections.forEach((section) => {
    section.classList.remove("active");
    if (section.id === `editBlog-section`) {
      section.classList.add("active");
    }
  });

  // Get h1 child element of class addBlog-section
  const h1 = document.querySelector("#editBlog-section h1");
  h1.textContent = "Edit Blog";

  const blogId = event.target.getAttribute("data-blog-id");
  console.log("blog id edit", blogId);

  fetch(`https://my-brand-bankend.onrender.com/api/v1/blogs/${blogId}`, {
    headers: {
      Authorization: localStorage.getItem("accessToken"),
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((blog) => {
      console.log(blog);

      document.getElementById("blog-content-editor-edit").value = blog.content;
      editBlogForm.setAttribute("data-blog-id", blogId);
      document.getElementById("blog-title-edit").value = blog.title;

      const imagePreviewContainer = document.querySelector(
        ".image-preview-edit"
      );
      imagePreviewContainer.innerHTML = "";

      if (blog.image) {
        const div = document.createElement("div");
        const img = document.createElement("img");
        img.src = blog.image;
        img.style.cssText = "width: 30px; height: 30px;";
        div.appendChild(img);
        imagePreviewContainer.appendChild(div);
        console.log(imagePreviewContainer);
      }

      console.log(
        "blog category",
        document.getElementById("blog-content-editor-edit").value
      );

      console.log("blog to edit", blog.content);
    })
    .catch((error) => {
      console.error("Error fetching blog:", error);
      swal({
        title: "Error",
        text: "An error occurred while fetching the blog. Please try again later.",
        icon: "error",
        button: "OK",
      });
    });
}
const editBlogForm = document.getElementById("edit-blog-form");

editBlogForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const blogId = e.currentTarget.getAttribute("data-blog-id");
  console.log(blogId);
  const title = document.getElementById("blog-title-edit").value;
  const content = document.getElementById("blog-content-editor-edit").value;
  const category = document.getElementById("blog-category-edit").value;
  const imageInput = document.getElementById("blog-image-edit");
  const formData = new FormData();

  formData.append("title", title);
  formData.append("content", content);
  formData.append("image", imageInput.files[0]);

  try {
    const response = await fetch(
      `https://my-brand-bankend.onrender.com/api/v1/blogs/${blogId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: localStorage.getItem("accessToken"),
        },
        body: formData,
      }
    );

    const data = await response.json();

    if (response.ok) {
      swal({
        title: "Success",
        text: "Blog updated successfully!",
        icon: "success",
        button: "OK",
      });
    } else {
      swal({
        title: "Error",
        text: data.message || "An error occurred while updating the blog.",
        icon: "error",
        button: "OK",
      });
    }
  } catch (error) {
    swal({
      title: "Error",
      text: "An error occurred while updating the blog. Please try again later.",
      icon: "error",
      button: "OK",
    });
    console.error("Error updating blog:", error);
  }
});

document.getElementById("dashboard-section").classList.add("active");

const hamburger = document.getElementById("hamburger");
const closed = document.getElementById("close");

hamburger.addEventListener("click", () => {
  sidebar.classList.toggle("show");
});
closed.addEventListener("click", () => {
  sidebar.classList.toggle("show");
});

var ctx = document.getElementById("myChart").getContext("2d");
var myChart = new Chart(ctx, {
  type: "line",
  data: {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "views",
        data: [12, 19, 3, 5, 2, 3],
        borderColor: "#1473E6",
        borderWidth: 2,
        fill: false,
        tension: 0.5,
        backgroundColor: "rgba(255, 99, 132, 0.2)",
      },
    ],
  },
  options: {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
        callbacks: {
          labelColor: function (context) {
            return {
              borderColor: "darkblue",
              backgroundColor: "blue",
            };
          },
          labelTextColor: function (context) {
            return "white";
          },
        },
      },
    },
    elements: {
      point: {
        radius: 0,
      },
    },
  },
});
window.addEventListener("load", function () {
  var auth = JSON.parse(localStorage.getItem("auth"));
  if (auth.role !== "admin") {
    return (window.location.href = "/auth/login.html");
  }
  const loader = document.getElementById("loading-wrapper");
  setTimeout(() => {
    loader.style.opacity = 0;
    setTimeout(() => {
      loader.style.display = "none";
    }, 1000);
  }, 1000);
});
ClassicEditor.create(document.querySelector("#blog-content-editor")).catch(
  (error) => {
    console.error(error);
  }
);
// ClassicEditor.create(document.querySelector("#blog-content-editor-edit")).catch(
//   (error) => {
//     console.error(error);
//   }
// );
const imageContainer = document.querySelector(".blog-image-input-container");
const imageInput = document.getElementById("blog-image");
const imagePreview = document.querySelector(".image-preview");

imageContainer.addEventListener("dragover", (e) => {
  e.preventDefault();
  imageContainer.classList.add("drag-over");
});

imageContainer.addEventListener("drop", (e) => {
  e.preventDefault();
  imageContainer.classList.remove("drag-over");
  const files = e.dataTransfer.files;

  handleFiles(files);
});

imageInput.addEventListener("change", (e) => {
  const files = e.target.files;
  handleFiles(files);
});

function handleFiles(files) {
  if (!files || !files.length) {
    console.error("No files selected");
    return;
  }

  imagePreview.innerHTML = "";

  const validFileSize = 50000000 * 2;
  const validImageTypes = ["image/jpeg", "image/png", "image/gif"];

  for (let file of files) {
    if (file.size > validFileSize) {
      alert("File size exceeds limit.");
      continue;
    }

    if (!validImageTypes.includes(file.type)) {
      alert("Invalid file type.");
      continue;
    }

    const div = document.createElement("div");
    const img = document.createElement("img");
    img.src = URL.createObjectURL(file);
    img.style.width = "30px";

    imagePreview.appendChild(img);
    div.textContent = file.name;
    imagePreview.appendChild(div);
    selectedFile = file;
    imageContainer.classList.add("dropped-image");
  }
}

document.querySelector(".add-blog-image-btn").addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    e.preventDefault();
    imageInput.click();
  }
});

// const tableBody = document
//   .getElementById("users-table")
//   .getElementsByTagName("tbody")[0];

// if (localStorage && localStorage.getItem("users")) {
//   const users = JSON.parse(localStorage.getItem("users"));

//   users.forEach((user, i) => {
//     const tableRow = document.createElement("tr");

//     const IdCell = document.createElement("td");
//     IdCell.textContent = i + 1;
//     const nameCell = document.createElement("td");
//     nameCell.textContent = user.fullName;

//     const emailCell = document.createElement("td");
//     emailCell.textContent = user.email;

//     const phoneNumber = document.createElement("td");
//     phoneNumber.textContent = user.phoneNumber;
//     const NumberOfBlogs = document.createElement("td");
//     NumberOfBlogs.textContent = 0;
//     const actionsCell = document.createElement("td");
//     actionsCell.innerHTML = '<button class="active-status-btn">Active</button>';

//     tableRow.appendChild(IdCell);
//     tableRow.appendChild(nameCell);
//     tableRow.appendChild(emailCell);
//     tableRow.appendChild(phoneNumber);
//     tableRow.appendChild(NumberOfBlogs);
//     tableRow.appendChild(actionsCell);

//     tableBody.appendChild(tableRow);
//   });
// } else {
//   console.warn("No users found in local storage!");
// }
let users = [];

async function fetchUsers() {
  const accessToken = localStorage.getItem("accessToken");
  try {
    console.log("loading");
    const response = await fetch(
      "https://my-brand-bankend.onrender.com/api/v1/users/",
      {
        headers: {
          Authorization: accessToken,
        },
      }
    );
    const users = await response.json();
    console.log(users);
    if (response.ok) {
      populateUsersTable(users);
    } else {
      // Check if the response status code is 401 (Unauthorized)
      if (response.status === 401) {
        // Call logout function
        await logout();
      } else {
        swal({
          title: "Error",
          text: "Failed to fetch users",
          icon: "error",
          button: "Try again",
        });
      }
    }
  } catch (error) {
    swal({
      title: "Error",
      text: "An error occurred while fetching users. Please try again later.",
      icon: "error",
      button: "OK",
    });
  } finally {
    console.log("done loading");
  }
}

async function logout() {
  // Perform logout actions, such as clearing local storage, redirecting to login page, etc.
  localStorage.removeItem("accessToken");
  // Redirect to login page
  window.location.href = "/login";
}

function populateUsersTable(users) {
  const tableBody = document
    .getElementById("users-table")
    .getElementsByTagName("tbody")[0];
  tableBody.innerHTML = ""; // Clear existing table rows

  users.forEach((user, i) => {
    const tableRow = document.createElement("tr");

    const IdCell = document.createElement("td");
    IdCell.textContent = i + 1;
    const nameCell = document.createElement("td");
    nameCell.textContent = user.fullName;

    const emailCell = document.createElement("td");
    emailCell.textContent = user.email;

    const phoneNumber = document.createElement("td");
    phoneNumber.textContent = user.phoneNumber;
    const NumberOfBlogs = document.createElement("td");
    NumberOfBlogs.textContent = 0;
    const actionsCell = document.createElement("td"); // You can fetch the number of blogs for each user if needed
    const activeStatusBtn = document.createElement("button");
    activeStatusBtn.classList.add("active-status-btn");
    if (user.status === "active") {
      activeStatusBtn.classList.add("active-status-btn");
      activeStatusBtn.textContent = "Active";
    } else {
      activeStatusBtn.classList.add("blocked-status-btn");
      activeStatusBtn.textContent = "Blocked";
    }
    activeStatusBtn.addEventListener("click", () => toggleUserStatus(user._id));

    actionsCell.appendChild(activeStatusBtn);

    tableRow.appendChild(IdCell);
    tableRow.appendChild(nameCell);
    tableRow.appendChild(emailCell);
    tableRow.appendChild(phoneNumber);
    tableRow.appendChild(NumberOfBlogs);
    tableRow.appendChild(actionsCell);

    tableBody.appendChild(tableRow);
  });
}
function toggleUserStatus(userId) {
  const accessToken = localStorage.getItem("accessToken");
  const xhr = new XMLHttpRequest();

  xhr.open(
    "PATCH",
    `https://my-brand-bankend.onrender.com/api/v1/users/status/${userId}`
  );
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.setRequestHeader("Authorization", `${accessToken}`);

  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        const response = JSON.parse(xhr.responseText);
        swal({
          title: "Success",
          text: response.message,
          icon: "success",
          button: "OK",
        });
        fetchUsers(); // Refresh the users table after status update
      } else {
        const errorMessage =
          xhr.status === 0 ? "Network error" : xhr.responseText;
        swal({
          title: "Error",
          text: errorMessage,
          icon: "error",
          button: "Try again",
        });
      }
    }
  };

  xhr.send();
}
function handleSearch() {
  const searchValue = searchInput.value.toLowerCase();
  const filteredUsers = users.filter((user) => {
    const fullName = user.fullName.toLowerCase();
    const email = user.email.toLowerCase();
    return fullName.includes(searchValue) || email.includes(searchValue);
  });
  populateUsersTable(filteredUsers);
}
const searchInput = document.getElementById("usersearch");
searchInput.addEventListener("change", handleSearch);

// Call the fetchUsers function to populate the table
fetchUsers();

async function fetchMessages() {
  try {
    const response = await fetch(
      "https://my-brand-bankend.onrender.com/api/v1/messages",
      {
        headers: {
          Authorization: `${localStorage.getItem("accessToken")}`,
        },
      }
    );
    const messages = await response.json();

    if (response.ok) {
      populateMessagesTable(messages);
    } else {
      swal({
        title: "Error",
        text: "Failed to fetch messages",
        icon: "error",
        button: "Try again",
      });
    }
  } catch (error) {
    console.log(error);
    swal({
      title: "Error",
      text: "An error occurred while fetching messages. Please try again later.",
      icon: "error",
      button: "OK",
    });
  }
}

function populateMessagesTable(messages) {
  const tbody = document.querySelector(".message-rows");
  tbody.innerHTML = "";

  const deleteBtn = document.getElementById("delete-messages");
  deleteBtn.addEventListener("click", deleteCheckedMessages);

  messages.forEach((message) => {
    const createdAt = new Date(message.createdAt);
    const formattedDate = `${createdAt.toLocaleDateString()} ${createdAt.toLocaleTimeString()}`;
    const row = `
      <a href="#" class="message-row flex items-center justify-between">
        <div class="flex items-center w-25 gap-4">
          <input type="checkbox" class="message-checkbox p-2" data-id="${message._id}" name="message" id="message-${message._id}">
          <label for="message-${message._id}">
            <i class="fas fa-star" style="color: #FFD56D;"></i>
          </label>
          <h3>${message.subject}</h3>
        </div>
        <div class="message-content flex justify-between flex-1">
          <span>${message.message}</span>
          <span>${formattedDate}</span>
        </div>
      </a>
    `;
    tbody.innerHTML += row;
  });
}

function deleteCheckedMessages() {
  const checkedCheckboxes = document.querySelectorAll(
    ".message-checkbox:checked"
  );
  const messageIds = Array.from(checkedCheckboxes).map(
    (checkbox) => checkbox.dataset.id
  );

  if (messageIds.length === 0) {
    swal({
      title: "No messages selected",
      text: "Please select at least one message to delete.",
      icon: "warning",
      button: "OK",
    });
    return;
  }

  swal({
    title: "Are you sure?",
    text: "This action cannot be undone.",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  }).then((willDelete) => {
    if (willDelete) {
      messageIds.forEach((id) => {
        fetch(`https://my-brand-bankend.onrender.com/api/v1/messages/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: localStorage.getItem("accessToken"),
          },
        })
          .then((response) => {
            if (response.ok) {
              fetchMessages();
              swal({
                title: "Success",
                text: response.data.message || "Message deleted successfully",
                icon: "success",
                button: "OK",
              });
              console.log(`Message with ID ${id} deleted successfully.`);
            } else {
              console.error(
                `Error deleting message with ID ${id}: ${response.status}`
              );
            }
          })
          .catch((error) => {
            console.error(`Error deleting message with ID ${id}: ${error}`);
          });
      });
      populateMessagesTable(
        messages.filter((message) => !messageIds.includes(message._id))
      );
    }
  });
}

// Call fetchMessages to populate the messages table
fetchMessages();

function logout() {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("auth");
  window.location.href = "../auth/login.html";
}

const form = document.getElementById("add-blog-form");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const titleInput = document.getElementById("blog-title");
  const contentEditor = document.getElementById("blog-content-editor").value;
  const imageInput = document.getElementById("blog-image");
  const publishCheckbox = document.getElementById("publishSwitch");
  const errorMessages = document.querySelectorAll(".error-message");

  errorMessages.forEach((span) => (span.textContent = ""));

  let isValid = true;

  if (!titleInput.value) {
    isValid = false;
    errorMessages[0].textContent = "Title is required";
  }

  if (!contentEditor) {
    isValid = false;
    errorMessages[2].textContent = "Content is required";
  }

  if (!imageInput.files.length) {
    isValid = false;
    errorMessages[1].textContent = "Image is required";
  }

  if (!isValid) {
    return; // Exit if form is not valid
  }

  const formData = new FormData();
  formData.append("title", titleInput.value);
  formData.append("content", contentEditor);
  formData.append("image", imageInput.files[0]);
  formData.append("isPublished", publishCheckbox.checked);

  try {
    const response = await fetch(
      "https://my-brand-bankend.onrender.com/api/v1/blogs",
      {
        method: "POST",
        headers: {
          Authorization: localStorage.getItem("accessToken"),
        },
        body: formData,
      }
    );

    if (response.ok) {
      const responseData = await response.json();
      // Optionally handle response data
      console.log("Blog created successfully:", responseData);
      // Reset form and show success message
      fetchBlogs();
      form.reset();
      swal({
        title: "Well Done",
        text: "Blog added successfully",
        icon: "success",
      });
    } else {
      throw new Error("Failed to create blog");
    }
  } catch (error) {
    console.error("Error creating blog:", error);
    swal({
      title: "Error",
      text: "Failed to create blog. Please try again later.",
      icon: "error",
      button: "OK",
    });
  }
});

async function fetchBlogs() {
  try {
    const response = await fetch(
      "https://my-brand-bankend.onrender.com/api/v1/blogs"
    );
    const blogs = await response.json();

    if (response.ok) {
      populateBlogTable(blogs);
    } else {
      swal({
        title: "Error",
        text: "Failed to fetch blogs",
        icon: "error",
        button: "Try again",
      });
    }
  } catch (error) {
    swal({
      title: "Error",
      text: "An error occurred while fetching blogs. Please try again later.",
      icon: "error",
      button: "OK",
    });
  }
}
function fetchPopularBlogs() {
  fetch("https://my-brand-bankend.onrender.com/api/v1/blogs/popular", {
    headers: {
      Authorization: localStorage.getItem("accessToken"),
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((popularBlogs) => {
      console.log("popular blogs", popularBlogs);
      const popularBlogContainer = document.getElementById(
        "popular-blog-section"
      );
      popularBlogContainer.innerHTML = ""; // Clear the container before appending new blogs

      popularBlogs.forEach((blog) => {
        const div = document.createElement("div");
        div.innerHTML = `
          <article style="display: flex; justify-content: space-between; align-items: center; margin: 20px 0;">
            <aside style="display: flex; gap: 20px; justify-content: space-between; align-items: center;">
              <img style="height: 3rem; width: 3rem; border-radius: 100%;" src="${
                blog.image
              }" alt="blog1">
              <div>
                <h1 style="text-transform: capitalize;">${blog.title}</h1>
                <p style="margin: 10px 0; font-size: 12px; color: rgb(67, 85, 85)">12 thursday 2024</p>
              </div>
              <p style="padding: 2px; font-size: 12px; border: 1px solid pink; border-radius: 4px; background-color: #FEE5DD; color: #FC5569; font-weight: 500;">
                ${blog.category || ""}
              </p>
            </aside>
            <aside style="display: flex; gap: 20px; align-items: center;">
              <p style="font-size: 14px;">
                <i class="fa fa-book-open"></i>
                <span>${blog.comments.length || 0}</span>
              </p>
              <p style="font-size: 14px;">
                <i class="fa fa-eye"></i>
                <span>${blog.likes.length || 0}</span>
              </p>
            </aside>
          </article>
        `;
        popularBlogContainer.appendChild(div);
      });
    })
    .catch((error) => {
      console.error("Error fetching popular blogs:", error);
      swal({
        title: "Error",
        text: "An error occurred while fetching blogs. Please try again later.",
        icon: "error",
        button: "OK",
      });
    });
}

// Call the function to fetch popular blogs
fetchPopularBlogs();
function populateBlogTable(blogs) {
  const tableBlog = document.getElementById("blog-table-body");
  tableBlog.innerHTML = ""; // Clear existing content

  blogs.forEach((blog) => {
    const row = document.createElement("tr");
    const status = blog.isPublished ? "Published" : "Not Published";
    row.innerHTML = `
            <td colspan="1">
                <img src="${blog.image}" alt="blog image" />
            </td>
            <td colspan="6">${blog.title}</td>
            <td colspan="2">${status}</td>
            <td colspan="1">${blog.comments.length || 0}</td>
            <td colspan="1">${blog.likes.length || 0}</td>
            <td colspan="2">
                <div style="display: flex; gap: 10px; padding: 1px 10px; border: 1px solid grey; width: 65px; border-radius: 5px;">
                    <button data-blog-id="${blog._id}" class="edit-btn">
                        <i class="fa fa-edit" data-blog-id="${blog._id}"></i>
                    </button>
                    <hr>
                    <button class="delete-btn" data-blog-id="${blog._id}">
                        <i class="fa fa-trash" data-blog-id="${blog._id}"></i>
                    </button>
                </div>
            </td>
        `;
    const deleteButton = row.querySelector(".delete-btn");
    deleteButton.addEventListener("click", () => handleDelete(blog._id));
    const editButton = row.querySelector(".edit-btn");
    editButton.addEventListener("click", EditBlog);
    tableBlog.appendChild(row);
  });
}

async function handleDelete(blogId) {
  try {
    const response = await fetch(
      `https://my-brand-bankend.onrender.com/api/v1/blogs/${blogId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: localStorage.getItem("accessToken"),
        },
      }
    );

    if (response.ok) {
      const rowToRemove = document
        .querySelector(`[data-blog-id="${blogId}"]`)
        .closest("tr");
      rowToRemove.remove();
      swal({
        title: "Success",
        text: "Blog deleted successfully",
        icon: "success",
        button: "OK",
      });
    } else {
      swal({
        title: "Error",
        text: "Failed to delete blog",
        icon: "error",
        button: "OK",
      });
    }
  } catch (error) {
    swal({
      title: "Error",
      text: "An error occurred while deleting blog. Please try again later.",
      icon: "error",
      button: "OK",
    });
  }
}

// Call fetchBlogs to populate the blogs table
fetchBlogs();

let totalVisits =
  parseInt(JSON.parse(localStorage.getItem("totalVisits"))) || 0;
document.getElementById("total-visits").textContent = totalVisits;

const profileForm = document.querySelector(".profile-form");
const saveButton = profileForm.querySelector("button");

saveButton.addEventListener("click", (event) => {
  event.preventDefault();

  const authEmail = JSON.parse(localStorage.getItem("auth")) || {};

  console.log(authEmail.email);
  const emailInput = profileForm.querySelector('input[type="email"]');
  const newEmail = emailInput.value.trim();
  if (!validateEmail(newEmail)) {
    alert("Please enter a valid email address.");
    return;
  }

  const users = JSON.parse(localStorage.getItem("users") || "[]");

  const userIndex = users.findIndex((user) => user.email === authEmail.email);
  if (userIndex === -1) {
    alert("Error: User not found.");
    return;
  }

  users[userIndex].email = newEmail;

  localStorage.setItem("users", JSON.stringify(users));

  if (newEmail !== authEmail.email) {
    localStorage.setItem("authEmail", newEmail);
  }

  alert("User updated successfully!");
});

function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
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
// Function to handle image upload and preview for editing a blog

const imageContainer2 = document.querySelector(".blog-image-input-container");
const imageInput2 = document.getElementById("blog-image-edit");
const imagePreview2 = document.querySelector(".image-preview-edit");

imageContainer2.addEventListener("dragover", (e) => {
  e.preventDefault();
  imageContainer2.classList.add("drag-over");
});

imageContainer2.addEventListener("drop", (e) => {
  e.preventDefault();
  imageContainer2.classList.remove("drag-over");
  const files = e.dataTransfer.files;

  handleFiles2(files);
});

imageInput2.addEventListener("change", (e) => {
  const files = e.target.files;
  handleFiles2(files);
});

function handleFiles2(files) {
  if (!files || !files.length) {
    console.error("No files selected");
    return;
  }

  imagePreview2.innerHTML = "";

  const validFileSize = 50000000 * 2;
  const validImageTypes = ["image/jpeg", "image/png", "image/gif"];

  for (let file of files) {
    if (file.size > validFileSize) {
      alert("File size exceeds limit.");
      continue;
    }

    if (!validImageTypes.includes(file.type)) {
      alert("Invalid file type.");
      continue;
    }

    const div = document.createElement("div");
    const img = document.createElement("img");
    img.src = URL.createObjectURL(file);
    img.style.width = "30px";

    imagePreview2.appendChild(img);
    div.textContent = file.name;
    imagePreview2.appendChild(div);
    selectedFile = file;
    imageContainer2.classList.add("dropped-image");
  }
}
document
  .querySelector(".add-blog-image-btn-edit")
  .addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      e.preventDefault();
      imageInput2.click();
    }
  });
// Fetch blog stats from backend
fetch("https://my-brand-bankend.onrender.com/api/v1/blogs/stats")
  .then((response) => {
    if (!response.ok) {
      if (response.status === 401) {
        // Call logout function if unauthorized
        logout();
      }
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then((data) => {
    // Update total users, comments, and blogs with fetched data
    const totalUsers = data.totalUsers || 0;
    const totalComments = data.totalComments || 0;
    const totalBlogs = data.totalBlogs || 0;

    // Update HTML elements with fetched data
    document.getElementById("total-user").textContent = totalUsers;
    document.getElementById("total-comments").textContent = totalComments;
    document.getElementById("total-blog").textContent = totalBlogs;

    console.log("Total users:", totalUsers);
    console.log("Total comments:", totalComments);
    console.log("Total blogs:", totalBlogs);
  })
  .catch((error) => {
    console.error("Error fetching blog stats:", error);
    // Handle error - Show error message or retry
  });
