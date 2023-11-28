window.addEventListener('beforeunload', function() {
  document.body.classList.add('fade-out');
});

window.addEventListener('DOMContentLoaded', function() {
  document.body.classList.remove('fade-out');
});
