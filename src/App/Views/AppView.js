class AppView {
    #arrow = $('.arrow');
    #wrapper = $('.wrapper');

    addHandlerSwitchGame(handler) {
        this.#arrow.on("click", function () {
            
            handler();
        });
    }
}

export default new AppView();
