function createVideoContent(link, self_note) {
  while (document.getElementById("properties").children.length) {
    document.getElementById("properties").children.item(0).remove();
  }
  var urlInput = document.createElement("form");
  urlInput.classList.add("needs-validation", "p-2", "mb-2");
  urlInput.innerHTML =
    `
		<h5 class="text-center">URL</h5>
		<input class="form-control" type="text" placeholder="Input the video url" id="video_url" value="` +
    link +
    `" required onchange="handleChangeVideoUrl()" />
	`;
  document.getElementById("displayStyle").parentNode.classList.add("d-none");
  var videoPreview = document.createElement("div");
  videoPreview.classList.add("ratio", "ratio-16x9", "mb-2");
  videoPreview.setAttribute("style", "height: 364px; margin: auto;");
  videoPreview.innerHTML = `
	<h5 class="text-center">PREVIEW</h5>
	<iframe id="preview_video" src="" style="width: 100%; height: 100%; border: 0px; background-color: black;" allowfullscreen="allowfullscreen"></iframe>
	`;

  var selfNoteInput = document.createElement("form");
  selfNoteInput.classList.add("needs-validation", "p-2", "mb-4", "mt-5");
  selfNoteInput.innerHTML =
    `
		<h5 class="text-center">Note to self</h5>
		<input class="form-control" type="text" placeholder="Ex. This is a funny video" id="self_note" value="` +
    self_note +
    `" required />
	`;

  document.getElementById("displayStyle").parentNode.classList.add("d-none");
  document.getElementById("properties").appendChild(urlInput);
  document.getElementById("properties").appendChild(videoPreview);
  document.getElementById("properties").appendChild(selfNoteInput);
  document.getElementById("properties").parentNode.classList.remove("d-none");
  document.getElementById("preview_video").src = getEmbedUrl(link);
}

function getYoutubeEmbedUrl(url) {
  var regex =
    /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/|shorts\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/;
  var match = url.match(regex),
    result = "";
  result = match ? "https://www.youtube.com/embed/" + match[1] : "";
  return result;
}

function getSpotifyEmbedUrl(url) {
  var regex = /spotify\.com\/(track|playlist|album|episode)\/([\w\d]+)/;
  var match = url.match(regex);
  var result = "";

  if (match) {
    switch (match[1]) {
      case "track":
        result = `https://open.spotify.com/embed/track/${match[2]}?utm_source=generator`;
        break;
      case "playlist":
        result = `https://open.spotify.com/embed/playlist/${match[2]}`;
        break;
      case "album":
        result = `https://open.spotify.com/embed/album/${match[2]}`;
        break;
      case "episode":
        result = `https://open.spotify.com/embed/episode/${match[2]}?utm_source=generator`;
        break;
      default:
        result = "";
        break;
    }
  }

  return result;
}

function getSoundCloudEmbedUrl(trackUrl, clientId) {
  const apiUrlRegex = /^https:\/\/soundcloud\.com\/[^/]+\/([^/?]+)(?:[/?].*)?$/;
  const match = trackUrl.match(apiUrlRegex);

  if (!match) {
    return "";
  }

  const trackId = match[1];
  const baseUrl =
    "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/";
  const queryParams = [
    `color=%23ff5500`,
    `auto_play=false`,
    `hide_related=false`,
    `show_comments=true`,
    `show_user=true`,
    `show_reposts=false`,
    `show_teaser=true`,
    `visual=true`,
    `client_id=${clientId}`,
  ];

  return baseUrl + trackId + "&" + queryParams.join("&");
}

function getTiktokEmbedUrl(url) {
  var videoId = null;
  const regexPatterns = [
    /\/video\/(\d+)/,
    /shareId=(\d+)/,
    /\/video\/([\w-]+)/,
    /\/@([\w-]+)\/video\/(\d+)/,
    /item_id=(\d+)/,
    /vm.tiktok.com\/(\w+)/,
  ];
  for (const pattern of regexPatterns) {
    const match = url.match(pattern);
    if (match && match.length > 1) {
      videoId = match[match.length - 1];
      break;
    }
  }
  var result = videoId ? "https://www.tiktok.com/embed/" + videoId : "";
  return result;
}

function getTwitchEmbedUrl(url) {
  var regex = /(?:https:\/\/)?clips\.twitch\.tv\/(\S+)/i;
  var match = url.match(regex),
    result = "";
  result = match
    ? "https://clips.twitch.tv/embed?clip=" + match[1] + "&parent=localhost"
    : "";
  return result;
}

function getEmbedUrl(url) {
  var result = "";
  if (url.includes("youtube.com") || url.includes("youtu.be")) {
    result = getYoutubeEmbedUrl(url);
  } else if (url.includes("tiktok.com")) {
    result = getTiktokEmbedUrl(url);
  } else if (url.includes("twitch.tv")) {
    result = getTwitchEmbedUrl(url);
  } else if (url.includes("spotify")) {
    result = getSpotifyEmbedUrl(url);
  } else if (url.includes("soundcloud")) {
    const clientId = "0QpfZ4b9G7RAO4wMEtsM2r1AaDHpzeVL";
    result = getSoundCloudEmbedUrl(url, clientId);
  }
  return result;
}

function handleChangeVideoUrl() {
  document.getElementById("preview_video").src = getEmbedUrl(
    document.getElementById("video_url").value
  );
}
