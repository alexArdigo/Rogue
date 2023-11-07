import Solid from "./solid.js";
import Engine from "./engine.js";
import Blood from "../objects/blood.js";

class Movables extends Solid {

    constructor(position) {
        super(position);
    }

    move(direction) {
        if (Engine.getInstance().simulateMove(this.position.plus(direction.asVector()))
        && this.isInsideGame(direction)) {
            this.position = this.position.plus(direction.asVector());
        }
    }

    isInsideGame(direction) {
        return !this.position.plus(direction.asVector()).outside()
    }

    addBloodSpill() {
        let blood = new Blood(this.position);
        Engine.getInstance().gui.addImage(blood);
    };

    removeBloodSpill() {
        let blood = new Blood(this.position);
        Engine.getInstance().gui.removeImage(blood);
    }
}


export default Movables;