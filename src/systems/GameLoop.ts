import { GRID_SIZE, TICK_RATE, type Point } from "../types";
import { randomPosition } from "../utils/helper";

export const GameLoop = (entities: any, {input, time, dispatch}: any) => {
    const control = entities.control
    const snake = entities.snake
    const apple = entities.apple

    //Input logic
    const keyPressed = input.filter((x: any) => x.name === "onKeyDown");

    keyPressed.forEach((e: any) => {
        const key = e.payload.key.toLowerCase()

        if((key === "w" || key === "arrowup") && control.direction !== "DOWN")
            control.nextDirection = "UP"
        if((key === "s" || key === "arrowdown") && control.direction !== "UP")
            control.nextDirection = "DOWN"
        if((key === "a" || key === "arrowleft") && control.direction !== "RIGHT")
            control.nextDirection = "LEFT"
        if((key === "d" || key === "arrowright") && control.direction !== "LEFT")
            control.nextDirection = "RIGHT"
    });

    //Movement Logic

    if(time.current - control.lastUpdate > TICK_RATE) {
        control.lastUpdate = time.current;
        control.direction = control.nextDirection;

        const head = snake.segments[0];
        const newHead: Point = {...head};

        if (control.direction === "UP") newHead.y -= 1;
        if (control.direction === "DOWN") newHead.y += 1;
        if (control.direction === "LEFT") newHead.x -= 1;
        if (control.direction == "RIGHT") newHead.x += 1;

        // Wall collision
        if (
            newHead.x < 0 ||
            newHead.x >= GRID_SIZE ||
            newHead.y < 0 ||
            newHead.y >= GRID_SIZE
        ) {
            dispatch({type: "game-over"});
            return entities;
        }

        // Self collision
        if (
            snake.segments.some(
                (part: Point) => part.x === newHead.x && part.y === newHead.y
            )
        ){
            dispatch({type: "game-over"});
            return entities;
        }

        snake.segments.unshift(newHead);

        //Apple collision
        if(
            newHead.x === apple.position.x &&
            newHead.y === apple.position.y
        ) {
            dispatch({type: "score-up"});

            let isOcupied = true;

            while (isOcupied){
                apple.position = randomPosition();
                isOcupied = snake.segments.some(
                    (p: Point) =>
                        p.x === apple.position.x && p.y === apple.postion.y
                );
            }
        } else {
            snake.segments.pop();
        }
    }
    return entities;
};