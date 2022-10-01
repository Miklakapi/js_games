class MinesweeperView {
    static MinesweeperClass = {
        Flag: 'minesweeper-flag',
        Covered: 'minesweeper-undiscovered',
        Empty: 'minesweeper-empty',
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

    setSquareType(position, type) {
        $(`*[data-x="${position.x}"][data-y="${position.y}"]`).addClass(type);
    }

    removeSquareType(position, type) {
        $(`*[data-x="${position.x}"][data-y="${position.y}"]`).removeClass(type);
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

    #isFlag(position) {
        return $(`*[data-x="${position.x}"][data-y="${position.y}"]`).hasClass(MinesweeperView.MinesweeperClass.Flag);
    }

    #isCovered(position) {
        return $(`*[data-x="${position.x}"][data-y="${position.y}"]`).hasClass(MinesweeperView.MinesweeperClass.Covered);
    }

    #isUncovered(position) {
        const element = $(`*[data-x="${position.x}"][data-y="${position.y}"]`);
        return !element.hasClass(MinesweeperView.MinesweeperClass.Covered) &&
            !element.hasClass(MinesweeperView.MinesweeperClass.Empty) &&
            !element.hasClass(MinesweeperView.MinesweeperClass.Flag);
    }

    // Handlers

    addClickHandler(handler) {
        this.#area.on('click', event => {
            const target = $(event.target);
            const position = { x: target.data('x'), y: target.data('y') }
            this.#isCovered(position) && handler(position, 'left-click');
        });

        this.#area.on('contextmenu', event => {
            event.preventDefault();
            const target = $(event.target);
            const position = { x: target.data('x'), y: target.data('y') }
            if (this.#isCovered(position)) {
                handler(position, 'flag');
                return;
            }
            if (this.#isFlag(position)) {
                handler(position, 'un-flag');
                return;
            }
            if (this.#isUncovered(position)) {
                handler(position, 'big-click');
            }
        });
    }

    addReloadHandler(handler) {
        $('.minesweeper-reload').on('click', _ => {
            handler();
        });
    }

    // Destructor

    delete() {
        $('.minesweeper-reload').off('click');
        this.#area.off('contextmenu');
        this.#area.off('click');
    }
}

export default MinesweeperView;
