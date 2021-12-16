export type Pokemon = {
  name: string, 
  url: string
};

type Sprite = string | null;

export type PokemonDetail = {
  abilities: any[]
  base_experience: number
  forms: any[]
  game_indices: any[]
  height: number
  held_items: any[]
  id: number
  is_default: boolean
  location_area_encounters: string
  moves: any[]
  name: string
  order: number
  past_types: any[]
  species: {name: string, url: string},
  //todo
  types: {
    type: {name: string, url: string}
  }[]
  stats: {
    base_stat: number,
    stat: { name: string, url: string }
  }[]
  weight: number
};

type LangInfo =  {name: string, url: string};

export type PokemonSpecies = {
  base_happiness: number
  capture_rate: number
  color: {name: string, url: string}
  egg_groups: {name: string, url: string}[]
  evolution_chain: {url: string}
  evolves_from_species: any
  flavor_text_entries: {
    flavor_text: string
    language: LangInfo[]
    version: {name: string, url: string}[]
  }[]
  form_descriptions: any[]
  forms_switchable: boolean
  gender_rate: number
  genera: {
    genus: string
    language: LangInfo[]
  }
  generation: {name: string, url: string}
  growth_rate: {name: string, url: string}
  habitat: {name: string, url: string}
  has_gender_differences: boolean
  hatch_counter: number
  id: number
  is_baby: boolean
  is_legendary: boolean
  is_mythical: boolean
  name: string
  names: {
    language: LangInfo
    name: string
  }[]
  order: number
  pal_park_encounters: any[]
  pokedex_numbers: any
  shape: {name: string, url: string}
  varieties: {
    is_default: boolean
    pokemon: {name: string, url: string}
  }[]
}

export type Option = {
  label: string;
  value: string;
}

export type Chain = {
  id: number,
  chain: {
    evolves_to: EvolvesTo[],
    evolution_details: EvolutionDetails[] | null
  }
}
export type EvolvesTo = {
  evolution_details?: EvolutionDetails[] | null;
  evolves_to?: (EvolvesTo)[] | null;
  species: {name: string, url: string},
}

export type EvolutionDetails = {
    gender?: null;
    held_item?: null;
    item?: null;
    known_move?: null;
    known_move_type?: null;
    location?: null;
    min_affection?: null;
    min_beauty?: null;
    min_happiness?: null;
    min_level: number;
    needs_overworld_rain: boolean;
    party_species?: null;
    party_type?: null;
    relative_physical_stats?: null;
    time_of_day: string;
    trade_species?: null;
    trigger: {
      name: string;
      url: string;
    };
    turn_upside_down: boolean;
}