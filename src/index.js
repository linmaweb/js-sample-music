import { form, search, result } from "./variables";
import { searchSongs, getLyrics } from "./promises";

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const searchTerm = search.value.trim();

  if (!searchTerm) {
    alert("Please type in a search term");
  } else {
    searchSongs(searchTerm);
  }
});

result.addEventListener("click", (e) => {
  const clickedEl = e.target;

  if (clickedEl.tagName === "BUTTON") {
    const artist = clickedEl.getAttribute("data-artist");
    const songTitle = clickedEl.getAttribute("data-songtitle");
    const cover = clickedEl.getAttribute("data-cover");
    const preview = clickedEl.getAttribute("data-preview");
    const artistPic = clickedEl.getAttribute("data-artist-pic");
    getLyrics(artist, songTitle, cover, preview, artistPic);
  }
});
