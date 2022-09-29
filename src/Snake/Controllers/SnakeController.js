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

        this.#snakeEngine = setInterval(this.runSnake.bind(this), 150);
    }

    initSnake() {
        this.#snakeView.initSnake(this.#snakeModel.getHeadPosition(), this.#snakeModel.getTailPositions()[0]);
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
            if (!this.randApple()) {
                this.win();
                return;
            }
            this.#snakeView.clearSquare(newPosition);
        } else {
            this.#snakeView.clearSquare(this.#snakeModel.shiftTailPositions());
        }

        this.#snakeModel.setHeadPosition(newPosition);
        this.#snakeModel.addTailPosition(oldPosition);
        this.#snakeView.moveHead(newPosition, oldPosition);
    }

    win() {
        this.stopSnake();
        console.log('win');
        // win todo
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
        if (emptySquarePosition === false) return false;
        this.#snakeModel.setApplePosition(emptySquarePosition);
        this.#snakeView.setApplePosition(emptySquarePosition);
        return true;
    }

    keyPress(key) {
        const newDirection = SnakeModel.Direction[key];
        const currentDirection = this.#snakeModel.getDirection();
        const blockedDirection = {x: -currentDirection.x, y: -currentDirection.y};
        if (newDirection.x !== blockedDirection.x && newDirection.y !== blockedDirection.y) {
            this.#snakeModel.setDirection(newDirection);
        }
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
