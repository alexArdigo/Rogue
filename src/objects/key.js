import Collect from "../game/status_bar/collect.js";

class Key extends Collect {
    constructor(position) {
        super(position);
    }

    get image() {
        return "Key.png";
    }
}

export default Key;
