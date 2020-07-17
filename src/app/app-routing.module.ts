import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserListComponent } from './user/user-list/user-list.component';
import { UserDetailsComponent } from './user/user-details/user-details/user-details.component';
import { AddEditUserComponent } from './user/user-add-edit/add-edit-user/add-edit-user.component';
import { AddAndEditUserComponent } from './user/add-edit-user/add-and-edit-user/add-and-edit-user.component';


const routes: Routes = [
  { path: '', redirectTo: 'users', pathMatch: 'full'},
  { path: 'users', component: UserListComponent },
  { path: 'users/edit/:id', component: AddAndEditUserComponent},
  { path: 'users/new', component: AddAndEditUserComponent},
  { path: 'users/:id', component: UserDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
