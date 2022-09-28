import AppView from '../Views/AppView'
import AppModel from '../Models/AppModel';

class AppController {
    #appModel = new AppModel();
    #appView = new AppView();

    constructor() {
        const currentGame = this.#appModel.getGame();
        this.changeTitle(currentGame.title);
        this.#appView.addHandlerSwitchGame(this.switchGame.bind(this));
    }

    switchGame(direction) {
        const currentGame = this.#appModel.changeGame(direction).getGame();
        this.changeTitle(currentGame.title);
    }

    changeTitle(title) {
        this.#appView.changeTitle(title);
    }
}

export default AppController;
