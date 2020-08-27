import { Component, OnInit, Input } from '@angular/core';
import {webSocket, WebSocketSubject} from 'rxjs/webSocket';
import { ActivatedRoute } from '@angular/router';
import { ChatRoom } from './chat-room';
import { UserChatService } from './chat-service.service';
import { AuthenticationService } from '../auth/auth.service';

@Component({
    selector: 'app-user-chat',
    templateUrl: './user-chat.component.html',
    styleUrls: ['./user-chat.component.css']
})
export class UserChatComponent implements OnInit {
    websocket: WebSocketSubject<any>;
    target_username: string = '';
    messages: string[] = [];
    message: string = '';
    id: string = '';
    @Input() room: ChatRoom;

    constructor(private route: ActivatedRoute,
                private chat_service: UserChatService,
                private auth_service: AuthenticationService
               ) { }

    ngOnInit(): void {
        this.route.paramMap.subscribe(params => {
            if(params['params']['id']){
                this.id = params['params']['id'];
                this.start_chat(this.id);
            }
        });
    }

    send_message() {
        if(this.message){
            let data = {
                "message": this.message,
                "current_user_id": this.auth_service.getUser().id
            }
            console.log(data)
            this.websocket.next(data)
            this.message = '';
        }
    }

    start_chat(target_user_id: string) {
        this.chat_service.initiate_chat(target_user_id).subscribe(
            chat_room => {
                this.room = chat_room
                this.websocket = this.chat_service.get_websocket(this.room.id);
                this.websocket.asObservable().subscribe(
                    data=>{
                        console.log(data)
                        this.messages.push(data)
                    }
                )
            }, error=>{
                this.room = null
            }
        )
    }

    get_message_class(chat_message) {
        if(String(chat_message.current_user_id) === String(this.auth_service.getUser().id)){
            return "float-left"
        }
        else {
            return "float-right"
        }
    }

}
