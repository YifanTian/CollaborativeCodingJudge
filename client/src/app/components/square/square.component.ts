import { Injectable } from '@angular/core';
import { Component, OnInit } from '@angular/core';

declare const io: any;

@Component({
  selector: 'app-square',
  templateUrl: './square.component.html',
  styleUrls: ['./square.component.css']
})
export class SquareComponent implements OnInit {

  chatroomSocket: any;

  inputMessage: string;
  messages: string;
  
  constructor() { }

  ngOnInit() {

    this.messages = "abc";
    var recieved_messages = "here";

    this.chatroomSocket = io(window.location.origin, {query: 'message='+"chat square"});
    this.chatroomSocket.on('new message', function (data) {
        console.log("message received from server:"+data);
        // this.messages = this.messages + data;
        recieved_messages = recieved_messages + "  " + data;
        console.log("new message to show "+recieved_messages);
        // this.addChatMessage();
    });
    
  }

  addChatMessage ():void {

    console.log('test');
    // this.messages = this.messages + data.message;

    // Don't fade the message in if there is an 'X was typing'
    // var $typingMessages = getTypingMessages(data);
    // options = options || {};
    // if ($typingMessages.length !== 0) {
    //   options.fade = false;
    //   $typingMessages.remove();
    // }

    // var $usernameDiv = $('<span class="username"/>')
    //   .text(data.username)
    //   .css('color', getUsernameColor(data.username));
    // var $messageBodyDiv = $('<span class="messageBody">')
    //   .text(data.message);

    // var typingClass = data.typing ? 'typing' : '';
    // var $messageDiv = $('<li class="message"/>')
    //   .data('username', data.username)
    //   .addClass(typingClass)
    //   .append($usernameDiv, $messageBodyDiv);

    // addMessageElement($messageDiv, options);
  }


  // sendMessage() {
  //   console.log("this.inputMessage:"+this.inputMessage);
  //   // this.messages = this.messages.concat(this.inputMessage);
  //   this.messages = this.messages + this.inputMessage;
  //   this.chatroomSocket.emit('new message', this.inputMessage);
  // }



}
