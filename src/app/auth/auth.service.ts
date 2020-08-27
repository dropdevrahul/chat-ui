import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { User } from './user';
import { Router, ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';


@Injectable({  providedIn: 'root'})
export class AuthenticationService {
    public currentUser: User;
    public error_data$: BehaviorSubject<any> = new BehaviorSubject('');
    loginUrl = environment.baseUrl + '/api/login';
    returnUrl: string = '/';

    constructor(private httpClient: HttpClient, private router: Router) {
    }

    public getUser(): User {
        return JSON.parse(localStorage.getItem('currentUser'));
    }

    public login(username: String, password: String) {
        this.httpClient.post<any>
            (this.loginUrl, {
                'username': username,
                'password': password
                }).subscribe((result: any)=> {
                    this.currentUser = new User();
                    this.currentUser.id = result['id'];
                    this.currentUser.token = result['token'];
                    this.currentUser.username = result['username'];
                    localStorage.setItem('currentUser', JSON.stringify(this.currentUser))
                    this.router.navigateByUrl(this.returnUrl);
                }, (error) => {
                    console.log('error catched')
                    this.error_data$.next('Oops an Error occured')
                })
    }

    public logout() {
        this.currentUser = null;
        localStorage.removeItem('currentUser');
        localStorage.clear();
    }
}
