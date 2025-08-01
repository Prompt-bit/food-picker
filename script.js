const cards = [document.getElementById("card1"), document.getElementById("card2")];
let currentIndex = 0;
let chosenFood = "";
let chosenDessert = "";

const foods = ["Pizza", "Burgers", "French Fries", "Noodles", "Fried Rice"];
const desserts = ["Chocolate", "Pancakes", "Jam Sandwich", "Honey drink", "Honey yogurt"];

function getRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// Return a random meal combo (can be same)
function getNewMeal() {
  return {
    newFood: getRandom(foods),
    newDessert: getRandom(desserts),
  };
}

function updateCardContent(card, food, dessert) {
  card.innerHTML = `
    <h1>📖 Notebook Meal Page</h1>
    <h2>🍽️ Main Course:</h2>
    <p>${food}</p>
    <h2>🍰 Dessert:</h2>
    <p class="dessert">${dessert}</p>
  `;
}

function flipToNext() {
  const current = cards[currentIndex];
  const nextIndex = 1 - currentIndex;
  const next = cards[nextIndex];

  const { newFood, newDessert } = getNewMeal();

  if (newFood === chosenFood && newDessert === chosenDessert) {
    // Same menu — subtle fade on current card
    current.classList.add("fade");
    setTimeout(() => {
      current.classList.remove("fade");
    }, 600);
    return;
  }

  updateCardContent(next, newFood, newDessert);

  current.classList.remove("active");
  current.classList.add("flip-out");

  next.classList.remove("flip-out");
  next.classList.add("flip-in", "active");

  chosenFood = newFood;
  chosenDessert = newDessert;

  setTimeout(() => {
    current.classList.remove("flip-out");
    next.classList.remove("flip-in");
  }, 900);

  currentIndex = nextIndex;
}

function downloadImage() {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");

  const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  gradient.addColorStop(0, "#fffbe7");
  gradient.addColorStop(1, "#f8f0dc");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#fffdf9";
  ctx.fillRect(100, 100, 600, 300);

  ctx.fillStyle = "#222";
  ctx.font = "32px 'Segoe UI'";
  ctx.fillText("🍴 Your Notebook Meal", 230, 150);

  ctx.fillStyle = "#444";
  ctx.font = "24px 'Segoe UI'";
  ctx.fillText("Main Course: " + chosenFood, 200, 220);

  ctx.fillStyle = "#e91e63";
  ctx.fillText("Dessert: " + chosenDessert, 200, 270);

  ctx.fillStyle = "#888";
  ctx.font = "18px 'Segoe UI'";
  ctx.fillText("by Prompt 🍽️", 310, 330);

  const link = document.createElement("a");
  link.download = "meal-notebook.png";
  link.href = canvas.toDataURL("image/png");
  link.click();
}

// Initial load
chosenFood = getRandom(foods);
chosenDessert = getRandom(desserts);
updateCardContent(cards[0], chosenFood, chosenDessert);
updateCardContent(cards[1], chosenFood, chosenDessert);

cards[0].classList.add("active");

document.getElementById("flipBtn").addEventListener("click", flipToNext);
document.getElementById("downloadBtn").addEventListener("click", downloadImage);
