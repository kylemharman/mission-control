import * as firebase from 'firebase';
import { AngularFirestoreDocument } from '@angular/fire/firestore';

export type WithRef<Model> = Model & AngularFirestoreDocument<Model>;
export type Timestamp = firebase.firestore.FieldValue;
export type DocumentReference = firebase.firestore.DocumentReference;
export type CollectionReference = firebase.firestore.CollectionReference;
