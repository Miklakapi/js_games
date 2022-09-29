import SnakeModel from '../Models/SnakeModel';
import SnakeView from '../Views/SnakeView';

class SnakeController {
    #snakeModel = null;
    #snakeView = null;
    #snakeEngine = null;

    constructor(width, height) {
        this.#snakeModel = new SnakeModel(width, height);
        this.#snakeView = new SnakeView(width, height);

        this.#snakeView.addHandlerPressKey(this.keyPress.bind(this));

        this.initSnake();
        this.randApple();

        this.#snakeEngine = setInterval(this.runSnake.bind(this), 1000);
    }

    initSnake() {
        this.#snakeView.initSnake(this.#snakeModel.getHeadPosition(), this.#snakeModel.getTailPosition());
    }

    runSnake() {
        const oldPosition = this.#snakeModel.getHeadPosition();
        const newPosition = this.changePosition(oldPosition, this.#snakeModel.getDirection());

        // Lose
        if (this.#snakeView.isTail(newPosition) || newPosition.x < 0 || 
        newPosition.x >= this.#snakeModel.getWidth() || newPosition.y < 0 || 
        newPosition.y >= this.#snakeModel.getHeight()) {
            this.lose();
            return;
        }

        // Eat
        if (this.#snakeView.isApple(newPosition)) {
            const points = this.#snakeModel.getPoints() + 1;
            this.#snakeModel.setPoints(points);
            this.#snakeView.changePoints(points);
            // this.randApple();
            this.#snakeView.clearSquare(newPosition);
        }

        this.#snakeModel.setHeadPosition(newPosition);
        this.#snakeView.moveHead(newPosition, oldPosition);
    }

    lose() {
        this.stopSnake();
        console.log('lose');
        // lose todo
    }

    stopSnake() {
        clearInterval(this.#snakeEngine)
    }

    randApple() {
        const emptySquarePosition = this.#snakeView.getRandomEmptySquarePosition();
        this.#snakeModel.setApplePosition(emptySquarePosition);
        this.#snakeView.setApplePosition(emptySquarePosition);
    }

    keyPress(key) {
        console.log(key);
    }

    changePosition(position, direction) {
        return {x: position.x + direction.x, y: position.y + direction.y};
    }

    delete() {
        this.stopSnake();
        this.#snakeView.delete();
    }
}

export default SnakeController;
