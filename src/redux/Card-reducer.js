import {pokemonAPI} from "../API/api";
import {changeName} from "../service";

const SET_POKEMON_AMOUNT = 'SET_POKEMON_AMOUNT';
const SET_POKEMON_BY_NAME = 'SET_POKEMON_BY_NAME';
const GET_POKEMON_LIST = 'GET_POKEMON_LIST';
const SET_OFFSET = 'SET_OFFSET';
const SET_CURRENT_POKEMON = "SET_CURRENT_POKEMON";
const SET_TYPES_LIST = "SET_TYPES_LIST";


let initalState = {
        pokemonAmount:0,
        pokemonList:[],
        offset:0,
        currentPokemon:{},
        types:[]
}
function cardReducer(state = initalState, action){
        switch(action.type) {
                case SET_POKEMON_AMOUNT :
                        return {
                                ...state,
                                pokemonAmount: action.pokemonAmount
                        }
                case GET_POKEMON_LIST:

                        return {
                                ...state,
                                pokemonList:[ ...state.pokemonList,...action.pokemonList]
                        }
                case SET_POKEMON_BY_NAME: {

                              return {
                                  ...state,
                                  pokemonList: state.pokemonList.map(element => {
                                      if (element.name === action.pokemon.name) {
                                          return {...element,
                                              img: action.pokemon.sprites.front_default,
                                              types: [action.pokemon.types.map((type, index) => {
                                                  return `${changeName(type.type.name)} `

                                              })]
                                          }
                                      }
                                      return element
                                  })

                              }

                }
            case SET_OFFSET:{

                return {
                    ...state,
                    offset: state.offset+12
                }

            }
            case SET_CURRENT_POKEMON:{

                return {
                    ...state,
                    currentPokemon: {
                        id:action.pokemon.id,
                        img: action.pokemon.sprites.front_default,
                        types: [action.pokemon.types.map((type, index) => {
                            if(index === action.pokemon.types.length-1) return changeName(type.type.name)
                            return `${changeName(type.type.name)}, `
                        })],
                        attack: action.pokemon.stats[4].base_stat,
                        defense: action.pokemon.stats[3].base_stat,
                        hp: action.pokemon.stats[5].base_stat,
                        spAttack:action.pokemon.stats[2].base_stat,
                        spDefense:action.pokemon.stats[1].base_stat,
                        speed:action.pokemon.stats[0].base_stat,
                        weight:action.pokemon.weight,
                        totalMoves:action.pokemon.moves.length,
                        name: action.pokemon.name

                    }

                }
            }
            case SET_TYPES_LIST:{

                return {
                    ...state,
                    types: action.list.map(type => {
                        return {...type}
                    })
                }
            }

                default :
                        return state;
        }

}



export const  setPokemonAmount = (pokemonAmount) => {
        return {
                type:SET_POKEMON_AMOUNT,
                pokemonAmount
        }
}
export const getPokemonList = (pokemonList) => {

        return {
                type:GET_POKEMON_LIST,
                pokemonList
        }
}
export const setPokemonByName = (pokemon) => {
        return {
                type:SET_POKEMON_BY_NAME,
                pokemon
        }
}
export const setOffset = () => {
    return {
        type: SET_OFFSET
    }
}
export const setCurrentPokemon = (pokemon) => {
    return {
        type: SET_CURRENT_POKEMON,
        pokemon
    }
}
export const setTypeList = (list) => {
    return {
        type: SET_TYPES_LIST,
        list
    }
}
export  const getPokemonsThunk = (offset, type) => {
        return   (dispatch) =>{
       pokemonAPI.getPokemonsList(offset,type)
            .then(data => {

                        dispatch(setPokemonAmount(data.count))
                        dispatch(getPokemonList(data.results))


            })
            dispatch(setOffset(offset))
        }
}



export const getPokemonsByName = name =>  {
        return    dispatch => {

           pokemonAPI.getPokemonByName(name)
            .then(data => {
                    dispatch(setPokemonByName(data));

                    return data
            })}
}
export const getCurrentPokemon = name => dispatch => {
        pokemonAPI.getPokemonByName(name)
            .then(data =>{

                dispatch(setCurrentPokemon(data))
            })

}
export const getTypeList = () => dispatch => {
    pokemonAPI.getTypeList()
        .then( data => {
            dispatch(setTypeList(data.results))
        })
}
export  const setPokemonsThunkWithFilter = (offset, type) => {
    return   (dispatch) =>{
        pokemonAPI.getPokemonsList(offset,type)
            .then(data => {
                    dispatch(setPokemonAmount(data.pokemon.length))
                    debugger
                    dispatch(getPokemonList(data.pokemon.map(poke => {
                        return {...poke}
                    })))


            })
        dispatch(setOffset(offset))
    }
}


export default cardReducer;
