import './App/style.scss';
import AppController from './App/Controllers/AppController';

import './Snake/style.scss';
import SnakeController from './Snake/Controllers/SnakeController';

import './Minesweeper/style.scss';
import MinesweeperController from './Minesweeper/Controllers/MinesweeperController';


const Games = {
    Minesweeper: MinesweeperController,
    Snake: SnakeController
};

let currentGame = null;

$(document).ready(function () {
    const appController = new AppController();
}).on('click', '.play', function () {
    const game = $(this).data('game');
    currentGame = new (Games[game])();
}).on('click', '.arrow', function () {
    currentGame = null;
});
