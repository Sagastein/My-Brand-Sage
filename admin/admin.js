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
  //get h1 child element of class addBlog-section
  const h1 = document.querySelector("#editBlog-section h1");
  h1.textContent = "Edit Blog";
  const blogId = event.target.getAttribute("data-blog-id");
  console.log("blog id edit", blogId);

  const storedBlogs = JSON.parse(localStorage.getItem("blogs")) || [];
  const blog = storedBlogs.find((blog) => blog.uuid === blogId);

  let blogTextCK = document.getElementById("blog-content-editor-edit");
  console.log("blog title", blogTextCK);
  //insert data into ck editor
  blogTextCK.insertHtml(blog.content);

  document.getElementById("blog-title-edit").value = blog.title;
  let imagePreview = document.querySelector(".image-preview");
  imagePreview.innerHTML = "";
  const div = document.createElement("div");
  const img = document.createElement("img");
  img.src = blog.image;
  img.style.width = "30px";
  imagePreview.appendChild(img);
  imagePreview.appendChild(div);
  imageContainer.classList.add("dropped-image");
  document.getElementById("blog-category-edit").value = blog.category;
  console.log(
    "blog category",
    document.getElementById("blog-content-editor-edit").value
  );

  console.log("blog to edit", blog.content);
  console.log(storedBlogs);
  const indexToUpdate = storedBlogs.findIndex((blog) => blog.uuid === blogId);
  console.log(indexToUpdate);
}

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
ClassicEditor.create(document.querySelector("#blog-content-editor-edit")).catch(
  (error) => {
    console.error(error);
  }
);
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

const tableBody = document
  .getElementById("users-table")
  .getElementsByTagName("tbody")[0];

if (localStorage && localStorage.getItem("users")) {
  const users = JSON.parse(localStorage.getItem("users"));

  users.forEach((user, i) => {
    const tableRow = document.createElement("tr");

    const imageCell = document.createElement("td");
    imageCell.textContent = i + 1;
    const nameCell = document.createElement("td");
    nameCell.textContent = user.fullName;

    const emailCell = document.createElement("td");
    emailCell.textContent = user.email;

    const phoneNumber = document.createElement("td");
    phoneNumber.textContent = user.phoneNumber;
    const NumberOfBlogs = document.createElement("td");
    NumberOfBlogs.textContent = 0;
    const actionsCell = document.createElement("td");
    actionsCell.innerHTML = '<button class="active-status-btn">Active</button>';

    tableRow.appendChild(imageCell);
    tableRow.appendChild(nameCell);
    tableRow.appendChild(emailCell);
    tableRow.appendChild(phoneNumber);
    tableRow.appendChild(NumberOfBlogs);
    tableRow.appendChild(actionsCell);

    tableBody.appendChild(tableRow);
  });
} else {
  console.warn("No users found in local storage!");
}
let messages = [];
messages = JSON.parse(localStorage.getItem("messages"));
messages.forEach((message) => {
  const row = `
   <a href="#" class="message-row flex items-center justify-between">
                <div class="flex items-center w-25 gap-8">
                  <input type="checkbox" class="p-2" name="message" id="message1">
                  <label for="message1">

                    <i class="fas fa-star" style="color: #FFD56D;"></i>
                  </label>
                  <h3>${message.subject}</h3>
                </div>
                <div class="message-content flex justify-between flex-1">
                  <span>${message.message}</span>
                  <span>${message.joined || 0 - 0}</span>
                </div>

              </a>
  `;

  const tbody = document.querySelector(".message-rows");
  tbody.innerHTML += row;
});

function logout() {
  localStorage.removeItem("auth");
  window.location.href = "../auth/login.html";
}

const form = document.getElementById("add-blog-form");

