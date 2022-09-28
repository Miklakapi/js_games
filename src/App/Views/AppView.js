class AppView {
    #arrows = $('.arrow');
    #title = $('.title h1');
    #app = $('.app');

    constructor(currentGame) {
        this.insertPlayButton(currentGame);
    }

    addHandlerSwitchGame(handler) {
        this.#arrows.on('click', event => {
            const target = $(event.target);
            const direction = target.data('direction');
            this.#title.addClass('animate-rotate');
            this.#app.addClass('animate-shake');
            setTimeout(() => {
                this.#title.removeClass('animate-rotate');
                this.#app.removeClass('animate-shake');
            }, 500);
            const currentGame = handler(direction);
            this.insertPlayButton(currentGame);
        });
    }

    insertPlayButton(currentGame) {
        this.#app.addClass('flex-v-center');
        this.#app.html(`
            <div class="play-wrapper d-flex flex-v-center flex-h-center">
                <div class="play" data-game="${currentGame.id}">▶</div>
            </div>
        `);
    }

    changeTitle(text) {
        this.#title.html(text);
    }
}

export default AppView;
