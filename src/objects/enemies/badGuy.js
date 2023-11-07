import Enemies from "../../game/enemies.js";
import Position from "../../util/position.js";
import Direction from "../../util/direction.js";

class BadGuy extends Enemies {
    health;
    damage;
    #x_step = 1;
    #y_step = 1;
    #dir_x = Direction.RIGHT;
    #dir_y = Direction.DOWN;

    constructor(position) {
        super(position);
        this.health = 3;
        this.damage = 1;
    }

    get move() {
        console.log(this.position.plus(this.#dir_x.asVector()))
        const SIMULATE_MOVE_X = !this.engine.simulateMove(this.position.plus(this.#dir_x.asVector()));
        const SIMULATE_CONTACT_X = !this.engine.simulateContactMovables(this.position.plus(this.#dir_x.asVector()));
        const SIMULATE_MEAT_X = !this.engine.simulateContactMeat(this.position.plus(this.#dir_x.asVector()));

        if (SIMULATE_MOVE_X || SIMULATE_CONTACT_X || SIMULATE_MEAT_X) {
            this.#x_step *= -1;
            this.#x_step === 1 ? this.#dir_x = Direction.RIGHT : this.#dir_x = Direction.LEFT;
        }

        const SIMULATE_MOVE_Y = !this.engine.simulateMove(this.position.plus(this.#dir_y.asVector()));
        const SIMULATE_CONTACT_Y = !this.engine.simulateContactMovables(this.position.plus(this.#dir_y.asVector()));
        const SIMULATE_MEAT_Y = !this.engine.simulateContactMeat(this.position.plus(this.#dir_y.asVector()));

        if (SIMULATE_MOVE_Y || SIMULATE_CONTACT_Y || SIMULATE_MEAT_Y) {
            this.#y_step *= -1;
            this.#y_step === 1 ? this.#dir_y = Direction.DOWN : this.#dir_y = Direction.UP;
        }
        this.position = new Position(
            this.position.x + this.#x_step, this.position.y + this.#y_step
        );
        super.move()
    }

    get image() {
        return "BadGuy.gif";
    }

    get healthEnemies() {
        return this.health;
    }

    set healthEnemies(damage) {
        return this.health -= damage;
    }
}

export default BadGuy;
