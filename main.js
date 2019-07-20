const gameSummery = {
  win: 0,
  losses: 0,
  draws: 0,
};

const game = {
  playerHand: '',
  computerHand: '',
};

const btnPlay = document.querySelector('.game__btn');
const hands = document.querySelectorAll('.player-svg');
const gameAlert = document.querySelector('.game__alert');

const svgModal =  document.createElementNS('http://www.w3.org/2000/svg', 'svg');
const svgModalComputer =  document.createElementNS('http://www.w3.org/2000/svg', 'svg');

const whoWin = document.querySelector('.game__panel-win');
const pickHandAgain = document.createElement('div');

//выводим модальное окно
const showModalBlock = (playElement) => {
  svgModal.classList.add('player-svg--modal');
  const gameBlock = document.querySelector('.game-block');
  svgModal.innerHTML = `<use xlink:href="sprite.svg#${playElement}"></use>`;
  gameBlock.appendChild(svgModal);
};

const showModalBlockComputer = (playElementComputer) => {
  svgModalComputer.classList.add('player-svg--modal-computer');
  const gameBlock = document.querySelector('.game-block--computer');
  svgModalComputer.innerHTML = `<use xlink:href="sprite.svg#${playElementComputer}"></use>`;
  gameBlock.appendChild(svgModalComputer);
};

//выбор руки компютером
const computerChois = () => {
   return hands[Math.floor(Math.random() * hands.length)].dataset.option;
};

const checkResult = (player, computer) => {
  if(player === computer) {
    return 'draw';
  } else if((player === 'papier' && computer === 'stone') || (player === 'stone' && computer === 'scissors') || (player === 'scissors' && computer === 'paper')) {
    return 'win';
  } else {
    return 'loss';
  }
};

const publishResult = (result) => {
  const winSpan = document.querySelector('.game__score--win');
  const lossesSpan = document.querySelector('.game__score--losses');

  const gameWins = document.querySelector('.game__wins span');
  const gameLosses = document.querySelector('.game__losses span');
  const gameDraws = document.querySelector('.game__draws span');




  pickHandAgain.textContent = 'pick your hand again';
  pickHandAgain.style.color = 'red';
  document.querySelector('.game').appendChild(pickHandAgain);

  if(result === 'win') {
    gameSummery.win++;
    winSpan.textContent = gameSummery.win;
    gameWins.textContent =gameSummery.win;
    whoWin.textContent = 'You win !!!';
    whoWin.style.color ='green';
  } else if(result === 'loss') {
    gameSummery.losses++;
    lossesSpan.textContent = gameSummery.losses;
    gameLosses.textContent = gameSummery.losses;
    whoWin.textContent = 'AI win :(';
    whoWin.style.color ='red';
  } else {
    gameSummery.draws++;
    gameDraws.textContent = gameSummery.draws;
    whoWin.textContent = 'Draws :/';
    whoWin.style.color ='blue';
  }
};

//клик на свгешку
hands.forEach(hand => hand.addEventListener('click', (e) => {
  game.playerHand = e.currentTarget.dataset.option;  //записываем название руки игрока
  gameAlert.innerHTML = '';  //убираем алерт
  svgModal.remove();    //
  showModalBlock(game.playerHand);  //запускаем вывод изображения руки
}));

const endGame = () => {
  game.playerHand = '';
  game.computerHand = '';

  hands.forEach(hand => hand.addEventListener('click', () => {
    svgModalComputer.remove();
    whoWin.textContent = 'try again';
    whoWin.style.color = 'black';
    pickHandAgain.remove();
  }));
};

//клик на кнопку
btnPlay.addEventListener('click', () => {
  if(!game.playerHand) {
    gameAlert.classList.toggle('game__alert--modal');
  } else if(game.playerHand) {
    document.querySelector('.game__panel-results').style.display = 'block';
    game.computerHand = computerChois();
    showModalBlockComputer(game.computerHand);

    const gameResult = checkResult(game.playerHand, game.computerHand);
    publishResult(gameResult);
    endGame();
  }
});








