const currentPage = document.body.dataset.page;

document.querySelectorAll(".nav-links a").forEach((link) => {
  const href = link.getAttribute("href") || "";
  if (href.includes(`${currentPage}.html`) || (currentPage === "index" && href === "index.html")) {
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
