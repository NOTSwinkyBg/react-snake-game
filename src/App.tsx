import { useState, useRef } from 'react'
import { GameEngine } from 'react-game-engine'

import SnakeRenderer from './components/SnakeRenderer'
import AppleRenderer from './components/AppleRenderer'
import { GameLoop } from './systems/GameLoop'

export default function App() {
    const [score, setScore] = useState(0);
    const [isGameOver, setIsGameOver] = useState(false);
    const [isRunning, setIsRunning] = useState(true);

    const engineRef = useRef<any>(null);

    const setupEntities = () => ({
        control: {
            direction: "UP",
            nextDirection: "UP",
            lastUpdate: 0,
        },
        snake: {
            segments: [
                { x: 10, y: 10 },
                { x: 10, y: 11 },
                { x: 10, y: 12 },
            ],
            renderer: SnakeRenderer,
        },
        apple: {
            position: { x: 15, y: 5},
            renderer: AppleRenderer,
        },
    });

    const [entities] = useState(setupEntities());

    const onEvent = (e: any) => {
        if (e.type === "score-up") {
            setScore((s) => s + 1);
        }
        if (e.type === "game-over") {
            setIsGameOver(true);
            setIsRunning(false);
        }
    };

    const resetGame = () => {
        setScore(0);
        setIsGameOver(false);
        setIsRunning(true);

        if (engineRef.current) {
            engineRef.current.swap(setupEntities());
        }
    };

    return (
        <div className='min-h-screen bg-slate-900 flex flex-col items-center justify-center p-4'>
            <div className='w-full max-w-md flex justify-between mb-6 bg-slate-800 p-4 rounded-xl'>
                <div>
                    <h1 className='text-2xl font-bold text-green-400'>
                        REACT GAME ENGINE SNAKE 🐍
                    </h1>
                    <p className='text-xs text-slate-400'>WASD / Arrow Keys</p>
                </div>
                <div>
                    <p className='text-sm text-slate-400'>Score</p>
                    <p className='text-4xl font-bold text-red-400'>{score}</p>
                </div>
            </div>
            <div className='relative w-full max-w-md aspect-square bg-slate-800 rounded-lg border-4 border-slate-700 overflow-hidden'>
                <GameEngine
                    ref={engineRef}
                    systems={[GameLoop]}
                    entities={entities}
                    running={isRunning}
                    onEvent={onEvent}
                    className='w-full h-full'
                />

                {isGameOver && (
                    <div className='absolute inset-0 bg-black/80 flex flex-col items-center justify-center'>
                        <h2 className='text-4xl text-red-500 mb-4'>GAME OVER</h2>
                        <button
                            onClick={resetGame}
                            className='bg-green-500 px-6 py-3 rounded-full font-bold'
                        >
                            Restart
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}