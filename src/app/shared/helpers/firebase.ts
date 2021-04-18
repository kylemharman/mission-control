import * as firebase from 'firebase';
import { AngularFirestoreDocument } from '@angular/fire/firestore';
import { omit } from 'lodash';
import { isObject } from './common';

export type WithRef<Model> = Model & AngularFirestoreDocument<Model>;
export type DocumentReference = firebase.firestore.DocumentReference<
  firebase.firestore.DocumentData
>;
export type CollectionReference = firebase.firestore.CollectionReference;

export function removeDocumentRef<T>(item: WithRef<T>): T {
  if (!item.ref) return;
  return omit(item, 'ref') as T;
}

export function removeDocumentRefs<T>(items: WithRef<T>[]): T[] {
  return items.map((item) => omit(item, 'ref') as T);
}

export function isWithRef<T>(item: unknown): item is WithRef<T> {
  return isObject(item) && 'ref' in item;
}
