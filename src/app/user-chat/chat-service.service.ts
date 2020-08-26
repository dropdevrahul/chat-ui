import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';
import { LoggedUser } from '../user-list/logged-user';
import { ChatRoom } from './chat-room';
import {webSocket, WebSocketSubject} from 'rxjs/webSocket';


@Injectable({
  providedIn: 'root'
})
export class UserChatService {
  initiate_chat_url: string = environment.baseUrl + '/api/create-chat-room'
  base_ws_chat_url: string = environment.chatUrl
  public error_data$: BehaviorSubject<any> = new BehaviorSubject({});

  constructor(private httpClient: HttpClient) {
  }

  initiate_chat(target_user_id) {
    return this.httpClient.post<ChatRoom>(
        this.initiate_chat_url, {
            'target_user_id': target_user_id
        })
  }

  get_websocket(room_id: number) {
      return webSocket(this.base_ws_chat_url + "/" + room_id);
  }


}
