import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostService } from './post.service';
import { Post } from '@models/post';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  public posts: Post[];

  constructor(
    public router: Router,
    private postService: PostService,
  ) {
  }

  ngOnInit() {
    this.postService.posts.subscribe(posts => this.posts = posts);
  }

}
