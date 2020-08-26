import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';
import { LoggedUser } from './logged-user';


@Injectable({
  providedIn: 'root'
})
export class UserListService {
  list_url: string = environment.baseUrl + '/api/online-users'
  public error_data$: BehaviorSubject<any> = new BehaviorSubject({});

  constructor(private httpClient: HttpClient) {
  }

  list() {
    return this.httpClient.get<any[]>(
        this.list_url)
  }

}
