import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { User } from './models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUser(): Observable<User[]> {
    return this.http.get(`/users`).pipe(
      map((response: any) => (response && response.length ? response : [])),
      catchError((error) => of(null))
    );
  }
}
