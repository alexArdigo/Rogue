import Solid from "../game/solid.js";

class Wall extends Solid {
    constructor(position) {
        super(position);
    }

    get image() {
        return "Wall.png";
    }
}

export default Wall;
