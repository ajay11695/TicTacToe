import { useState } from "react"
import '../stylesheet/reset.css'
import '../stylesheet/style.css'

let number = [0, 1, 2, 3, 4, 5, 6, 7, 8];

function Board({ isNext, square, onPlay }) {
    return (
        <div className=" flex wrap center board">
            {number.map(a =>
                <button key={a} id={`btn${a}`} className="btn" onClick={() => { onPlay(a) }}>{square[a]}</button>
            )
            }
        </div>
    )
}

function App() {
    let [history, setHistory] = useState([Array(9).fill(null)])
    let [currentMove, setCurrentMove] = useState(0)
    let isNext = currentMove % 2 === 0;
    let currentSquare = history[currentMove]

    // it react when board button click    
    function handlePlay(i) {
        // console.log(currentSquare)
        if (calculateWinner(currentSquare) || currentSquare[i]) {
            return;
        }

        let nextSquare = currentSquare.slice()
        nextSquare[i] = isNext ? 'X' : 'O';

        const nextHistory = [...history.slice(0, currentMove + 1), nextSquare];
        // console.log(nextHistory)
        setHistory(nextHistory);
        setCurrentMove(nextHistory.length - 1);
    }

    // show status
    let winner = calculateWinner(currentSquare)
    let status;
    if (winner) {
        status = 'Winner :' + winner
    } else {
        status = 'Next Player :' + (isNext ? 'X' : 'O')
    }

    // go to move
    // function jumpTo(nextMove) {
    //     console.log(nextMove)
    //     setCurrentMove(nextMove);
    // }

    // const moves = history.map((square, i) => {
    //     let description;
    //     if (i > 0) {
    //         description = 'Go to move #' + i;
    //     } else {
    //         description = 'Go to game start';
    //     }
    //     return (
    //         <li key={i}>
    //             <button onClick={() => jumpTo(i)}>{description}</button>
    //         </li>
    //     );
    // });

    let result = currentSquare.every(b => b !== null)

    return (
        <main className="container"> 
            <h1 className="textalign title">Tic-Tac-Toe Game</h1> 
            <div className="flex between align">
                <button className="btn2" onClick={() => {
                    if (currentMove > 0) {
                        setCurrentMove(currentMove - 1)
                    }
                  }}
                >🔙</button>
                <h1 className="status">{result ? 'Game Over' : status}</h1>
            </div>
            <Board isNext={isNext} square={currentSquare} onPlay={handlePlay} />
            <div className="textalign">
                {/* <ol>{moves}</ol> */}
                <button className="btn2 btn3" onClick={() => { setCurrentMove(0) }}>Restart</button>
            </div>
        </main>
    )
}

function calculateWinner(square) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (square[a] && square[a] === square[b] && square[a] === square[c]) {
            return square[a];
        }
    }
    return null;
}

export default App