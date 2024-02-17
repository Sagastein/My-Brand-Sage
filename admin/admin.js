//check if user is authenticated

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
    // add active-link class to clicked element to its parent li element
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
        borderColor: "#1473E6", // Set line color to blue
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
  if (!auth) {
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
const imageContainer = document.querySelector(".blog-image-input-container");
const imageInput = document.getElementById("blog-image");
const imagePreview = document.querySelector(".image-preview");

// Prevent default behavior for drag events
imageContainer.addEventListener("dragover", (e) => {
  e.preventDefault();
  imageContainer.classList.add("drag-over");
});

// Handle dropped files
imageContainer.addEventListener("drop", (e) => {
  e.preventDefault();
  imageContainer.classList.remove("drag-over");
  const files = e.dataTransfer.files;

  // Validate and handle dropped files:
  handleFiles(files);
});

// Handle selected file using input element:
imageInput.addEventListener("change", (e) => {
  const files = e.target.files;
  handleFiles(files);
});

// Function to handle files from both sources:
function handleFiles(files) {
  if (!files || !files.length) {
    console.error("No files selected");
    return;
  }

  // Clear previous image:
  imagePreview.innerHTML = "";

  // Validate file size and type (optional):
  const validFileSize = 50000000 * 2; // Define your limit in bytes
  const validImageTypes = ["image/jpeg", "image/png", "image/gif"];

  for (let file of files) {
    if (file.size > validFileSize) {
      alert("File size exceeds limit.");
      continue; // Skip to next file
    }

    if (!validImageTypes.includes(file.type)) {
      alert("Invalid file type.");
      continue;
    }

    // Create image preview:
    // imageContainer.innerHTML = "";
    // const div = document.createElement("div");
    // const img = document.createElement("img");
    // const inputImage = document.createElement("input");
    // inputImage.type = "file";
    // // inputImage add id
    // inputImage.id = "blog-image";
    // // inputImage add hidden attributes
    // //inputImage.hidden = true;
    // img.src = URL.createObjectURL(file);
    // img.style.width = "30px";
    // imagePreview.appendChild(img);
    // imageContainer.appendChild(img);
    // div.textContent = file.name;
    // imageContainer.appendChild(div);
    // imageContainer.appendChild(inputImage);
    // imageContainer.classList.add("dropped-image");
    // console.log(file);

    // inputImage.value = file;
    const div = document.createElement("div");
    const img = document.createElement("img");
    img.src = URL.createObjectURL(file);
    img.style.width = "30px";
    // Append to the correct container:
    imagePreview.appendChild(img);
    div.textContent = file.name;
    imagePreview.appendChild(div); // Assuming you want the preview in imagePreview

    // Store the selected file (example using a global variable):
    selectedFile = file;

    // Add a visual indication for dropped files:
    imageContainer.classList.add("dropped-image");
  }
}

// Prevent form submission on button click (if not intended):
document.querySelector(".add-blog-image-btn").addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    e.preventDefault();
    imageInput.click(); // Open file selection dialog manually
  }
});

// const imageContainer = document.querySelector(".blog-image-input-container");

// // Prevent default behavior for drag events
// imageContainer.addEventListener("dragover", (e) => {
//   e.preventDefault();
//   imageContainer.classList.add("drag-over");
//   console.log("Drag Over");
// });

// // Handle dropped files
// imageContainer.addEventListener("drop", (e) => {
//   e.preventDefault();
//   imageContainer.classList.remove("drag-over");
//   const files = e.dataTransfer.files;
//   console.log(files);
//   handleDroppedFiles(files);
// });

// // Function to handle dropped files
// function handleDroppedFiles(files) {
//   imageContainer.innerHTML = "";

//   for (let file of files) {
//     let div = document.createElement("div");
//     let img = document.createElement("img");
//     img.src = URL.createObjectURL(file);
//     img.style.width = "30px";
//     imageContainer.appendChild(img);
//     div.textContent = file.name;
//     imageContainer.appendChild(div);
//     imageContainer.classList.add("dropped-image");
//   }
// }

const tableBody = document
  .getElementById("users-table")
  .getElementsByTagName("tbody")[0]; // Target the tbody element

