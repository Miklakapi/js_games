class SnakeModel {
    static Direction = {
        ArrowUp: {x: 0, y: -1},
        ArrowRight: {x: 1, y: 0},
        ArrowDown: {x: 0, y: 1},
        ArrowLeft: {x: -1, y: 0},
    }

    #direction = null;
    #width = 0;
    #height = 0;
    #headPosition = {x: 0, y: 0};
    #tailPosition = {x: 0, y: 0};
    #applePosition = {x: 0, y: 0};
    #points = 0;

    constructor (width, height) {
        this.#height = height;
        this.#width = width;

        const halfWidth = Number.parseInt(width / 2);
        const halfHeight = Number.parseInt(width / 2);
        this.#headPosition = {x: halfWidth, y: halfHeight};
        this.#tailPosition = {x: halfWidth - 1, y: halfHeight};
        this.#direction = SnakeModel.Direction.ArrowRight;
    }

    getWidth() {
        return this.#width;
    }

    getHeight() {
        return this.#height;
    }

    getHeadPosition() {
        return this.#headPosition;
    }

    setHeadPosition(position) {
        this.#headPosition.x = position.x;
        this.#headPosition.y = position.y;
        return this;
    }

    getTailPosition() {
        return this.#tailPosition;
    }

    setTailPosition(position) {
        this.#tailPosition.x = position.x;
        this.#tailPosition.y = position.y;
        return this;
    }

    getDirection() {
        return this.#direction;
    }

    setDirection(direction) {
        this.#direction = direction;
        return this;
    }

    getPoints() {
        return this.#points;
    }

    setPoints(points) {
        this.#points = points;
        return this;
    }

    getApplePosition() {
        return this.#applePosition;
    }

    setApplePosition(position) {
        this.#applePosition.x = position.x;
        this.#applePosition.y = position.y;
        return this;
    }
}

export default SnakeModel;
