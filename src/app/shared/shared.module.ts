import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './component/menu/menu.component';
import { TagContainerComponent } from './component/tag-container/tag-container.component';

@NgModule({
  declarations: [MenuComponent, TagContainerComponent],
  imports: [CommonModule],
  exports: [MenuComponent],
})
export class SharedModule {}
