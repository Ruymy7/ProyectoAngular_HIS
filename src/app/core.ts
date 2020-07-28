import { NgModule, Optional, SkipSelf } from '@angular/core';
import { StorageService } from "./auth/storage.service";
import { AuthGuard } from "./auth/guard/auth.guard";
@NgModule({
  declarations: [],
  imports: [],
  providers: [
    StorageService,
    AuthGuard
  ],
  bootstrap: []
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only');
    }
  }
}