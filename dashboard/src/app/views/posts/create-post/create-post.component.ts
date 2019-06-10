import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { takeUntil, map } from 'rxjs/operators';
import { CreatePostFormComponent } from '../components/create-post-form/create-post-form.component';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit, OnDestroy {
  private destroy$: Subject<boolean> = new Subject<boolean>();
  public form: FormGroup;
  public editing = false;

  constructor(
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.paramMap
    .pipe(
      map(paramMap => paramMap.get('id')),
      takeUntil(this.destroy$)
    )
    .subscribe(id => {
      if (id) {
        this.editing = true;
      }
      if (!id) {
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
    console.log('in submit', value);
  }

}