// Check if local storage exists and `users` key is present
if (localStorage && localStorage.getItem("users")) {
  const users = JSON.parse(localStorage.getItem("users"));

  // Create table rows dynamically for each user
  users.forEach((user, i) => {
    const tableRow = document.createElement("tr");

    const imageCell = document.createElement("td");
    //imageCell.innerHTML = `<img src="https://i.pravatar.cc/300/${user.id}/24" alt="${user.name} image" />`; // Use user ID for image generation
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
  // Handle the case where users data is not found in local storage
  console.warn("No users found in local storage!");
}
const messages = JSON.parse(localStorage.getItem("messages"));
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
// form.addEventListener("submit", (event) => {
//   console.log("form submitted");
//   event.preventDefault();
//   const titleInput = document.getElementById("blog-title");
//   const contentEditor = document.getElementById("blog-content-editor").value;
//   const imageInput = document.getElementById("blog-image");
//   const categorySelect = document.getElementById("blog-category");
//   const publishCheckbox = document.getElementById("publishSwitch");
//   // all fields are required

//   const errorMessages = document.querySelectorAll(".error-message");

//   // Clear existing error messages:
//   errorMessages.forEach((span) => (span.textContent = ""));

//   let isValid = true;

//   // Validate individual fields:
//   if (!titleInput.value) {
//     isValid = false;
//     errorMessages[0].textContent = "Title is required";
//   }

//   if (!contentEditor) {
//     // Use CKEditor's getData() for content
//     isValid = false;
//     errorMessages[1].textContent = "Content is required";
//   }

//   if (!categorySelect.value) {
//     isValid = false;
//     errorMessages[2].textContent = "Category is required";
//   }

//  if (!imageInput.files.length) {
//    isValid = false;
//    errorMessages[1].textContent = "Image is required"; // Adjust index if multiple error messages
//  } else {
//    // Additional validation for image size, format, etc. if needed
//  }

//   const date = new Date();
//   const formattedTime = date.toLocaleTimeString([], {
//     month: "short",
//     day: "2-digit",
//     year: "numeric",
//     hour: "2-digit",
//     minute: "2-digit",
//   });
//   if (isValid) {
//     const data = {
//       uuid: Math.random().toString(36).substr(2, 9),
//       title: titleInput.value,
//       content: contentEditor,
//       image: reader.readAsDataURL(image),
//       category: categorySelect.value,
//       published: publishCheckbox.checked,
//       createdAt: formattedTime,
//     };
//     console.log("Form data is valid:", data);

//     // Submit the form or handle data accordingly
//   }

//   //adding them to the localhost
//   // let blogs = [];
//   // let storedBlogs = localStorage.getItem("blogs");
//   // if (storedBlogs) {
//   //   blogs = JSON.parse(storedBlogs);
//   // }
//   // blogs.push(data);
//   // localStorage.setItem("blogs", JSON.stringify(blogs));
//   // console.log(data);
// });
form.addEventListener("submit", (event) => {
  console.log("form submitted");
  event.preventDefault();

  const titleInput = document.getElementById("blog-title");
  const contentEditor = document.getElementById("blog-content-editor").value;
  const imageInput = document.getElementById("blog-image");
  const categorySelect = document.getElementById("blog-category");
  const publishCheckbox = document.getElementById("publishSwitch");
  const errorMessages = document.querySelectorAll(".error-message");

  // Clear existing error messages:
  errorMessages.forEach((span) => (span.textContent = ""));

  let isValid = true;

  // Validate individual fields:
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
    errorMessages[1].textContent = "Image is required"; // Adjust index if multiple error messages
  } else {
    // Additional validation for image size, format, etc. if needed
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

      // Save the entire data object to LocalStorage if valid
      if (isValid) {
        let blogs = [];
        let storedBlogs = localStorage.getItem("blogs");
        if (storedBlogs) {
          blogs = JSON.parse(storedBlogs);
        }
        blogs.push(data);
        localStorage.setItem("blogs", JSON.stringify(blogs));
        // swt alert
        document.getElementById("add-blog-form").reset();
        swal({
          title: "Well Done",
          text: "Blog added successfully",
          icon: "success",
        });
        window.location.reload();

        console.log("Form data is valid:", data);
        // Submit the form or handle data accordingly
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

// Map each blog entry to a table row
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
                      <button class="edit-btn" >
                        <i class="fa fa-edit"></i>
                      </button>
                      <hr>
                      <button class="delete-btn" data-blog-id="${blog.uuid}">
                        <i class="fa fa-trash" data-blog-id="${blog.uuid}"></i>
                      </button>
                    </div>
                  </td>
                </tr>
    `;
  const deleteButton = row.querySelector(".delete-btn");
  deleteButton.addEventListener("click", handleDelete);
  tableBlog.appendChild(row);
});
function handleDelete(event) {
  console.log("delete button clicked");
  // value of the attribute data-blog-id
  const blogId = event.target.getAttribute("data-blog-id");
  console.log(blogId);

  //Retrieve blog data from LocalStorage
  const storedBlogs = JSON.parse(localStorage.getItem("blogs")) || [];

  // Find the index of the blog with the matching UUID
  const indexToDelete = storedBlogs.findIndex((blog) => blog.uuid === blogId);

  if (indexToDelete !== -1) {
    // Remove the blog entry from the array
    storedBlogs.splice(indexToDelete, 1);

    // Save the updated array back to LocalStorage
    localStorage.setItem("blogs", JSON.stringify(storedBlogs));

    // Remove the row from the table (optional)
    event.target.closest("tr").remove();
  }
}

let totalVisits =
  parseInt(JSON.parse(localStorage.getItem("totalVisits"))) || 0;
console.log("total visits", totalVisits);
//total users
let totalUsers =
  parseInt(JSON.parse(localStorage.getItem("users")).length) || 0;
console.log("total users", totalUsers);
let totalComments = 0;
let totalLikes = 0;
let totalBlogs = 0;

blogData.forEach((blog, i) => {
  // Assuming "comments" is an array within each blog object
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
// get popular blog with many likes and comments to three blogs
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
  event.preventDefault(); // Prevent default form submission

  // Get auth email from localStorage
  const authEmail = JSON.parse(localStorage.getItem("auth")) || {};

  // Validate email input
  console.log(authEmail.email);
  const emailInput = profileForm.querySelector('input[type="email"]');
  const newEmail = emailInput.value.trim();
  if (!validateEmail(newEmail)) {
    alert("Please enter a valid email address.");
    return;
  }

  // Get users from localStorage
  const users = JSON.parse(localStorage.getItem("users") || "[]");

  // Find the user to update
  const userIndex = users.findIndex((user) => user.email === authEmail.email);
  if (userIndex === -1) {
    alert("Error: User not found.");
    return;
  }

  // Update user data
  users[userIndex].email = newEmail; // Update email if necessary
  // Update other user fields based on form inputs (you need to handle them here)

  // Save updated users to localStorage
  localStorage.setItem("users", JSON.stringify(users));

  // Update authEmail if email was changed
  if (newEmail !== authEmail.email) {
    localStorage.setItem("authEmail", newEmail);
  }

  // Display success message or redirect to a confirmation page
  alert("User updated successfully!");
});

// Function to validate email (replace with your desired validation logic)
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
