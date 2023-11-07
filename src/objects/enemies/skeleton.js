import Direction from "../../util/direction.js";
import Enemies from "../../game/enemies.js";

class Skeleton extends Enemies {
    #randomWalk;
    health;
    damage;

    constructor(position) {
        super(position);
        this.health = 3;
        this.damage = 0.5;
    }

    move() {
        this.#randomWalk = Direction.arrayStraight.concat(Direction.arrayDiagonals)
            [Math.floor(Math.random() * (Direction.arrayStraight.length + Direction.arrayDiagonals.length))];
        super.move(this.#randomWalk);
    }

    get image() {
        return "Skeleton.gif";
    }

    get healthEnemies() {
        return this.health;
    }

    set healthEnemies(damage) {
        return this.health -= damage;
    }
}

export default Skeleton;
