class Position {
    #x;
    #y;

    constructor(x, y) {
        this.#x = x;
        this.#y = y;
    }

    plus(vector) {
        return new Position(this.#x + vector.i, this.#y + vector.j);
    }

    minusPosition(position) {
        return new Position(this.#x - position.x, this.#y - position.y);
    }

    get x() {
        return this.#x;
    }

    get y() {
        return this.#y;
    }

    equals(position) {
        return this.#x === position.x && this.#y === position.y;
    }

    outside() {
        return this.#x < 0
            || this.#y < 0
            || this.#x > 9
            || this.#y > 9;
    }

    toString() {
        return "(" + this.#x + ", " + this.#y + ")";
    }
}

export default Position;
