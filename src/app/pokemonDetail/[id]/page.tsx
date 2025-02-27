import Image from "next/image";
import Link from "next/link";
import PokemonStatsChart from "@/app/components/PokemonStatsChart";
import httpService from "@/app/utils/http.service";
import { Ability, Move, Pokemon, Stat, StatsData } from "@/app/models/pokemon";



async function getPokemonData(id: string): Promise<Pokemon | null> {
  try {
    return await httpService.get<Pokemon>(`/pokemon/${id}`);
  } catch (error) {
    console.error("Error fetching Pokémon data:", error);
    return null;
  }
}

export default async function PokemonPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  if (!id) return <p>Loading...</p>;

  const pokemon: Pokemon | null = await getPokemonData(id);

  let statsData: StatsData[] = [];
  if (pokemon?.stats) {
    statsData = pokemon?.stats.map((s: Stat) => ({
      name: s.stat.name.toUpperCase(),
      value: s.base_stat,
    }));
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6">
      <div className="bg-white shadow-xl rounded-lg p-6 text-black w-full max-w-2xl">
        <h1 className="text-4xl font-bold capitalize text-center mb-6">
          {pokemon?.name}
        </h1>
        <div className="flex flex-col md:flex-row items-center md:items-start">
          {/* Image Section */}
          <div className="flex-shrink-0 mb-6 md:mb-0 md:mr-6">
            <Image
              src={pokemon?.sprites?.front_default ?? ""}
              width={200}
              height={200}
              alt={pokemon?.name ?? ""}
              priority
              className="mx-auto md:mx-0 my-4"
            />
          </div>

          {/* Details Section */}
          <div className="flex-1 w-full">
            {/* Abilities */}
            <h2 className="text-2l font-semibold mt-2">Abilities</h2>
            <div className=" pt-2">
              {pokemon?.abilities.map((a: Ability, index: number) => (
                <span
                  key={index}
                  className="px-4 m-3 ms-0 py-2 text-sm font-medium capitalize bg-blue-100 text-blue-800 rounded-full shadow-md"
                >
                  {a.ability.name}
                </span>
              ))}
            </div>

            {/* Moves */}
            <h2 className="text-2l font-semibold mt-4">Moves</h2>
            <div className="mt-2 max-h-32 w-full overflow-y-auto overflow-hidden flex flex-wrap gap-2  rounded-lg">
              {pokemon?.moves.map((m: Move, index: number) => (
                <span
                  key={index}
                  className="px-3 py-2 text-sm font-medium capitalize bg-blue-100 text-blue-800 rounded-full shadow-md"
                >
                  {m.move.name}
                </span>
              ))}
            </div>

            {/* Stats */}
            <h2 className="text-2l font-semibold mt-4">Stats</h2>
            <div className="w-full h-64 mt-2">
              <PokemonStatsChart statsData={statsData} />
            </div>
          </div>
        </div>
      </div>

      {/* "Go Back" Button */}
      <Link href="/">
        <button className="mt-6 px-6 py-3 bg-yellow-400 text-black font-bold text-lg rounded-full hover:bg-yellow-500 transition-all duration-300 shadow-md cursor-pointer">
          Explore more Pokémons
        </button>
      </Link>
    </main>
  );
}
