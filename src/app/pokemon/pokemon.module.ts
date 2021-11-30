import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { BrowserModule } from '@angular/platform-browser';
import { PokemonListComponent } from './pokemon-list.component';
import { NotFoundComponent } from '../../common/not-found.component';
import { PokemonDetailComponent } from './profile/pokemon-detail.component';
import { HttpClientModule } from '@angular/common/http'
import { PokemonRoutingModule } from './pokemon-routing.module';
@NgModule({
  declarations: [
    PokemonListComponent,
    NotFoundComponent,
    PokemonDetailComponent
  ],
  imports: [
    BrowserModule,
    ScrollingModule,
	  FormsModule,
	  HttpClientModule
  ],
   // Available in app and could be used in other parts of the app
  exports: [
    PokemonListComponent,
    PokemonDetailComponent,
    PokemonRoutingModule
  ],
  providers: [],
  bootstrap: []
})
export class PokemonModule { }
