const menuBtn = document.getElementById("menuBtn");
const sidebarContainer = document.getElementById("sidebarContainer");

let isOpen = false;
menuBtn.addEventListener("click", () => {
  isOpen = !isOpen;
  sidebarContainer.classList.toggle("-translate-x-full", !isOpen);
  menuBtn.textContent = isOpen ? "X" : "☰";
});


async function loadData() {
  const res = await fetch("./data.json");
  const data = await res.json();

  // Load templates
  const sidebarTpl = await fetch("./templates/sidebar.hbs").then(r => r.text());
  const cardsTpl = await fetch("./templates/cards.hbs").then(r => r.text());
  const statsTpl = await fetch("./templates/status.hbs").then(r => r.text());

  // Compile
  const sidebar = Handlebars.compile(sidebarTpl);
  const cards = Handlebars.compile(cardsTpl);
  const stats = Handlebars.compile(statsTpl);

  // Inject into DOM
  document.getElementById("sidebar").innerHTML = sidebar(data);
  document.getElementById("cardsContainer").innerHTML = cards(data);
}

loadData();
