class SnakeModel {
    static Direction = {
        ArrowUp: [0, -1],
        ArrowRight: [1, 0],
        ArrowDown: [0, 1],
        ArrowLeft: [-1, 0]
    }

    #direction = null;
}

export default SnakeModel;
