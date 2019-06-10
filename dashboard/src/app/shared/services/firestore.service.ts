import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { firestore } from 'firebase/app';

import { AuthService } from 'src/app/auth/auth.service';

import { FirestoreDTO } from '@dto/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  private collection: AngularFirestoreCollection;

  constructor(
    private afs: AngularFirestore,
    private authService: AuthService,
    private path: string,
  ) {
    this.collection = this.afs.collection(path);
  }

  public get(docId: string): Observable<any> {
    return this.collection.doc(docId).snapshotChanges()
    .pipe(
      map(doc => {
        if (doc.payload.exists) {
          const data = doc.payload.data() as any;
          const id = doc.payload.id;
          return { id, ...data };
        }
      })
    );
  }

  public getAll(): Observable<any> {
    return this.collection.snapshotChanges()
    .pipe(map(items => {
      return items.map(item => {
        const data = item.payload.doc.data() as any;
        const id = item.payload.doc.id;
        return { id, ...data };
      });
    }));
  }

  public create(partial) {
    const doc = this.newFirestoreDocument();
    const dto = {
      ...doc,
      ...partial,
    };
    return this.collection.doc(dto.id).set(partial);
  }

  public update(id, partial) {
    return this.collection.doc(id).update(partial);
  }

  public delete(id) {
    return this.collection.doc(id).delete();
  }


  public newFirestoreDocument() {
    const createdBy = this.authService.uid;
    const id = this.afs.createId();
    const now = firestore.Timestamp.now();

    const document: FirestoreDTO = {
      archived: false,
      id,
      createdBy,
      createdOn: now,
      lastUpdatedOn: now
    };
    return document;
  }

  public createId() {
    return this.afs.createId();
  }
}
