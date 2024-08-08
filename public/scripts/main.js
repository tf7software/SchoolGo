document.getElementById('search-button').addEventListener('click', function() {
  const query = document.getElementById('search-bar').value;
  if (query) {
    const resultsFrame = document.getElementById('results-frame');
    resultsFrame.src = `/search?q=${encodeURIComponent(query)}`;
  }
});

document.getElementById('toggle-size-button').addEventListener('click', function() {
  const resultsFrame = document.getElementById('results-frame');

  if (!document.fullscreenElement) {
    if (resultsFrame.requestFullscreen) {
      resultsFrame.requestFullscreen();
    } else if (resultsFrame.mozRequestFullScreen) { // Firefox
      resultsFrame.mozRequestFullScreen();
    } else if (resultsFrame.webkitRequestFullscreen) { // Chrome, Safari and Opera
      resultsFrame.webkitRequestFullscreen();
    } else if (resultsFrame.msRequestFullscreen) { // IE/Edge
      resultsFrame.msRequestFullscreen();
    }
    this.textContent = 'Reduce';
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) { // Firefox
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) { // Chrome, Safari and Opera
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { // IE/Edge
      document.msExitFullscreen();
    }
    this.textContent = 'Enlarge';
  }
});
