import { Injectable, ModuleWithProviders } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { Actions, initialState, ReducerCmsStoreModel, stateReducer } from './reducer.factory';

/**
 * در صورت مشکل این دو تا کامپننت درست کار می کنند
 * بررسی کن
 * HeaderMenuComponent وSidebarMenuComponent
 * 
 */
@Injectable({
  providedIn: 'root',
})
export class CmsStoreService {
  private state: ReducerCmsStoreModel;
  get getStateAll(): ReducerCmsStoreModel {
    return this.state;
  }
  stateSubject: BehaviorSubject<ReducerCmsStoreModel> = new BehaviorSubject<ReducerCmsStoreModel>(initialState);
  constructor() {
    this.state = initialState;
    // @ts-ignore
    window.getInfo = () => this.state;
  }
  public getStateSnapshot(): ReducerCmsStoreModel {
    return (this.stateSubject.getValue());
  }
  setState(param: Actions): void {
    Object.assign(this.state, stateReducer(this.state, param));
    this.stateSubject.next(this.state);
  }
  getState<R>(mapFn: (value: ReducerCmsStoreModel, index: number) => R): Observable<R> {
    if (typeof mapFn !== 'function') {
      throw new TypeError('argument is not a function. Are you looking for `mapTo()`?');
    }
    return this.stateSubject.asObservable()
      .pipe(map(mapFn))
      .pipe(distinctUntilChanged());
  }
  getStateDirect(): Observable<ReducerCmsStoreModel> {
    return (this.stateSubject.pipe(distinctUntilChanged()));
  }

  static forRoot(): ModuleWithProviders<CmsStoreService> {
    // Forcing the whole app to use the returned providers from the AppModule only.
    return {
      ngModule: CmsStoreService,
      providers: [
        /* All of your services here. It will hold the services needed by itself`. */
      ],
    };
  }
}

