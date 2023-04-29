const keyboard = document.querySelector('.keyboard');

keyboard.addEventListener('click', (event) => {
  const button = event.target.closest('.keyboard__button');
  if (button) {
    button.classList.toggle('keyboard__button_active');
  }
});
