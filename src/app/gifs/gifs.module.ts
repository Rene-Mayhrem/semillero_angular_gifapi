import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListCardComponent } from './component/list-card/list-card.component';

@NgModule({
  declarations: [ListCardComponent],
  exports: [ListCardComponent],
  imports: [CommonModule],
})
export class GifsModule {}
