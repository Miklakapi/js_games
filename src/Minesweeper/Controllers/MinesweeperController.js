import MinesweeperModel from '../Models/MinesweeperModel';
import MinesweeperView from '../Views/MinesweeperView';

class MinesweeperController {
    #minesweeperModel = null;
    #minesweeperView = null;

    // Init

    constructor(width, height) {
        this.init(width, height);
    }

    init(width, height) {
        this.#minesweeperModel = new MinesweeperModel(width, height);
        this.#minesweeperView = new MinesweeperView(width, height);
    }

    // Methods

    win() {
        this.#minesweeperView.drawWinScreen(this.reset.bind(this));
    }

    lose() {
        this.#minesweeperView.drawFailScreen(this.#minesweeperModel.getPoints(), this.reset.bind(this));
    }

    reset() {
        const width = this.#minesweeperModel.getWidth();
        const height = this.#minesweeperModel.getHeight();
        this.delete();
        this.init(width, height);
    }

    // Destructor

    delete() {
        this.#minesweeperView.delete();
    }
}

export default MinesweeperController;
