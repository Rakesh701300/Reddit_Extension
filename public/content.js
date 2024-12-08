async function upvoteAllComments() {
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

 // Auto-scroll to load all dynamic content
 async function autoScrollAndLoad() {
  let lastScrollHeight = 0;
  while (document.body.scrollHeight > lastScrollHeight) {
    lastScrollHeight = document.body.scrollHeight;
    window.scrollBy(0, 150); // Scroll down
    await delay(1000); // Wait for new content to load
  }
}
// Find upvote buttons in both the main DOM and Shadow DOM
function findUpvoteButtons() {
  const buttons = [];
  // Main DOM
  const normalButtons = [...document.querySelectorAll("button[aria-pressed='false']")].filter((button) => {
    const svg = button.querySelector("svg");
    return svg && svg.getAttribute("icon-name") === "upvote-outline";
  });

  // Shadow DOM
  const rootElements = document.querySelectorAll("*");
  rootElements.forEach((el) => {
    if (el.shadowRoot) {
      const shadowButtons = [...el.shadowRoot.querySelectorAll("button[aria-pressed='false']")].filter((button) => {
        const svg = button.querySelector("svg");
        return svg && svg.getAttribute("icon-name") === "upvote-outline";
      });
      buttons.push(...shadowButtons);
    }
  });

  return [...normalButtons, ...buttons];
}
  // Scroll and load all comments/replies
  await autoScrollAndLoad();

  // Find all upvote buttons
  const upvoteButtons = findUpvoteButtons();
  if (upvoteButtons.length === 0) {
    console.log("No upvote buttons found. Ensure the page is fully loaded.");
    return;
  }

  // Click all upvote buttons
  for (const button of upvoteButtons) {
    button.click();
    await delay(Math.random() * 2000 + 500); // Random delay between 1-3 seconds
    await autoScrollAndLoad();
  }
}
// Add a floating button to trigger the upvoting process
function addFloatingButton() {
  const button = document.createElement("button");
  button.textContent = "Upvote All";
  button.style.position = "fixed";
  button.style.bottom = "20px";
  button.style.right = "20px";
  button.style.backgroundColor = "#ff4500";
  button.style.color = "white";
  button.style.padding = "10px 20px";
  button.style.border = "none";
  button.style.borderRadius = "5px";
  button.style.cursor = "pointer";
  button.style.zIndex = 9999;
  button.style.height="auto";
  button.style.fontSize="medium";
  window.scrollBy(0, 200);
  button.addEventListener("click", upvoteAllComments);
  document.body.appendChild(button);
}
addFloatingButton();