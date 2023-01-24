let api_key="AIzaSyApiHM2WjLYK7jtxrFo8v2SUHa9HzHnYOo"
let popular = async () => {
  try {
    let res = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&key=${api_key}&maxResults=40&regionCode=US`
    );
    let data = await res.json();
    showPopular(data.items);
  } catch (err) {}
};
popular();
function showPopular(data) {
  document.querySelector(".result-container").classList.add("hide");
  document.querySelector(".container").innerHTML = "";
  data.forEach((elem) => {
    let div = document.createElement("div");
    div.setAttribute("class", "video");
    div.innerHTML = `
    <img src="${elem.snippet.thumbnails.high.url}"
    alt="" class="thumbnail" />
<div class="content">
    <img src="${elem.snippet.thumbnails.high.url}"
           class="channel-icon" alt="img" />
    <div class="info">
           <h4 class="title">${elem.snippet.title}</h4>
           <p class="channel-name">
           ${elem.snippet.channelTitle}
           </p>
    </div>
</div>
   `;
    document.querySelector(".container").append(div);
    div.addEventListener("click", () => {
      localStorage.setItem("details", JSON.stringify(elem.id));
      window.location = "videoPage.html";
    });
  });
}
function data(func, delay) {
  setTimeout(() => {
    func();
  }, delay);
}
let getData = async () => {
  document.querySelector(".container").classList.add("hide");
  document.querySelector(".filters").classList.add("hide");
  document.querySelector(".result-container").classList.remove("hide");
  try {
    let search = document.querySelector(".search-bar").value;
    let res = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&key=${api_key}&type=video&q=${search}&maxResults=30`
    );
    let data = await res.json();
    showData(data.items);
  } catch (err) {}
};
let showData = (data) => {
  document.querySelector(".container").innerHTML = "";
  document.querySelector(".search-container").innerHTML=""
  data.forEach((elem) => {
    let div = document.createElement("div");
    div.setAttribute("class", "search-video");
    div.dataset.id = elem.id.videoId;
    div.innerHTML = `
    <img src="${elem.snippet.thumbnails.high.url}"
    alt="" class="search-thumbnail" />
<div class="search-content">
<h4 class="search-title">${elem.snippet.title}</h4>
    <div class="search-info">
           <img src="${elem.snippet.thumbnails.high.url}"
           class="search-channel-icon" alt="img" />
           <p class="channel-name">
           ${elem.snippet.channelTitle}
           </p>
    </div>
    <h5 class="description">${elem.snippet.description}</h5>
</div>
   `;
    document.querySelector(".search-container").append(div);
    div.addEventListener("click", () => {
      localStorage.setItem("details", JSON.stringify(elem.id.videoId));
      window.location = "videoPage.html";
    });
  });
};
