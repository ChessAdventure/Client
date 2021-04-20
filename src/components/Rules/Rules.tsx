import './Rules.css'

const Rules = () => {

    return (

        <div className="rules-container">
            {/* <h2 className="rules-title">What's ChessPedition?</h2> */}
            <h3 className="rules-text">
                <span className="chess-piece">&#9823;</span>
                Click <span className="bold">Start A New ChessPedition</span> and send the game URL to your opponent.</h3>
            <h3>
                <span className="chess-piece">&#9823;</span>
                If you win the game, you carry only your leftover pieces to the next game!
            </h3>
            <h3>
                <span className="chess-piece">&#9823;</span>
                If you lose the game, you get a full set of pieces.
            </h3>
            <h3>
                <span className="chess-piece">&#9823;</span>
                Keep playing against each other to find the true <span className="bold">ChessPedition</span> champion!
            </h3>
        </div>

    )
}

export default Rules