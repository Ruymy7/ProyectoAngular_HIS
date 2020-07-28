import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Patient } from '../models/patient.model'
import { Professional } from '../models/professional.model'
import { StorageService } from '../auth/storage.service';

type User = Patient | Professional

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private httpClient: HttpClient, private storageService: StorageService) { }

  getAllUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(environment.API_URL + 'users', {headers: {'Authorization': `Bearer ${this.storageService.getCurrentToken()}`}})
  }
  getUser(id: string): Observable<User> {
    return this.httpClient.get<User>(environment.API_URL + `users/${id}`, {headers: {'Authorization': `Bearer ${this.storageService.getCurrentToken()}`}})
  }
  addUser(userData: User): Observable<User> {
    return this.httpClient.post<User>(environment.API_URL + 'users', userData, {headers: {'Authorization': `Bearer ${this.storageService.getCurrentToken()}`}})
  }
  editUser(userData: User): Observable<User> {
    return this.httpClient.put<User>(environment.API_URL + `users/${userData._id}`, userData, {headers: {'Authorization': `Bearer ${this.storageService.getCurrentToken()}`}})
  }
  deleteUser(id: string): Observable<User> {
    return this.httpClient.delete<User>(environment.API_URL + `users/${id}`, {headers: {'Authorization': `Bearer ${this.storageService.getCurrentToken()}`}})
  }
  deleteUsers(ids: string[]): Promise<object> { // This is a solution if the backend doesn't support multiple deletion
    let promiseArray:Promise<object>[] = []
    ids.forEach(id => {
      promiseArray.push(this.httpClient.delete(environment.API_URL + `users/${id}`, {headers: {'Authorization': `Bearer ${this.storageService.getCurrentToken()}`}}).toPromise())
    })
    return Promise.all(promiseArray)
  }

}
