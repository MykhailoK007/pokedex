import React from "react";
import classes from './Cards.module.css'
import {changeName} from "../../service";



class  Cards extends React.Component{
    componentDidMount() {
        this.props.getPokemonsByName(this.props.name)
    }

    setCurrentPokemon = () => {
        this.props.currentModeToggle(this.props.name)
        this.props.getCurrentPokemon(this.props.name);
    }

    render() {

        if (this.props.types) {
            return <div className={classes.card}>
                <div onClick={this.setCurrentPokemon}>
                    <img src={this.props.imgUrl} alt={this.props.name}/>
                    <h3>{changeName(this.props.name)}</h3>
                    <div>
                        {
                            (this.props.types)
                            &&
                            this.props.types.map(type => {
                                return <div key = {type}>{type}</div>
                            })
                        }

                    </div>
                </div>

            </div>
        }
        return <div></div>
    }
}

export default Cards;