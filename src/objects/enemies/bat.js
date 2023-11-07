import Direction from "../../util/direction.js";
import Enemies from "../../game/enemies.js";

class Bat extends Enemies {
    #step = 1;
    #dir = Direction.RIGHT;
    health;
    damage;

    constructor(position) {
        super(position);
        this.health = 3;
        this.damage = 0.5;
    }

    move() {

        const SIMULATE_MOVE = !this.engine.simulateMove(this.position.plus(this.#dir.asVector()));
        const SIMULATE_CONTACT = !this.engine.simulateContactMovables(this.position.plus(this.#dir.asVector()));
        const SIMULATE_MEAT = !this.engine.simulateContactMeat(this.position.plus(this.#dir.asVector()));

        if (SIMULATE_MOVE || SIMULATE_CONTACT || SIMULATE_MEAT) {
            this.#step *= -1;
            this.#step === 1 ? this.#dir = Direction.RIGHT : this.#dir = Direction.LEFT;
        }
        super.move(this.#dir);
    }

    get image() {
        return "Bat.gif";
    }

    get healthEnemies() {
        return this.health;
    }

    set healthEnemies(damage) {
        return this.health -= damage;
    }
}

export default Bat;
