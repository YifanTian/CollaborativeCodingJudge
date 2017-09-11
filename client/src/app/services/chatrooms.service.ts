import { Injectable } from '@angular/core';


declare const io: any;
@Injectable()
export class ChatroomsService {

  chatroomSocket: any;
  constructor() { }

    init(editor:any, sessionId: string):void {
    this.chatroomSocket = io(window.location.origin, {query: 'sessionId='+sessionId});
    
    // 'change' message handler
    this.chatroomSocket.on('change', (delta: string) => {
      console.log('collaboration: editor changes by ' + delta);
      delta = JSON.parse(delta);
      editor.lastAppliedChange = delta;
      editor.getSession().getDocument().applyDeltas([delta]);
    });

    //'cursorMove' message handler
    this.chatroomSocket.on('cursorMove', (message) => {
      console.log('cursor move: ' + message);
      const session = editor.getSession();
      message = JSON.parse(message);
      const changeClientId = message['socketId'];
      
    });
  }


}
