import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import {firestore, User as FirebaseUser } from 'firebase';
import { BehaviorSubject } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { User } from '@models/user';

import { CollectionPaths } from '@enums/collectionPaths';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private usersCollection: AngularFirestoreCollection<User>;

  private authState = new BehaviorSubject<FirebaseUser>(null);
  public readonly auth = this.authState.asObservable();
  private userState = new BehaviorSubject<User>(null);
  public readonly user = this.userState.asObservable();

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
  ) {
    this.usersCollection = this.afs.collection<User>(CollectionPaths.users);
    this.afAuth.authState
      .pipe(
        map((user: FirebaseUser) => {
          this.authState.next(user);
          return user;
        }),
        switchMap((user: FirebaseUser) => {
          return user ? this.getUserById(user.uid) : Promise.resolve(null);
        })
      )
      .subscribe(user => {
        this.userState.next(user);
      });
  }

  // returns true if the user is logged in
  get authenticated(): boolean {
    return this.authState.getValue() !== null;
  }

  // returns current user data
  get currentUserAuthState(): any {
    return this.authenticated ? this.authState.getValue() : null;
  }

  // returns authstate observable
  get currentAuthStateObservable(): any {
    return this.afAuth.authState;
  }

  // returns current user UID
  get uid(): string {
    return this.authenticated ? this.authState.getValue().uid : null;
  }

  // returns current user email
  get email(): string {
    return this.authenticated ? this.authState.getValue().email : null;
  }

  // sign in using email, password
  public signIn(email: string, password: string): Promise<any> {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

  // signs out user
  public signOut() {
    return this.afAuth.auth.signOut();
  }

  // register with email and password
  public register(email: string, password: string) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password);
  }

  // reset password
  public resetPassword(email: string) {
    return this.afAuth.auth.sendPasswordResetEmail(email);
  }

  public createUser(id: string, user ) {
    const now = firestore.Timestamp.now();
    const data = {
      archived: false,
      createdBy: id,
      createdOn: now,
      lastUpdatedOn: now,
      id,
      role: 'admin',
      ...user,
    };
    return this.usersCollection.doc(id).set(data);
  }

  public getUserById(id: string) {
    return this.usersCollection.doc(id).snapshotChanges()
      .pipe(map(userDoc => {
        if (userDoc.payload.exists) {
          const data = userDoc.payload.data();
          const uid = userDoc.payload.id;
          return new User({ ...data, id: uid });
        } else {
          return null;
        }
      }));
  }

  public updateUser(user: User) {
    user.lastUpdatedOn = firestore.Timestamp.now();
    return this.usersCollection.doc(user.id).update(user);
  }
}
