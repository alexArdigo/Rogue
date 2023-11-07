import Interface from "./interface.js";
import Direction from "../util/direction.js";
import Hero from "../objects/hero.js";
import Hammer from "../objects/hammer.js";
import Movables from "./movables.js";
import Sword from "../objects/sword.js";
import Rooms from "./rooms.js";
import Position from "../util/position.js";
import DoorClosed from "../objects/door/doorClosed.js";
import Door from "./doors.js";
import Status from "./status_bar/status.js";
import Solid from "./solid.js";
import Meat from "../objects/meat.js";
import Collect from "./status_bar/collect.js";
import Doors from "./doors.js";


class Engine {
    gui = Interface.getInstance();

    rooms = [];
    currentRoom;

    static #instance;

    static getInstance() {
        if (Engine.#instance === undefined) {
            Engine.#instance = new Engine();
        }
        return Engine.#instance;
    }


    init() {
        console.log("Engine init");

        this.hero = Hero.getInstance();


        this.status = new Status();
        this.gui.addStatusImages(this.status.statusBar_tiles)
        this.gui.addStatusImages(this.status.fireball_status)
        this.gui.addStatusImages(this.status.healthBar_status)


        this.currentRoom = new Rooms('room0');
        this.rooms.push(this.currentRoom);

        this.gui.addImages(this.currentRoom.floorTiles);
        this.gui.addImages(this.currentRoom.tiles);

        this.hero.position = new Position(2, 5);
        this.currentRoom.tiles.push(this.hero)

        this.gui.addImage(this.hero);
        this.gui.start();
    }

    changeRoom(door) {
        this.gui.clearImages()

        this.currentRoom = new Rooms(door.nextRoom);
        this.rooms.push(this.currentRoom)

        for (let room of this.rooms) {
            if (this.currentRoom.name === 'room1' && this.currentRoom.doors[0].number === 0) {
                this.hero.position = new Position(4, 10);
                break
            }
            if (this.currentRoom.name === 'room2' && this.currentRoom.doors[0].number === 0) {
                this.hero.position = new Position(5, 9);
                break
            }

            // Doesn't work yet
            if (this.currentRoom.name === 'room1' && this.currentRoom.doors[1].number === 1) {
                this.hero.position = new Position(8, 8);
                break
            }
        }

        this.gui.addImages(this.currentRoom.floorTiles);
        this.gui.addImages(this.currentRoom.tiles);

        this.currentRoom.tiles.push(this.hero)
        this.gui.addImage(this.hero);

        this.gui.start();
    }

    keyPressed(key) {
        console.log("User pressed key", key);
        switch (key) {
            case 'ArrowUp':
                this.hero.move(Direction.UP);
                break;
            case 'ArrowRight':
                this.hero.move(Direction.RIGHT);
                break;
            case 'ArrowDown':
                this.hero.move(Direction.DOWN);
                break;
            case 'ArrowLeft':
                this.hero.move(Direction.LEFT);
                break;
            case '1':
                this.hero.dropItem(0);
                break;
            case '2':
                this.hero.dropItem(1);
                break;
            case '3':
                this.hero.dropItem(2);
                break;

        }

        if (key === 'ArrowUp'
            || key === 'ArrowRight'
            || key === 'ArrowDown'
            || key === 'ArrowLeft'
        ) {
            for (let tile of this.currentRoom.tiles) {
                if (tile instanceof Movables && tile !== this.hero) {
                    tile.move(null);
                }
            }
        }
    }

    checkArmourUpgrade(item) {
        if (item instanceof Hammer)
            this.hero.damageUpgrade = 0.5;
        if (item instanceof Sword)
            this.hero.damageUpgrade = 1;
    }

    checkArmourDowngrade(item) {
        console.log(item)
        if (item instanceof Hammer)
            this.hero.damageDowngrade = 0.5;
        if (item instanceof Sword)
            this.hero.damageDowngrade = 1;
    }

    simulateMove(position) {
        for (let tile of this.currentRoom.tiles) {
            if (tile instanceof Solid
                && tile.position.equals(position)) {
                return false;
            }
        }
        return true;
    }

    simulateEnterDoor(position) {
        for (let tile of this.currentRoom.tiles) {
            if (tile instanceof DoorClosed
                && position.equals(tile.position)) {
                return false;
            }
        }
        return true;
    }

    simulateContactMeat(position) {
        for (let tile of this.currentRoom.tiles) {
            if (tile instanceof Meat
                && tile.position.equals(position)) {
                return false;
            }
        }
        return true;
    }

    simulateContactMovables(position) {
        for (let tile of this.currentRoom.tiles) {
            if ((tile instanceof Movables
                    || tile instanceof Collect)
                && tile.position.equals(position)) {
                return false;
            }
        }
        return true;
    }

    simulateContactDoor(position) {
        for (let tile of this.currentRoom.tiles) {
            if (tile instanceof Doors && tile.position.equals(position)) {
                return false;
            }
        }
        return true;
    }
}


export default Engine;

