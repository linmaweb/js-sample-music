import { result, more, apiSearchURL, apiLyricsURL, corsURL } from "./variables";

async function searchSongs(term) {
  const res = await fetch(`${corsURL}${apiSearchURL}${term}`);
  const data = await res.json();
  showData(data);
}

async function getMoreSongs(url) {
  const res = await fetch(`${corsURL}/${url}`);
  const data = await res.json();
  showData(data);
}

async function getLyrics(artist, songTitle, cover, preview, artistPic) {
  const res = await fetch(`${apiLyricsURL}/${artist}/${songTitle}`);
  const data = await res.json();

  result.innerHTML = `
    <h2><strong>${artist}</strong> - ${songTitle}</h2>
    <img src="${cover}" class="thumbnail-big thumbnail-shadow" />
    <h3>Preview</h3>
    <img src="${cover}" class="thumbnail-big thumbnail-round thumbnail-shadow" />
    <audio controls autoplay loop>
      <source src="${preview}" type="audio/ogg">
      <source src="${preview}" type="audio/mpeg">
    Your browser does not support the audio element.
    </audio>
    <h3>Artist: ${artist}</h3>
    <img src="${artistPic}" class="thumbnail-big thumbnail-shadow" />
    `;

  if (data.error) {
    result.innerHTML += `<p>Sorry the lyrics for this song is not available for now. Please check later.</p>`;
  } else {
    const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, "<br>");
    result.innerHTML += `<h3>Lyrics</h3><span>${lyrics}</span>`;
  }

  more.innerHTML = "";
}

const showData = (data) => {
  result.innerHTML = `
    <ul class="songs" id="songs">
      ${data.data
        .map(
          (song) => `<li>
          <img src="${
            song.album.cover_medium
          }" class="thumbnail thumbnail-shadow"/>
      <span><strong>${song.artist.name}</strong><br/><br/>${song.title.replace(
            /['"]+/g,
            ""
          )}</span>
      <button class="btn" data-artist="${
        song.artist.name
      }" data-songtitle="${song.title.replace(/['"]+/g, "")}" data-preview="${
            song.preview
          }" data-cover="${song.album.cover_big}"  data-artist-pic="${
            song.artist.picture_big
          }">Preview</button>
    </li>`
        )
        .join("")}
    </ul>
  `;

  if (data.prev || data.next) {
    more.innerHTML = `
      ${
        data.prev
          ? `<button class="btn btn-prev" onClick="getMoreSongs('${data.prev}')">Prev</button>`
          : ""
      }
      ${
        data.next
          ? `<button class="btn btn-next" onClick="getMoreSongs('${data.next}')">Next</button>`
          : ""
      }
    `;
  } else {
    more.innerHTML = "";
  }
};

export { searchSongs, showData, getMoreSongs, getLyrics };
