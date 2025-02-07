import kaplay from "kaplay";


// 2. Add the wall that the user interacts with
// - Make the wall different colours when you get close to it

const k = kaplay();
const BOXSIZE = 50;

k.loadRoot("./"); // A good idea for Itch.io publishing later
k.loadSprite("bean", "sprites/bean.png");

k.scene("gameLevel", () => {
    const player = k.add([k.pos(width() / 4, height() / 2 - 100), k.sprite("bean"), area(), body(), anchor("center")])
    const carryingArea = k.add([
        k.pos(width() / 10, height() / 2), 
        rect(width() / 5, height()),
        area(),
        body({isStatic: true}),
        anchor("center"),
        color(100,100,100)
    ])

    function createBox(boxColor, boxSize, xLocation, yLocation) {
        return [
            k.pos(xLocation, yLocation),
            rect(boxSize,boxSize), area(),
            "box",
            color(boxColor),
            outline(2),
            body({isStatic: true}),
            anchor("center")
        ]
    }

    // add in the boxes and their accompanying text values
    var objectArray = []
    // var objectTextArray = []
    for (let index = 0; index < 9; index++) {
        // change objectArray[index] to include a component with text
        const XLOC = width() / 4 + BOXSIZE * (index % 3)
        const YLOC = height() / 2 + BOXSIZE * (Math.floor(index / 3))
        if (index % 3 == 0) {
            objectArray[index] = k.add(createBox(rgb(200,100,100), BOXSIZE, XLOC, YLOC))
        } else if (index % 3 == 1) {
            objectArray[index] = k.add(createBox(rgb(100,200,100), BOXSIZE, XLOC, YLOC))
        } else {
            objectArray[index] = k.add(createBox(rgb(100,100,200), BOXSIZE, XLOC, YLOC))
        }
        // objectTextArray[index] = k.add([k.pos(width() / 4 + BOXSIZE * (index % 3), height() / 2 + BOXSIZE * (Math.floor(index / 3))), text(index + 1), color(0,0,0), outline(2), anchor("center")])
        objectArray[index].add([k.pos(0,0), text(index + 1), color(0,0,0), outline(2), anchor("center")])
    }

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

    for (let index = 0; index < 9; index++) {
        var boxNumber = String(index + 1)
        onKeyRelease(boxNumber, () => {
            if (player.isColliding(objectArray[index])) {
                destroy(objectArray[index])
                carryingArea.add(createBox(objectArray[index].color, BOXSIZE * 2, 0, height() / 4 - carryingArea.get("*").length * 50))
                // destroy(objectTextArray[index])
                // player.add([rect(32,32), pos(-32, 10), color(255,255,255)])
            }
        })
    }

    onKeyRelease("space", () => {
        var carriedBoxes = carryingArea.get("*")
        if (carriedBoxes.length > 0) {
            const lastBox = carriedBoxes[carriedBoxes.length - 1]
            k.add(createBox(lastBox.color, BOXSIZE, player.pos.x + BOXSIZE, player.pos.y))
            destroy(lastBox)
            console.log(carryingArea.get("*").length)
        }
    })
    // Timer
    // var time = 0
    // const title = k.add([
    //     text(time),
    //     pos(600,200)
    // ])
    // const startTime = Date.now()
    // onUpdate(() => {
    //     time = (Date.now() - startTime) / 1000  
    //     title.text = time
    // })

})

k.scene("mainMenu", () => {
    setBackground(150,0,0)
    const title = k.add([
        text("Cools Supermarket"),
        pos(600,200)
    ])
    const startGame = k.add([
        text("Press SPACE to start"),
        pos(575,600)
    ])

    onKeyDown("space", () => {
        k.go("gameLevel")
    })
})


k.go("gameLevel")
