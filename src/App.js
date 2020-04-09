import React from 'react';
import './App.css';
import CardsContainer from "./Components/Cards/CardsContainer";
import {Route} from "react-router";

function App() {

  return (
        <div>
                <h1 className="header">Pokedex</h1>
                <CardsContainer/>

        </div>

  );
}

export default App;
