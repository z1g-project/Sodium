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
