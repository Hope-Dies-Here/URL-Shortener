const urlInput = document.getElementById("url-input");
const shortenBtn = document.getElementById("shorten-btn");
const linksList = document.getElementById("links-list");
const form = document.getElementById("shortener-form");
//localStorage.clear()
// Load saved links from local storage
let savedLinks = JSON.parse(localStorage.getItem("shortenedLinks")) || [];
async function getLinks() {
  let response = await fetch("http://localhost:5000/links");
  if (response.ok) {
    const data = await response.json();
    savedLinks = data.data;
  }
}
function add(value) {
  if (savedLinks.length >= 3) {
    savedLinks.shift();
  }
  savedLinks.push(value);
}
// Display saved links
async function displayLinks() {
  // await getLinks()
  linksList.innerHTML = "";
  savedLinks.reverse().forEach((link, index) => {
    const linkItem = document.createElement("div");
    linkItem.className = "link-item fade-in";
    linkItem.innerHTML = `
                    <div class="link-details">
                        <div class="long-url">${link.long}</div>
                        <div class="short-url">${link.short}</div>
                    </div>
                    <button class="copy-btn" data-link="${link.short}">Copy</button>
                `;
    linksList.appendChild(linkItem);
  });
}

// Generate a random short code
function generateShortCode() {
  return Math.random().toString(36).substr(2, 6);
}

// Shorten URL and save
form.addEventListener("submit", e => {
  e.preventDefault();
  const longUrl = urlInput.value.trim();
  if (longUrl) {
    const shortCode = generateShortCode();
    const baseUrl = window.location.href;
    const shortUrl = `${baseUrl}${shortCode}`;

    const body = { long: longUrl, short: shortUrl, code: shortCode };
    fetch("http://localhost:5000/short", {
      method: "POST",
      headers: {
        "Content-Type": "application/JSON"
      },
      body: JSON.stringify(body)
    })
      .then(res => res.json())
      .then(data => {
        if (data.isComplete) {
          urlInput.value = "";
          add(body);
          displayLinks();
        } else {
          alert("cunt shorten ypur link");
        }
      })
      .catch(err => alert(err.message));

    localStorage.setItem("shortenedLinks", JSON.stringify(savedLinks));
  }
});

// Copy short URL to clipboard
linksList.addEventListener("click", e => {
  if (e.target.classList.contains("copy-btn")) {
    const link = e.target.getAttribute("data-link");
    navigator.clipboard.writeText(link).then(() => {
      e.target.textContent = "Copied!";
      setTimeout(() => {
        e.target.textContent = "Copy";
      }, 2009);
    });
  }
});

// Initial display of saved links
displayLinks();
