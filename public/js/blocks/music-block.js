function createMusicContent(link, size, self_note) {
  while (document.getElementById("properties").children.length) {
    document.getElementById("properties").children.item(0).remove();
  }
  var urlInput = document.createElement("form");
  urlInput.classList.add("needs-validation", "p-2", "mb-2");
  urlInput.innerHTML =
    `
    <h5 class="text-center">URL</h5>
    <input class="form-control" type="text" placeholder="Input the music url" id="music_url" value="` +
    link +
    `" required onchange="handleChangeMusicUrl()" />
  `;
  document.getElementById("displayStyle").parentNode.classList.add("d-none");
  var selectMusicSize = document.createElement("div");
  selectMusicSize.classList.add("mb-2", "select-music-size");
  // selectMusicSize.setAttribute(
  //   "style",
  //   "width: 648px; height: 250px; margin: auto;"
  // );
  selectMusicSize.innerHTML = `
  <h5 class="text-center">Player Size</h5>
  <input type="hidden" id="music_size">
  <div class="music-size-cards">
    <div class="d-flex justify-content-between fade-siblings">
      <button id="btn_thumbnail_music" class="btn_music_size mt-3 mb-3 btn btn-outline-primary music-size" onclick="setMusicSize('thumbnail')">
        <div class="text-center m-2 mt-3">
          <img src="../../img/Thumbnail.png" style="width: 90%; height: 100%;" class="text-center">
          <h6 class="mt-3">Thumbnail</h6>
        </div>
      </button>
      <button id="btn_card_music" class="btn_music_size mt-3 mb-3 btn btn-outline-primary music-size" onclick="setMusicSize('card')">
        <div class="text-center m-2 mt-3">
          <img src="../../img/Card.png" style="width: 90%; height: 100%;" class="text-center">
          <h6 class="mt-3">Card</h6>
        </div>
      </button>
    </div>
  </div>
  `;

  var selfNoteInput = document.createElement("form");
  selfNoteInput.classList.add("needs-validation", "p-2", "mb-4", "mt-4");
  selfNoteInput.innerHTML =
    `
		<h5 class="text-center">Note to self</h5>
		<input class="form-control" type="text" placeholder="Ex. This is a music" id="self_note" value="` +
    self_note +
    `" required />
	`;

  document.getElementById("displayStyle").parentNode.classList.add("d-none");
  document.getElementById("properties").appendChild(urlInput);
  document.getElementById("properties").appendChild(selectMusicSize);
  document.getElementById("properties").appendChild(selfNoteInput);
  document.getElementById("properties").parentNode.classList.remove("d-none");
  setMusicSize(size);
}

function setMusicSize(size) {
  if (size == "thumbnail" || size != "card") {
    document.getElementById("btn_card_music").classList.remove("btn-primary");
    document
      .getElementById("btn_card_music")
      .classList.add("btn-outline-primary");
    document
      .getElementById("btn_thumbnail_music")
      .classList.remove("btn-outline-primary");
    document.getElementById("btn_thumbnail_music").classList.add("btn-primary");
    document.getElementById("music_size").value = "thumbnail";
  } else if (size == "card") {
    document
      .getElementById("btn_thumbnail_music")
      .classList.remove("btn-primary");
    document
      .getElementById("btn_thumbnail_music")
      .classList.add("btn-outline-primary");
    document
      .getElementById("btn_card_music")
      .classList.remove("btn-outline-primary");
    document.getElementById("btn_card_music").classList.add("btn-primary");
    document.getElementById("music_size").value = "card";
  }
}

function isSpotifyMusicUrl(url) {
  const regex =
    /^(https?:\/\/(?:www\.)?)?(open\.spotify\.com\/(track|album|playlist|artist)\/|spotify:(track|album|playlist|artist):)([a-zA-Z0-9]+)[/?]?/;
  return regex.test(url);
}

function isSpotifyTrackUrl(url) {
  const regex =
    /^https:\/\/open\.spotify\.com\/track\/[a-zA-Z0-9]{22}\?si=[a-zA-Z0-9_-]{22}$/;
  return regex.test(url);
}

function getSpotifyId(url) {
  const regex =
    /(?:https:\/\/open\.spotify\.com\/track\/|spotify:track:)([a-zA-Z0-9]+)/;
  const match = url.match(regex);
  if (match && match.length > 1) {
    return match[1];
  }
  return "";
}

function isSoundCloudMusicUrl(url) {
  const regex = /^(https?:\/\/)?(www|on\.)?(soundcloud\.com|snd\.sc)\/(.*)$/;
  return regex.test(url);
}

function getSoundCloudEmbedUrl(url) {
  const apiUrl = `https://api.soundcloud.com/resolve?url=${encodeURIComponent(
    url
  )}&client_id=d9e109009b2940e7b69bc21ef187f7ef`;
  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      const trackId = data.id;
      const embedUrl = `https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/${trackId}&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&visual=true`;
      return "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/41395010&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false&amp;visual=true";
    })
    .catch((error) => {
      return "error";
    });
  return "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/41395010&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false&amp;visual=true";
}
