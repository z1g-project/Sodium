const changelogModal = document.getElementById('changelogModal');
const openChangelogButton = document.getElementById('openChangelogButton');
const closeChangelogButton = changelogModal.querySelector('.close');
const okButton = changelogModal.querySelector('.ok-button');

const lastUsedTime = localStorage.getItem('lastUsedTime');

const currentTime = new Date().getTime();

const timeThreshold = 7 * 24 * 60 * 60 * 1000;

if (!lastUsedTime || currentTime - lastUsedTime > timeThreshold) {
  changelogModal.style.display = 'block';
}

localStorage.setItem('lastUsedTime', currentTime.toString());

closeChangelogButton.addEventListener('click', () => {
  changelogModal.style.display = 'none';
});

okButton.addEventListener('click', () => {
  changelogModal.style.display = 'none';
});
