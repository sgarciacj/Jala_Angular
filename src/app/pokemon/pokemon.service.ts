import { Injectable } from "@angular/core"
import { HttpClient } from '@angular/common/http'
import { dataPokemons } from "./mookData"
import { from, Observable } from 'rxjs';
import { Pokemon, Generation } from '../utils/types'

@Injectable({
	providedIn: 'root',
})

export class PokemonService{
	constructor(private http: HttpClient) {}
	/*
	getPokemonList(offset: number, limit: number) : Promise<Pokemon[]>{
		return new Promise((resolve, reject) => {
		this.http.get(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`)
		// Observables, metodos de JRX
			.subscribe((pokemon: any) => {
				resolve(pokemon.results)
			})
		})
	}

	getPokemonList(offset: number, limit: number): Observable<{results:Pokemon[]}> {		
		return this.http.get(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`)	
	}
	*/
	getPokemonList(offset: number, limit: number) {		
		return this.http.get(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`) as Observable<{results:Pokemon[]}>	
	}
	getPokemonImageUri (id: number) {
	  const imageId = ('00' + id).slice(-3); // para 1 => 001
	  return `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${imageId}.png`;
	}
	getPokemonGeneration(){
		return this.http.get('https://pokeapi.co/api/v2/generation/') as Observable<{results:Generation[]}>
	}
	getPokemonsByGeneration(url: string){
		return this.http.get(url) as Observable<{pokemon_species:Pokemon[]}>
	}
}