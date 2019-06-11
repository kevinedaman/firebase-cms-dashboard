import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostService } from './post.service';
import { Post } from '@models/post';
import { AlertService } from 'src/app/shared/services/alert.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  public posts: Post[];

  constructor(
    private alert: AlertService,
    public router: Router,
    private postService: PostService,
  ) {
  }

  ngOnInit() {
    this.postService.posts.subscribe(posts => this.posts = posts);
  }

  handleView(e) {
    this.router.navigate(['/', 'posts', 'create', e.id]);
  }

  handleDelete(e) {
    const text = 'Are you sure you want to delete this post?'
    const title = 'Delete Post'
    const dialogRef = this.alert.confirm(text, title);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.postService.delete(e.id);
      }
    });
  }

}
