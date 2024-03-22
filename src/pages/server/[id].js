import axios from 'axios';
 import './style2.css';

export default function PokemonDetails({ pokemon }) {
  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`;

  return (
    <div className='details'>
      <h1>{pokemon.name}</h1>
      <img src={imageUrl} alt={pokemon.name} />
      <p>Height: {pokemon.height}</p>
      <p>Weight: {pokemon.weight}</p>
      <p>Types: {pokemon.types.map(type => type.type.name).join(', ')}</p>
      <p>Number: {pokemon.id}</p>
    </div>
  );
}

export async function getServerSideProps({ params }) {
  const { id } = params;
  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const pokemon = {
      id: response.data.id,
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
