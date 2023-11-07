import ImageTile from "../../game/imageTile.js";

class DoorWay extends ImageTile {
    constructor(position, previewsRoom) {
        super(position);
        this.previewsRoom = previewsRoom
    }

    get image() {
        return 'DoorWay.png';
    }
}

export default DoorWay;