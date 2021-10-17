import * as React from 'react';
import { useState } from 'react';
import './App.css';

/* ----COMPONENTS---- */
import {Header} from './Components/Header';
import {Footer} from './Components/Footer';
import {Start} from './Components/Start';
import {Game} from  './Components/Game';
import {Outcome} from './Components/Outcome';
import {History} from './Components/History';



function App() {
  const [gameState, setGameState] = useState("start");
  const [word, setWord] = useState();
  const [guessed, setGuessed] = useState([]);

  return (
    <div className="App">
      <header className="App-header">
        <Header setGameState={setGameState} />
          {
            gameState === "start" ? <Start setGameState={setGameState}/> 
            : gameState === "inProgress" ? <Game setGameState={setGameState} setWord={setWord} setGuessed={setGuessed} /> 
            : gameState === "history" ? <History setGameState={setGameState}/> 
            : gameState === "won" ? <Outcome gameState={gameState} setGameState={setGameState} word={word}/> 
            : <Outcome gameState={gameState} setGameState={setGameState} word={word} guessed={guessed}/>
          }
        <Footer />
      </header>
    </div>
  );
}

export default App;
