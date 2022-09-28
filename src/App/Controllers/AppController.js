import AppView from '../Views/AppView'
import AppModel from '../Models/AppModel';

class AppController {
    #appModel = null;
    #appView = null;

    constructor() {
        this.#appModel = new AppModel();
        const currentGame = this.#appModel.getGame();
        this.#appView = new AppView(currentGame);
        this.changeTitle(currentGame.title);
        this.#appView.addHandlerSwitchGame(this.switchGame.bind(this));
    }

    switchGame(direction) {
        const currentGame = this.#appModel.changeGame(direction).getGame();
        this.changeTitle(currentGame.title);
        return currentGame;
    }

    changeTitle(title) {
        this.#appView.changeTitle(title);
    }
}

export default AppController;
