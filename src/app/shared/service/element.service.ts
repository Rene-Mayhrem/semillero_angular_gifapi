import { Injectable } from '@angular/core';
import { PokemonResponse } from 'src/app/pokemon/interface/pokemon.interface';
import { PokemonService } from 'src/app/pokemon/service/pokemon.service';

@Injectable({
  providedIn: 'root',
})
export class ElementService {
  constructor(private poke_service: PokemonService) {}

  get_pokemons_list(): PokemonResponse[] {
    this.poke_service.get_pokemon_list().subscribe((pokemons) => {
      console.log(pokemons);
      return pokemons;
    });
    console.log('check');
    return [];
  }
}
