import AppView from '../Views/AppView'
import AppModel from '../Models/AppModel';

class UiController {
    #appModel = new AppModel();
    #appView = new AppView();

    constructor() {
        
    }
}

export default new UiController();
