import { Observable, OperatorFunction } from 'rxjs';
import { filter, take } from 'rxjs/operators';

export function snapshot<T>(item$: Observable<T>): Promise<T> {
  return item$.pipe(take(1)).toPromise();
}

export function filterUndefined<T>(): OperatorFunction<T | undefined, T> {
  return filter((item?: T): item is T => item !== undefined);
}
