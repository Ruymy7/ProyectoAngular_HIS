import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {

  constructor(private storageService: StorageService, private router: Router) { }
  canActivate(): boolean {
    if (this.storageService.isAuthenticated()) return true
    this.router.navigate(['/login'])
    return false
  }

}
