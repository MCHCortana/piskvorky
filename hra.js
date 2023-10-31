import { findWinner } from 'https://unpkg.com/piskvorky@0.1.4';

let currentPlayer = 'circle';
const reset = document.querySelector('.button-reset');
const playField = document.querySelector('.game_play');
const player = document.querySelector('.game_properties img');
const myPopupElement = document.querySelector('.popup');

// Funkce, která vloží do hracího pole všechny hrací políčka

const playBoardDef = () => {
  for (let i = 0; i < 100; i++) {
    playField.innerHTML += `<button class="game_sq"></button>`;
  }
};

// Funkce napojení NPC místo hráče křížku.
const processAI = async (gameBoard, gameButtons) => {
  const fields = document.querySelectorAll('.game_sq');
  const response = await fetch(
    'https://piskvorky.czechitas-podklady.cz/api/suggest-next-move',
    {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        board: gameBoard,
        player: 'x',
      }),
    },
  );
  const data = await response.json();
  const { x, y } = data.position;
  const field = fields[x + y * 10];
  gameButtons.forEach((button) => (button.disabled = false));
  field.click();
  console.log(response);
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
  const confirmation = confirm('Chcete začít novou hru?');
  if (!confirmation) {
    event.preventDefault();
  } else location.reload();
};

// Jaký znak se má zobrazit při výhře
const winnerSign = (winner) => {
  if (winner === 'o') {
    return '⭕️';
  } else if (winner === 'x') {
    return '❌';
  } else {
    return '⁉️ ... Kdo ví, je to remíza';
  }
};
// Oznámení výherce
const winnerAnnoucement = (winner) => {
  myPopupElement.style.display = 'flex';
  myPopupElement.style.transform = 'translate(-50%, -50%) scale(1)';
  myPopupElement.innerHTML = `<h1>Vyhrál hráč se značkou ${winnerSign(
    winner,
  )}</h1>`;
  document.querySelector('.overlay').classList.add('active');
  myPopupElement.onclick = () => {
    myPopupElement.style.display = 'none';
    document.querySelector('.overlay').classList.remove('active');
    document.querySelector('.button-reset').classList.add('play_again');
  };
};

// Funkce, která řeší co se stane s tlačítkem, na které se klikne, včetně vyhodnocení hry

const processClick = (event) => {
  const gameButtons = Array.from(document.querySelectorAll('.game_sq'));
  const gameBoard = [];

  //Zablokuje klikání na již obsazené políčko bez ztráty tahu.
  if (
    event.target.classList.contains('board__field--circle') ||
    event.target.classList.contains('board__field--cross')
  ) {
    return alert('Políčko je již obsazené');
  }

  //Který hráč je zrovna na řadě. Jakmile odehraje kolečko, zablokuje všechny políčko, aby nemohlo hrát 2x.

  if (currentPlayer === 'circle') {
    event.target.classList.add('board__field--circle');
    gameButtons.map((button) => (button.disabled = true));
  } else {
    event.target.classList.add('board__field--cross');
  }
  //Vytváří pole hrací plochy pro funkce fidWinner a napojení NPC.

  gameButtons.map((button) => {
    if (button.classList.contains('board__field--circle')) {
      gameBoard.push('o');
    } else if (button.classList.contains('board__field--cross')) {
      gameBoard.push('x');
    } else {
      gameBoard.push('_');
    }
  });

  // Vyhodnocení hry a definice výherce.
  const winner = findWinner(gameBoard);
  winnerSign(winner);

  // Mění ikonku hráče v Menu.
  playerChange();

  // Na základě vyhodnocení tahu buď hru ukoncčí nebo zavolá tah křížku.
  if (winner === null && currentPlayer === 'cross') {
    processAI(gameBoard, gameButtons);
  } else if (winner !== null) {
    setTimeout(() => {
      winnerAnnoucement(winner);
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
