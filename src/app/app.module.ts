import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { UserIdleModule } from 'angular-user-idle';

import { AuthGuard } from './auth/guard';
import { AuthComponent } from './auth/auth.component';
import { HttpConfigInterceptor } from './interceptors/CustomHttpInterceptor';
import { UserListComponent } from './user-list/user-list.component';
import { UserChatComponent } from './user-chat/user-chat.component';

const appRoutes: Routes = [
    { path: 'chat/:id', component: UserChatComponent,  canActivate: [AuthGuard] },
    { path: 'online-users', component: UserListComponent,  canActivate: [AuthGuard] },
    { path: 'login', component: AuthComponent }
]
@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    UserListComponent,
    UserChatComponent
  ],
  imports: [
    RouterModule.forRoot(
        appRoutes,
        { useHash: true }
    ),
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    UserIdleModule.forRoot({idle: 20, timeout: 300, ping: 120})
  ],
    providers: [
      AuthGuard,
      { provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true },
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
