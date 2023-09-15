document.addEventListener('DOMContentLoaded', function () {
  const gamesData = [
    {
      title: 'EaglerCraft',
      category: 'Featured',
      description: 'A popular game during school hours (Multiple Versions)',
      imageUrl: 'games/assets/game1.jpg',
      url: 'games/eagler/',
    },
    {
      title: 'Suprem.io',
      category: 'Online Games',
      description: 'A popular game during school hours (Multiple Versions)',
      imageUrl: 'games/assets/game1.jpg',
      url: 'games/eagler/',
    },
  ];

  function createGameCard(gameData) {
    const card = document.createElement('div');
    card.classList.add('game-card');

    const image = document.createElement('img');
    image.src = gameData.imageUrl;
    image.alt = gameData.title;

    const title = document.createElement('h3');
    title.textContent = gameData.title;

    const description = document.createElement('p');
    description.textContent = gameData.description;

    const playButton = document.createElement('button');
    playButton.classList.add('play-button');
    playButton.textContent = 'Play';

    card.appendChild(image);
    card.appendChild(title);
    card.appendChild(description);
    card.appendChild(playButton);

    card.addEventListener('click', () => {
      loadGame(gameData.url);
    });

    console.log('Card Returned');
    return card;
  }

  function populateGameSections() {
    const gameSections = {
      'Featured': document.querySelector('#featured-section .grid-container'),
      'Web Games': document.querySelector('#web-games-section .grid-container'),
      'Online Games': document.querySelector('#online-games-section .grid-container'),
      'Flash Games': document.querySelector('#flash-games-section .grid-container'),
    };

    gamesData.forEach((gameData) => {
      const card = createGameCard(gameData);
      const section = gameSections[gameData.category];

      if (section) {
        section.appendChild(card);
        console.log('Appended Section');
      }
    });
  }

  populateGameSections();
  console.log('Game Sections Populated');
});
