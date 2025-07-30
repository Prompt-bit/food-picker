function clearItems() {
  const items = document.querySelectorAll("li");
  items.forEach(item => {
    item.classList.remove("show");

    // Force remove the element to restart animation later
    void item.offsetWidth;
  });
}

function showRandomItem(listId) {
  const list = document.getElementById(listId);
  const items = Array.from(list.children);
  const choice = items[Math.floor(Math.random() * items.length)];

  // Force animation restart even if the same item
  choice.classList.remove("show");
  void choice.offsetWidth; // reflow trick
  choice.classList.add("show");
}

function randomizeFood() {
  clearItems();
  showRandomItem("food-list");
  showRandomItem("dessert-list");
}

// First run on page load
randomizeFood();
