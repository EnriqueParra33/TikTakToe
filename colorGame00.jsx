const Square = ({ id, newState }) => {
    const [color, setColor] = React.useState("red");
    const [status, setStatus] = React.useState(null);
    const xo = ["O", "X"];

    const palet = ["red", "blue"];
    
    React.useEffect(() => {
        console.log(`Render ${id}`);
        return () => console.log(`unmounting Square ${id}`);
    });
    return (
        <button onClick={(e)=> {
            let col;
            let nextPlayer = newState(id);
            setStatus(nextPlayer);
            if (nextPlayer == 1) {
                col = palet[0];
            } else {
                col = palet[1];
            }
            setColor(col)
            e.target.style.background = col;
        }}
        >
            <h1>{xo[status]}</h1>
        </button>
    );
};
const Board = () => {
    const [player, setPlayer] = React.useState(1)
    const [state, setState] = React.useState(Array(9).fill(null));
    let status = `Player ${player}`;
    let winner = checkWinner(state);
    if(winner != null) status = `Player ${winner} wins`;
    const playerString = player == 0 ? 'O' : 'X';


    const newState = idOfSquare => {
        let thePlayer = player;
        state[idOfSquare] = player;
        setState(state);

        let nextplayer = (player + 1)%2;
        setPlayer(nextplayer);  
        return thePlayer; 
    };

    const reRender = () => setRandom(Math.random());
    function renderSquares(i) {
        return <Square id={i} newState={newState}></Square>
    }
    return (
        <div className="game-board">
            <div className="grid-row">
                {renderSquares(0)}
                {renderSquares(1)}
                {renderSquares(2)}
            </div>
            <div className="grid-row">
                {renderSquares(3)}
                {renderSquares(4)}
                {renderSquares(5)}
            </div>
            <div className="grid-row">
                {renderSquares(6)}
                {renderSquares(7)}
                {renderSquares(8)}
            </div>
            <div id="info">
            <button onClick={reRender}>Re-render</button>
                <h1> {status}</h1>
                <h1> Turn of player {playerString}</h1>
            </div>
        </div>
    );

};

ReactDOM.render(<Board />, document.getElementById('root'));