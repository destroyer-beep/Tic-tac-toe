const playerOne = document.querySelector('.player__one');
const playerTwo = document.querySelector('.player__two');
const buttonReset = document.querySelector('.reset');
const fieldItems = document.querySelectorAll('.box__item');

const dataGame = {
  playerOne: 0,
  playerTwo: 0,
  playerStep: true,
  counter: 0,
  winIndex: [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]
}

function stopGame() {
  fieldItems.forEach(item => {
    item.removeEventListener('click', playerStep, false)
  })
}

function startGame() {
    playerOne.classList.add('player__active');
    playerTwo.classList.remove('player__active');
    dataGame.playerStep = true;
    dataGame.counter = 0;

    fieldItems.forEach(item => {
      item.classList.remove('box__item_null', 'box__item_cross', 'winner')
      item.classList.add('box__item_inactive');
      item.addEventListener('click', playerStep);
  })
}

function playerStep(e) {
if (dataGame.playerStep) {
      e.target.classList.remove('box__item_inactive');
      e.target.classList.add('box__item_cross');
      playerOne.classList.remove('player__active');
      playerTwo.classList.add('player__active');
      dataGame.playerStep = false;
    } else {
      e.target.classList.remove('box__item_inactive');
      e.target.classList.add('box__item_null');
      playerTwo.classList.remove('player__active');
      playerOne.classList.add('player__active');
      dataGame.playerStep = true;
    }
    e.target.removeEventListener('click', playerStep, false);
    checkGame();
}

function checkGame() {
  const items = document.querySelectorAll('.box__item');
  dataGame.counter += 1;
  if(dataGame.counter === 9) {
        stopGame();
        fieldItems.forEach(item => {
        item.classList.add('winner');
      })
      return;
    }
  for(let i = 0; i < dataGame.winIndex.length; i++) {
    if(items[dataGame.winIndex[i][0]].classList.contains('box__item_cross') && items[dataGame.winIndex[i][1]].classList.contains('box__item_cross') && items[dataGame.winIndex[i][2]].classList.contains('box__item_cross')) {
      dataGame.playerOne += 1;
      playerOne.textContent = dataGame.playerOne;
      items[dataGame.winIndex[i][0]].classList.add('winner');
      items[dataGame.winIndex[i][1]].classList.add('winner');
      items[dataGame.winIndex[i][2]].classList.add('winner');
      stopGame();
    } else if (items[dataGame.winIndex[i][0]].classList.contains('box__item_null') && items[dataGame.winIndex[i][1]].classList.contains('box__item_null') && items[dataGame.winIndex[i][2]].classList.contains('box__item_null')) {
      dataGame.playerTwo += 1;
      playerTwo.textContent = dataGame.playerTwo;
      items[dataGame.winIndex[i][0]].classList.add('winner');
      items[dataGame.winIndex[i][1]].classList.add('winner');
      items[dataGame.winIndex[i][2]].classList.add('winner');
      stopGame();
    }
  }
}
buttonReset.addEventListener('click', startGame);