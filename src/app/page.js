"use client";

import React from "react";
import Link from "next/link";
import Header from "./components/Header"; 

export default function HomePage() {
  return (
    <>
      <Header />

      <div className="flex justify-center items-center text-center mt-10">
        <div className="flex-1">
          <h1 className="text-4xl font-mono font-bold mb-1">Home</h1>
          <p className="text-lg font-serif mb-10">Welcome to TGC Pokemon</p>
          <div className="mb-6 mx-auto hover:cursor-pointer transform transition-all hover:scale-105 max-w-[90%]">
          <Link href="/summoning"><img
              src="/couverture_pokemon.png"
              alt="Pack Pokemon"
              className="mx-auto w-[30%] max-w-[80%] h-auto sd:w-[20%] lg:w-[18%]"
            /></Link>
          </div>
          <div className="mb-4">
          <Link href="/summoning">
            <button className="px-20 py-3 text-white font-semibold rounded-full bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600 hover:opacity-90 transition-all">
              Summon
            </button>
          </Link>
          </div>
        </div>  
      </div>
    </>
  );
}
