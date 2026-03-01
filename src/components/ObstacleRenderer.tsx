import { GRID_SIZE, type Point } from "../types";

export const ObstacleRenderer = (props: any) => {
    return(
        <>
            {props.positions.map((pos: Point, i: number) =>(
                <div
                    key={`obs-${i}`}
                    className="absolute bg-slate-500 rounded-sm shadow-inner"
                    style={{
                        width: `${100 / GRID_SIZE}%`,
                        height: `${100 / GRID_SIZE}%`,
                        left: `${(pos.x / GRID_SIZE) * 100}%`,
                        top: `${(pos.y / GRID_SIZE) * 100}%`,
                        border: '2px solid #334155'
                    }}
                >
                    <div className="w-full h-px bg-slate-400 absolute top-1/2"></div>
                    <div className="w-px h-full bg-slate-400 absolute left-1/2"></div>
                </div>
            ))

            }
        </>
    )
}