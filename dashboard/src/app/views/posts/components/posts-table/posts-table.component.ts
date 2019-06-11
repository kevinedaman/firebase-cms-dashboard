import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Post } from '@models/post';

@Component({
  selector: 'app-posts-table',
  templateUrl: './posts-table.component.html',
  styleUrls: ['./posts-table.component.scss']
})
export class PostsTableComponent implements OnInit {
  @Input() posts: Post[];
  @Output() view: EventEmitter<any> = new EventEmitter();
  @Output() delete: EventEmitter<any> = new EventEmitter();
  columns: string[] = ['title', 'author', 'date', 'actions'];
  constructor() { }

  ngOnInit() {
  }

}
