import React from "react";
import {connect} from "react-redux";
import {
    getCurrentPokemon,
    getPokemonsByName,
    getPokemonsThunk,
    getTypeList,
    setOffset,

} from "../../redux/Card-reducer";
import Cards from "./Cards";
import classes from './Cards.module.css'
import CurrentPokemon from "../CurrentPokemon/CurrentPokemon";

class  CardsContainer extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            currentMode: false,
            currentType:'',
            prev:''
        }

    }

    componentDidMount() {
        this.props.getPokemonsThunk(this.props.offset);
        this.props.getTypeList();

   }
    setOffset = () => {
        this.props.setOffset();

    }
    currentModeToggle = (name) => {

        if(this.state.prev == name){
            this.setState({currentMode: false})
        }else{

            this.setState({prev:name})
            this.setState({currentMode: true})
        }
    }


     render(){

        return  (
            <div className={classes.containerWrapper}>


                    <div className={classes.cardsWrapper} >


                        {
                            this.props.pokemonList.map(element => {

                                return <Cards key={element.name}
                                              name = {element.name}
                                              imgUrl = {element.img}
                                              getPokemonsByName ={this.props.getPokemonsByName.bind(this)}
                                              types = {element.types}
                                              getCurrentPokemon = {this.props.getCurrentPokemon.bind(this)}
                                              currentModeToggle = {this.currentModeToggle}
                                />
                            })
                        }
                        <div  className={classes.loadButton}>
                            <button onClick={()=>{this.props.getPokemonsThunk(this.props.offset)}}

                            >Load More</button>
                        </div>
                    </div>



                {
                    this.state.currentMode &&

                    <CurrentPokemon
                        id = {this.props.currentPokemon.id}
                        name = {this.props.currentPokemon.name}
                        img = {this.props.currentPokemon.img}
                        types = {this.props.currentPokemon.types}
                        attack = {this.props.currentPokemon.attack}
                        defense = {this.props.currentPokemon.defense}
                        hp = {this.props.currentPokemon.hp}
                        spAttack = {this.props.currentPokemon.spAttack}
                        spDefense = {this.props.currentPokemon.spDefense}
                        speed =  {this.props.currentPokemon.speed}
                        weight =  {this.props.currentPokemon.weight}
                        totalMoves =  {this.props.currentPokemon.totalMoves}
                    />

                }

            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        pokemonAmount:state.cards.pokemonAmount,
        pokemonList:state.cards.pokemonList,
        offset:state.cards.offset,
        currentPokemon: state.cards.currentPokemon,

    }
}

export default connect(mapStateToProps,{
    getPokemonsThunk,
    getPokemonsByName,
    setOffset,
    getCurrentPokemon,
    getTypeList
})(CardsContainer)