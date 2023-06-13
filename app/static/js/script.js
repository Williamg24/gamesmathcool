const buttons = document.querySelectorAll('.button-list ul li');
const gameCards = document.querySelectorAll('.game-list li');

buttons.forEach(button => {
  button.addEventListener('click', function() {
    const category = this.dataset.category;

    // Add active class to the clicked button
    buttons.forEach(btn => btn.classList.remove('active'));
    this.classList.add('active');

    // Show or hide game cards based on category
    gameCards.forEach(card => {
      if (category === 'all') {
        card.style.display = 'block';
      } else if (card.dataset.category === category) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  });
});
