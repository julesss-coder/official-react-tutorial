import { useState } from 'react';
import Board from './Board';

function Game() {
    // State of each square in a board
    let [squareStates, setSquareStates] = useState(Array(9).fill(null));
    // History of past board states (array of arrays)
    // QUESTION: COuld I use [squareStates] to initialize history? Or would history then always be the same as squareStates?
    let [history, setHistory] = useState([Array(9).fill(null)]);
    console.log("history: ", history);
    let [currentMove, setCurrentMove] = useState(0);
    console.log("currentMove: ", currentMove);
    let [currentPlayerX, setCurrentPlayerX] = useState(true);


    function goToMove(event, index) {
        console.log("index in goToMove: ", index);
        setSquareStates(history[index]);
        setCurrentMove(index);
        // Going back to a previous move shows the current player, ie. the player who made that move.
        if (currentMove % 2 === 0) {
            setCurrentPlayerX(false);
        } else {
            setCurrentPlayerX(true);
        }
        // TODO currentPlayerX needs to be reset each time:
            // lift that state up from Board component. 
            // depends on evenness/oddness of move
        console.log("the board at this move: ", history[index]);
        // reset history to history.slice(0, index + 1), but only after click
        // but how do I get access to index inside handleClick?
    }

    /*
    Each button in list must be connected to the corresponding element in history array.
    PLayer can go back to any past state.
    Player can continue game from there. 
    If player clicks on "go to past move: // history past that move should be deleted
        // What happens to currentPlayerX?
        // History should only contain the states up the the current one. The rest of the history is deleted! How?
        get history connected to that past move
        set squareState to that past state (setSquareState) -> past state is rendered

        If player clicks an empty square:
            // handleClick does its job:
            // sets state, adds it to history
            // What happens to the previous histories?
            // Assumption: by setting history to previous plus the new squareStates arrays, the previous value of history is overwritten.

        
    */

    return (
        <>
            <h1>Tic Tac Toe</h1>
            <Board 
                squareStates={ squareStates}
                setSquareStates={ setSquareStates }
                history={ history }
                setHistory={ setHistory }
                currentMove={ currentMove }
                setCurrentMove={ setCurrentMove }
                currentPlayerX={ currentPlayerX }
                setCurrentPlayerX={ setCurrentPlayerX }
            />
            <div>
                <ol>

                {
                    history.map((state, index) => {
                        if (index === 0) {
                            return <li key={ index }><button onClick={ () => goToMove(event, index) }>Go to start</button></li>;
                        } 

                        return <li key={ index }><button onClick={ () => goToMove(event, index) }>Go to move # { index }</button></li>
                    })
                }
                </ol>
            </div>

        </>
    );
}

export default Game;