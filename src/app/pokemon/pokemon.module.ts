import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListCardComponent } from './component/list-card/list-card.component';
import { CardComponent } from './component/card/card.component';
import { GifsModule } from '../gifs/gifs.module';

@NgModule({
  declarations: [ListCardComponent, CardComponent],
  imports: [CommonModule, GifsModule],
  exports: [ListCardComponent],
})
export class PokemonModule {}
