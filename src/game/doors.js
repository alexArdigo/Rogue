import Engine from "./engine.js";
import Key from "../objects/key.js";
import Interface from "./interface.js";
import DoorOpen from "../objects/door/doorOpen.js";
import Hero from "../objects/hero.js";
import DoorClosed from "../objects/door/doorClosed.js";


class Doors {
    gui = Interface.getInstance();
    isLocked = true

    static #instance;
    static getInstance() {
        if (Doors.#instance === undefined) {
            Doors.#instance = new Doors();
        }
        return Doors.#instance;
    }

    constructor() {
    }

    get lockStatus(){
        return this.isLocked
    }

    set lockStatus(status){
        return this.isLocked = status
    }

    unlockDoor(direction) {
            this.removeKey();
            this.openDoor(direction);
            this.lockStatus = false
    }

    removeKey = () => {
        const KEY = Engine.getInstance().hero.inventory.find(tile => tile instanceof Key);
        this.gui.removeStatusImage(KEY);
        Engine.getInstance().hero.inventory[KEY] = -1;
    };

    openDoor(direction) {
        for (let door of Engine.getInstance().currentRoom.doors) {
            if (door.position.equals(Engine.getInstance().hero.position.plus(direction.asVector()))) {
                console.log(door)
                this.open_door = new DoorOpen(door.position);
                this.gui.removeImage(door);
                this.gui.addImage(this.open_door, Engine.getInstance().hero);
                Engine.getInstance().changeRoom(door, direction);
            }
        }
    }

}

export default Doors;