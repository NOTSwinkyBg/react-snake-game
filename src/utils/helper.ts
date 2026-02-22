import { GRID_SIZE, type Point } from "../types";

export const randomPosition = (): Point => ({
    x: Math.floor(Math.random() * GRID_SIZE),
    y: Math.floor(Math.random() * GRID_SIZE),
});

