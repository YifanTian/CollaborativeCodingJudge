import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { routing } from './app.routes';

import { AppComponent } from './app.component';
import { ProblemListComponent } from './components/problem-list/problem-list.component';
import { ProblemDetailComponent } from './components/problem-detail/problem-detail.component';

import { DataService } from './services/data.service';
import { AuthService } from './services/auth.service';
import { CollaborationService } from './services/collaboration.service';

import { ChatSquareService } from './services/chat-square.service';
import { ChatroomsService } from './services/chatrooms.service';

import { GameListComponent } from './components/game-list/game-list.component';
import { GameDetailComponent } from './components/game-detail/game-detail.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NewProblemComponent } from './components/new-problem/new-problem.component';
import { EditorComponent } from './components/editor/editor.component';
import { ChatroomListComponent } from './components/chatroom-list/chatroom-list.component';
import { SquareComponent } from './components/square/square.component';


@NgModule({
  declarations: [
    AppComponent,
    ProblemListComponent,
    ProblemDetailComponent,
    GameListComponent,
    GameDetailComponent,
    NavbarComponent,
    NewProblemComponent,
    EditorComponent,
    ChatroomListComponent,
    SquareComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  providers: [
    {
      provide: 'data',
      useClass: DataService
    },
    AuthService,
    CollaborationService,
    ChatSquareService,
    ChatroomsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
