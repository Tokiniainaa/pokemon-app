import axios from 'axios';
import'./style1.css';

export default function PokemonDetails({ pokemon }) {
  return (
    <div>
      <h1>{pokemon.name}</h1>
      <p>Height: {pokemon.height}</p>
      <p>Weight: {pokemon.weight}</p>
      <p>Types: {pokemon.types.map(type => type.type.name).join(', ')}</p>
    </div>
  );
}

export async function getServerSideProps({ params }) {
  const { id } = params;
  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const pokemon = {
      name: response.data.name,
      height: response.data.height,
      weight: response.data.weight,
      types: response.data.types,
    };
    return {
      props: {
        pokemon,
      },
    };
  } catch (error) {
    console.error('Error fetching Pokemon details:', error);
    return {
      notFound: true,
    };
  }
}