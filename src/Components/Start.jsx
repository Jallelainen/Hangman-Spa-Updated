import * as React from 'react';
import { useState } from 'react';

export const Start = (props) => {
    const [showInfo, setShowInfo] = useState(false);
    const [howToPlayBtn, setHowToPlayBtn] = useState("How to Play?")

    const info = "The goal of the game is to guess the hidden word. You have 10 tries to guess the correct word. Already made guesses is not counted as a try. A hint will be available after 7 tries.";

    const toggleInfo = () => {
        if (showInfo === false) {
            setShowInfo(true);
            setHowToPlayBtn("Close");
        }else{
            setShowInfo(false);
            setHowToPlayBtn("How to Play?");
        }
    };

    return (
        <div className="main-content">
            <h2>Hangmans Noose</h2>
            <h3>Start a new game?</h3>
            <button className="pos-button" onClick={() => props.setGameState("inProgress")}>Generate new Word</button>
            <button onClick={() => toggleInfo()}>{howToPlayBtn}</button>
            {showInfo && (
                <div className="centered-width">
                    <h3>How to play</h3>
                    <p>{info}</p>
                </div>
                )}
        </div>
    )
};