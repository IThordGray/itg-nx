import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './search/search.component';
import { MatSearchWrapperComponent } from './mat-select-header/mat-search-wrapper.component';

@NgModule({
  imports: [CommonModule],
  declarations: [SearchComponent, MatSearchWrapperComponent],
})
export class FrontendComponentModule {}
