class SnakeView {
    #app = $('.app');
    #score = null;
    #area = null;
    #keyPressed = false;

    constructor(width, height) {
        this.initArea(width, height);
        this.changeScore(0);
        this.addHandlerPressKey();
        console.log(width);
    }

    initArea(width, height) {
        this.#app.html('');
        this.#app.removeClass('flex-v-center');
        this.#app.html(`
            <div class="snake-title d-flex flex-v-center flex-h-center">
                Score:&nbsp;<span class="snake-score"></span>
            </div>
            <div class="snake-area"></div>
        `);
        this.#area = $('.snake-area');
        this.#score = $('.snake-score');

        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                this.#area.append(`
                    <div class="snake-square" data-x="${x} data-y="${y}">123</div>
                `);
            }
        }
    }

    addHandlerPressKey(handler) {
        $(document).on('keydown', event => {
            if (this.#keyPressed) return;
            this.#keyPressed = true;
            // handler(event.key);
            console.log(event.key);
        });

        $(document).on('keyup', event => {
            this.#keyPressed = false;
        });
    }

    changeScore(score) {
        this.#score.html(score);
    }

    delete() {
        $(document).off('keydown');
        $(document).off('keyup');
    }
}

export default SnakeView;
