import ImageTile from "../../game/imageTile.js";

class DoorClosed extends ImageTile {
    number
    isLocked
    nextRoom
    previewsRoom

    static #instance;
    static getInstance() {
        if (DoorClosed.#instance === undefined) {
            DoorClosed.#instance = new DoorClosed();
        }
        return DoorClosed.#instance;
    }

    constructor(position, number, isLocked, nextRoom, previewsRoom) {
        super(position);
        this.number = number;
        this.isLocked = isLocked
        this.nextRoom = nextRoom
        this.previewsRoom = previewsRoom
    }

    get image() {
        return 'DoorClosed.png';
    }
}

export default DoorClosed;