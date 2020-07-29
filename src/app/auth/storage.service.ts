import {Injectable} from "@angular/core";
import { Router } from '@angular/router';
import {Session} from "./models/session.model";

@Injectable()
export class StorageService {
  private localStorageService: Storage;
  private currentSession : Session = null;
  constructor(private router: Router) {
    this.localStorageService = localStorage;
    this.currentSession = this.loadSessionData();
  }
  setCurrentSession(session: Session): void {
    this.currentSession = session;
    this.localStorageService.setItem('currentUser', JSON.stringify(session));
  }
  loadSessionData(): Session{
    const sessionStr = this.localStorageService.getItem('currentUser');
    return (sessionStr) ? <Session> JSON.parse(sessionStr) : null;
  }
  getCurrentSession(): Session {
    return this.currentSession;
  }
  removeCurrentSession(): void {
    this.localStorageService.removeItem('currentUser');
    this.currentSession = null;
  }
  isAuthenticated(): boolean {
    return this.getCurrentToken() !== null;
  };
  getCurrentToken(): string {
    var session = this.getCurrentSession();
    return (session && session.token) ? session.token : null;
  };
  logout(): void{
    this.removeCurrentSession();
    this.router.navigate(['/login']);
  }
}