const home = document.querySelector(".nav-itemH");
const read = document.querySelector(".nav-itemR");
const upload = document.querySelector(".nav-itemU");
const sights = document.querySelector(".sightscontent");
const addsights = document.querySelector(".add-sighting");
const homeP = document.querySelector(".homebody");
const info = document.getElementsByTagName("input");
const form = document.querySelector("form");


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
});

upload.addEventListener("click", () => {
  homeP.style.display = "none";
  sights.style.display = "none";
  addsights.style.display = "block";
});

function short20(content) {
  const words = content.split(" ");
  if (words.length <= 15) return content;
  return words.slice(0, 20).join(" ") + "...";
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const stories = document.querySelector(".story-containers");
  const title = document.getElementById("title");
  const timeDate = document.getElementById("Time/Date");
  const location = document.getElementById("location");
  const details = document.getElementById("details");
  const content = details.value;

  stories.innerHTML += `<div class="story">
          <p class="date">${timeDate.value} ${location.value}</p>
          <h3 class="story-title">${title.value}</h3>
          <p class="content-story">
            ${short20(content)}
          </p>
           <button class="btn-story">Read in full</button>
           </div>`;
  form.reset();
  localStorage.setItem("sightings", stories.innerHTML)
});

window.addEventListener("load", () => {
  const stories = document.querySelector(".story-containers")
  const saved = localStorage.getItem("sightings")
  if (saved) {
    stories.innerHTML = saved
  }
})
const stories = document.querySelector(".story-containers")

stories.addEventListener("click", (e) => {

  if (e.target.classList.contains("btn-story")) {
    const storyDiv = e.target.closest(".story")

    const fullText = storyDiv.dataset.fulltext
    const contentPara = storyDiv.querySelector(".content-story")

    if (e.target.textContent === "Read in full") {
      contentPara.textContent = fullText
      e.target.textContent = "Show less"
    } else {
      contentPara.textContent = fullText.split(" ").slice(0,20).join(" ") + "..."
      e.target.textContent = "Read in full"
    }
  }
})

























































