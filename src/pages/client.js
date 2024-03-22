import { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import './style.css';

function ClientComponent() {
  const [pokemonList, setPokemonList] = useState([]);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=50&offset=0');
        const promises = response.data.results.map(async pokemon => {
          const detailsResponse = await axios.get(pokemon.url);
          return {
            name: pokemon.name,
            image: detailsResponse.data.sprites.front_default 
          };
        });
        const pokemonWithData = await Promise.all(promises);
        setPokemonList(pokemonWithData);
      } catch (error) {
        console.error('Error fetching Pokemon:', error);
      }
    };
    fetchPokemon();
  }, []);

  return (
    <div>
      <h1>List of all pokemon:</h1>
      <ul>
        {pokemonList.map((pokemon, index) => (
          <div key={index}>
            <Link href={`/client/${index + 1}`}>
              <img src={pokemon.image} alt={pokemon.name} />
              {pokemon.name}
            </Link>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default ClientComponent;
