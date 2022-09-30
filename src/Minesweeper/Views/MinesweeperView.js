class MinesweeperView {
    static MinesweeperClass = {
        Flag: 'minesweeper-flag',
        Empty: 'minesweeper-empty',
        Undiscovered: 'minesweeper-undiscovered',
    }

    #app = $('.app');
    #score = null;
    #area = null;

    constructor(width, height) {
        this.initArea(width, height);
        this.changePoints(0);
    }

    // Init

    initArea(width, height) {
        this.#app.html('');
        this.#app.removeClass('flex-v-center');
        this.#app.html(`
            <div class="universal-title d-flex flex-v-center flex-h-center">
                Score:&nbsp;<span class="minesweeper-score"></span>
            </div>
            <div class="minesweeper-area d-flex"></div>
        `);
        this.#area = $('.minesweeper-area');
        this.#score = $('.minesweeper-score');

        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                this.#area.append(`
                    <div class="minesweeper-square" data-x="${x}" data-y="${y}"></div>
                `);
            }
        }
    }

    // Methods

    changePoints(points) {
        this.#score.html(points);
    }

    getRandomEmptySquarePosition() {
        const emptySquares = this.#getEmptySquares();
        if (emptySquares.length === 0) return false;
        const randomEmptySquare = Number.parseInt(Math.random() * 1000 % emptySquares.length);
        return {x: $(emptySquares[randomEmptySquare]).data('x'), y: $(emptySquares[randomEmptySquare]).data('y')}
    }

    drawFailScreen(score, handler) {
        this.#area.append(`
            <div class="minesweeper-opacity-layer d-flex flex-h-center flex-v-center">
                <div>
                    <h1>You Lose</h1>
                    <h4>Your score: ${score}</h4>
                    <h1 class="minesweeper-reload">&orarr;</h1>
                </div>
            </div>
        `);
        this.addReloadHandler(handler);
    }

    drawWinScreen(handler) {
        this.#area.append(`
            <div class="minesweeper-opacity-layer d-flex flex-h-center flex-v-center">
                <div>
                    <h1>You Win</h1>
                    <h1 class="minesweeper-reload">&orarr;</h1>
                </div>
            </div>
        `);
        this.addReloadHandler(handler);
    }

    // Private methods

    #getEmptySquares() {
        return $('.snake-square').not(`.${SnakeView.SnakeClass.Head}, .${SnakeView.SnakeClass.Tail}, .${SnakeView.SnakeClass.Apple}`);
    }

    // Handlers

    // todo - right click

    // todo - left click

    addReloadHandler(handler) {
        $('.minesweeper-reload').on('click', _ => {
            handler();
        });
    }

    // Destructor

    delete() {
        $('.minesweeper-reload').off('click');
    }
}

export default MinesweeperView;
