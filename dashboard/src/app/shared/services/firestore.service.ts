import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { firestore } from 'firebase/app';

import { AuthService } from 'src/app/auth/auth.service';

import { FirestoreDTO } from '@dto/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(
    private afs: AngularFirestore,
    private authService: AuthService
  ) { }

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
