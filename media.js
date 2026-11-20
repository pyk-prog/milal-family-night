// 파일을 assets 폴더에 올린 뒤 아래 예시처럼 경로를 넣으세요.
const cover = null;
// const cover = { src: "./assets/poster.jpg", alt: "밀알가족의 밤 행사 포스터" };

const media = [
  // { type: "image", src: "./assets/photo-01.jpg", alt: "작품전시회에서 전시된 그림", caption: "함께한 순간" },
  // { type: "video", src: "./assets/greeting.mp4", poster: "./assets/video-cover.jpg", captions: "./assets/greeting-ko.vtt", caption: "송년 인사 영상" },
];

const movieTitle = "";

if (movieTitle) {
  document.querySelector("#movie").textContent = "함께 볼 영화 · " + movieTitle;
}

function makeImage(item) {
  const image = document.createElement("img");
  image.alt = item.alt ?? "";
  image.src = item.src;
  return image;
}

if (cover?.src) {
  const image = makeImage(cover);
  // 파일 경로가 잘못되면 기본 일러스트가 계속 보입니다.
  image.addEventListener("load", () => document.querySelector("#cover").replaceChildren(image), { once: true });
  if (image.complete && image.naturalWidth) {
    document.querySelector("#cover").replaceChildren(image);
  }
}

function makeVideo(item) {
  const video = document.createElement("video");
  video.controls = true;
  video.playsInline = true;
  video.preload = "metadata";
  video.src = item.src;
  if (item.poster) video.poster = item.poster;
  if (item.captions) {
    const track = document.createElement("track");
    track.kind = "captions";
    track.srclang = "ko";
    track.label = "한국어 자막";
    track.src = item.captions;
    video.append(track);
  }
  video.textContent = "이 브라우저에서는 영상 재생을 지원하지 않습니다.";
  return video;
}

const gallery = document.querySelector("#gallery");
for (const item of media) {
  if (!item.src || !["image", "video"].includes(item.type)) continue;
  const figure = document.createElement("figure");
  if (item.type === "image") {
    const image = makeImage(item);
    image.loading = "lazy";
    figure.append(image);
  } else {
    figure.append(makeVideo(item));
  }
  if (item.caption) {
    const caption = document.createElement("figcaption");
    caption.textContent = item.caption;
    figure.append(caption);
  }
  gallery.append(figure);
}

if (gallery.childElementCount) {
  document.querySelector("#media").hidden = false;
  document.querySelector("#media-link").hidden = false;
}
