console.log("Funciona");

const pokemonListContent = document.getElementsByClassName('pokemon-list')[0];

fetch('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0')
    .then(response => response.json())
    .then(data => getPokemons(data.results))
    .catch(error => console.error('There was a problem with the fetch operation:', error))

function getPokemons(pokemonArray){
    pokemonArray.forEach(pokemon => {

        const pokemonBox = document.createElement('div')
        const namePokemon = document.createElement('p')
        pokemonListContent.appendChild(pokemonBox);
        namePokemon.textContent = pokemon.name
        pokemonBox.appendChild(namePokemon)



        
        console.log(pokemon.name)
    });
}
 