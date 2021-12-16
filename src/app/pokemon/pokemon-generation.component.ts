import { Component, Output, OnInit, EventEmitter } from "@angular/core";
import { Pokemon } from "../utils/types";
import { getPokemonIdFromUrl, orderPokemonByName } from "./pokemon-helper";
import { PokemonService } from "./pokemon.service";
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
    selector: 'pokemon-generation',
    templateUrl: './pokemon-generation.component.html',
    styleUrls: ['./pokemon-generation.component.less']
})

export class PokemonGenerationComponent implements OnInit {
    games: { name: string, url: string } [] = [];
    generationName: string = '';
    selectedGame: string = '';
    @Output() refreshPokemons = new EventEmitter<Pokemon[]>();

    constructor(private pokemonService: PokemonService){}

    ngOnInit() : void {
        this.pokemonService.getGeneration()
        .subscribe((games: any) => {
            this.games = games.results;
        })
    }

    chooseGame() {
		this.pokemonService.getGenerationById(this.selectedGame)
		.subscribe((pokemons: any) => {
			this.generationName = pokemons.main_region.name;
    		//orderPokemonByName(pokemons.pokemon_species);
            this.refreshPokemons.emit(pokemons.pokemon_species);
		})
	}
}