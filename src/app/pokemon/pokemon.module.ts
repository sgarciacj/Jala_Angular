import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { BrowserModule } from '@angular/platform-browser';
import { PokemonListComponent } from './pokemon-list.component';
import { NotFoundComponent } from '../../common/not-found.component';
import { PokemonDetailComponent } from './profile/pokemon-detail.component';
import { HttpClientModule } from '@angular/common/http'
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
  exports: [
    PokemonListComponent,
    PokemonDetailComponent	
  ],
  providers: [],
  bootstrap: []
})
export class PokemonModule { }
