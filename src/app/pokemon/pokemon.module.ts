import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { BrowserModule } from '@angular/platform-browser';
import { PokemonListComponent } from './pokemon-list.component';
import { NotFoundComponent } from '../../common/not-found.component';
import { PokemonDetailComponent } from './profile/pokemon-detail.component';
import { HttpClientModule } from '@angular/common/http'
import { PokemonRoutingModule } from './pokemon-routing.module';
import { PokemonCardComponent } from './pokemon-card.component';
import { PokemonGenerationComponent } from './pokemon-generation.component';
import { MatSliderModule } from '@angular/material/slider';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRippleModule } from '@angular/material/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    PokemonListComponent,
    NotFoundComponent,
    PokemonDetailComponent,
    PokemonCardComponent,
    PokemonGenerationComponent
  ],
  imports: [
    BrowserModule,
    ScrollingModule,
    MatSelectModule,
	  FormsModule,
	  HttpClientModule,
    MatSliderModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    BrowserAnimationsModule,
    
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
