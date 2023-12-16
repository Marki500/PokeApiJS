const pokemonListContent = document.getElementsByClassName('pokemon-list')[0];
const colours = {
	normal: '#A8A77A',
	fire: '#EE8130',
	water: '#6390F0',
	electric: '#F7D02C',
	grass: '#7AC74C',
	ice: '#96D9D6',
	fighting: '#C22E28',
	poison: '#A33EA1',
	ground: '#E2BF65',
	flying: '#A98FF3',
	psychic: '#F95587',
	bug: '#A6B91A',
	rock: '#B6A136',
	ghost: '#735797',
	dragon: '#6F35FC',
	dark: '#705746',
	steel: '#B7B7CE',
	fairy: '#D685AD',
};

fetch('https://pokeapi.co/api/v2/pokemon?limit=20&offset=0')
    .then(response => response.json())
    .then(data => getPokemons(data.results))
    .catch(error => console.error('There was a problem with the fetch operation:', error))

function getPokemons(pokemonArray){
    pokemonArray.forEach(pokemon => {

        const pokemonBox = document.createElement('div')
        const namePokemon = document.createElement('p')
        const divTypes = document.createElement('div');
        pokemonBox.classList.add("pokemonCard")
        namePokemon.classList.add("namePokemon")
        divTypes.classList.add("divTypes");
        pokemonListContent.appendChild(pokemonBox);
        namePokemon.textContent = pokemon.name
        pokemonBox.appendChild(namePokemon)
        pokemonBox.appendChild(divTypes);

        fetch(`https://pokeapi.co/api/v2/pokemon/` + pokemon.name)
            .then(response => response.json())
            .then(data => { 
                const imagePokemon = document.createElement('img');
                imagePokemon.src = data.sprites.front_default;
                pokemonBox.appendChild(imagePokemon);

                if(data.types.length === 2){
                    var firstColor = colours[data.types[0].type.name];
                    var secondColor = colours[data.types[1].type.name];
                    pokemonBox.style.borderImage = `linear-gradient(to bottom, ${firstColor}, ${secondColor}) 1`;
                    divTypes.style.background = `linear-gradient(45deg, ${firstColor} 0%, ${secondColor} 100%)`;
                }else{
                    var oneColor = colours[data.types[0].type.name];
                    pokemonBox.style.borderColor = oneColor;
                }
                
                data.types.forEach(type => {
                    const typeElement = document.createElement('span');
                    typeElement.textContent = type.type.name;
                    divTypes.appendChild(typeElement);
                });
            })
            .catch(error => console.error('There was a problem with the fetch operation:', error))

    });
}
 