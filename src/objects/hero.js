import Movables from "../game/movables.js";
import Collect from "../game/status_bar/collect.js";
import Enemies from "../game/enemies.js";
import Meat from "./meat.js";
import Position from "../util/position.js";
import Door from "../game/doors.js";
import Engine from "../game/engine.js";
import Interface from "../game/interface.js";
import Hammer from "./hammer.js";
import Sword from "./sword.js";
import DoorClosed from "./door/doorClosed.js";

class Hero extends Movables {
    health = 5;
    damage = 1;
    inventory = new Array(3).fill(-1);

    gui = Interface.getInstance()
    door = Door.getInstance();

    static #instance;

    static getInstance() {
        if (Hero.#instance === undefined) {
            Hero.#instance = new Hero();
        }
        return Hero.#instance;
    }

    constructor(position) {
        super(position);
    }

    get image() {
        return "Hero.png";
    }

    move(direction) {
        if (!this.simulateAttackEnemies(this.position.plus(direction.asVector()))) {
            this.attackEnemies(direction);
            return;
        }

        if (!Engine.getInstance().simulateEnterDoor(this.position.plus(direction.asVector()))
            && Engine.getInstance().currentRoom.tiles
                .filter(tile => tile instanceof DoorClosed && DoorClosed.getInstance().isLocked === false)) {
            this.door.openDoor(direction);
        }

        if (Engine.getInstance().simulateEnterDoor(this.position.plus(direction.asVector()))
            && this.simulateAttackEnemies(this.position.plus(direction.asVector()))) {
            super.move(direction);
        }

        for (let tile of Engine.getInstance().currentRoom.tiles) {
            if (tile instanceof Collect && this.position.equals(tile.position)) {
                this.collectItem(tile);
            }
        }

        for (let tile of Engine.getInstance().currentRoom.tiles) {
            if (tile instanceof Meat && this.position.equals(tile.position)) {
                this.collectMeat(tile);
            }
        }
    }

    attackEnemies(direction) {
        let index;
        const TARGET_TILE = Engine.getInstance().currentRoom.tiles.find(tile => {
            if (tile.position.equals(this.position.plus(direction.asVector()))) {
                index = Engine.getInstance().currentRoom.tiles.indexOf(tile);
                return tile;
            }
        });

        TARGET_TILE.healthEnemies = this.damage;
        this.addBloodSpill(TARGET_TILE.position)

        if (TARGET_TILE.healthEnemies < 0) {

            this.gui.removeImage(TARGET_TILE);
            Engine.getInstance().currentRoom.tiles.splice(index, 1);
        }
    }

    simulateAttackEnemies(position) {
        for (let tile of Engine.getInstance().currentRoom.tiles) {
            if (tile instanceof Enemies && tile.position.equals(position)) {
                return false;
            }
        }
        return true;
    }

    get healthHero() {
        return this.health;
    }

    set healthHero(damage) {
        return this.health -= damage;
    }

    collectItem(item) {
        const INVENTORY_CAPACITY = 3;
        const INVENTORY_FULL = el => el instanceof Collect;
        if (this.inventory.every(INVENTORY_FULL))
            this.gui.showMessage('Inventory is full');
        for (const el in this.inventory) {
            if (this.inventory[el] === -1
                && this.inventory.length <= INVENTORY_CAPACITY) {
                this.gui.removeImage(item);
                this.inventory[el] = item;
                const TILE_STATUS_BAR = this.inventory.indexOf(item) + 7;
                item.position = new Position(TILE_STATUS_BAR, 0);
                this.gui.addStatusImage(item);
                break;
            }
        }
        Engine.getInstance().checkArmourUpgrade(item);
    };

    dropItem(itemIndex) {
        const ITEM = this.inventory[itemIndex];
        if (ITEM !== -1) {
            this.gui.addImage(ITEM);
            ITEM.position = Engine.getInstance().hero.position;
            this.gui.removeStatusImage(ITEM);
            this.inventory[itemIndex] = -1;
        }

        try {
            if (ITEM === -1) {
                throw new RangeError('Empty Slot');
            }
        } catch (err) {
            console.log(err.message);
            let message = 'Empty slot';
            this.gui.showMessage(message);
        }
        ITEM instanceof Hammer
        || ITEM instanceof Sword
            ? Engine.getInstance().checkArmourDowngrade(ITEM) : null;
    };

    collectMeat(meat) {
        this.engine = Engine.getInstance()
        this.health = 8;
        let index;
        this.gui.removeImage(meat);
        this.engine.status.addHealthBar();
        this.gui.addStatusImages(this.engine.status.healthBar_status);
        for (let tile of this.engine.currentRoom.tiles) {
            if (tile instanceof Meat && tile.position.equals(this.position)) {
                index = this.engine.currentRoom.tiles.indexOf(tile)
                this.engine.currentRoom.tiles.splice(index, 1)
            }
        }
    }

    get damageUpgrade() {
        return this.damage;
    }

    set damageUpgrade(upgrade) {
        return this.damage += upgrade;
    }

    get damageDowngrade() {
        return this.damage;
    }

    set damageDowngrade(downgrade) {
        return this.damage -= downgrade;
    }

    isDead() {
        if (this.health === 0) {
            this.gui.showMessage('WASTED', '', 2000)
            setInterval(() => {
                this.gui.clearImages();
                location.reload()
            }, 1000)
        }
    }

}

export default Hero;
