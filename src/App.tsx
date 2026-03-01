import { useState, useRef } from 'react'
import { GameEngine } from 'react-game-engine'

import SnakeRenderer from './components/SnakeRenderer'
import AppleRenderer from './components/AppleRenderer'
import { ObstacleRenderer } from './components/ObstacleRenderer'
import { GameLoop } from './systems/GameLoop'
import { generateObstacles } from './utils/helper'

export default function App() {
    const [score, setScore] = useState(0);

    const [highScore, setHighScore] = useState(() => {
        return parseInt(localStorage.getItem('snakeHighScore') || '0');
    });

    const [isGameOver, setIsGameOver] = useState(false);
    const [isRunning, setIsRunning] = useState(false);
    const [isPaused, setIsPaused] = useState(false);

    const engineRef = useRef<any>(null);

    const setupEntities = () => {
        const snakeSegments = [
            { x: 10, y: 15},
            { x: 10, y: 16},
            { x: 10, y: 17},
        ];

        const applePosition = { x: 10, y: 5};

        return {
            control: {direction: 'UP', nextDirection: 'UP', lastUpdate: 0, score: 0},
            snake: {
                segments: snakeSegments,
                renderer: SnakeRenderer
            },
            apple: {
                position: applePosition,
                renderer: AppleRenderer
            },
            obstacles: {
                positions: generateObstacles(
                    15,
                    snakeSegments,
                    applePosition
                ),
                renderer: <ObstacleRenderer/>
            }
        };
    };

    const onEvent = (e: any) => {
        if (e.type === "score-up") {
            setScore((s) => s + 1);
        }
        else if (e.type === "game-over") {
            setIsGameOver(true);
            setIsRunning(false);

            if (score > highScore){
                setHighScore(score);
                localStorage.setItem('snakeHighScore', score.toString());
            }
        }
        else if (e.type === "toggle-pause") {
            setIsPaused(p => !p);
            setIsRunning(r => !r);
        }
    };

    const startGame = () => {
        setScore(0);
        setIsGameOver(false);
        setIsPaused(false);
        setIsRunning(true);
        if (engineRef.current) {
            engineRef.current.swap(setupEntities());
        }
    };

    const currentSpeedMs = Math.max(60, 180 - (score * 5));

    return (
        <div className='min-h-screen bg-slate-900 flex flex-col items-center justify-center p-4'>
            <div className='w-full max-w-md flex justify-between mb-6 bg-slate-800 p-4 rounded-xl'>
                <div>
                    <h1 className='text-2xl font-bold text-green-400'>
                        REACT GAME ENGINE SNAKE 🐍
                    </h1>
                    <p className='text-xs text-slate-400 mt-1'>Рекорд: <span className='font-bold text-yellow-400'>{highScore}</span></p>
                </div>
                
                <div className='flex gap-4 items-center'>
                    <div className='text-right'>
                        <p className='text-sm text-slate-400'>Точки</p>
                        <p className='text-4xl font-bold text-red-400'>{score}</p>
                    </div>
                    <div className='text-right hidden sm:block border-r border-slate-600 pr-4'>
                        <p className='text-[10px] text-slate-400 uppercase'>Скорост</p>
                        <p className='text-lg font-bold text-blue-400'>{currentSpeedMs}ms</p>
                    </div>
                </div>
            </div>
            <div className='relative w-full max-w-md aspect-square bg-slate-800 rounded-lg border-4 border-slate-700 overflow-hidden'>
                <GameEngine
                    ref={engineRef}
                    systems={[GameLoop]}
                    entities={setupEntities()}
                    running={isRunning}
                    onEvent={onEvent}
                    className='w-full h-full'
                />

                {(!isRunning || isPaused || isGameOver) && (
                    <div className='absolute inset-0 bg-black/80 flex flex-col items-center justify-center z-20 backdrop:-blur-sm'>
                        {isGameOver && (
                            <>
                                <h2 className='text-5xl font-black text-red-500 mb-2 drop-shadow-md'>GAME OVER</h2>
                                <p className='text-xl text-slate-300 mb-2'>Точки : <span className='text-red-400 font-bold'>{score}</span></p>
                                {score >= highScore && score > 0 && (
                                    <p className='text-yellow-400 font-bold mb-6 animate-bounce'>🏆 НОВ РЕКОРД!</p>
                                )}
                            </>
                        )}

                        {!isGameOver && isPaused && (
                            <h2 className='text-5xl font-black text-yellow-500 mb-6 tracking-widest'>ПАУЗА</h2>
                        )}

                        <button
                            onClick={() => isPaused ? onEvent({type: "toggle-pause"}): startGame()}
                            className='bg-green-500 hover:bg-green-400 text-slate-900 font-bold py-3 px-8 rounded-full text-lg transition-transform hover:scale-105 active:scale-95 shadow-lg mt-4'
                        >
                            {isPaused ? 'Продължи' : 'Нова игра'}
                        </button>
                    </div>
                )}
            </div>
            <div className='flex gap-6 mt-6 text-sm text-slate-400'>
                <p>🎮 <span className='text-white'>WASD</span> - Движение</p>
                <p>⏸️ <span className='text-white'>P</span> - Пауза</p>
            </div>
        </div>
    );
}