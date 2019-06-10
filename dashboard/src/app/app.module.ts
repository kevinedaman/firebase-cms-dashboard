import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';

import { environment } from '../environments/environment';

import { AuthGuard } from './auth/auth.guard';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';
import { LayoutComponent } from './layout/layout.component';
import { NavDrawerComponent } from './layout/nav-drawer/nav-drawer.component';
import { EditorModule } from '@tinymce/tinymce-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    NavDrawerComponent
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
    BrowserModule,
    BrowserAnimationsModule,
    EditorModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    SharedModule,
    AuthModule,
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
