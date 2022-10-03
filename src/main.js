import './App/style.scss';
import AppController from './App/Controllers/AppController';
import AppModel from './App/Models/AppModel';

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
    const gameData = AppModel.GameArray[AppModel.GameArray.findIndex(element => element.id === game)];
    currentGame = new Games[game](...gameData.constructorValues);
}).on('click', '.arrow', function () {
    currentGame?.delete();
    currentGame = null;
});
