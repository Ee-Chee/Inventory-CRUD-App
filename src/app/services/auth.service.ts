import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

// const AUTH_API = 'http://localhost:8082/api/auth/';
const AUTH_API = 'https://eat-happy-inventur-api.herokuapp.com/api/auth';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private http: HttpClient) { }

    login(credentials): Observable<any> {
        return this.http.post(AUTH_API + 'signin', {
            username: credentials.username,
            password: credentials.password
        }, httpOptions);
    }

    register(user): Observable<any> {
        return this.http.post(AUTH_API + 'signup', {
            username: user.username,
            password: user.password
        }, httpOptions);
    }
}
