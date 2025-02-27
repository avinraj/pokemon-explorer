export interface Stat {
    stat: { name: string };
    base_stat: number;
}

export interface Ability {
    ability: { name: string };
}

export interface Move {
    move: { name: string };
}

export interface Sprites {
    front_default: string | null;
}

export interface StatsData {
    name: string;
    value: number;
}

export interface Pokemon {
    name: string;
    stats: Stat[];
    abilities: Ability[];
    moves: Move[];
    sprites: Sprites;
    url: string;
    id: number;
    image: string;
}

export interface PokemonAPIResponse {
    results: Pokemon[];
}

