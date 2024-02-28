import { EnvironmentProviders, importProvidersFrom } from "@angular/core";
import { NgxsLoggerPluginModule } from "@ngxs/logger-plugin";
import { NgxsModule } from "@ngxs/store";

export function provideNgxs(): EnvironmentProviders {
  return importProvidersFrom(
    NgxsModule.forRoot([]),
    NgxsLoggerPluginModule.forRoot(),
  );
}