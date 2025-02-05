import kaplay from "kaplay";
// import "kaplay/global"; // uncomment if you want to use without the k. prefix

const k = kaplay();

k.loadRoot("./"); // A good idea for Itch.io publishing later
k.loadSprite("bean", "sprites/bean.png");

const player = k.add([k.pos(120, 80), k.sprite("bean"), area()]);
const object = k.add([k.pos(200, 80), k.sprite("bean"), area(), "enemy"])

k.onClick(() => k.addKaboom(k.mousePos()));

// Define player movement speed (pixels per second)
const SPEED = 320;
const speedDebuff = Math.sqrt(2)
var horizontalMovement = false
var verticalMovement = false

onKeyDown("left", () => {
    horizontalMovement = true
    if (verticalMovement) {
        player.move(-SPEED / speedDebuff, 0);
    } else {
        player.move(-SPEED, 0);
    }
});

onKeyDown("right", () => {
    horizontalMovement = true
    if (verticalMovement) {
        player.move(SPEED / speedDebuff, 0);
        // player.moveTo(mousePos());
    } else {
        player.move(SPEED, 0);
    }
});

onKeyRelease("right", () => {
    horizontalMovement = false
})
onKeyRelease("left", () => {
    horizontalMovement = false
})

onKeyDown("up", () => {
    verticalMovement = true
    if (horizontalMovement) {
        player.move(0, -SPEED / speedDebuff);
    } else {
        player.move(0, -SPEED);
    }
});

onKeyDown("down", () => {
    verticalMovement = true
    if (horizontalMovement) {
        player.move(0, SPEED / speedDebuff);
    } else {
        player.move(0, SPEED);
    }
});

onKeyRelease("up", () => {
    verticalMovement = false
})
onKeyRelease("down", () => {
    verticalMovement = false
})

var objectCollision = false
player.onUpdate(() => {
    if (player.isColliding(object)) {
        objectCollision = true
    } else {
        objectCollision = false
    }
})

onKeyRelease("1", () => {
    if (objectCollision) {
        destroy(object)
        player.add([circle(16), pos(0, 0)])
    }
})