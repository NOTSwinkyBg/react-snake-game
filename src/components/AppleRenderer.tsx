import { GRID_SIZE, type Point } from "../types";

interface AppleProps{
    position: Point;
}

export default function AppleRenderer({position}: AppleProps) {
    return(
        <div
            className="absolute bg-red-500 rounded-full flex items-center justify-center shadow-lg"
            style={{
                width: `${100 / GRID_SIZE}%`,
                height: `${100 / GRID_SIZE}%`,
                left: `${(position.x / GRID_SIZE) * 100}%`,
                top: `${(position.y / GRID_SIZE) * 100}%`,
            }}
        >
            <div className="w-1 h-2 bg-green-700 absolute -top-1 rounded-sm"/>
        </div>
    );
}