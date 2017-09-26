import './game.scss';
import Snake from '../snake';
import Food  from '../food';
import setupBoard from '../board/setupBoard';
import Controls from '../snake/controls';
import CONSTANTS from '../constants';
import showModal  from '../utils/modal';
import {drawCell, getClientWidth, getClientHeight, getRandomPos} from '../utils';

const BOARD_COLOR = 'papayawhip';
const SCALE = 20;
const FRAMES_PER_SECOND = 15;

export default () => {
  const boardEl = document.querySelector('.board');
  const scoreEl = document.querySelector('.score');
  const ctx = boardEl.getContext("2d");
  const board = setupBoard(boardEl, ctx, SCALE);
  const totalRow = board.width / SCALE;
  const totalColumn = board.height / SCALE;
  const snake = Snake({ drawCell: drawCell(ctx, 'blue', SCALE)});
  const food = Food({ drawCell: drawCell(ctx, 'tomato', SCALE)});
  const controls = Controls();
  let score = 0, interval = 1000/FRAMES_PER_SECOND;
  let boardPosition, timerId;

  const run = () => {
    board.draw(BOARD_COLOR);
    snake.move().draw();
    const {x, y} = snake.getHead();
    //
    if (x < 0 || x >= totalRow || y < 0 || y >= totalColumn || snake.checkBobyCollision()) {
      clearTimeout(timerId);
      stop();
      return;
    }
    if (snake.eat(...boardPosition)) {
      boardPosition = getRandomPos(totalRow, totalColumn);
      score += 5;
      scoreEl.innerHTML = CONSTANTS.scoreLabel + ' ' + score;
    }
    food.draw(...boardPosition);
    timerId = setTimeout(run, interval);
  }

  const start = () => {
    score = 0;
    scoreEl.innerHTML = CONSTANTS.scoreLabel + ' ' + score;
    snake.reset();
    controls.add(snake);
    boardPosition = getRandomPos(totalRow, totalColumn);
    run();
  }

  const stop = () => {
    clearTimeout(timerId);
    controls.remove(snake);
    showModal({
      header: CONSTANTS.headerMsg,
      msg: CONSTANTS.gameOverMsg,
      btnLabel: CONSTANTS.playAgainLabel}
    ).then(start);
  }

  board.draw(BOARD_COLOR);
  snake.draw();
  boardEl.focus();
  start();
}
