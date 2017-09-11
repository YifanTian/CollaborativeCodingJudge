import { Injectable } from '@angular/core';

declare const io: any;
@Injectable()
export class ChatSquareService {

  chatroomSocket: any;
  constructor() { }


  init():void {


  }


    sendMessage(inputMessage) {
    console.log("this.inputMessage:"+inputMessage);
    this.chatroomSocket.emit('new message', inputMessage);
  }

}
