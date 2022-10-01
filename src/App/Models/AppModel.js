class AppModel {
    static GameArray = [
        {
            id: 'Minesweeper',
            title: 'MINESWEEPER',
            constructorValues: [20, 20],
        },
        {
            id: 'Snake',
            title: 'SNAKE',
            constructorValues: [20, 20],
        }
    ];

    #activeGameId = 0;

    changeGame(direction) {
        if (direction === 'right') {
            if (this.#activeGameId < AppModel.GameArray.length - 1) {
                this.#activeGameId++;
            } else {
                this.#activeGameId = 0;
            }
        } else {
            if (this.#activeGameId !== 0) {
                this.#activeGameId--;
            } else {
                this.#activeGameId = AppModel.GameArray.length - 1;
            }
        }
        return this;
    }

    getGame() {
        return AppModel.GameArray[this.#activeGameId];
    }
}

export default AppModel;
