"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import httpService from "./utils/http.service";
import { Pokemon, PokemonAPIResponse } from "./models/pokemon";

export default function Home() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [search, setSearch] = useState("");
  const [visibleCount, setVisibleCount] = useState(10);

  useEffect(() => {
    httpService.get<PokemonAPIResponse>(`/pokemon?limit=200`).then((res) => {
      if (res && res?.results) {
        const data = res?.results?.map((pokemon: Pokemon, index: number) => ({
          ...pokemon,
          id: index + 1,
          image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
            index + 1
          }.png`,
        }));
        setPokemons(data);
      } else setPokemons([]);
    });
  }, []);

  const filteredPokemons = pokemons.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-white">
      {/* Title */}
      <h1 className="text-4xl font-extrabold text-center mb-6">
        Pokémon Explorer
      </h1>

      {/* Search Bar */}
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="🔍 Search Pokémon..."
          className="w-full max-w-md p-3 border border-gray-300 rounded-lg text-black shadow-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Pokémon Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {filteredPokemons.slice(0, visibleCount).map((pokemon) => (
          <Link
            key={pokemon.id}
            href={`/pokemonDetail/${pokemon.id}`}
            className="transform transition duration-300 hover:scale-105"
          >
            <div className="bg-white p-4 rounded-xl shadow-lg text-center cursor-pointer hover:bg-yellow-300">
              <Image
                src={pokemon.image}
                alt={pokemon.name}
                width={100}
                height={100}
                className="mx-auto"
              />
              <p className="mt-2 text-lg font-semibold capitalize text-black">
                {pokemon.name}
              </p>
            </div>
          </Link>
        ))}
      </div>

      {/* Load More Button */}
      {visibleCount < filteredPokemons.length && (
        <div className="flex justify-center mt-8">
          <button
            onClick={() => setVisibleCount((prev) => prev + 10)}
            className="bg-yellow-400 text-black font-bold py-2 px-6 rounded-full shadow-md hover:bg-yellow-500 transition duration-300 cursor-pointer"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
}
