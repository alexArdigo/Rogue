import Collect from "../game/status_bar/collect.js";

class Sword extends Collect {
    constructor(position) {
        super(position);
    }

    get image() {
        return "Sword.png";
    }
}

export default Sword;