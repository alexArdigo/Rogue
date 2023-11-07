import Movables from "./movables.js";
import Position from "../util/position.js";
import Engine from "./engine.js";
import Hero from "../objects/hero.js";

class Enemies extends Movables {
    engine = Engine.getInstance();
    health;
    damage;

    constructor(position) {
        super(position);
        this.health = 3;
        this.damage = 0;
    }

    move(direction) {
        const DISTANCE = 2;
        if (this.engine.simulateMove(this.position.plus(direction.asVector()))
            && this.engine.simulateContactMovables(this.position.plus(direction.asVector()))
            && this.engine.simulateContactMeat(this.position.plus(direction.asVector()))
            && this.engine.simulateContactDoor(this.position.plus(direction.asVector()))
            && this.isHeroCloseTo(DISTANCE)) {

            let nextPos = this.seekHero();
            if (!this.engine.hero.position.equals(nextPos)) {
                this.position = nextPos;
            }
            if (this.isHeroNextToTile()) {
                this.attackHero();
            }
            return;
        }

        if (this.engine.simulateMove(this.position.plus(direction.asVector()))
            && this.engine.simulateContactMovables(this.position.plus(direction.asVector()))
            && this.engine.simulateContactMeat(this.position.plus(direction.asVector()))
            && this.engine.simulateContactDoor(this.position.plus(direction.asVector())))
            super.move(direction);

    }

    attackHero() {
        let index = this.engine.currentRoom.tiles.indexOf(this.engine.hero);

        this.engine.hero.healthHero = this.damage;
        this.engine.status.addHealthBar();
        this.engine.gui.addStatusImages(this.engine.status.healthBar_status);
        this.addBloodSpill(this.engine.hero.position);

        if (this.engine.hero.healthHero === 0) {
            this.removeBloodSpill(this.engine.hero.position);
            this.engine.gui.removeImage(this.engine.hero);
            this.engine.currentRoom.tiles.splice(index, 1);
            this.engine.hero.isDead();
        }
    }

    isHeroCloseTo(distance) {
        let position_x = Math.abs(this.position.x - this.engine.hero.position.x);
        let position_y = Math.abs(this.position.y - this.engine.hero.position.y);
        return position_x < distance && position_y < distance;
    }

    isHeroNextToTile() {
        let NEXTBY_TILE = 1;
        let position_x = Math.abs(this.position.x - this.engine.hero.position.x);
        let position_y = Math.abs(this.position.y - this.engine.hero.position.y);
        console.log(position_x, position_y);
        return position_x <= NEXTBY_TILE && position_y <= NEXTBY_TILE;
    }

    seekHero() {
        const X_ = this.engine.hero.position.x > this.position.x
            ? this.position.x + 1
            : this.engine.hero.position.x < this.position.x
                ? this.position.x - 1
                : this.position.x;

        const Y_ = this.engine.hero.position.y > this.position.y
            ? this.position.y + 1
            : this.engine.hero.position.y > this.position.y
                ? this.position.y - 1
                : this.position.y;

        return new Position(X_, Y_);
    }

    simulateAttackHero(position) {
        for (let tile of this.engine.currentRoom.tiles) {
            if (tile instanceof Hero && tile.position.equals(position)) {
                return false;
            }
        }
        return true;
    }

    get healthEnemies() {
        return this.health;
    }

    set healthEnemies(damage) {
        return this.health -= damage;
    }
}

export default Enemies;