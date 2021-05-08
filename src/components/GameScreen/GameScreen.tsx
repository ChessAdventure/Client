/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { URL_ROOT, API_WS_ROOT, API_ROOT } from '../../constants'
import './GameScreen.css'
import Error from '../Error/Error'
import GameOver from '../GameOver/GameOver'
import Header from '../Header/Header'
import Gameboard from '../UIComponents/Gameboard/Gameboard'
import Thumbnail from '../UIComponents/Thumbnail/Thumbnail'
const actioncable = require('actioncable');
const Chess = require('chess.js')

interface PropTypes {
  gameId: string;
  userKey: string;
  userName: string;
  setGameId: any;
  setActiveGame: any;
}
interface userDetails {
  extension: string | undefined;
  current_fen: string | undefined;
  white: string | undefined;
  black: string | undefined;
}

const GameScreen = ({ gameId, userKey, userName, setGameId, setActiveGame }: PropTypes) => {
  const history = useHistory();
  const [chess] = useState<any>(
    new Chess("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1")
  )
  const [fen, setFen] = useState<string>(chess.fen())
  const [color, setColor] = useState<string>('')
  const [opponent, setOpponent] = useState<string>('none')
  const [winner, setWinner] = useState<boolean>(false)
  const [moveError, setMoveError] = useState<string>('')
  const [spectator, setSpectator] = useState<boolean>(false);
  const [gameOver, setGameOver] = useState<boolean>(false)
  const [turn, setTurn] = useState<string>('w')

  const handleUser = (userDetails: userDetails) => {
    userName === userDetails.white ? setColor('white') :
      userName === userDetails.black ? setColor('black') :
        setSpectator(true)
  }

  useEffect(() => {
    setGameId(gameId)
  }, [])

  useEffect(() => {
    chess.load(fen)
  }, [fen])

  useEffect(() => {
    const cable = actioncable.createConsumer(`${API_WS_ROOT}`)
    
    cable.subscriptions.create({
      channel: 'FriendlyGamesChannel',
      token: userKey,
      extension: gameId
    }, {
      connected: () => {
        console.log('connected!')
      },
      disconnected: () => {
        console.log('disconnected')
      },
      received: (resp: any) => {
        resp.data.attributes.white === userName ?
          setOpponent(resp.data.attributes.black || 'none') :
          setOpponent(resp.data.attributes.white)
        handleUser(resp.data.attributes)
        setMoveError('')
        setFen(resp.data.attributes.current_fen)
        
        setTurn(chess.turn())
        if (chess.game_over()) {
          setActiveGame('')
          setGameOver(true)
        }
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameId])

  const handleMove = async (move: object) => {
    if (chess.move(move)) {
      setFen(chess.fen())
      const newFen = chess.fen()
      if (chess.game_over()) {
        try {
          const params = {
            fen: newFen,
            api_key: userKey,
            extension: gameId,
            status: color === 'white' ? 1 : 2,
          }
          let token = "Bearer " + localStorage.getItem('jwt')
          const response = await fetch(`${API_ROOT}/api/v1/friendly_games`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json', 'Authorization': token },
            body: JSON.stringify(params),
            mode: 'cors'
          })
          const data = await response.json()
          setWinner(true)
          setActiveGame('')
        } catch (e) {
          console.log(e)
        }
      } else {
        try {
          const params = {
            fen: newFen,
            api_key: userKey,
            extension: gameId
          }
          let token = "Bearer " + localStorage.getItem('jwt')
          const response = await fetch(`${API_ROOT}/api/v1/friendly_games`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json', 'Authorization': token },
            body: JSON.stringify(params),
            mode: 'cors'
          })
          const data = await response.json()
          setMoveError('')
        } catch (e) {
          console.log(e)
        }
      }
    } else {
      if (turn !== color.slice(0, 1)) {
        setMoveError('Not Your Turn')
      } else {
        setMoveError('Invalid Move')
      }
    }
  }

  const handleLeave = () => {
    setGameId('')
    if (!chess.game_over() && !spectator) {
      setActiveGame(gameId)
    }
    history.push(`/dashboard`)
  }

  return (
    <section className="game-screen-container">
      <Header />
      {moveError && <Error text={moveError} />}
      {opponent !== 'none' && !spectator && <Thumbnail turn={turn !== color.slice(0, 1)} text={`Playing: ${opponent}`} />}
      {spectator && <Thumbnail text="Observing" />}
      {opponent !== 'none' && <Gameboard
        draggable={!spectator}
        width={500}
        fen={fen}
        orientation={color === 'black' ? 'black' : 'white'}
        boardStyle={{
          'width': '500px', 'height': '500px', 'cursor': 'default', 'borderRadius': '5px', 'boxShadow': 'rgba(0, 0, 0, 0.5) 0px 5px 15px'
        }}
        onDrop={(move: any) =>
          handleMove({
            from: move.sourceSquare,
            to: move.targetSquare,
            promotion: "q",
          })
        }
      />}

      {opponent === 'none' &&
        <div className="new-game-link-container">
          <p className="new-game-link-text">Send this link to a friend to start playing!
        <br></br>
            <br></br>
            <span className="new-game-link">
              {URL_ROOT}/game/{gameId}
            </span>
            <br></br>
            <br></br>
            The game board will appear when the second player joins the room.</p>
        </div>}

      {gameOver && !spectator && <GameOver
        userName={userName}
        setGameId={setGameId}
        winner={winner}
        setFen={setFen}
        setWinner={setWinner}
        curExtension={gameId}
        userKey={userKey}
        setColor={setColor}
        setGameOver={setGameOver}
      />}
      <div className="game-screen-lower-third">
        {opponent !== 'none' && !spectator && <Thumbnail turn={turn === color.slice(0, 1)} text={userName} />}
        <button className="button-lt-bg back-to-dashboard" onClick={handleLeave}>Back to Dashboard</button>
      </div>
    </section>
  )
}

export default GameScreen