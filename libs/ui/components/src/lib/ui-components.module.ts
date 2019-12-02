import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from './modules/button/button.module';
import { TextBoxModule } from './modules/text-box/text-box.module';
import { ButtonComponent } from './modules/button/button/button.component';
import { TextBoxComponent } from './modules/text-box/text-box/text-box.component';

export const UiComponentModules = [
  ButtonModule,
  TextBoxModule
]

@NgModule({
  imports: [
    CommonModule,
    ...UiComponentModules
  ],
  exports: [
    ...UiComponentModules
  ],
  declarations: [
    ButtonComponent,
    TextBoxComponent
  ]
})
export class UiComponentsModule {}
