import * as firebase from 'firebase';
import { AngularFirestoreDocument } from '@angular/fire/firestore';

export type WithRef<Model> = Model & AngularFirestoreDocument<Model>;
export type DocumentReference = firebase.firestore.DocumentReference<
  firebase.firestore.DocumentData
>;
export type CollectionReference = firebase.firestore.CollectionReference;
