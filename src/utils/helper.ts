import { GRID_SIZE, type Point } from "../types";

export const randomPosition = (): Point => ({
    x: Math.floor(Math.random() * GRID_SIZE),
    y: Math.floor(Math.random() * GRID_SIZE),
});

const isSamePoint = (a: Point, b: Point) =>
    a.x === b.x && a.y === b.y;

const isOcupied = (
    pos: Point,
    snake: Point[],
    apple: Point,
    obstacles: Point[]
) => {
    return(
        snake.some(s => isSamePoint(s, pos)) ||
        isSamePoint(apple, pos) ||
        obstacles.some(o => isSamePoint(o, pos))
    );
};

export const generateObstacles = (
    count: number,
    snake: Point[],
    apple: Point
): Point[] => {
    const obstacles: Point[] = [];

    while (obstacles.length < count) {
        const pos = randomPosition();

        if(!isOcupied(pos, snake, apple, obstacles)){
            obstacles.push(pos);
        }
    }
    return obstacles;
};