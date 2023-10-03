let currentPlayer = 'circle';
const reset = document.querySelector('.button-reset');

const playerChange = (event) => {
  if (currentPlayer === 'circle') {
    currentPlayer = 'cross';
    document.querySelector('.game_properties').innerHTML = `<p>HRAJE:</p>
    <img src="imgs/icons/cross.svg" alt="Hrají kolečka" />`;
  } else {
    currentPlayer = 'circle';
    document.querySelector('.game_properties').innerHTML = `<p>HRAJE:</p>
    <img src="imgs/icons/circle.svg" alt="Hrají kolečka" />`;
  }
};
const resetAlert = (event) => {
  const confirmation = confirm('Určitě chcete přerušit současnou hru?');
  if (confirmation === false) {
    event.preventDefault();
  }
};
const processClick = (event) => {
  if (
    event.target.classList.contains('board__field--circle') ||
    event.target.classList.contains('board__field--cross')
  ) {
    return alert('Políčko je již obsazené');
  }
  if (currentPlayer === 'circle') {
    event.target.classList.add('board__field--circle');
  } else {
    event.target.classList.add('board__field--cross');
  }
  playerChange();
};

for (let i = 1; i <= 10; i++) {
  const button = `button:nth-child(${i})`;
  document.querySelector(button).addEventListener('click', processClick);
}

reset.addEventListener('click', resetAlert);

// kód dle zadání, nelíbilo se mi to, tak to mám jinak:

// document
//   .querySelector('button:nth-child(1)')
//   .addEventListener('click', processClick);
// document
//   .querySelector('button:nth-child(2)')
//   .addEventListener('click', processClick);
// document
//   .querySelector('button:nth-child(3)')
//   .addEventListener('click', processClick);
// document
//   .querySelector('button:nth-child(4)')
//   .addEventListener('click', processClick);
// document
//   .querySelector('button:nth-child(5)')
//   .addEventListener('click', processClick);
// document
//   .querySelector('button:nth-child(6)')
//   .addEventListener('click', processClick);
// document
//   .querySelector('button:nth-child(7)')
//   .addEventListener('click', processClick);
// document
//   .querySelector('button:nth-child(8)')
//   .addEventListener('click', processClick);
// document
//   .querySelector('button:nth-child(9)')
//   .addEventListener('click', processClick);
// document
//   .querySelector('button:nth-child(10)')
//   .addEventListener('click', processClick);
