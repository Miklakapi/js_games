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
    #tailPositions = [];
    #applePosition = {x: 0, y: 0};
    #points = 0;

    constructor (width, height) {
        this.#height = height;
        this.#width = width;

        const halfWidth = Number.parseInt(width / 2);
        const halfHeight = Number.parseInt(width / 2);
        this.#headPosition = {x: halfWidth, y: halfHeight};
        this.#tailPositions = [{x: halfWidth - 1, y: halfHeight}];
        this.#direction = SnakeModel.Direction.ArrowRight;
    }

    getWidth() {
        return this.#width;
    }

    getHeight() {
        return this.#height;
    }

    getHeadPosition() {
        return Object.assign({}, this.#headPosition);
    }

    setHeadPosition(position) {
        this.#headPosition.x = position.x;
        this.#headPosition.y = position.y;
        return this;
    }

    getTailPositions() {
        return Object.assign({}, this.#tailPositions);
    }

    shiftTailPositions() {
        return Object.assign({}, this.#tailPositions.shift());
    }

    addTailPosition(position) {
        this.#tailPositions.push(Object.assign({}, position));
        return this;
    }

    getDirection() {
        return Object.assign({}, this.#direction);
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
        return Object.assign({}, this.#applePosition);
    }

    setApplePosition(position) {
        this.#applePosition.x = position.x;
        this.#applePosition.y = position.y;
        return this;
    }
}

export default SnakeModel;
