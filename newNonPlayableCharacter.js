function newNonPlayableCharacter(x, y) {
    let element = newImage('assets/red-character/static.gif');
    element.style.zIndex = 1;

    let direction = null;
    let intervalId; // To store the interval reference

    function moveCharacter() {
        if (direction === 'west') {
            x -= 1;
        }
        if (direction === 'north') {
            y += 1;
        }
        if (direction === 'east') {
            x += 1;
        }
        if (direction === 'south') {
            y -= 1;
        }
        element.style.left = x + 'px';
        element.style.bottom = y + 'px';
    }

    function startMovingCharacter() {
        intervalId = setInterval(moveCharacter, 1);
    }

    function stopMovingCharacter() {
        clearInterval(intervalId);
    }

    async function walkEast(npc) {
        direction = 'east';
        element.src = `./assets/red-character/east.gif`;
        await sleep(2000);
        stopMovingCharacter();
        npc.walkSouth(npc);
    }

    async function walkNorth(npc) {
        direction = 'north';
        element.src = `./assets/red-character/north.gif`;
        await sleep(2000);
        stopMovingCharacter();
        npc.walkNorth(npc);
    }

    async function walkWest(npc) {
        direction = 'west';
        element.src = `./assets/red-character/west.gif`;
        await sleep(2000);
        stopMovingCharacter();
        npc.walkWest(npc);
    }

    const pc = newPlayableCharacter (100, 110)

    const npc = newNonPlayableCharacter(50, 300)

    async function walkSouth(npc) {
        direction = 'south';
        element.src = `./assets/red-character/south.gif`;
        await sleep(2000);
        stopMovingCharacter();
        npc.walkSouth(npc);
    }

    async function moveNPC(){
        await npc.walkNorth(1400)
        await npc.walkEast(1200)
        await npc.walkSouth(300)
        await npc.walkEast(1500)
        await npc.walkSouth(1500)
        await npc.walkWest(2700)
        await npc.walkNorth(400)
    }
    
    moveNPC ()

    function stop() {
        direction = null;
        element.src = `./assets/red-character/static.gif`;
    }

    function sleep(time) {
        return new Promise(resolve => {
            setTimeout(resolve, time);
        });
    }

    return {
        element: element,
        walkWest: walkWest,
        walkNorth: walkNorth,
        walkEast: walkEast,
        walkSouth: walkSouth,
        stop: stop,
        executePath: executePath
    };
}