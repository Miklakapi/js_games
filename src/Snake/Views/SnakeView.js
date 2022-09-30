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

    // Init

    constructor(width, height) {
        this.initArea(width, height);
        this.changePoints(0);
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

    initSnake(head, body) {
        this.#drawHead(head);
        this.#drawTail(body);
    }

    // Methods

    changePoints(points) {
        this.#score.html(points);
    }

    moveHead(newPosition, oldPosition) {
        this.#drawHead(newPosition);
        this.#drawTail(oldPosition);
    }

    setApplePosition(position) {
        this.#drawApple(position);
    }

    clearSquare(position) {
        this.#drawGrass(position);
    }

    isTail(position) {
        return $(`*[data-x="${position.x}"][data-y="${position.y}"]`).hasClass(SnakeView.SnakeClass.Tail);
    }

    isApple(position) {
        return $(`*[data-x="${position.x}"][data-y="${position.y}"]`).hasClass(SnakeView.SnakeClass.Apple);
    }

    getRandomEmptySquarePosition() {
        const emptySquares = this.#getEmptySquares();
        if (emptySquares.length === 0) return false;
        const randomEmptySquare = Math.floor(Math.random() * 1000 % emptySquares.length);
        return {x: $(emptySquares[randomEmptySquare]).data('x'), y: $(emptySquares[randomEmptySquare]).data('y')}
    }

    drawFailScreen(score, handler) {
        this.#area.append(`
            <div class="snake-opacity-layer d-flex flex-h-center flex-v-center">
                <div>
                    <h1>You Lose</h1>
                    <h4>Your score: ${score}</h4>
                    <h1 class="snake-reload">&orarr;</h1>
                </div>
            </div>
        `);
        this.addReloadHandler(handler);
    }

    drawWinScreen(handler) {
        this.#area.append(`
            <div class="snake-opacity-layer d-flex flex-h-center flex-v-center">
                <div>
                    <h1>You Win</h1>
                    <h1 class="snake-reload">&orarr;</h1>
                </div>
            </div>
        `);
        this.addReloadHandler(handler);
    }

    // Private methods

    #getEmptySquares() {
        return $('.snake-square').not(`.${SnakeView.SnakeClass.Head}, .${SnakeView.SnakeClass.Tail}, .${SnakeView.SnakeClass.Apple}`);
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
        $(`*[data-x="${position.x}"][data-y="${position.y}"]`).removeClass(SnakeView.SnakeClass.Head)
            .removeClass(SnakeView.SnakeClass.Tail)
            .removeClass(SnakeView.SnakeClass.Apple);
    }

    // Handlers

    addPressKeyHandler(handler) {
        $(document).on('keydown', event => {
            if (this.#keyPressed) return;
            this.#keyPressed = true;
            handler(event.key);
        });

        $(document).on('keyup', _ => {
            this.#keyPressed = false;
        });
    }

    addReloadHandler(handler) {
        $('.snake-reload').on('click', _ => {
            handler();
        });
    }

    // Destructor

    delete() {
        $(document).off('keydown');
        $(document).off('keyup');
        $('.snake-reload').off('click');
    }
}

export default SnakeView;
