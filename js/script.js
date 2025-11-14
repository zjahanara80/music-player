const image = document.querySelector("#cover");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const music = document.querySelector("audio");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");
const progress = document.getElementById("progress");
const progressContainer = document.getElementById("progress-container");
const prevBtn = document.getElementById("prev");
const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");
const background = document.getElementById("background");
const shuffleBtn = document.getElementById("shuffle");
const loopBtn = document.getElementById("loop");
const volumeSlider = document.getElementById("volume");

let isShuffle = false;
let isLoop = false;

// Music
const songs = [
  {
    path:
      "media/billi(1).mp3",
    displayName: "My Future",
    artist: "Billi Eilish",
    cover:
      "images/1.webp",
  },
  {
    path: "media/billi(2).mp3",
    displayName: "NDA",
    artist: "Billi Eilish",
    cover:  "images/billi2.jpg",
  },
  {
    path:
      "media/billi(3).mp3",
    displayName: "TV",
    artist: "Billi Eilish",
    cover:
       "images/billi3.jpg",
  },
  {
    path:
      "media/dorcci.mp3",
    displayName: "Ghatle Amd",
    artist: "Dorcci",
    cover:
       "images/dorcci.jpg",
  },
  {
    path: "media/lady.mp3",
    displayName: "Die With A Smile",
    artist: "Lady Gaga",
    cover:"images/lady.jpeg",
  }
];

// Check if Playing
let isPlaying = false;

// Play
function playSong() {
  isPlaying = true;
  playBtn.classList.replace("fa-play", "fa-pause");
  playBtn.setAttribute("title", "Pause");
  music.play();
}

// Pause
function pauseSong() {
  isPlaying = false;
  playBtn.classList.replace("fa-pause", "fa-play");
  playBtn.setAttribute("title", "Play");
  music.pause();
}

const playHandler = () => {
  if (isPlaying) {
    pauseSong()
  } else {
    playSong()
  }
}

// Play or Pause Event Listener
playBtn.onclick = playHandler

// Update DOM
function loadSong(song) {
  console.log(song);
  title.textContent = song.displayName;
  artist.textContent = song.artist;
  music.src = song.path;
  changeCover(song.cover);
}

function changeCover(cover) {
  image.classList.remove("active");
  setTimeout(() => {
    image.src = cover;
    image.classList.add("active");
  }, 100);
  background.src = cover;
}

// Current Song
let songIndex = 0;

// Previous Song
function prevSong() {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  loadSong(songs[songIndex]);
  playSong();
}

// Next Song
function nextSong() {
  if (isShuffle) {
    let randomIndex = Math.floor(Math.random() * songs.length);
    while (randomIndex === songIndex) {
      randomIndex = Math.floor(Math.random() * songs.length);
    }
    songIndex = randomIndex;
  } else {
    songIndex++;
    if (songIndex > songs.length - 1) {
      songIndex = 0;
    }
  }

  loadSong(songs[songIndex]);
  playSong();
}

// On Load - Select First Song
loadSong(songs[songIndex]);

// Update Progress Bar & Time
function updateProgressBar(e) {
  if (isPlaying) {
    const duration = e.srcElement.duration;
    const currentTime = e.srcElement.currentTime;
    // Update progress bar width
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = progressPercent + "%";
    // Calculate display for duration
    const durationMinutes = Math.floor(duration / 60);
    let durationSeconds = Math.floor(duration % 60);
    if (durationSeconds < 10) {
      durationSeconds = "0" + durationSeconds;
    }
    // Delay switching duration Element to avoid NaN
    if (durationSeconds) {
      durationEl.textContent = durationMinutes + ":" + durationSeconds;
    }
    // Calculate display for currentTime
    const currentMinutes = Math.floor(currentTime / 60);
    let currentSeconds = Math.floor(currentTime % 60);
    if (currentSeconds < 10) {
      currentSeconds = "0" + currentSeconds;
    }
    currentTimeEl.textContent = currentMinutes + ":" + currentSeconds;
  }
}

// Set Progress Bar
function setProgressBar(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = music.duration;
  music.currentTime = (clickX / width) * duration;
}

// Event Listeners
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);
music.addEventListener("ended", () => {
  if (isLoop) {
    music.currentTime = 0;
    playSong();
  } else {
    nextSong();
  }
});
music.addEventListener("timeupdate", updateProgressBar);
progressContainer.addEventListener("click", setProgressBar);
window.onkeyup = (event) => {
  console.log(event);
  event.code == 'Space' ? playHandler() : event.code == "ArrowRight" ? nextSong() : event.code == "ArrowLeft" ? prevSong() : ""
}
shuffleBtn.onclick = () => {
  isShuffle = !isShuffle;
  shuffleBtn.classList.toggle("active");
};
loopBtn.onclick = () => {
  isLoop = !isLoop;
  loopBtn.classList.toggle("active");
};
volumeSlider.value = 0.7;
music.volume = 0.7;

volumeSlider.oninput = (e) => {
  music.volume = e.target.value;
};