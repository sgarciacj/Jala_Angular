import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core"
import { CommonModule } from '@angular/common';
import { pokemonColorMap } from './pokemonColorHash'
import { Pokemon } from '../utils/types'
import { PokemonService } from './pokemon.service'
import { ActivatedRoute, Router } from "@angular/router";
import { orderPokemonByName } from "./pokemon-helper";

@Component({
	selector: 'pokemon-list',
	templateUrl: './pokemon-list.component.html',
	styleUrls: ['./pokemon-list.component.less'],
	changeDetection: ChangeDetectionStrategy.OnPush	
})

export class PokemonListComponent implements OnInit {
	pokemons: Pokemon[] = [];
	private pokemonList: Pokemon [] = [];
	search: string = '';
	offset: number = 0
	limit: number = 14
	constructor(private pokemonService: PokemonService, private router: ActivatedRoute) { }
	
	ngOnInit(): void {
		this.pokemons = this.router.snapshot.data['pokemons'].results;
		//orderPokemonByName(this.pokemons);
		this.pokemonList = this.pokemons;
	}
	
	/*getPokemons(): void {
		this.pokemonService.getPokemonList(this.offset, this.limit)
		.then(data => this.pokemons = data)
	}
	async getPokemons(): Promise<void> {
		this.pokemons = await this.pokemonService.getPokemonList(this.offset, this.limit)		
	}
	*/
	getPokemons() {
		this.pokemonService.getPokemonList(this.offset, this.limit)
			.subscribe((data: {results: Pokemon[]}) => {
				this.pokemons = [...data.results];
				//orderPokemonByName(this.pokemons);
				this.pokemonList = this.pokemons;
			})
	}

	displayByGeneration(pokemons: Pokemon[]) {
		this.pokemons = pokemons;
	}
	
	nextPokemons(): void {
		this.offset += this.limit;
		this.getPokemons();
	}
	
	searchPokemons() {
		this.pokemons = this.pokemonList.filter(item => !item.name.indexOf(this.search));
	}
	updatePokemonLimit() {
		this.getPokemons();
	}
}
