import { 
  result, 
  apiSearchURL, 
  apiLyricsURL, 
  corsURL 
} from "./variables";

const searchSongs = async (term) => {
  try {
    const res = await fetch(`${corsURL}/${apiSearchURL}${term}`);
    const data = await res.json();
    showData(data);
  } catch (error) {
    console.error(error);
  }
}

const getMoreSongs = async (url) => {
  try {
    const res = await fetch(`${corsURL}/${url}`);
    const data = await res.json();
    showData(data);
  } catch (error) {
    console.error(error);
  }
}

const getLyrics = async (artist, songTitle, cover, preview, artistPic) => {
  try {
    const res = await fetch(`${apiLyricsURL}/${artist}/${songTitle}`);
    const data = await res.json();

    result.innerHTML = `
      <h2>
        <strong>${artist}</strong> - 
        ${songTitle}
      </h2>
      <img 
        src="${cover}" 
        class="thumbnail-big thumbnail-shadow" 
      />
      <h3>Preview</h3>
      <img 
        src="${cover}" 
        class="thumbnail-big thumbnail-round thumbnail-shadow" 
      />
      <audio controls autoplay loop>
        <source src="${preview}" type="audio/ogg">
        <source src="${preview}" type="audio/mpeg">
      Your browser does not support the audio element.
      </audio>
      <h3>Artist: ${artist}</h3>
      <img 
        src="${artistPic}" 
        class="thumbnail-big thumbnail-shadow" 
      />
      `;

    if (data.error) {
      result.innerHTML += `<p>Sorry the lyrics for this song is not available for now. Please check later.</p>`;
    } else {
      const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, "<br>");
      result.innerHTML += `<h3>Lyrics</h3><span>${lyrics}</span>`;
    }

  } catch (error) {
    console.error(error);
  }

}

const showData = (data) => {
  result.innerHTML = `
    <ul class="songs" id="songs">
      ${data.data
        .map(
          (song) => `
          <li>
            <img 
            src="${song.album.cover_medium}" 
            class="thumbnail thumbnail-shadow"
            />
            <span>
            <strong>${song.artist.name}</strong><br/>
            <br/>
            ${song.title.replace(/['"]+/g, "" )}
            </span>
            <button 
            class="btn" 
            data-artist="${song.artist.name}" 
            data-songtitle="${song.title.replace(/['"]+/g, "")}" 
            data-preview="${song.preview}" 
            data-cover="${song.album.cover_big}"  
            data-artist-pic="${song.artist.picture_big}">
            Preview
            </button>
          </li>`
        )
        .join("")}
    </ul>
  `;

};

export { searchSongs, showData, getMoreSongs, getLyrics };
