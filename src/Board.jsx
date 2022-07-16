import React, { useCallback, useEffect, useState } from 'react'
import { computeLetterStates } from './WordUtils'
import wordBank from './word-bank.json'

function getRandomWord() {
    const words = wordBank.words
    return words[Math.floor(Math.random() * words.length)];
}
const word = getRandomWord()
console.log(word)

const Board = () => {
    const boardDefault = [
        [" ", " ", " ", " ", " "],
        [" ", " ", " ", " ", " "],
        [" ", " ", " ", " ", " "],
        [" ", " ", " ", " ", " "],
        [" ", " ", " ", " ", " "],
        [" ", " ", " ", " ", " "],
    ];
    const [board, setBoard] = useState(boardDefault)
    const [currAttempt, setCurrAttempt] = useState({ attempt: 0, letter: 0 });
    const [gameOver, setGameOver] = useState(false)

    const onSelectLetter = (key) => {
        if (currAttempt.letter > 4 || currAttempt.attempt > 5) return;
        const newBoard = [...board];
        newBoard[currAttempt.attempt][currAttempt.letter] = key;
        setBoard(newBoard);
        setCurrAttempt({
            attempt: currAttempt.attempt,
            letter: currAttempt.letter + 1,
        });
    };

    const onEnter = () => {
        if (currAttempt.letter !== 5) return;
        const currWord = board[currAttempt.attempt].join("")
        setCurrAttempt({
            attempt: currAttempt.attempt + 1,
            letter: 0,
        });
        if (currWord === word) {
            setGameOver(true)
            return
        }
    }

    const onDelete = () => {
        if (currAttempt.letter <= 0) return;
        const newBoard = [...board];
        newBoard[currAttempt.attempt][currAttempt.letter - 1] = " ";
        setBoard(newBoard);
        setCurrAttempt({
            attempt: currAttempt.attempt,
            letter: currAttempt.letter - 1,
        });
    }

    const handleType = useCallback(
        (event) => {
            if (gameOver) return
            if (event.key === "Enter") {
                onEnter()
                return
            }
            if (event.key === "Backspace") {
                onDelete()
                return
            }
            let match = event.key.match(/^[a-z]{1}/)
            if (match) {
                onSelectLetter(event.key)
            }
        },
        [currAttempt],
    )

    function getStates(i) {
        if (i >= currAttempt.attempt) return Array(5).fill('')
        const guess = board[i].join("")
        return computeLetterStates(guess, word)
    }

    useEffect(() => {
        window.addEventListener('keydown', handleType)
        return () => window.removeEventListener('keydown', handleType)
    }, [handleType])

    return (
        <div className="grid">
            {board.map((_row, i) =>
                getStates(i).map((state, j) => (
                    <div key={`${i}-${j}`} className="square" id={state}>
                        {board[i][j]}
                    </div>
                ))
            )}
        </div>
    )
}

export default Board
