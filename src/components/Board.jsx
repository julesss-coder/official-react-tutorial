import { useState } from 'react';
import Square from './Square';

// TODO How to destructure props?
function Board({ squareStates, setSquareStates, history, setHistory, currentMove, setCurrentMove, currentPlayerX, setCurrentPlayerX }) {
    // let [currentPlayerX, setCurrentPlayerX] = useState(true);
    let [gameWinner, setGameWinner] = useState(null);

    // Remove event parameter
    function handleClick(event, squareIndex) {
        // Return if square is already marked OR if `gameWinner` is already set (so that players can't continue after that):
        if (squareStates[squareIndex] || gameWinner) {
            return;
        }
        
        squareStates = squareStates.slice();

        if (currentPlayerX) {
            squareStates[squareIndex] = "X";
        } else {
            squareStates[squareIndex] = "O";
        }


        setSquareStates(squareStates);
        setCurrentMove(currentMove + 1);
        // setHistory does change history, as the correct history is logged to the console and the board is rendered correctly at re-render (triggered by setHistory()). However, immediately logging history after setting it does not show any changes.
        // Assumption: Setting a state is an asynchronous action.
        // Possible answer: useState is async, but logging out the newly set value does not work because of something about a closure => TODO look up.
        // URL: https://stackoverflow.com/questions/54069253/the-usestate-set-method-is-not-reflecting-a-change-immediately

        // On click after going to past move: 
        // history needs to be set to the history of that past state, plus the new state; but the other histories need to be deleted.
        // index of past state = current move, passed down in props
        
        //
        history = history.slice(0, currentMove + 1);
        setHistory([...history, squareStates]);
        // console.log("history in Board component: ", history);
        calculateWinner();
        setCurrentPlayerX(!currentPlayerX);
    }

    function calculateWinner() {
        let winningLines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8], 
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        for (let i = 0; i < winningLines.length; i++) {
            let [a, b, c] = winningLines[i];
            // if first square is not empty AND its content is equal to the other squares:
            if (squareStates[a] && squareStates[a] === squareStates[b] && squareStates[a] === squareStates[c]) {
                // console.log("We have a winner!");
                if (currentPlayerX) {
                    setGameWinner("X");
                } else {
                    setGameWinner("O");
                }
            }
        }
    }

    // TODO Pass in `squareNum` with a loop.
    return (
        <>
            <div className="game-status">
                {
                    !gameWinner 
                    ? currentPlayerX 
                        ? "current player: X" 
                        : "current player: O"
                    : `The winner is ${gameWinner}!`
                }
            </div>
            <div className="board-row" >
                <Square value={ squareStates[0] } onSquareClick={ (event) => handleClick(event, 0) } />
                <Square value={ squareStates[1] } onSquareClick={ (event) => handleClick(event, 1) }/>
                <Square value={ squareStates[2] } onSquareClick={ (event) => handleClick(event, 2) }/>
            </div>
            <div className="board-row">
                <Square value={ squareStates[3] } onSquareClick={ (event) => handleClick(event, 3) }/>
                <Square value={ squareStates[4] } onSquareClick={ (event) => handleClick(event, 4) }/>
                <Square value={ squareStates[5] } onSquareClick={ (event) => handleClick(event, 5) }/>
            </div>
            <div className="board-row">
                <Square value={ squareStates[6] } onSquareClick={ (event) => handleClick(event, 6) }/>
                <Square value={ squareStates[7] } onSquareClick={ (event) => handleClick(event, 7) }/>
                <Square value={ squareStates[8] } onSquareClick={ (event) => handleClick(event, 8) }/>
            </div>
        </>
    )
}

export default Board;