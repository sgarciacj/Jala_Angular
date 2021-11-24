import { Component, OnInit } from "@angular/core"
import { CommonModule } from '@angular/common';
import { pokemonColorMap } from './pokemonColorhash'
import { Pokemon } from '../utils/types'
import { PokemonService } from './pokemon.service'

@Component({
	selector: 'pokemon-list',
	templateUrl: './pokemon-list.component.html',
	styleUrls: ['./pokemon-list.component.less']
	
})

export class PokemonListComponent implements OnInit {
	pokemons: Pokemon[] = [];
	private pokemonList: Pokemon [] = [];
	search: string = '';
	constructor(private pokemonService: PokemonService) { }
	
	ngOnInit(): void {
		this.pokemonList = this.pokemonService.getPokemonList();
		this.pokemons = this.pokemonList;		
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
	
	searchPokemons() {
		this.pokemons = this.pokemonList.filter(item => !item.name.indexOf(this.search));
	}
}
