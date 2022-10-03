class AppView {
    #arrows = $('.arrow');
    #title = $('.title h1');
    #app = $('.app');

    // Init

    constructor(currentGame) {
        this.#insertPlayButton(currentGame);
    }

    // Methods

    changeTitle(text) {
        this.#title.html(text);
    }

    // Handlers

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
            this.#insertPlayButton(currentGame);
        });
    }

    // Private

    #insertPlayButton(currentGame) {
        this.#app.addClass('flex-v-center');
        this.#app.html(`
            <div class="play-wrapper d-flex flex-v-center flex-h-center">
                <div class="play" data-game="${currentGame.id}">▶</div>
            </div>
        `);
    }
}

export default AppView;
