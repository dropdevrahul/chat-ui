import { Component, OnInit } from '@angular/core';
import { UserListService } from './user-list.service';
import { ChatRoom } from '../user-chat/chat-room';
import { UserChatService } from '../user-chat/chat-service.service';
import { LoggedUser } from './logged-user';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  online_users: LoggedUser[] = [];
  constructor(private service: UserListService,
              private chat_service: UserChatService
             ) { }

  ngOnInit(): void {
    this.load_users()
  }

  load_users() {
    this.service.list().subscribe((result)=>{
            this.online_users = result
        }
    )
  }


}
