import ImageTile from "../game/imageTile.js";

class StatusBarBackground extends ImageTile {

    constructor(position) {
        super(position);
    }

    get image() {
        return 'Black.png';
    }
}

export default StatusBarBackground;