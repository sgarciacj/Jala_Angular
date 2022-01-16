import { Component, OnDestroy, OnInit } from "@angular/core"
import { ActivatedRoute, Router } from "@angular/router";
import { Location } from '@angular/common'
import { Subscription } from "rxjs";
import { PokemonDetail } from "src/app/utils/types";
import { PokemonService } from "../pokemon.service";
import { pokemonTypeColorMap } from "../pokemonColorHash"
import { pokemonImageHash } from "../pokemonGameImgHash"
import { isNgTemplate } from "@angular/compiler";
import { getPokemonIdFromUrl } from "../pokemon-helper";

@Component({
	selector: 'pokemon-detail',
	templateUrl: './pokemon-detail.component.html',
	styleUrls: ['pokemon-detail.component.less']
})

export class PokemonDetailComponent implements OnInit, OnDestroy {
	id: string = '1';
	pokemonDetail?: PokemonDetail; // Object could be undefined
	pokemonSpecies?: any;
	pokemonChain?: any;
	gameDescriptions?: any;
	language: string = 'en'
	languages: string[] = []
	chainUrl: string = ''


	pokemonChainSubscription?: Subscription
	pokemonSpeciesSubscription?: Subscription
	pokemonDetailSubscription?: Subscription
	// If there is no constructor, the class is not build
	constructor(private pokemonService: PokemonService, 
		private location: Location, 
		private route: ActivatedRoute, private router: Router) {}

	ngOnInit(): void {
		this.pokemonDetail = this.route.snapshot.data['pokemon'];
		this.id = `${this.pokemonDetail?.id}` ;
		this.pokemonSpeciesSubscription = this.pokemonService.getPokemonSpecies(this.id)
		.subscribe(pokemonSpecies=> {
			this.pokemonSpecies = pokemonSpecies
			this.gameDescriptions = this.filterDescriptionByLanguage(pokemonSpecies)

			this.pokemonChainSubscription = this.pokemonService.getPokemonChain(this.pokemonSpecies.evolution_chain.url)
			.subscribe(pokemonChain=> {
				this.pokemonChain = pokemonChain
			});
		});		
	}
	formatLabel(value: number) {
		return value;
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
	getImageUriById(url: string) {
		let id = 1;
		if(url != undefined)
			id = Number(url.slice(0, -1).split("/").pop());
		return this.pokemonService.getPokemonImageUri(id);
	}
	goBack() {
		this.location.back();
	}

	goToPokemonDetails(pokemonDetail: any) {
		console.log(pokemonDetail)
		const id = getPokemonIdFromUrl(pokemonDetail.url);
		this.router.navigateByUrl('/', { skipLocationChange: true })
			.then(()=> this.router.navigate([`./pokedex/${id}/`]));
	}
}