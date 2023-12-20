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

let currentPage = 1;
let nextUrl = '';
let previousUrl = '';
var buttonPrevious = document.getElementById('button-previous')
var buttonNext = document.getElementById('button-next')

buttonPrevious.onclick = function() {
    if (previousUrl) {
        fetchURL(previousUrl);
    }
}

buttonNext.onclick = function() {
    if (nextUrl) {
        fetchURL(nextUrl);
    }
}


function fetchURL(url){
    fetch(url)
        .then(response => response.json())
        .then(data => {
            nextUrl = data.next;
            previousUrl = data.previous;
            if(data.previous === null){
                buttonPrevious.disabled = true;
            }
            else{
                buttonPrevious.disabled = false;
            }
            getPokemons(data.results);
        })
        .catch(error => console.error('There was a problem with the fetch operation:', error))
}

function clearPokemonList() {
    pokemonListContent.innerHTML = '';
}

function getPokemons(pokemonArray){
    clearPokemonList();
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
                    var firstColor = colours[data.types[0].type.name]
                    var secondColor = colours[data.types[1].type.name]
                    pokemonBox.style.backgroundImage = `linear-gradient(90deg, white, white),
                    linear-gradient(180deg, ${firstColor}, ${secondColor})`;
                    divTypes.style.backgroundImage = `linear-gradient(to right, ${firstColor}, ${secondColor})`;

                }
                else{
                    var oneColor = colours[data.types[0].type.name]
                    pokemonBox.style.borderColor = oneColor;
                    divTypes.style.backgroundColor = oneColor;
                }
                
                data.types.forEach(type => {
                    const typeElement = document.createElement('span');
                    const typeName = type.type.name;
                    const firstLetter = typeName.charAt(0);
                    const firstLetterCap = firstLetter.toUpperCase();
                    const remainingTypeName = typeName.slice(1);
                    const typeNameCapitalize = firstLetterCap + remainingTypeName;
                    typeElement.textContent = typeNameCapitalize;
                    divTypes.appendChild(typeElement);
                    
                    if(data.types.length === 2){
                        divTypes.style.justifyContent = 'space-between';
                    }else{
                        divTypes.style.justifyContent= 'center';
                    }
                });
            })
            .catch(error => console.error('There was a problem with the fetch operation:', error))

    });
}

fetchURL('https://pokeapi.co/api/v2/pokemon?limit=12&offset=0');