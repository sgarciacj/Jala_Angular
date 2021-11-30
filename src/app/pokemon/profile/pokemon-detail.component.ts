import { Component, OnDestroy, OnInit } from "@angular/core"
import { ActivatedRoute } from "@angular/router";
import { Location } from '@angular/common'
import { Subscription } from "rxjs";
import { PokemonDetail } from "src/app/utils/types";
import { PokemonService } from "../pokemon.service";

@Component({
	selector: 'pokemon-detail',
	templateUrl: './pokemon-detail.component.html',
	styleUrls: ['pokemon-detail.component.less']
})

export class PokemonDetailComponent implements OnInit, OnDestroy {
	id: string = '1';
	pokemonDetail?: PokemonDetail; // Object could be undefined
	pokemonDetailSubscription?: Subscription;
	// If there is no constructor, the class is not build
	constructor(private pokemonService: PokemonService, 
		private route: ActivatedRoute, 
		private location: Location) {}

	ngOnInit(): void {
		this.id = this.route.snapshot.paramMap.get('id') || '1';
		this.pokemonDetailSubscription = this.pokemonService.getPokemon(this.id).subscribe(pokemonDetail=> this.pokemonDetail = pokemonDetail);
	}
	// If there is a subscriber, close event / subscriber
	ngOnDestroy() {
		this.pokemonDetailSubscription?.unsubscribe();
	}
	getImageUri() {
		return this.pokemonService.getPokemonImageUri(+this.id)	// Integer
	}
	goBack() {
		this.location.back();
	}
}