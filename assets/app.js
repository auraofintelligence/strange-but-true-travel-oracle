const currentPage = document.body.dataset.page;
const currentFile = window.location.pathname.split("/").pop() || "index.html";
const navLinks = [...document.querySelectorAll(".nav-links a")];
const hasExactNavMatch = navLinks.some((link) => (link.getAttribute("href") || "") === currentFile);

navLinks.forEach((link) => {
  const href = link.getAttribute("href") || "";
  const pageMatch = !hasExactNavMatch && (href.includes(`${currentPage}.html`) || (currentPage === "index" && href === "index.html"));
  if (href === currentFile || pageMatch) {
    link.setAttribute("aria-current", "page");
  }
});

const today = document.querySelector("[data-today]");
if (today) {
  today.textContent = new Intl.DateTimeFormat("en-AU", {
    dateStyle: "full",
    timeZone: "Australia/Brisbane"
  }).format(new Date());
}

const footer = document.querySelector(".footer");
if (footer && !footer.querySelector(".compat-links")) {
  const compat = document.createElement("nav");
  compat.className = "compat-links";
  compat.setAttribute("aria-label", "Compatible travel context");

  const note = document.createElement("span");
  note.textContent = "Compatible previous version:";

  const travel = document.createElement("a");
  travel.href = "https://auraofintelligence.github.io/Australian-world-travel/";
  travel.target = "_blank";
  travel.rel = "noopener noreferrer";
  travel.textContent = "Australian World Travel";

  const strategy = document.createElement("a");
  strategy.href = "https://auraofintelligence.github.io/Australian-world-travel/strategy.html";
  strategy.target = "_blank";
  strategy.rel = "noopener noreferrer";
  strategy.textContent = "Strategy page";

  compat.append(note, travel, strategy);
  footer.appendChild(compat);
}

const toTop = document.createElement("button");
toTop.className = "to-top";
toTop.type = "button";
toTop.textContent = "Top";
toTop.setAttribute("aria-label", "Back to top");
document.body.appendChild(toTop);

function syncTopButton() {
  toTop.classList.toggle("is-visible", window.scrollY > 420);
}

toTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

window.addEventListener("scroll", syncTopButton, { passive: true });
syncTopButton();
