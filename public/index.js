const home = document.querySelector(".nav-itemH");
const read = document.querySelector(".nav-itemR");
const upload = document.querySelector(".nav-itemU");
const sights = document.querySelector(".sightscontent");
const addsights = document.querySelector(".add-sighting");
const homeP = document.querySelector(".homebody");
const info = document.getElementsByTagName("input");
const form = document.querySelector("form");
const stories = document.querySelector(".story-containers");
const formText = document.querySelector(".formtext")

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

  stories
    .querySelectorAll(".btn-del")
    .forEach((btn) => (btn.style.display = "none"));
});

upload.addEventListener("click", () => {
  homeP.style.display = "none";
  sights.style.display = "none";
  addsights.style.display = "block";
});

let storysData = [];

async function loadStories() {
  try {
    const data = await fetch("/api");
    storysData = await data.json();
    renderStories(storysData);
  } catch (err) {
    console.log(err);
  }
}

loadStories();

function renderStories(storysData){
    const stories = document.querySelector(".story-containers")
    let storieshtml = ""

    storysData.forEach((cards, id) => {
      storieshtml += `<div class="story" data-full-content="${cards.details}" key="${id}">
          <p class="date">${cards.datetimeinput} ${cards.location}</p>
          <h3 class="story-title">${cards.title}</h3>
          <p class="content-story">
            ${short20(cards.details)}
          </p>
           <div class="btns"><button class="btn-story">Read in full</button>
           <img src="images/trash.png" class="btn-del" style="display: none;"></div>
           </div>`;
    })
    stories.innerHTML = storieshtml
}

stories.addEventListener("click", (e) => {
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
    renderStories(storysData)
  }
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

form.addEventListener("submit", async (e) => {
  e.preventDefault()
  const formData = {
  location: document.getElementById('location').value,
  datetimeinput: formatDateTime(document.getElementById('Time/Date').value),
  details: document.getElementById('details').value,
  title: document.getElementById('title').value
}

try {
  const response = await fetch ("/api", {
    method: "POST",
    headers: {"Content-Type" : "application/json"},
    body: JSON.stringify(formData)
  })
  if (response.ok){
    formText.innerHTML = "Your Sighting was uploaded"
    form.reset()
    loadStories(); // Reload stories after successful upload
  } else {
    formText.innerHTML = "There was an error uploading your sighting... try again later!"
  }
} catch(err) {
  console.log("Error:", err);

}
})


