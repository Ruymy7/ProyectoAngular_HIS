import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Patient } from '../models/patient.model'
import { Professional } from '../models/professional.model'


@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private httpClient: HttpClient) { }

  getAllUsers(): Observable<Patient[] | Professional[]> {
    return this.httpClient.get<Patient[] | Professional[]>(environment.API_URL + 'users')
  }
  getUser(id: string): Observable<Patient | Professional> {
    return this.httpClient.get<Patient | Professional>(environment.API_URL + `users/${id}`)
  }
  addUser(userData: Patient | Professional): void {
    this.httpClient.post(environment.API_URL + 'users', userData)
  }
  editUser(userData: Patient | Professional): void {
    this.httpClient.put(environment.API_URL + 'users', userData)
  }
  deleteUser(id: number): Observable<Patient | Professional> {
    return this.httpClient.delete<Patient | Professional>(environment.API_URL + `users/${id}`)
  }

}
