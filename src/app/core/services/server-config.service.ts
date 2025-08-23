import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { catchError, shareReplay } from "rxjs/operators";

export interface ServerConfig {
  configApiRetry: number;
  configApiServerPath: string;
  configHubServerPath: string;
  configFileServerPath: string;
  configQDocServerPath: string;
  configCompanyWebSite: string;
  modules: [""];
}

@Injectable({
  providedIn: "root",
})
export class ServerConfigService {
  private configPath = "./assets/config/server-config.json";
  private config$: Observable<ServerConfig> | null = null;

  constructor(private http: HttpClient) {}

  /**
   * Loads server configuration from external JSON file
   */
  loadServerConfig(): Observable<ServerConfig> {
    if (this.config$) {
      return this.config$;
    }

    this.config$ = this.http.get<ServerConfig>(this.configPath).pipe(
      catchError((error) => {
        console.warn("Failed to load server config, using defaults:", error);
        // Return default configuration if external file is not available
        return of(this.getDefaultServerConfig());
      }),
      shareReplay(1),
    );

    return this.config$;
  }

  /**
   * Reload configuration from external file
   */
  reloadServerConfig(): Observable<ServerConfig> {
    this.config$ = null;
    return this.loadServerConfig();
  }

  /**
   * Default server configuration
   */
  private getDefaultServerConfig(): ServerConfig {
    return {
      configApiRetry: 1,
      configApiServerPath: "https://apicms.ir/api/v3/",
      configHubServerPath: "https://apicms.ir/hub/",
      configFileServerPath: "https://apifile.ir/api/v2/",
      configQDocServerPath: "https://qdoc.ir/api/chat",
      configCompanyWebSite: "https://ntk.ir",
      modules: [""],
    };
  }
}
