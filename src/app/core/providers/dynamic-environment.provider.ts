import { APP_INITIALIZER, Provider } from "@angular/core";
import { firstValueFrom } from "rxjs";
import { DynamicEnvironmentService } from "../services/dynamic-environment.service";

/**
 * Factory function to initialize dynamic environment configuration
 */
export function initializeDynamicEnvironment(
  envService: DynamicEnvironmentService,
) {
  return () => firstValueFrom(envService.getEnvironment());
}

/**
 * Provider for dynamic environment configuration
 */
export const DYNAMIC_ENVIRONMENT_PROVIDER: Provider = {
  provide: APP_INITIALIZER,
  useFactory: initializeDynamicEnvironment,
  deps: [DynamicEnvironmentService],
  multi: true,
};
