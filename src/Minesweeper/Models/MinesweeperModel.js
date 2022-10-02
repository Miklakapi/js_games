class MinesweeperModel {
    static MinesweeperSquareType = {
        Bomb: '*',
        Empty: 'o',
        Explode: '@',
    }

    #area = [];
    #width = 0;
    #height = 0;
    #points = 0;
    #maxBombs = 0;
    #bombs = 0;

    // Init

    constructor (width, height, bombs) {
        this.#height = height;
        this.#width = width;
        this.#bombs = bombs;
        this.#maxBombs = bombs;
        this.initEmptyArea();
        this.initBombs();
        this.initNumbers();
    }

    initEmptyArea() {
        for (let y = 0; y < this.#height; y++) {
            this.#area.push([]);
            for (let x = 0; x < this.#width; x++) {
                this.#area[y].push(MinesweeperModel.MinesweeperSquareType.Empty);
            }
        }
    }

    initBombs() {
        for (let b = 0; b < this.#bombs; b++) {
            this.#randBomb();
        }
    }

    initNumbers() {
        const positions = [-1, 0, 1];
        for (let y = 0; y < this.#height; y++) {
            for (let x = 0; x < this.#width; x++) {
                let counter = 0;
                const position = { x, y };
                if (this.getSquare(position) === MinesweeperModel.MinesweeperSquareType.Bomb) continue;

                for (const positionY of positions) {
                    for (const positionX of positions) {
                        if (positionX !== 0 || positionY !== 0) {
                            const checkedX = position.x + positionX;
                            const checkedY = position.y + positionY;

                            if (checkedX < 0 || checkedY < 0 || checkedX >= this.#width || checkedY >= this.#height) continue;

                            this.getSquare({ x: checkedX, y: checkedY}) === MinesweeperModel.MinesweeperSquareType.Bomb && counter++;
                        }
                    }
                }
                this.setSquare(position, counter === 0 ? 'o' : counter);
            }
        }
    }

    // Methods

    setWidth(width) {
        this.#width = width;
        return this;
    }

    getWidth() {
        return this.#width;
    }

    setHeight(height) {
        this.#height = height;
        return this;
    }

    getHeight() {
        return this.#height;
    }

    setBombs(bombs) {
        this.#bombs = bombs;
        return this;
    }

    getBombs() {
        return this.#bombs;
    }

    getMaxBombs() {
        return this.#maxBombs;
    }

    getPoints() {
        return this.#points;
    }

    setPoints(points) {
        this.#points = points;
        return this;
    }

    getSquare(position) {
        return this.#area[position.y][position.x];
    }

    setSquare(position, value) {
        this.#area[position.y][position.x] = value;
        return this;
    }

    // Private

    #randBomb() {
        const position = { x: 0, y: 0 };

        while (true) {
            position.x = Math.floor(Math.random() * this.#width);
            position.y = Math.floor(Math.random() * this.#height);

            if (this.getSquare(position) === MinesweeperModel.MinesweeperSquareType.Empty) {
                this.setSquare(position, MinesweeperModel.MinesweeperSquareType.Bomb);
                break;
            }
        }

    }
}

export default MinesweeperModel;
