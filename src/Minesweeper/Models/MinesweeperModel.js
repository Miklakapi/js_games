class MinesweeperModel {
    #width = 0;
    #height = 0;
    #points = 0;
    #bombs = 0;
    #flags = 0;

    // Init

    constructor (width, height) {
        this.#height = height;
        this.#width = width;
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

    setFlags(flags) {
        this.#flags = flags;
        return this;
    }

    getFlags() {
        return this.#flags;
    }

    getPoints() {
        return this.#points;
    }

    setPoints(points) {
        this.#points = points;
        return this;
    }
}

export default MinesweeperModel;
