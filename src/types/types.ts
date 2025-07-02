export interface PokemonListItem {
  name: string;
  url: string;
}

export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonListItem[];
}

export interface PokemonType {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

export interface PokemonAbility {
  is_hidden: boolean;
  slot: number;
  ability: {
    name: string;
    url: string;
  };
}

export interface PokemonSprites {
  back_default: string | null;
  back_female: string | null;
  back_shiny: string | null;
  back_shiny_female: string | null;
  front_default: string | null;
  front_female: string | null;
  front_shiny: string | null;
  front_shiny_female: string | null;
}

export interface PokemonStat {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
}

export interface Pokemon {
  abilities: PokemonAbility[];
  base_experience: number;
  height: number;
  id: number;
  is_default: boolean;
  name: string;
  order: number;
  sprites: PokemonSprites;
  stats: PokemonStat[];
  types: PokemonType[];
  weight: number;
}

export interface PokemonCardProps {
  pokemon: Pokemon;
  isFavorite: (id: number) => boolean;
  handleFavoriteToggle: (
    pokemon: Pokemon,
    e: React.MouseEvent<HTMLButtonElement>
  ) => void;
}

export interface PokemonDetailPageProps {
  params: {
    id: string;
  };
}
