import { Component, OnDestroy, OnInit } from "@angular/core"
import { ActivatedRoute } from "@angular/router";
import { Location } from '@angular/common'
import { Subscription } from "rxjs";
import { PokemonDetail } from "src/app/utils/types";
import { PokemonService } from "../pokemon.service";
import { pokemonTypeColorMap } from "../pokemonColorHash"
import { pokemonImageHash } from "../pokemonGameImgHash"
import { isNgTemplate } from "@angular/compiler";

@Component({
	selector: 'pokemon-detail',
	templateUrl: './pokemon-detail.component.html',
	styleUrls: ['pokemon-detail.component.less']
})

export class PokemonDetailComponent implements OnInit, OnDestroy {
	id: string = '1';
	pokemonDetail?: PokemonDetail; // Object could be undefined
	pokemonSpecies?: any;
	gameDescriptions?: any;
	language: string = 'en'


	pokemonSpeciesSubscription?: Subscription
	pokemonDetailSubscription?: Subscription
	// If there is no constructor, the class is not build
	constructor(private pokemonService: PokemonService, 
		private route: ActivatedRoute, 
		private location: Location) {}

	ngOnInit(): void {
		this.id = this.route.snapshot.paramMap.get('id') || '1';
		
		this.pokemonDetailSubscription = this.pokemonService.getPokemon(this.id)
		.subscribe(pokemonDetail=> this.pokemonDetail = pokemonDetail);

		this.pokemonSpeciesSubscription = this.pokemonService.getPokemonSpecies(this.id)
		.subscribe(pokemonSpecies=> {
			this.pokemonSpecies = pokemonSpecies
			this.gameDescriptions = this.filterDescriptionByLanguage(pokemonSpecies)
		});
	}
	refreshDescriptions(){
		this.gameDescriptions = this.filterDescriptionByLanguage(this.pokemonSpecies);
	}

	filterDescriptionByLanguage(species: any) {
		return species.flavor_text_entries.filter((item: any) => item.language.name === this.language);
	}
	getNameByLanguage(names: any[]){
		const found = names.find((item: any) => item.language.name === this.language)
		return found?.name || 'unknown';
	}

	getGameImage(name: string) {
		return pokemonImageHash[name];
	}

	getColorByType(type: string) {
		return pokemonTypeColorMap[type];
	}
	// If there is a subscriber, close event / subscriber
	ngOnDestroy() {
		this.pokemonDetailSubscription?.unsubscribe();
		this.pokemonSpeciesSubscription?.unsubscribe();
	}
	getImageUri() {
		return this.pokemonService.getPokemonImageUri(+this.id)	// Integer
	}
	goBack() {
		this.location.back();
	}
}