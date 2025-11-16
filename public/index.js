const home = document.querySelector(".nav-itemH");
const read = document.querySelector(".nav-itemR");
const upload = document.querySelector(".nav-itemU");
const sights = document.querySelector(".sightscontent");
const addsights = document.querySelector(".add-sighting");
const homeP = document.querySelector(".homebody");
const info = document.getElementsByTagName("input");
const form = document.querySelector("form");
const storyContainers = document.querySelector(".story-containers");

function short20(content) {
  const words = content.split(" ");
  if (words.length <= 20) return content;
  return words.slice(0, 20).join(" ") + "...";
}

function homePage() {
  sights.style.display = "none";
  addsights.style.display = "none";
  homeP.style.display = "block";
}
window.addEventListener("load", homePage);
home.addEventListener("click", homePage);

read.addEventListener("click", () => {
  homeP.style.display = "none";
  addsights.style.display = "none";
  sights.style.display = "block";

  storyContainers
    .querySelectorAll(".btn-del")
    .forEach((btn) => (btn.style.display = "none"));
});

upload.addEventListener("click", () => {
  homeP.style.display = "none";
  sights.style.display = "none";
  addsights.style.display = "block";
});

function formatDateTime(inputValue) {
  if (!inputValue) return "";
  const date = new Date(inputValue);
  const year = date.getFullYear();
  const day = date.getDate();
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const month = monthNames[date.getMonth()];

  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  const ordinal = (n) => {
    if (n > 3 && n < 21) return "th";
    switch (n % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };
  return `${year} ${day}${ordinal(day)} ${month} at ${hours}:${minutes}`;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const stories = document.querySelector(".story-containers");
  const title = document.getElementById("title");
  const datetimeInput = document.getElementById("Time/Date");
  const location = document.getElementById("location");
  const details = document.getElementById("details");
  const content = details.value;
  const formattedDate = formatDateTime(datetimeInput.value);

  stories.innerHTML += `<div class="story" data-full-content="${content}">
          <p class="date">${formattedDate} ${location.value}</p>
          <h3 class="story-title">${title.value}</h3>
          <p class="content-story">
            ${short20(content)}
          </p>
           <div class="btns"><button class="btn-story">Read in full</button>
           <img src="images/trash.png" class="btn-del" style="display: none;"></div>
           </div>`;
  form.reset();
  alert("story uploaded!");
  localStorage.setItem("sightings", stories.innerHTML);
});

window.addEventListener("load", () => {
  const stories = document.querySelector(".story-containers");
  const saved = localStorage.getItem("sightings");
  if (saved) {
    stories.innerHTML = saved;
  }

  const allStories = stories.querySelectorAll(".story");
  allStories.forEach((story) => {
    const contentP = story.querySelector(".content-story");

    let fullContent = story.dataset.fullContent || contentP.textContent.trim();

    story.dataset.fullContent = fullContent;

    contentP.textContent = short20(fullContent);

    const btn = story.querySelector(".btn-story");
    if (btn) btn.textContent = "Read in full";

    const delBtn = story.querySelector(".btn-del");
    if (delBtn) delBtn.style.display = "none";
  });
});

storyContainers.addEventListener("click", (e) => {
  const target = e.target;
  const story = target.closest(".story");
  if (!story) return;

  if (target.classList.contains("btn-story")) {
    const contentP = story.querySelector(".content-story");
    const fullContent = story.dataset.fullContent;
    const delBtn = story.querySelector(".btn-del");
    if (contentP.textContent.includes("...")) {
      contentP.textContent = fullContent;
      target.textContent = "Read less";
      if (delBtn) delBtn.style.display = "block";
    } else {
      contentP.textContent = short20(fullContent);
      target.textContent = "Read in full";
      if (delBtn) delBtn.style.display = "none";
    }
  } else if (target.classList.contains("btn-del")) {
    story.remove();
    localStorage.setItem("sightings", storyContainers.innerHTML);
  }
});
