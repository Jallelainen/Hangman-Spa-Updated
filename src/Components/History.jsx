import * as React from 'react';

export const History = (props) => {

    return (
        <div className="main-content" >
            <div className="centered-width">
                <h2>The History of Hangmans Noose</h2>
                <p>Though the origins of the game are unknown, a variant is mentioned in a book of
                    children's games assembled by Alice Gomme in 1894 called Birds, Beasts, and Fishes. 
                    Further research is needed. <a href="https://en.wikipedia.org/wiki/Hangman_%28game%29">Source</a></p>
                <button onClick={() => props.setGameState("start")}>Home</button>
            </div>
        </div>
    )
};