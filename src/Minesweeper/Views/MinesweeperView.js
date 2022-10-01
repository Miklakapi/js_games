class MinesweeperView {
    static MinesweeperClass = {
        Flag: 'minesweeper-flag',
        Empty: 'minesweeper-empty',
        Undiscovered: 'minesweeper-undiscovered',
    }

    #app = $('.app');
    #score = null;
    #bombs = null;
    #area = null;

    constructor(width, height, bombs) {
        this.initArea(width, height);
        this.changePoints(0);
        this.changeBombs(bombs);
    }

    // Init

    initArea(width, height) {
        this.#app.html('');
        this.#app.removeClass('flex-v-center');
        this.#app.html(`
            <div class="minesweeper-title universal-title d-flex flex-v-center flex-h-center">
                <div class="d-flex flex-v-center flex-h-center">Bombs:&nbsp;<span class="universal-score minesweeper-bombs"></span></div>
                <div class="d-flex flex-v-center flex-h-center">Score:&nbsp;<span class="universal-score minesweeper-score"></span></div>
                <div></div>
            </div>
            <div class="universal-area minesweeper-area d-flex"></div>
        `);
        this.#area = $('.minesweeper-area');
        this.#score = $('.minesweeper-score');
        this.#bombs = $('.minesweeper-bombs');

        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                this.#area.append(`
                    <div class="minesweeper-square universal-square d-flex flex-h-center flex-v-center minesweeper-color-hovered" data-x="${x}" data-y="${y}"></div>
                `);
            }
        }
    }

    // Methods

    changePoints(points) {
        this.#score.html(points);
    }

    changeBombs(bombs) {
        this.#bombs.html(bombs);
    }

    drawFailScreen(score, handler) {
        this.#area.append(`
            <div class="universal-opacity-layer d-flex flex-h-center flex-v-center">
                <div>
                    <h1>You Lose</h1>
                    <h4>Your score: ${score}</h4>
                    <h1 class="universal-reload minesweeper-reload">&orarr;</h1>
                </div>
            </div>
        `);
        this.addReloadHandler(handler);
    }

    drawWinScreen(handler) {
        this.#area.append(`
            <div class="universal-opacity-layer d-flex flex-h-center flex-v-center">
                <div>
                    <h1>You Win</h1>
                    <h1 class="universal-reload minesweeper-reload">&orarr;</h1>
                </div>
            </div>
        `);
        this.addReloadHandler(handler);
    }

    // Private methods

    // todo

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
