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

document.getElementById("addBlog-section").classList.add("active");
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
