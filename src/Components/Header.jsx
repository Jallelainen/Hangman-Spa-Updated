import * as React from 'react';

export const Header = (props) => {

    return (
        <div className="App-header">
            <ul>
                <li id="li-title" ><h1 id="header-title" onClick={() => props.setGameState("start")}>Hangmans Noose</h1></li>
                <li onClick={() => props.setGameState("start")}><h3>Game</h3></li>
                <li onClick={() => props.setGameState("history")}><h3>History</h3></li>
            </ul>
        </div>
    )
};