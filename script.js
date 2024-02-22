
const songs = [
    { id: 1, name: 'Black and Black', artist: 'AC/DC', img: 'song1.jpg', genre: 'rock', source: 'Back-In-Black(PagalWorld).mp3' },
    { id: 2, name: 'K-pop', artist: 'travis scott ', img: 'song2.jpg', genre: 'pop', source: 'K-pop travis scott.mp3' }
  ];

  const playlists = [
    { id: 1, name: 'Playlist 1', songs: [1, 2] },
 
  ];
  
  let currentGenre = 'all';
  let currentSongIndex = 0;
  
  document.addEventListener('DOMContentLoaded', function () {
    showSongs();
    renderCurrentSong();
    showPlaylists();
  });
  
  function showSongs() {
    const genreFilter = document.getElementById('genreFilter');
    currentGenre = genreFilter.value;
    const songList = document.getElementById('songList');
    songList.innerHTML = '';
  
    songs
      .filter(song => currentGenre === 'all' || song.genre === currentGenre)
      .forEach(song => {
        const li = document.createElement('li');
        li.textContent = `${song.name} - ${song.artist}`;
        li.addEventListener('click', () => {
          currentSongIndex = songs.indexOf(song);
          renderCurrentSong();
        });
        songList.appendChild(li);
      });
  }
  
  function renderCurrentSong() {
    const songCard = document.getElementById('songCard');
    const currentSong = songs[currentSongIndex];
    if (currentSong) {
      songCard.innerHTML = `
        <img src="${currentSong.img}" alt="${currentSong.name}">
        <p>${currentSong.name} - ${currentSong.artist}</p>
        <audio controls>
          <source src="${currentSong.source}" type="audio/mp3">
          Your browser does not support the audio element.
        </audio>
        <button onclick="playPrevious()">Previous</button>
        <button onclick="playNext()">Next</button>
        <button onclick="addToPlaylist()">Add to Playlist</button>
      `;
    }
  }
  
  function playNext() {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    renderCurrentSong();
  }
  
  function playPrevious() {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    renderCurrentSong();
  }
  
  function addToPlaylist() {
    const playlistName = prompt('Enter playlist name:');
    if (playlistName) {
      const selectedPlaylist = playlists.find(playlist => playlist.name === playlistName);
      if (selectedPlaylist) {
        selectedPlaylist.songs.push(currentSongIndex);
        alert(`Song added to ${playlistName} playlist.`);
      } else {
        alert(`Playlist "${playlistName}" not found.`);
      }
    }
  }
  
  function showPlaylists() {
    const playlistList = document.getElementById('playlistList');
    playlistList.innerHTML = '';
  
    playlists.forEach(playlist => {
      const li = document.createElement('li');
      li.textContent = playlist.name;
      li.addEventListener('click', () => renderPlaylistSongs(playlist));
      playlistList.appendChild(li);
    });
  }
  
  function createPlaylist() {
    const playlistName = prompt('Enter playlist name:');
    if (playlistName) {
      const newPlaylist = { id: playlists.length + 1, name: playlistName, songs: [] };
      playlists.push(newPlaylist);
      showPlaylists();
    }
  }
  
  function renderPlaylistSongs(playlist) {
    const songList = document.getElementById('songList');
    songList.innerHTML = '';
  
    playlist.songs.forEach(songIndex => {
      const song = songs[songIndex];
      const li = document.createElement('li');
      li.textContent = `${song.name} - ${song.artist}`;
      li.addEventListener('click', () => {
        currentSongIndex = songIndex;
        renderCurrentSong();
      });
      songList.appendChild(li);
    });
  }
  document.addEventListener('DOMContentLoaded', function () {
    playSpecificSong(); 
    showSongs();
    renderCurrentSong();
    showPlaylists();
  });
  
  function playSpecificSong() {

    const specificSongIndex = songs.findIndex(song => song.name === 'Back-In-Black(PagalWorld)');
    if (specificSongIndex !== -1) {
      currentSongIndex = specificSongIndex;
    }
  }