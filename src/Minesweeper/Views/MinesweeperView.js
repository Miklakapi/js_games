class MinesweeperView {
    static MinesweeperClass = {
        Flag: 'minesweeper-color-flag',
        Covered: 'minesweeper-color-covered',
        Empty: 'minesweeper-color-0',
        Explode: 'minesweeper-color-bomb-explode',
        Bomb: 'minesweeper-color-bomb',
        Miss: 'minesweeper-color-bomb-miss',
        UncoveredPattern: 'minesweeper-color-',
    }

    static MinesweeperClickType = {
        LeftClick: 'leftClick',
        Flag: 'flag',
        UnFlag: 'unFlag',
        BigClick: 'bigClick'
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
                    <div class="minesweeper-square universal-square d-flex flex-h-center flex-v-center ${MinesweeperView.MinesweeperClass.Covered}" data-x="${x}" data-y="${y}"></div>
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

    checkSquareClass(position, minesweeperClass) {
        return $(`*[data-x="${position.x}"][data-y="${position.y}"]`).hasClass(minesweeperClass);
    }

    // Handlers

    addClickHandler(handler) {
        this.#area.on('click', event => {
            const target = $(event.target);
            const position = { x: target.data('x'), y: target.data('y') }
            this.checkSquareClass(position, MinesweeperView.MinesweeperClass.Covered) && handler(position, MinesweeperView.MinesweeperClickType.LeftClick);
        });

        this.#area.on('contextmenu', event => {
            event.preventDefault();
            const target = $(event.target);
            const position = { x: target.data('x'), y: target.data('y') }
            if (this.checkSquareClass(position, MinesweeperView.MinesweeperClass.Covered)) {
                handler(position, MinesweeperView.MinesweeperClickType.Flag);
                return;
            }
            if (this.checkSquareClass(position, MinesweeperView.MinesweeperClass.Flag)) {
                handler(position, MinesweeperView.MinesweeperClickType.UnFlag);
                return;
            }
            if (!this.checkSquareClass(position, MinesweeperView.MinesweeperClass.Empty)) {
                handler(position, MinesweeperView.MinesweeperClickType.BigClick);
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
