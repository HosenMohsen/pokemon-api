"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Card from "../components/Card";
import Header from "../components/Header";

export default function HomePage() {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const response = await fetch("/api/all");
        const data = await response.json();
        setPokemons(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des Pokémon :", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemons();
  }, []);

  if (loading) {
    return <p>Chargement...</p>;
  }

  return (
    <main>
      <Header />
      <div>
    
        <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 gap-4 mx-5 mt-10">
          {pokemons.map((pokemon) => (
            <li key={pokemon.id}>
              <Link href={`/collection/${pokemon.id}`}>
                <Card pokemon={pokemon} />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
