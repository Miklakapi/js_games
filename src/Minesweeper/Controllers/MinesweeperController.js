import MinesweeperModel from '../Models/MinesweeperModel';
import MinesweeperView from '../Views/MinesweeperView';

class MinesweeperController {
    #minesweeperModel = null;
    #minesweeperView = null;

    // Init

    constructor(width, height, bombs) {
        this.init(width, height, bombs);
    }

    init(width, height, bombs) {
        this.#minesweeperModel = new MinesweeperModel(width, height, bombs);
        this.#minesweeperView = new MinesweeperView(width, height, bombs);
        this.#minesweeperView.addClickHandler(this.click.bind(this));
    }

    // Methods

    win() {
        this.#minesweeperView.drawWinScreen(this.reset.bind(this));
    }

    lose(position) {
        this.#minesweeperView.removeSquareType(position, MinesweeperView.MinesweeperClass.Covered);
        this.#minesweeperView.setSquareType(position, MinesweeperView.MinesweeperClass.Explode);
        this.#minesweeperModel.setSquare(MinesweeperModel.MinesweeperSquareType.Explode);
        this.displayAllBombs();
        this.#minesweeperView.drawFailScreen(this.#minesweeperModel.getPoints(), this.reset.bind(this));
    }

    reset() {
        const width = this.#minesweeperModel.getWidth();
        const height = this.#minesweeperModel.getHeight();
        const bombs = this.#minesweeperModel.getMaxBombs();
        this.delete();
        this.init(width, height, bombs);
    }

    click(position, type) {
        if (type === MinesweeperView.MinesweeperClickType.LeftClick) {
            this.leftClick(position);
        } else if (type === MinesweeperView.MinesweeperClickType.Flag) {
            const bombs = this.#minesweeperModel.getBombs() - 1;
            if (bombs < 0) return;
            this.#minesweeperModel.setBombs(bombs);
            this.#minesweeperView.changeBombs(bombs);
            this.#minesweeperView.removeSquareType(position, MinesweeperView.MinesweeperClass.Covered);
            this.#minesweeperView.setSquareType(position, MinesweeperView.MinesweeperClass.Flag);
        } else if (type === MinesweeperView.MinesweeperClickType.UnFlag) {
            const bombs = this.#minesweeperModel.getBombs() + 1;
            this.#minesweeperModel.setBombs(bombs);
            this.#minesweeperView.changeBombs(bombs);
            this.#minesweeperView.removeSquareType(position, MinesweeperView.MinesweeperClass.Flag);
            this.#minesweeperView.setSquareType(position, MinesweeperView.MinesweeperClass.Covered);
        } else {
            const bombs = this.#minesweeperModel.getSquare(position);
            if (bombs !== this.countFlags(position)) return;
            const positions = [-1, 0, 1];
            for (const y of positions) {
                for (const x of positions) {
                    if (y !== 0 || x !== 0) {
                        const checked = { x: position.x + x, y: position.y + y };

                        if (checked.x < 0 || checked.y < 0 || checked.x >= this.#minesweeperModel.getWidth() || checked.y >= this.#minesweeperModel.getHeight()) continue;
                        if (!this.#minesweeperView.checkSquareClass(checked, MinesweeperView.MinesweeperClass.Flag) &&
                            this.#minesweeperView.checkSquareClass(checked, MinesweeperView.MinesweeperClass.Covered)) {
                            this.leftClick(checked);
                        }
                    }
                }
            }
        }
    }

    leftClick(position) {
        const type = this.#minesweeperModel.getSquare(position);
        if (type === MinesweeperModel.MinesweeperSquareType.Bomb) {
            this.lose(position);
            return;
        }
        this.#minesweeperView.removeSquareType(position, MinesweeperView.MinesweeperClass.Covered);
        this.#minesweeperView.setSquareType(position, `${MinesweeperView.MinesweeperClass.UncoveredPattern}${type}`);
        const points = this.#minesweeperModel.getPoints() + 1;
        this.#minesweeperModel.setPoints(points);
        this.#minesweeperView.changePoints(points);

        if (type === MinesweeperModel.MinesweeperSquareType.Empty) {
            const positions = [-1, 0, 1];
            for (const y of positions) {
                for (const x of positions) {
                    if (y !== 0 || x !== 0) {
                        const checked = {x: position.x + x, y: position.y + y};

                        if (checked.x < 0 || checked.y < 0 || checked.x >= this.#minesweeperModel.getWidth() || checked.y >= this.#minesweeperModel.getHeight()) continue;
                        if (this.#minesweeperView.checkSquareClass(checked, MinesweeperView.MinesweeperClass.Covered)) {
                            this.leftClick(checked);
                        }
                    }
                }
            }
        }

        if (points === this.#minesweeperModel.getWidth() * this.#minesweeperModel.getHeight() - this.#minesweeperModel.getMaxBombs()) this.win();
    }

    countFlags(position) {
        const positions = [-1, 0, 1];
        let flags = 0;
        for (const y of positions) {
            for (const x of positions) {
                if (y !== 0 || x !== 0) {
                    const checked = { x: position.x + x, y: position.y + y };

                    if (checked.x < 0 || checked.y < 0 || checked.x >= this.#minesweeperModel.getWidth() || checked.y >= this.#minesweeperModel.getHeight()) continue;
                    this.#minesweeperView.checkSquareClass(checked, MinesweeperView.MinesweeperClass.Flag) && flags++;
                }
            }
        }
        return flags;
    }

    displayAllBombs() {

    }

    // Destructor

    delete() {
        this.#minesweeperView.delete();
    }
}

export default MinesweeperController;
