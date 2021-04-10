import Chessboard from 'chessboardjsx';
import './App.css';

interface BoardDetails {
  fen: string;
  draggable?: boolean;
  width?: number;
}

const App: React.FC = () => {
  const currentBoard: BoardDetails = {
    fen: "rnbqkbnr/pp1ppppp/8/2p5/4P3/5N2/PPPP1PPP/RNBQKB1R b KQkq - 1 2",
    draggable: false,
    width: 500,
  }

  return ( 
    <div className="App">
      <header className="App-header">
        <Chessboard
          position={currentBoard.fen} 
          draggable={currentBoard.draggable}
          width={currentBoard.width}
        />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
