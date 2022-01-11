import { NgModule } from "@angular/core";
import { Router, RouterModule, Routes } from "@angular/router";
import { PokemonListComponent } from "./pokemon-list.component";
import { PokemonResolverService } from "./pokemon-resolver.service";
import { PokemonsResolverService } from "./pokemons-resolver.service";
import { PokemonDetailComponent } from "./profile/pokemon-detail.component";

const routes: Routes = [
	{ 
		path: 'pokedex/:id', 
		component: PokemonDetailComponent,
		resolve: {
			pokemon: PokemonResolverService
		}
	},
	{ 
		path: 'pokedex', 
		component: PokemonListComponent,
		resolve: {
			pokemons: PokemonsResolverService
		}
	},
	{ path: '', redirectTo: 'pokedex', pathMatch: 'full' } // Localhost/pokedex - path base
];

@NgModule({
	imports: [RouterModule.forChild(routes)], 
	exports: [RouterModule]
})
export class PokemonRoutingModule { }