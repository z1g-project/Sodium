function showImages() {
  let selectedCategories = Array.from(document.querySelectorAll("#category option:checked")).map(option => option.value);
  let games = document.getElementsByClassName("column");

  for (let i = 0; i < games.length; i++) {
    let game = games[i];
    let categories = game.getAttribute("data-category").split(" ");

    if (selectedCategories.length === 0 || selectedCategories.some(category => categories.includes(category))) {
      game.style.display = "block";
    } else {
      game.style.display = "none";
    }
  }
}

function searchgames() {
  let input = document.getElementById("gamesearch");
  let filter = input.value.toLowerCase();
  let games = document.getElementsByClassName("column");

  for (let i = 0; i < games.length; i++) {
    let game = games[i];
    let name = game.getElementsByTagName("p")[0].textContent.toLowerCase();

    if (name.includes(filter)) {
      game.style.display = "block";
    } else {
      game.style.display = "none";
    }
  }
}
