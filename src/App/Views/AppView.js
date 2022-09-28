class AppView {
    #arrows = $('.arrow');
    #title = $('.title h1');
    #app = $('.app');

    addHandlerSwitchGame(handler) {
        this.#arrows.on("click", (event) => {
            const target = $(event.target);
            const direction = target.data('direction');
            this.#title.addClass('animate-rotate');
            this.#app.addClass('animate-shake');
            setTimeout(() => {
                this.#title.removeClass('animate-rotate');
                this.#app.removeClass('animate-shake');
            }, 500);
            handler(direction);
        });
    }

    changeTitle(text) {
        this.#title.html(text);
    }
}

export default AppView;
