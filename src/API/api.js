import * as axios from 'axios';


const pokemonList = axios.create({
    baseURL:'https://pokeapi.co/api/v2/'
});



export const pokemonAPI= {

    getPokemonsList(offset) {


       return  pokemonList.get(`pokemon/?limit=12&offset=${offset}`)
            .then(response => {

                return response.data
            })

    },
    getPokemonByName(name){

        return   pokemonList(`pokemon/${name}`)
            .then(  response => {

                return  response.data
            })
    },
    getTypeList(){
        return pokemonList.get('type?limit=999')
            .then(response => {
                return response.data
            })
    }

}
