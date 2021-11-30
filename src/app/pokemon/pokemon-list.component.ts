import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core"
import { CommonModule } from '@angular/common';
import { pokemonColorMap } from './pokemonColorHash'
import { Generation, Pokemon } from '../utils/types'
import { PokemonService } from './pokemon.service'
import { Router } from "@angular/router";

@Component({
	selector: 'pokemon-list',
	templateUrl: './pokemon-list.component.html',
	styleUrls: ['./pokemon-list.component.less'],
	changeDetection: ChangeDetectionStrategy.Default	
})

export class PokemonListComponent implements OnInit {
	pokemons: Pokemon[] = [];
	generations: Generation[] = [];
	private pokemonList: Pokemon [] = [];
	search: string = '';
	offset: number = 0
	limit: number = 20
	generationSelected = ''
	constructor(private pokemonService: PokemonService, private router: Router) { }
	
	ngOnInit(): void {
		this.getPokemons();
		this.getGenerations();
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
				this.pokemons = data.results;
				this.pokemonList = this.pokemons;
				this.orderPokemonByName();
			})
	}
	getGenerations() {
		this.pokemonService.getPokemonGeneration()
			.subscribe((data: {results: Generation[]}) => this.generations = data.results)
	}
	getPokemonsByGeneration(url: string) {
		this.pokemonService.getPokemonsByGeneration(url)
			.subscribe((data: {pokemon_species: Pokemon[]}) => {
				this.pokemons = data.pokemon_species;
				this.pokemonList = this.pokemons;
			})
	}

	getImageUri(pokemon: Pokemon) {
		return this.pokemonService.getPokemonImageUri(this.getPokemonIdFromUrl(pokemon.url)) // convierte en string
	}
	
	getPokemonColor(pokemon: Pokemon) {
		const id = this.getPokemonIdFromUrl(pokemon.url)
		return pokemonColorMap[id]
	}
	
	getPokemonIdFromUrl(url: string) {
		const parseUrl = url.split('/'),
		id = parseUrl[parseUrl.length - 2];
		return +id;
	}
	
	getTextColor(pokemon: Pokemon) {
		const pokemonColor = this.getPokemonColor(pokemon)
		switch (pokemonColor) {
			case '#fbf6f6':
			case '#f0f060e6':
				return 'black';
			default:
				return 'white';
		}
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
	orderPokemonByName() {
		return this.pokemons.sort(function(a, b) {
			var pokemonA = a.name.toUpperCase();
			var pokemonB = b.name.toUpperCase();
			return (pokemonA < pokemonB) ? -1 : (pokemonA > pokemonB) ? 1 : 0;
		});
	}
	onChange(generationUrl: string) {
		this.generationSelected = generationUrl;
		this.getPokemonsByGeneration(generationUrl);
	}
	goToPokemonDetails(pokemon: Pokemon) {
		const id = this.getPokemonIdFromUrl(pokemon.url);
		this.router.navigate([`/pokedex/${id}`])
	}
}
