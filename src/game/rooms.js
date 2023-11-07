import Interface from "./interface.js";
import Position from "../util/position.js";
import Wall from "../objects/wall.js";
import DoorClosed from "../objects/door/doorClosed.js";
import DoorWay from "../objects/door/doorWay.js";
import Skeleton from "../objects/enemies/skeleton.js";
import Key from "../objects/key.js";
import Bat from "../objects/enemies/bat.js";
import BadGuy from "../objects/enemies/badGuy.js";
import Meat from "../objects/meat.js";
import Hammer from "../objects/hammer.js";
import Sword from "../objects/sword.js";
import Floor from "../objects/floor.js";
import room0 from "../../rooms/room0.js";
import room2 from "../../rooms/room2.js";
import room1 from "../../rooms/room1.js";

class Rooms {
    gui = Interface.getInstance();

    name
    tiles = [];
    wall = [];
    doors = [];
    floorTiles = [];

    constructor(room) {
        this.selectRoom(room);
        this.addFloorToList(room);
        this.addImagesToLists(room);
        this.addWallToTilesList();
    }

    selectRoom(room) {

        switch (room) {
            case 'room0':
                this.name = 'room0'
                return this.room = room0;
            case 'room1':
                this.name = 'room1'
                return this.room = room1;
            case 'room2':
                this.name = 'room2'
                return this.room = room2;
        }
    }

    stringToArrayRoomInstructions(room) {
        const INDEX_OF_LAST_HASHTAG = room.lastIndexOf('#');
        return room
            .slice(0, INDEX_OF_LAST_HASHTAG).split('\n')
            .map(line => [...line])
            .filter(line => line.length > 1)
            .map(line => line.splice(2));
    }

    getRoomInstructions(room) {
        const INSTRUCTIONS = this.stringToArrayRoomInstructions(room);
        for (let instruction of INSTRUCTIONS) {
            if (instruction[0] === Number) {
                switch (instruction[0]) {
                    case '0':

                }
            }
        }
    }

    stringToArrayRoom() {
        const FIRST_WALL_TILE = this.room.lastIndexOf('#') + 1;
        return this.room
            .slice(FIRST_WALL_TILE).split('')
            .filter(char => char !== '\n');
    }

    constructRoom(room) {
        const STRING_TO_ARRAY = this.stringToArrayRoom(room);
        let newArray = [];
        let y = 0;
        for (let i = 0; i < STRING_TO_ARRAY.length; i += 10) {
            for (let x = 0; x < 10; x++) {
                newArray.push({
                    obj: STRING_TO_ARRAY[x + i],
                    x: x,
                    y: y
                });
            }
            y++;
        }
        return newArray;
    };

    // Adds NPCs and objects to tiles list
    addImagesToLists(room) {
        for (let object of this.constructRoom(room)) {
            let position = new Position(object.x, object.y);
            switch (object.obj) {
                case 'W':
                    this.wall.push(new Wall(position));
                    break;

                case '0':
                    if (room === 'room0') {
                        this.doorClosed = new DoorClosed(position, 0, false, 'room1');
                        this.tiles.push(this.doorClosed);
                        this.doors.push(this.doorClosed);
                    }
                    if (room === 'room1') {
                        this.doorClosed = new DoorClosed(position, 0, false, 'room2');
                        this.tiles.push(this.doorClosed);
                        this.doors.push(this.doorClosed);
                    }
                    if (room === 'room2') {
                        this.doorClosed = new DoorClosed(position, 0, true, 'room1');
                        this.tiles.push(this.doorClosed);
                        this.doors.push(this.doorClosed);
                    }
                    break;

                case '1':
                    if (room === 'room1') {
                        let doorClosed = new DoorClosed(position, 1, true, 'room2', 'room2');
                        this.tiles.push(doorClosed);
                        this.doors.push(doorClosed);
                    }
                    if (room === 'room2') {
                        let doorClosed = new DoorClosed(position, 1, false, 'room1', 'room1');
                        this.tiles.push(doorClosed);
                        this.doors.push(doorClosed);
                    }
                    break;

                case '2':
                    this.doorWay = new DoorWay(position, 'room0');
                    this.tiles.push(this.doorWay);
                    break;

                case 'S':
                    this.skeleton = new Skeleton(position);
                    this.tiles.push(this.skeleton);

                    break;

                case 'k':
                    this.key = new Key(position);
                    this.tiles.push(this.key);
                    break;

                case 'B':
                    this.bat = new Bat(position);
                    this.tiles.push(this.bat);

                    break;

                case 'G':
                    this.badGuy = new BadGuy(position);
                    this.tiles.push(this.badGuy);

                    break;

                case 'm':
                    this.meat = new Meat(position);
                    this.tiles.push(this.meat);
                    break;

                case 'h':
                    this.hammer = new Hammer(position);
                    this.tiles.push(this.hammer);
                    break;

                case 's':
                    this.sword = new Sword(position);
                    this.tiles.push(this.sword);
                    break;
                default:
                    break;
            }
        }
    }

    // Adds floor to list floor = []
    addFloorToList() {
        for (let x = 0; x < 10; x++) {
            for (let y = 0; y < 10; y++) {
                let position = new Position(x, y);
                this.floorTiles.push(new Floor(position));
            }
        }
    }

    // Adds wall
    addWallToTilesList() {
        this.wall.forEach(tile => this.tiles.push(tile));
    }

    // Fireball
    //let fireball = new FireBall(new Position(5, 3), Direction.RIGHT);
    //this.gui.addImage(fireball);
    //fireball.start();
}

export default Rooms;