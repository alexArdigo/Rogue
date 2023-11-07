import Position from "../../util/position.js";
import StatusBarBackground from "../../objects/status_bar_background.js";
import Fireball_Status from "./fireball_status.js";
import Green from "../../objects/health_bar/green.js";
import RedGreen from "../../objects/health_bar/redGreen.js";
import Red from "../../objects/health_bar/red.js";
import Engine from "../engine.js";

class Status {
    statusBar_tiles = [];
    fireball_status = [];
    healthBar_status = [];

    constructor(position) {
        this.addStatusBarBackground();
        this.addFireballsToStatusBar();
        this.addHealthBar();
    }

    // Adds status bar background
    addStatusBarBackground() {
        let y = 0;
        for (let x = 0; x < 10; x++) {
            let position = new Position(x, y);
            this.statusBar_tiles.push(new StatusBarBackground(position));
        }
    }

    // Adds fireballs to status bar
    addFireballsToStatusBar() {
        const FIREBALLS = 3;
        let y = 0;
        for (let x = 0; x < FIREBALLS; x++) {
            let position = new Position(x, y);
            this.fireball_status.push(new Fireball_Status(position));
        }
    }

    addHealthBar() {
        if (Engine.getInstance().hero.healthHero >= 7) {
            this.healthBarTiles(3, 0, Green);
            this.healthBarTiles(4, 0, Green);
            this.healthBarTiles(5, 0, Green);
            Engine.getInstance().hero.healthHero === 8
                ? this.healthBarTiles(6, 0, Green)
                : this.healthBarTiles(6, 0, RedGreen);
        }
        if (Engine.getInstance().hero.healthHero === 5
            || Engine.getInstance().hero.healthHero === 6) {
            this.healthBarTiles(3, 0, Green);
            this.healthBarTiles(4, 0, Green);
            Engine.getInstance().hero.healthHero === 6
                ? this.healthBarTiles(5, 0, Green)
                : this.healthBarTiles(5, 0, RedGreen);
            this.healthBarTiles(6, 0, Red);
        }
        if (Engine.getInstance().hero.healthHero === 3
            || Engine.getInstance().hero.healthHero === 4) {
            this.healthBarTiles(3, 0, Green);
            Engine.getInstance().hero.healthHero === 4
                ? this.healthBarTiles(4, 0, Green)
                : this.healthBarTiles(4, 0, RedGreen);
            this.healthBarTiles(5, 0, Red);
            this.healthBarTiles(6, 0, Red);
        }
        if (Engine.getInstance().hero.healthHero === 1
            || Engine.getInstance().hero.healthHero === 2) {
            Engine.getInstance().hero.healthHero === 2
                ? this.healthBarTiles(3, 0, Green)
                : this.healthBarTiles(3, 0, RedGreen);
            this.healthBarTiles(4, 0, Red);
            this.healthBarTiles(5, 0, Red);
            this.healthBarTiles(6, 0, Red);
        }
        if (Engine.getInstance().hero.healthHero === 0) {
            this.healthBarTiles(3, 0, Red);
            this.healthBarTiles(4, 0, Red);
            this.healthBarTiles(5, 0, Red);
            this.healthBarTiles(6, 0, Red);
        }
    }

    healthBarTiles = (x, y, colour) => {
        let position = new Position(x, y);
        this.healthBar_status.push(new colour(position));
    };
}

export default Status;