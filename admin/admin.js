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

// Prevent default behavior for drag events
imageContainer.addEventListener("dragover", (e) => {
  e.preventDefault();
  imageContainer.classList.add("drag-over");
  console.log("Drag Over");
});

// Handle dropped files
imageContainer.addEventListener("drop", (e) => {
  e.preventDefault();
  imageContainer.classList.remove("drag-over");
  const files = e.dataTransfer.files;
  console.log(files);
  handleDroppedFiles(files);
});

// Function to handle dropped files
function handleDroppedFiles(files) {
  imageContainer.innerHTML = "";

  for (let file of files) {
    let div = document.createElement("div");
    let img = document.createElement("img");
    img.src = URL.createObjectURL(file);
    img.style.width = "30px";
    imageContainer.appendChild(img);
    div.textContent = file.name;
    imageContainer.appendChild(div);
    imageContainer.classList.add("dropped-image");
  }
}

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

// function createMessageRow(message) {
//   const messageRow = document.createElement('a');
//   messageRow.classList.add('message-row', 'flex', 'items-center','border');
//   messageRow.href = '#'; // Set href for accessibility

//   const messageContent = document.createElement('div');
//   messageContent.classList.add('message-content', 'flex', 'justify-between', 'flex-1');

//   // Checkbox
//   const checkbox = document.createElement('input');
//   checkbox.type = 'checkbox';
//   checkbox.classList.add('p-2', 'message-checkbox');
//   checkbox.name = 'message';
//   checkbox.id = `message-${message.id}`;

//   // Label
//   const label = document.createElement('label');
//   label.for = checkbox.id;

//   // Star icon (use appropriate icon library if necessary)
//   const starIcon = document.createElement('i');
//   starIcon.classList.add('fas', 'fa-star', 'message-star');
//   starIcon.style.color = '#FFD56D'; // Adjust color as needed

//   label.appendChild(starIcon);
//   messageContent.appendChild(checkbox);
//   messageContent.appendChild(label);

//   // Sender name
//   const senderName = document.createElement('h3');
//   senderName.textContent = message.name;

//   // Message text
//   const messageText = document.createElement('span');
//   messageText.textContent = message.subject;

//   // Timestamp
//   const timestamp = document.createElement('span');
//   timestamp.textContent = message.;

//   messageContent.appendChild(senderName);
//   messageContent.appendChild(messageText);
//   messageContent.appendChild(timestamp);

//   messageRow.appendChild(messageContent);

//   return messageRow;
// }

// // Check if messages exist in local storage
// if (messages) {
//   // Map messages to rows and append them to the container
//   messages.forEach(message => {
//     const messageRow = createMessageRow(message);
//     document.querySelector('.message-rows').appendChild(messageRow);
//   });
// } else {
//   // Handle the case where there are no messages
//   console.warn('No messages found in local storage!');
// }
