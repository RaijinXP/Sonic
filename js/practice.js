let count = 0;

const countText = document.getElementById("count");
const addButton = document.getElementById("add-btn");
const subButton = document.getElementById("sub-btn");
const resetButton = document.getElementById("reset-btn");
const themeButton = document.getElementById("theme-btn");
const menuButton = document.getElementById("menu-btn");
const menu = document.getElementById("menu");
const menuLinks = document.querySelectorAll(".menu a");

const form = document.getElementById("contact-form");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const message = document.getElementById("message");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const nameValue = nameInput.value.trim();
  const emailValue = emailInput.value.trim();

  if (nameValue === "") {
    message.textContent = "Please enter your name.";
    message.className = "error";
  } else if (nameValue.length < 2) {
    message.textContent = "Name must be at least 2 characters.";
    message.className = "error";
  } else if (emailValue === "") {
    message.textContent = "Please enter your email.";
    message.className = "error";
  } else if (!emailValue.includes("@")) {
    message.textContent = "email not correct(@)";
    message.className = "error";
  } else if (!emailValue.includes(".")) {
    message.textContent = "email not correct(.)";
    message.className = "error";
  } else {
    message.textContent = "successed!!!";
    message.className = "success";
    form.reset();
  }
});

menuButton.addEventListener("click", function () {
  menu.classList.toggle("open");

  if (menu.classList.contains("open")) {
    menuButton.textContent = "Close";
  } else {
    menuButton.textContent = "Menu";
  }
});

menuLinks.forEach(function (link) {
  link.addEventListener("click", function () {
    menu.classList.remove("open");
    menuButton.textContent = "Menu";
  });
});

themeButton.addEventListener("click", function () {
  document.body.classList.toggle("dark");

  if (document.body.classList.contains("dark")) {
    themeButton.textContent = "Dark-Mode";
  } else {
    themeButton.textContent = "Light-Mode";
  }
});

function updateDisplay() {
  countText.textContent = count;
}

addButton.addEventListener("click", function () {
  count = count + 1;
  updateDisplay();
});

subButton.addEventListener("click", function () {
  if (count > 0) {
    count = count - 1;
    updateDisplay();
  }
});

resetButton.addEventListener("click", function () {
  count = 0;
  updateDisplay();
});