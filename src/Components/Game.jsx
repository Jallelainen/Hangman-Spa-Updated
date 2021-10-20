import * as React from 'react';
import { useState, useEffect } from 'react';
import GameService from '../API/GameService';
import setCharAt from '../Utilities/Functions';

export const Game = (props) => {
    const [word, setWord] = useState();
    const [hiddenWord, setHiddenWord] = useState();
    const [hint, setHint] = useState();
    const [guessedChars, setGuessedChars] = useState([]);
    const [round, setRound] = useState(0);
    const [msgBox, setMsgBox] = useState(false);
    const [guessChar, setGuessChar] = useState('');
    const [difficulty] = useState(props.difficulty);

    let gameImage = "../Pics/hangman" + round +".png";
    let errorMsg = "You have already guessed this letter: ";
    

    /* Api call: Fetch word */
    useEffect(() => {
        switch (difficulty) {
            case "easy":
                GameService.getEasyWord(setWord, setHiddenWord, setHint);
                break;
            case "moderate":
                //404
                break;
                case "hard":
                GameService.getHardWord(setWord, setHiddenWord, setHint);
                break;
        
            default:
                break;
        }
            
        
    }, [difficulty]);
    
    /* First it checks if maximum amount of tries is achieved, after which it checks if the guess matches the word
     Then it checks if the guess is already made. If not, the guess will be saved 
     If the guess wasn't already made, it checks if the updated hidden word matches the real word and if it does, gamestate will be set to 'won' 
     If the round exceeds ten iterations, gamestate will be set to 'lost' 
     Hooks are updated last since they take more time and cant keep up with loop-iterations,  input field is also cleared */
    const handleInput = (guess) => {
        let updated = hiddenWord.toUpperCase();
        let rounds = round;
        guess = guess.toUpperCase();
        
         
        if (word) {

            if (rounds < 9) {
                updated = checkGuess(updated, guess);
                
                
                if (updated === hiddenWord) {
                    rounds = handleWronglyGuessed(guess, rounds);

                }else if (updated === word) { 
                    props.setGameState("won");
                    props.setWord(word);
                }
            
            }else{
                
                props.setGameState("lost");
                props.setWord(word);
                props.setGuessed(guessedChars);
            }
        
            setHiddenWord(updated);
            setRound(rounds);
        
            document.getElementById("guess-input").value = '';
        }
    };

    /* Goes through each letter of the word and checks it against the guess 
     if it matches, a defined function inserts the guessed character into the right place in the hidden word */
    const checkGuess = (updatedHidden, guess) => {
        for (let i = 0; i < word?.length; i++) {
            if (word[i] === guess) {
                updatedHidden = setCharAt(updatedHidden, i, guess); 
            };     
        };

        return updatedHidden;
    };

    /* If this method is called its because a guess is wrong. The method firstly checks if the guess havent been made, in which case its saved. 
    If the guess was already made, then an alert is sent to the user informing on which character. It also ticks up the round */
    const handleWronglyGuessed = (guess, rounds) => {
        if(!guessedChars.includes(guess) && !word.includes(guess)){
            setGuessedChars(guessedChars.concat(guess));
            rounds++;

        }else{
            setGuessChar(guess);
            toggleMsgBox(true);
            
            msgBox? clearTimeout(setTimeout) : setTimeout(() => { toggleMsgBox(false); }, 2000);
        }

        return rounds;
    };

    const toggleMsgBox = (bool) => {
        setMsgBox(bool);
    }

    return (
        <div className="main-content">
            {msgBox && (<div className="message-box" ><p id="msg-text">{errorMsg + guessChar}</p> </div>)}
            <h2>Guess the Word</h2>
            <div className="img-container">
                {!hiddenWord? <div className="spinner"></div> 
                : round > 0 ? <img className="game-pic" src={gameImage} alt="Hangmans noose"/> 
                : <div className="game-pic"></div>}
            </div>
            {hiddenWord? <h4 id="hidden-word">{hiddenWord}</h4> : <h3>Loading...</h3>}
            <p id="used-letters"><b>Used letters:</b> {guessedChars}</p>
            {round > 0 && (<p><b>Failed guesses:</b> {round} </p>)}
            <input id="guess-input" placeholder="Enter you guess here..." type="text" onChange={(e) => handleInput(e.target.value)}/>
            <button className="neg-button" onClick={() => {props.setGameState("start")}}>Cancel Game</button>
            {round > 6 && (<button id="hint" onClick={() => alert(hint)}>Hint?</button>)}
            
        </div>
    )
};