// navbar component vanilla js
class Navbar extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
        <nav class="nav-container">
        <div class="nav-top">
          <div class="nav-logo">
            <img src="../assets/logo.png" alt="logo" />
            <div>
              <p>sage</p>
              <p>ishimwe</p>
            </div>
          </div>
          <div class="nav-hamburger">
            <svg
              width="24"
              height="24"
              xmlns="http://www.w3.org/2000/svg"
              fill-rule="evenodd"
              clip-rule="evenodd"
            >
              <path d="M0 0h24v24H0z" fill="none" />
              <path
                d="M3 6h18v2H3V6zm0 5h18v2H3v-2zm0 5h18v2H3v-2z"
                fill="#000"
              />
            </svg>
          </div>
        </div>

        <ul class="nav-links">
          <li><a href="../index.html">Home</a></li>
          <li><a href="../index.html#about">About</a></li>
          <li><a href="../index.html#service">Services</a></li>
          <li><a href="#">Blog</a></li>
          <li><a href="../index.html#portfolio">Portfolio</a></li>
          <li><a href="../index.html#contact">Contact</a></li>
          <button class="nav-btn">Get a Quote</button>
        </ul>
      </nav>
        `;
  }
}
customElements.define("nav-bar", Navbar);
