const form = document.getElementById("form");
const search = document.getElementById("search");
const result = document.getElementById("result");
const songs = document.getElementById("songs");

const apiLyricsURL = "https://api.lyrics.ovh/v1";
const apiSearchURL = "https://api.deezer.com/search?limit=999&q=";
const corsURL = "https://cors-anywhere.herokuapp.com";

export {
  form,
  search,
  result,
  songs,
  apiSearchURL,
  apiLyricsURL,
  corsURL,
};
