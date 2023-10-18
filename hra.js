import { findWinner } from 'https://unpkg.com/piskvorky@0.1.4';

let currentPlayer = 'circle';
const reset = document.querySelector('.button-reset');
const playField = document.querySelector('.game_play');
const player = document.querySelector('.game_properties img');

// Funkce, která vloží do hracího pole všechny hrací políčka

const playBoardDef = () => {
  for (let i = 0; i < 100; i++) {
    playField.innerHTML += `<button class="game_sq"></button>`;
  }
};

// Funkce, která řeší mění obrázek hráče

const playerChange = (event) => {
  if (currentPlayer === 'circle') {
    currentPlayer = 'cross';
    player.src = 'imgs/icons/cross.svg';
    player.alt = 'Hrají kolečka';
  } else {
    currentPlayer = 'circle';
    player.src = 'imgs/icons/circle.svg';
    player.alt = 'Hrají křížky';
  }
};

// Funkce, která řeší, když někdo chce hru resetovat, upozorní ho na to, že se hra resetuje

const resetAlert = (event) => {
  const confirmation = confirm('Určitě chcete ukončit současnou hru?');
  if (!confirmation) {
    event.preventDefault();
  } else location.reload();
};

// Funkce, která řeší co se stane s tlačítkem, na které se klikne, včetně vyhodnocení hry

const processClick = (event) => {
  const gameButtons = Array.from(document.querySelectorAll('.game_sq'));

  const gameBoard = [];
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
  gameButtons.forEach((button) => {
    if (button.classList.contains('board__field--circle')) {
      gameBoard.push('o');
    } else if (button.classList.contains('board__field--cross')) {
      gameBoard.push('x');
    } else {
      gameBoard.push('_');
    }
  });

  const winner = findWinner(gameBoard);
  const winnerSign = (winner) => {
    if (winner === 'o') {
      return '⭕️';
    } else if (winner === 'x') {
      return '❌';
    } else {
      return '⁉️ ... Kdo ví, je to remíza';
    }
  };

  if (winner !== null) {
    setTimeout(() => {
      alert(`Vyhrál hráč se značkou ${winnerSign(winner)}`);
      document.querySelector('.button-reset').classList.add('play_again');
    }, 500);
    gameButtons.forEach((button) => (button.disabled = true));
  }
};

// Přidání funkcionality všech 100 tlačítek
const gamePlayButton = () => {
  for (let i = 1; i <= 100; i++) {
    const button = `button:nth-child(${i})`;
    document.querySelector(button).addEventListener('click', processClick);
  }
};

playBoardDef();
gamePlayButton();
reset.addEventListener('click', resetAlert);
