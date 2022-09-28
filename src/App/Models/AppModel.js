class AppModel {
    static gameArray = [
        {
            id: 'Snake',
            title: 'SNAKE',
        }, 
        {
            id: 'Minesweeper',
            title: 'MINESWEEPER',
        }
    ];

    #activeGameId = 0;

    changeGame(direction) {
        if (direction === 'right') {
            if (this.#activeGameId < AppModel.gameArray.length - 1) {
                this.#activeGameId++;
            } else {
                this.#activeGameId = 0;
            }
        } else {
            if (this.#activeGameId !== 0) {
                this.#activeGameId--;
            } else {
                this.#activeGameId = AppModel.gameArray.length - 1;
            }
        }
        return this;
    }

    getGame() {
        return AppModel.gameArray[this.#activeGameId];
    }
}

export default AppModel;