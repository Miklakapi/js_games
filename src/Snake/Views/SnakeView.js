class SnakeView {
    #app = $('.app');
    #score = null;
    #keyPressed = false;

    constructor() {
        this.initArea();
        this.changeScore(0);
        this.addHandlerPressKey();
    }

    initArea() {
        this.#app.html('');
        this.#app.removeClass('flex-v-center');
        this.#app.html(`
            <div class="snake-title d-flex flex-v-center flex-h-center">
                Score:&nbsp;<span class="snake-score"></span>
            </div>
        `);
        this.#score = $('.snake-score');
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
