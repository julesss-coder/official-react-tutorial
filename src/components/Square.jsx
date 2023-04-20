function Square({ value, onSquareClick }) {
    return <button 
        className="square" 
        onClick={ onSquareClick } 
        value={ value }
    >{ value }</button>;
}

export default Square;