import Collect from "../game/status_bar/collect.js";

class Hammer extends Collect {
    constructor(name, position) {
        super(name, position);
    }

    get image() {
        return "Hammer.png";
    }
}

export default Hammer;
