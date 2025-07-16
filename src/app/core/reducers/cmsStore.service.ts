import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { Actions, initialState, ReducerCmsStore, stateReducer } from './reducer.factory';
/**
 * در صورت مشکل این دو تا کامپننت درست کار می کنند
 * بررسی کن
 * HeaderMenuComponent وSidebarMenuComponent
 * 
 */
@Injectable()
export class CmsStoreService {
  private state: ReducerCmsStore;
  get getStateAll(): ReducerCmsStore {
    return this.state;
  }
  stateSubject: BehaviorSubject<ReducerCmsStore> = new BehaviorSubject<ReducerCmsStore>(initialState);
  constructor() {
    this.state = initialState;
    // @ts-ignore
    window.getInfo = () => this.state;
  }
  public getStateSnapshot(): ReducerCmsStore {
    return (this.stateSubject.getValue());
  }
  setState(param: Actions): void {
    Object.assign(this.state, stateReducer(this.state, param));
    this.stateSubject.next(this.state);
  }
  getState<R>(mapFn: (value: ReducerCmsStore, index: number) => R): Observable<R> {
    if (typeof mapFn !== 'function') {
      throw new TypeError('argument is not a function. Are you looking for `mapTo()`?');
    }
    return this.stateSubject.asObservable()
      .pipe(map(mapFn))
      .pipe(distinctUntilChanged());
  }
  getStateDirect(): Observable<ReducerCmsStore> {
    return (this.stateSubject.pipe(distinctUntilChanged()));
  }
}
