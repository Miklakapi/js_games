class SnakeView {
    static SnakeClass = {
        Head: 'snake-head',
        Tail: 'snake-tail',
        Apple: 'snake-apple',
    }

    #app = $('.app');
    #score = null;
    #area = null;
    #keyPressed = false;

    constructor(width, height) {
        this.initArea(width, height);
        this.changeScore(0);
    }

    initArea(width, height) {
        this.#app.html('');
        this.#app.removeClass('flex-v-center');
        this.#app.html(`
            <div class="snake-title d-flex flex-v-center flex-h-center">
                Score:&nbsp;<span class="snake-score"></span>
            </div>
            <div class="snake-area d-flex"></div>
        `);
        this.#area = $('.snake-area');
        this.#score = $('.snake-score');

        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                this.#area.append(`
                    <div class="snake-square" data-x="${x}" data-y="${y}"></div>
                `);
            }
        }
    }

    addHandlerPressKey(handler) {
        $(document).on('keydown', event => {
            if (this.#keyPressed) return;
            this.#keyPressed = true;
            handler(event.key);
        });

        $(document).on('keyup', event => {
            this.#keyPressed = false;
        });
    }

    changeScore(score) {
        this.#score.html(score);
    }

    initSnake(head, body) {
        this.#drawHead(head);
        this.#drawTail(body);
    }

    moveHead(newPosition, oldPosition) {
        this.#drawHead(newPosition);
        this.#drawTail(oldPosition);
    }

    setApplePosition(position) {
        this.#drawApple(position);
    }

    deleteTail(position) {
        this.#drawGrass(position);
    }

    isTail(position) {
        $(`*[data-x="${position.x}"][data-y="${position.y}"]`).hasClass(SnakeView.SnakeClass.Tail);
    }

    isApple(position) {
        $(`*[data-x="${position.x}"][data-y="${position.y}"]`).hasClass(SnakeView.SnakeClass.Apple);
    }

    getRandomEmptySquarePosition() {
        const emptySquares = this.#getEmptySquares();
        const randomEmptySquare = Number.parseInt(Math.random() * 1000 % emptySquares.length);
        return {x: $(emptySquares[randomEmptySquare]).data('x'), y: $(emptySquares[randomEmptySquare]).data('y')}
    }

    #getEmptySquares() {
        return $('.snake-square').not(`.${SnakeView.SnakeClass.Head}, .${SnakeView.SnakeClass.Tail}`);
    }

    #drawHead(position) {
        $(`*[data-x="${position.x}"][data-y="${position.y}"]`).addClass(SnakeView.SnakeClass.Head);
    }

    #drawTail(position) {
        $(`*[data-x="${position.x}"][data-y="${position.y}"]`).addClass(SnakeView.SnakeClass.Tail);
    }

    #drawApple(position) {
        $(`*[data-x="${position.x}"][data-y="${position.y}"]`).addClass(SnakeView.SnakeClass.Apple);
    }

    #drawGrass(position) {
        $(`*[data-x="${position.x}"][data-y="${position.y}"]`).removeClass(SnakeView.SnakeClass.Head);
        $(`*[data-x="${position.x}"][data-y="${position.y}"]`).removeClass(SnakeView.SnakeClass.Tail);
    }

    delete() {
        $(document).off('keydown');
        $(document).off('keyup');
    }
}

export default SnakeView;
