import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-posts-table',
  templateUrl: './posts-table.component.html',
  styleUrls: ['./posts-table.component.scss']
})
export class PostsTableComponent implements OnInit {
  @Input() posts = [{postName: 'Post'}];
  columns: string[] = ['postName'];
  constructor() { }

  ngOnInit() {
  }

}
