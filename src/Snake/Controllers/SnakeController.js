import SnakeModel from '../Models/SnakeModel';
import SnakeView from '../Views/SnakeView';

class SnakeController {
    #snakeModel = new SnakeModel();
    #snakeView = new SnakeView();

    constructor() {
        
    }

    delete() {
        this.#snakeView.delete();
    }
}

export default SnakeController;
