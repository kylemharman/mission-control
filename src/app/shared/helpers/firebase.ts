import { AngularFirestoreDocument } from '@angular/fire/firestore';

export type WithRef<Model> = Model & AngularFirestoreDocument<Model>;
