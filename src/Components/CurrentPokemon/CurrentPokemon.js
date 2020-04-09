import React from "react";

import classes from './CurrentPokemon.module.css'
import {changeName} from "../../service";
const CurrentPokemon = (props) => {

            return(

            <div className={classes.currentCardWrapper}>
                <div className={classes.currentCard}>
                    <div>
                        <img src={props.img} alt={props.name}
                             className={classes.avatar}/>
                    </div>
                    <h1>{`${changeName(props.name)} #${props.id}`}</h1>
                    <table className={classes.table}>
                        <tbody>
                        <tr>
                            <td>Type</td>
                            <td>{props.types}</td>
                        </tr>
                        <tr>
                            <td>Attack</td>
                            <td>{props.attack}</td>
                        </tr>
                        <tr>
                            <td>Defense</td>
                            <td>{props.defense}</td>
                        </tr>
                        <tr>
                            <td>HP</td>
                            <td>{props.hp}</td>
                        </tr>
                        <tr>
                            <td>Sp Attack</td>
                            <td>{props.spAttack}</td>
                        </tr>
                        <tr>
                            <td>SP Defense</td>
                            <td>{props.spDefense}</td>
                        </tr>
                        <tr>
                            <td>Speed</td>
                            <td>{props.speed}</td>
                        </tr>
                        <tr>
                            <td>Weight</td>
                            <td>{props.weight}</td>
                        </tr>
                        <tr>
                            <td>Total moves</td>
                            <td>{props.totalMoves}</td>
                        </tr>
                        </tbody>

                    </table>
                </div>
            </div>
        )}

export default CurrentPokemon;