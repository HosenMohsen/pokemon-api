export async function GET(request) {
    try {
      // Gérer le cas où il n'y a pas d'ID (par exemple, récupérer une liste de Pokémon)
      const pokemonListResponse = await fetch("https://pokeapi.co/api/v2/pokemon?limit=10");
      const pokemonListData = await pokemonListResponse.json();
  
      // Récupérer les détails complets pour chaque Pokémon
      const pokemonsDetails = await Promise.all(
        pokemonListData.results.map(async (pokemon) => {
          const pokemonDetailsResponse = await fetch(pokemon.url);
          const pokemonDetails = await pokemonDetailsResponse.json();
          return pokemonDetails;
        })
      );
  
      return new Response(JSON.stringify(pokemonsDetails), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      console.error("Erreur lors de la récupération des données :", error);
      return new Response("Erreur serveur", { status: 500 });
    }
  }
  