import { get, has } from 'lodash';
import { MonoTypeOperatorFunction, Observable, OperatorFunction } from 'rxjs';
import { filter, map, take } from 'rxjs/operators';
import { isObject } from './common';

export function snapshot<T>(item$: Observable<T>): Promise<T> {
  return item$.pipe(take(1)).toPromise();
}

export function filterUndefined<T>(): OperatorFunction<T | undefined, T> {
  return filter((item?: T): item is T => item !== undefined);
}

export function findProp<T>(
  property: string
): OperatorFunction<unknown, T | undefined> {
  return (source$: Observable<unknown>) =>
    source$.pipe(
      map((item) =>
        isObject(item) && has(item, property)
          ? (get(item, property) as T)
          : undefined
      )
    );
}

export function multiMap<T, R>(
  mapItem: (item: T) => R
): OperatorFunction<T[], R[]> {
  return map((items) => items.map((item) => mapItem(item)));
}

export function multiFilter<T>(
  filterFn: (item: T, index: number) => boolean
): MonoTypeOperatorFunction<T[]> {
  return map((items) =>
    items.filter((item, index): item is T => filterFn(item, index))
  );
}