form.addEventListener("submit", (event) => {
  console.log("form submitted");
  event.preventDefault();

  const titleInput = document.getElementById("blog-title");
  const contentEditor = document.getElementById("blog-content-editor").value;
  const imageInput = document.getElementById("blog-image");
  const categorySelect = document.getElementById("blog-category");
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
  } else {
    const reader = new FileReader();
    reader.onload = function (e) {
      const imageDataURL = e.target.result;

      const data = {
        uuid: Math.random().toString(36).substr(2, 9),
        title: titleInput.value,
        content: contentEditor,
        image: imageDataURL,
        category: categorySelect.value,
        published: publishCheckbox.checked,
        comments: [],
        likes: [],
        createdAt: formattedTime,
      };

      if (isValid) {
        let blogs = [];
        let storedBlogs = localStorage.getItem("blogs");
        if (storedBlogs) {
          blogs = JSON.parse(storedBlogs);
        }
        blogs.push(data);
        localStorage.setItem("blogs", JSON.stringify(blogs));

        document.getElementById("add-blog-form").reset();
        swal({
          title: "Well Done",
          text: "Blog added successfully",
          icon: "success",
        });
        window.location.reload();

        console.log("Form data is valid:", data);
      }
    };
    reader.readAsDataURL(imageInput.files[0]);
  }

  if (!categorySelect.value) {
    isValid = false;
    errorMessages[3].textContent = "Category is required";
  }

  const date = new Date();
  const formattedTime = date.toLocaleTimeString([], {
    month: "short",
    day: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
});

const blogData = JSON.parse(localStorage.getItem("blogs")) || [];

const tableBlog = document.getElementById("blog-table-body");
blogData.forEach((blog) => {
  const row = document.createElement("tr");
  row.innerHTML = `
                <tr>
                  <td colspan="1">
                    <img src="${blog.image}" alt="blog image" />
                  </td>
                  <td colspan="6">${blog.title}</td>
                  <td colspan="2">${blog.category}</td>
                  <td colspan="1">${blog.comments.length || 0}</td>
                  <td colspan="1">${blog.likes.length || 0}</td>
                  <td colspan="2">
                    <div
                      style="display: flex; gap: 10px; padding: 1px 10px; border: 1px solid grey; width: 65px; border-radius: 5px;">
                      <button data-blog-id="${blog.uuid}" class="edit-btn" >
                        <i  class="fa fa-edit" data-blog-id="${blog.uuid}"></i>
                      </button>
                      <hr>
                      <button  class="delete-btn" data-blog-id="${blog.uuid}">
                        <i class="fa fa-trash" data-blog-id="${blog.uuid}"></i>
                      </button>
                    </div>
                  </td>
                </tr>
    `;
  const deleteButton = row.querySelector(".delete-btn");
  const editButton = row.querySelector(".edit-btn");
  editButton.addEventListener("click", EditBlog);
  deleteButton.addEventListener("click", handleDelete);
  tableBlog.appendChild(row);
});
function handleDelete(event) {
  console.log("delete button clicked");

  const blogId = event.target.getAttribute("data-blog-id");
  console.log(blogId);

  const storedBlogs = JSON.parse(localStorage.getItem("blogs")) || [];

  const indexToDelete = storedBlogs.findIndex((blog) => blog.uuid === blogId);

  if (indexToDelete !== -1) {
    storedBlogs.splice(indexToDelete, 1);

    localStorage.setItem("blogs", JSON.stringify(storedBlogs));

    event.target.closest("tr").remove();
  }
}

let totalVisits =
  parseInt(JSON.parse(localStorage.getItem("totalVisits"))) || 0;
console.log("total visits", totalVisits);

let totalUsers =
  parseInt(JSON.parse(localStorage.getItem("users")).length) || 0;
console.log("total users", totalUsers);
let totalComments = 0;
let totalLikes = 0;
let totalBlogs = 0;

blogData.forEach((blog, i) => {
  totalBlogs = i;
  totalComments += blog.comments.length;
  totalLikes += blog.likes.length;
});
document.getElementById("total-user").textContent = totalUsers;
document.getElementById("total-visits").textContent = totalVisits;
document.getElementById("total-comments").textContent = totalComments;
document.getElementById("total-blog").textContent = totalBlogs + 1;
console.log("total totalLikes", totalLikes);
console.log("Total comments:", totalComments);

const popularBlogs = blogData
  .sort((a, b) => b.comments.length - a.comments.length)
  .slice(0, 3);
console.log("popular blogs", popularBlogs);
const popularBlogContainer = document.getElementById("popular-blog-section");
popularBlogs.forEach((blog) => {
  const div = document.createElement("div");
  div.innerHTML = `
 <article style="display: flex; justify-content: space-between;align-items: center; margin: 20px 0;">
              <aside style="display: flex;gap: 20px; justify-content: space-between;align-items: center;">
                <img style="height: 3rem; width: 3rem; border-radius: 100%;" src="${
                  blog.image
                }"
                  alt="blog1">
                <div>
                  <h1 style="text-transform: capitalize;">${blog.title}</h1>
                  <p style="margin: 10px 0;font-size: 12px;color:rgb(67, 85, 85)">12 thursday 2024</p>
                </div>
                <p
                  style="padding: 2px; font-size: 12px; border: 1px solid pink;border-radius: 4px; background-color: #FEE5DD;color:#FC5569; font-weight: 500;">
                  ${blog.category}</p>
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
