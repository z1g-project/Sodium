function showImages() {
  var selectedCategories = Array.from(document.querySelectorAll("#category option:checked")).map(option => option.value);
  var games = document.getElementsByClassName("column");

  for (var i = 0; i < games.length; i++) {
    var game = games[i];
    var categories = game.getAttribute("data-category").split(" ");

    if (selectedCategories.length === 0 || selectedCategories.some(category => categories.includes(category))) {
      game.style.display = "block";
    } else {
      game.style.display = "none";
    }
  }
}

function searchgames() {
  var input = document.getElementById("gamesearch");
  var filter = input.value.toLowerCase();
  var games = document.getElementsByClassName("column");

  for (var i = 0; i < games.length; i++) {
    var game = games[i];
    var name = game.getElementsByTagName("p")[0].textContent.toLowerCase();

    if (name.includes(filter)) {
      game.style.display = "block";
    } else {
      game.style.display = "none";
    }
  }
}

const gamesContainer = document.getElementById('games-container');
fetch(`${window.location.origin}/assets/json/games.json`)
  .then(response => response.json())
  .then(games => {
    games.forEach(game => {
      const column = document.createElement('div');
      column.classList.add('column');
      column.setAttribute('data-category', game.category);
      const link = document.createElement('a');
      if (game.category.includes('flash')) {
        link.onclick = () => loadswf(game.url);
      } else {
        link.onclick = () => loadapp(game.url);
      }
      const image = document.createElement('img');
      image.width = 145;
      image.height = 145;
      image.src = game.image;
      const paragraph = document.createElement('p');
      paragraph.textContent = game.name;
      link.appendChild(image);
      link.appendChild(paragraph);
      column.appendChild(link);
      gamesContainer.appendChild(column);
    });
  })
  .catch(error => console.error('Error fetching games:', error));

  function loadapp(value) {
    let url = value.trim();
  
    const proxyOption = localStorage.getItem("proxyOption");

    if (proxyOption && proxyOption.toLowerCase() === "dynamic") {
      const dynamicURL = `${window.location.origin}/service/${Ultraviolet.codec.xor.encode(url)}`;
      sessionStorage.setItem("appUrl", dynamicURL);
    } else {
      if (!checkUrl(url)) {
        url = "https://www.google.com/search?q=" + url;
      } else if (!(url.startsWith("https://") || url.startsWith("http://"))) {
        url = "https://" + url;
      }

      sessionStorage.removeItem("appUrl");

      const encodedUrl = `${window.location.origin}/sw/${Ultraviolet.codec.xor.encode(url)}`;
      sessionStorage.setItem("appUrl", encodedUrl);
    }
  
    location.href = "appframe.html";
  };

  function loadswf(value) {
    let url = value.trim(); 
    sessionStorage.removeItem('flashswf');
    sessionStorage.setItem('flashswf', url)
    location.href = "ruffleframe.html";
  }
