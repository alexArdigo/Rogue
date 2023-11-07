import Enemies from "../../game/enemies.js";

class Thief extends Enemies {
    constructor(position) {
        super(position);
    }

    get image() {
        return "Thief.gif";
    }
}

export default Thief;
