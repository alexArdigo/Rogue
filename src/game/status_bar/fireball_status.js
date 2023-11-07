import ImageTile from "../imageTile.js";

class Fireball_Status extends ImageTile {

    constructor(position) {
        super(position);
    }

    get image() {
        return 'Fire.gif';
    }
}

export default Fireball_Status;