import { GRID_SIZE, type Point } from "../types";

interface SnakeProp {
    segments: Point[];
}

export default function SnakeRenderer({ segments = [] }: SnakeProp) {
    return(
        <>
            {segments.map((part, index) => {
                const isHead = index === 0;

                return (
                    <div
                        key={`${part.x}-${part.y}-${index}`}
                        className={`absolute rounded-sm ${
                            isHead ? "bg-green-400 z-10" : "bg-green-600"
                        }`}
                        style={{
                            width: `${100/GRID_SIZE}%`,
                            height: `${100/GRID_SIZE}%`,
                            left: `${(part.x / GRID_SIZE) * 100}%`,
                            top: `${(part.y / GRID_SIZE) * 100}%`,
                            border: "1px solid #166534",
                        }}
                    >
                        {isHead && (
                            <div className="flex justify-between px-1 pt-1 opacity-70">
                                <div className="w-1 h-1 bg-black rounded-full"/>
                                <div className="w-1 h-1 bg-black rounded-full"/>
                            </div>
                        )}
                    </div>
                )
            })}
        </>
    )
}