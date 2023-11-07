import Vector2d from "./vector2d.js";

class Direction {
    #dir;
    static arrayStraight = [
        Direction.UP,
        Direction.RIGHT,
        Direction.DOWN,
        Direction.LEFT
    ];

    static arrayDiagonals = [
        Direction.RIGHT_DOWN,
        Direction.RIGHT_UP,
        Direction.LEFT_DOWN,
        Direction.LEFT_UP
    ];

    constructor(dir) {
        this.#dir = dir;
    }

    static get UP() {
        return new Direction("UP");
    }

    static get RIGHT() {
        return new Direction("RIGHT");
    }

    static get DOWN() {
        return new Direction("DOWN");
    }

    static get LEFT() {
        return new Direction("LEFT");
    }

    static get RIGHT_DOWN() {
        return new Direction("RIGHT_DOWN");
    }

    static get RIGHT_UP() {
        return new Direction("RIGHT_UP");
    }

    static get LEFT_DOWN() {
        return new Direction("LEFT_DOWN");
    }

    static get LEFT_UP() {
        return new Direction("LEFT_UP");
    }


    asVector() {
        if (this.#dir === "UP") {
            return new Vector2d(0, -1);
        }
        if (this.#dir === "RIGHT") {
            return new Vector2d(1, 0);
        }
        if (this.#dir === "DOWN") {
            return new Vector2d(0, 1);
        }
        if (this.#dir === "LEFT") {
            return new Vector2d(-1, 0);
        }
        if (this.#dir === "RIGHT_DOWN") {
            return new Vector2d(1, 1);
        }
        if (this.#dir === "RIGHT_UP") {
            return new Vector2d(1, -1);
        }
        if (this.#dir === "LEFT_DOWN") {
            return new Vector2d(-1, 1);
        }
        if (this.#dir === "LEFT_UP") {
            return new Vector2d(-1, -1);
        }
    }

    equals(direction) {
        return this.asVector().equals(direction.asVector());
    }
}

export default Direction;
