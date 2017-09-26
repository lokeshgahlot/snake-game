import './game.scss';
import Snake from '../snake';
import Food  from '../food';
import setupBoard from '../board/setupBoard';
import Controls from '../snake/controls';
import CONSTANTS from '../constants';
import showModal  from '../utils/modal';
import {drawCell, getClientWidth, getClientHeight, getRandomPos} from '../utils';

const BOARD_COLOR = 'papayawhip';
const SNAKE_COLOR = 'blue';
const FOOD_COLOR = 'tomato';
const SCALE = 20;
const FRAMES_PER_SECOND = 15; // It can be use as speed also.

// game method
export default () => {
  const boardEl = document.querySelector('.board');
  const scoreEl = document.querySelector('.score');
  const ctx = boardEl.getContext("2d");
  const board = setupBoard(boardEl, ctx, SCALE);
  const totalRow = board.width / SCALE;
  const totalColumn = board.height / SCALE;
  const snake = Snake({ drawCell: drawCell(ctx, SNAKE_COLOR, SCALE)});
  const food = Food({ drawCell: drawCell(ctx, FOOD_COLOR, SCALE)});
  const controls = Controls();
  let score = 0, interval = 1000/FRAMES_PER_SECOND;
  let foodPosition, timerId;

  // run method paints the canvas
  const run = () => {
    board.draw(BOARD_COLOR);
    snake.move().draw();
    const {x, y} = snake.getHead();

    // Wall and snake body collision conditions
    if (x < 0 || x >= totalRow || y < 0 || y >= totalColumn || snake.checkBobyCollision()) {
      clearTimeout(timerId);
      stop();
      return;
    }

    // check if snake eats the food
    if (snake.eat(...foodPosition)) {
      foodPosition = getRandomPos(totalRow, totalColumn);
      score += 5;
      scoreEl.innerHTML = CONSTANTS.scoreLabel + ' ' + score;
    }
    food.draw(...foodPosition);
    timerId = setTimeout(run, interval);
  }

  // game starts here
  const start = () => {
    score = 0;
    scoreEl.innerHTML = CONSTANTS.scoreLabel + ' ' + score;
    controls.add(snake);
    foodPosition = getRandomPos(totalRow, totalColumn);
    run();
  }

  // game stops here
  const stop = () => {
    clearTimeout(timerId);
    controls.remove(snake);
    snake.reset();
    showModal({
      header: CONSTANTS.headerMsg,
      msg: CONSTANTS.gameOverMsg,
      btnLabel: CONSTANTS.playAgainLabel}
    ).then(start);
  }

  board.draw(BOARD_COLOR); // draw board for first time
  snake.draw(); // draw snake for first time
  boardEl.focus();
  start();
}
