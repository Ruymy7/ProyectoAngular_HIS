import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterialModule } from './material.module'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserListComponent } from './user/user-list/user-list.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserDetailsComponent } from './user/user-details/user-details/user-details.component';
import { DialogComponent } from './dialog/dialog/dialog.component';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { AddAndEditUserComponent } from './user/add-edit-user/add-and-edit-user/add-and-edit-user.component';
import { Error404Component } from './errors/error404/error404.component';

@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    UserDetailsComponent,
    DialogComponent,
    AddAndEditUserComponent,
    Error404Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'es-ES'},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
