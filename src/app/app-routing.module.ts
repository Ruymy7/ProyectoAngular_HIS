import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserListComponent } from './user/user-list/user-list.component';
import { UserDetailsComponent } from './user/user-details/user-details/user-details.component';
import { AddAndEditUserComponent } from './user/add-edit-user/add-and-edit-user/add-and-edit-user.component';
import { Error404Component } from './errors/error404/error404.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AuthGuard } from './auth/guard/auth.guard';


const routes: Routes = [
  { path: '', redirectTo: 'users', pathMatch: 'full' },
  { path: 'users', component: UserListComponent, canActivate: [ AuthGuard ] },
  { path: 'users/edit/:id', component: AddAndEditUserComponent, canActivate: [ AuthGuard ]  },
  { path: 'users/new', component: AddAndEditUserComponent, canActivate: [ AuthGuard ]  },
  { path: 'users/:id', component: UserDetailsComponent, canActivate: [ AuthGuard ]  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**', component: Error404Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
