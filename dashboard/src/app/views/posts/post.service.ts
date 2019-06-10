import { Injectable } from '@angular/core';
import { FirestoreService } from '../../shared/services/firestore.service';
import { CollectionPaths } from '@enums/collectionPaths';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from 'src/app/auth/auth.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService extends FirestoreService {

  private _posts: BehaviorSubject<any> = new BehaviorSubject([]);
  private _post: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor(
    afs: AngularFirestore,
    auth: AuthService,
  ) {
    super(afs, auth, CollectionPaths.posts);
    this.getAllPosts();
  }
  // posts
  get posts() {
    return this._posts.asObservable();
  }

  set posts(posts) {
    this._posts.next(posts);
  }

  getAllPosts() {
    if (this._posts.value.length > 0) {
      return;
    }
    return this.getAll().subscribe(posts => {
      this.posts = posts;
    });
  }

  // single post
  get post() {
    return this._post.asObservable();
  }

  set post(post) {
    this._post.next(post);
  }

  getSinglePost(postId) {
    const post = this._posts.getValue().find(p => p.id === postId);
    if (post) {
      this.post = post;
    }
    if (!post) {
      return this.get(postId).subscribe(p => this.post = p);
    }
  }
}
