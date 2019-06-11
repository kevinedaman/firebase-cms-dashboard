import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntil, map, switchMap, tap } from 'rxjs/operators';
import { CreatePostFormComponent } from '../components/create-post-form/create-post-form.component';
import { Subject, of } from 'rxjs';
import { PostService } from '../post.service';
import { PostValues } from '@interfaces/post';
import { AuthService } from 'src/app/auth/auth.service';
import { Post } from '@models/post';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit, OnDestroy {
  private destroy$: Subject<boolean> = new Subject<boolean>();
  public form: FormGroup;
  public editing = false;
  public post: Post;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private postService: PostService,
    private auth: AuthService,
  ) {}

  ngOnInit() {
    this.route.paramMap
    .pipe(
      map(paramMap => paramMap.get('id')),
      switchMap(id => {
        if (id) {
          this.postService.getSinglePost(id)
          return this.postService.post;
        }
          return of(null);
      }),
      takeUntil(this.destroy$)
    )
    .subscribe(post => {
      if (post) {
        this.editing = true;
        this.post = post;
        this.form = CreatePostFormComponent.formModel(post);
      }
      if (!post) {
        this.editing = false;
        this.form = CreatePostFormComponent.formModel();
      }
    });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  submit() {
    const { value } = this.form;
    const obj: PostValues = {
      title: value.title,
      content: value.content,
      author: this.editing ? this.post.author : this.auth.currentUser.fullName,
    }
    if (this.editing) {
      this.postService.update(this.post.id, obj);
    }
    if (!this.editing) {
      this.postService.create(obj);
    }
    this.router.navigate(['/', 'posts']);
  }

}
