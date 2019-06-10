import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsModule } from './posts/posts.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedModule,
  ]
})
export class ViewsModule { }
