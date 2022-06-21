import { ModuleWithProviders, NgModule } from '@angular/core';
import { PermissionsApi } from './permissions.api';
import { PermissionsDirective } from './permissions.directive';
import { PermissionsGuard } from './permissions.guard';
import { PermissionsPipe } from './permissions.pipe';
import { PermissionsService } from './permissions.service';

@NgModule({
  declarations: [PermissionsDirective, PermissionsPipe],
  exports: [PermissionsDirective, PermissionsPipe]
})
export class PermissionsModule {

  static forRoot(): ModuleWithProviders<PermissionsModule> {
    return {
      ngModule: PermissionsModule,
      providers: [
        PermissionsApi,
        PermissionsGuard,
        PermissionsService
      ]
    }
  }

}
