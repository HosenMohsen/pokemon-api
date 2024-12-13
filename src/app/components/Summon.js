"use client";

import { useEffect, useState } from "react";

export default function Summon() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCards, setShowCards] = useState(false);
  const [randomPokemons, setRandomPokemons] = useState([]);
  const [delayedPokemons, setDelayedPokemons] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchRandomPokemons() {
      setLoading(true);  
      try {
        const response = await fetch("/api/pokemon");
        const data = await response.json();
        const allPokemons = data.results;

        function shuffle(array) {
          for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
          }
          return array;
        }

        const randomPokemons = shuffle(allPokemons).slice(0, 10);

        const detailedPokemons = await Promise.all(randomPokemons.map(async (pokemon) => {
          const pokemonDetailsResponse = await fetch(pokemon.url);
          const pokemonDetails = await pokemonDetailsResponse.json();

          return {
            name: pokemonDetails.name,
            image: pokemonDetails.sprites.front_default,
            types: pokemonDetails.types,
          };
        }));

        setRandomPokemons(detailedPokemons);

        const delayedPokemonsWithDelay = detailedPokemons.map((pokemon, index) => {
          return new Promise((resolve) => {
            setTimeout(() => {
              resolve(pokemon);
            }, index * 1000); 
          });
        });

        const finalPokemons = await Promise.all(delayedPokemonsWithDelay);
        setDelayedPokemons(finalPokemons);
      } catch (error) {
        console.error("Erreur lors de la récupération des Pokémon :", error);
      } finally {
        setLoading(false); 
      }
    }

    if (showCards) {
      fetchRandomPokemons();
    }
  }, [showCards]);

  const handlePackClick = () => {
    setShowCards(true);
  };

  const getTypeBackgroundColor = (type) => {
    switch (type) {
      case "fire":
        return "bg-red-500";
      case "water":
        return "bg-blue-500";
      case "grass":
        return "bg-green-500";
      case "electric":
        return "bg-yellow-500";
      case "bug":
        return "bg-green-700";
      case "normal":
        return "bg-gray-400";
      case "fighting":
        return "bg-orange-500";
      case "psychic":
        return "bg-pink-500";
      case "fairy":
        return "bg-pink-300";
      default:
        return "bg-gray-500";
    }
  };

  if (loading) {
    return (
      <div className="w-full h-screen flex flex-col justify-center items-center">
        <p className="text-4xl">Loading...</p>
        <img
          src="https://media.giphy.com/media/fSvqyvXn1M3btN8sDh/giphy.gif"
          alt="Loading GIF"
          className="max-w-[50%] max-h-[50%]"
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center ">

      {!showCards ? (
        <div className="relative w-full md:w-[800px] h-[800px] md:h-[800px] perspective-3d">
          <div className="carousel flex gap-6">
            {Array.from({ length: 10 }).map((_, index) => (
              <div
                key={index}
                className="carousel-item absolute transition-transform duration-500"
                style={{
                  width: "150px",
                  height: "250px",
                  transform: `rotateY(${(index - currentIndex) * 36}deg) translateZ(250px)`,
                }}
              >
                <div className="flex justify-center mt-2">
                  <img
                    src="/couverture_pokemon.png"
                    alt={`Paquet ${index + 1}`}
                    className="h-[200px] w-[200px]"
                    onClick={handlePackClick}
                  />
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => setCurrentIndex((prevIndex) => (prevIndex - 1 + 10) % 10)}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-purple-700 text-white rounded-full p-2 hover:bg-purple-800"
          >
            ◀
          </button>
          <button
            onClick={() => setCurrentIndex((prevIndex) => (prevIndex + 1) % 10)}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-purple-700 text-white rounded-full p-2 hover:bg-purple-800"
          >
            ▶
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3  sm:mt-12 md:mt-12 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-12">
          {delayedPokemons.map((pokemon, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg shadow-md ${getTypeBackgroundColor(pokemon.types[0].type.name)} opacity-0 transition-opacity duration-1000`}
              style={{ opacity: 1 }}
            >
              <img
                src={pokemon.image}
                alt={pokemon.name}
                className="w-full h-32 object-contain cursor-pointer"
              />
              <h2 className="text-center mt-2">{pokemon.name}</h2>
              <div className="flex justify-center space-x-2 mt-2">
                {pokemon.types.map((type, i) => (
                  <span
                    key={i}
                    className="px-2 py-1 text-sm font-semibold text-white rounded-lg bg-black bg-opacity-30"
                  >
                    {type.type.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
