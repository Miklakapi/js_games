import SnakeModel from '../Models/SnakeModel';
import SnakeView from '../Views/SnakeView';

class SnakeController {
    #snakeModel = null;
    #snakeView = null;

    constructor(width, height) {
        this.#snakeModel = new SnakeModel(width, height);
        this.#snakeView = new SnakeView(width, height);
    }

    delete() {
        this.#snakeView.delete();
    }
}

export default SnakeController;
