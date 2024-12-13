import Link from "next/link";

export default function Card({ pokemon }) {
 
  const typeColors = {
    fire: "bg-red-500",
    water: "bg-blue-500",
    grass: "bg-green-500",
    electric: "bg-yellow-400",
    bug: "bg-green-600",
    normal: "bg-gray-300",
    poison: "bg-purple-500",
    ground: "bg-yellow-700",
    psychic: "bg-pink-500",
    rock: "bg-gray-600",
    ice: "bg-blue-200",
    dragon: "bg-indigo-700",
    ghost: "bg-purple-900",
    dark: "bg-gray-800",
    steel: "bg-gray-400",
    fairy: "bg-pink-300",
    fighting: "bg-orange-700",
    flying: "bg-indigo-400",
  };

  const primaryType = pokemon.types[0].type.name; 
  const cardBgColor = typeColors[primaryType] || "bg-gray-200"; 

  return (
    <Link href={`/details/${pokemon.id}`}> 
      <div
        className={`${cardBgColor} bg-opacity-80 border-4 border-gray-700 rounded-lg shadow-xl p-4 max-w-sm transition transform hover:scale-105 hover:shadow-lg hover:shadow-slate-400 ease-in-out duration-150`}
        style={{
          background: `linear-gradient(to bottom, ${cardBgColor} 70%, rgba(255, 255, 255, 0.3) 100%)`,
        }}
      >
   
        <h2 className="text-2xl font-bold text-center text-white uppercase mb-4">
          {pokemon.name}
        </h2>
        
   
        <div className="flex justify-center mb-4">  
          <img
            src={pokemon.sprites.front_default}
            alt={pokemon.name}
            className="h-32 w-32 drop-shadow-3xl"
          />
        </div>
        
     
        <div className="flex justify-center space-x-2 mb-4">
          {pokemon.types.map((type, index) => (
            <span
              key={index}
              className="px-2 py-1 text-sm font-semibold text-white rounded-lg bg-black bg-opacity-30"
            >
              {type.type.name}
            </span>
          ))}
        </div>
        
   
        <div className="bg-white rounded-lg p-4 shadow-inner">
          <p className="text-gray-700 font-semibold">HP: {pokemon.stats[0].base_stat}</p>
          <p className="text-gray-700 font-semibold">Attack: {pokemon.stats[1].base_stat}</p>
          <p className="text-gray-700 font-semibold">Defense: {pokemon.stats[2].base_stat}</p>
          <p className="text-gray-700 font-semibold">
            Special Attack: {pokemon.stats[3].base_stat}
          </p>
          <p className="text-gray-700 font-semibold">
            Ability: {pokemon.abilities[0].ability.name}
          </p>
        </div>
      </div>
    </Link>
  );
}
