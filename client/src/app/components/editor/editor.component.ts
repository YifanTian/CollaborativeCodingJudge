import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { CollaborationService } from '../../services/collaboration.service';

declare const ace: any;
@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {

  showmessages: string;
  inputMessage: string;
  allmessages: any;

  editor: any;
  languages: string[] = ['Java', 'Python'];
  language: string = 'Java';
  sessionId: string;
  output: string = '';

  defaultContent = {
    'Java': `public class Example {
    public static void main(String[] args) { 
        // Type your Java code here 
        } 
    }`,
    'Python': `class Solution: 
   def example(): 
       # Write your Python code here`
  };
  constructor(private collaboration: CollaborationService,
              private route: ActivatedRoute,
              @Inject('data') private data) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.sessionId = params['id'];
      this.initEditor();
    });
  }

  initEditor(): void {

    this.showmessages = "";

    // this.allmessages = {
    //   messages:"",
    //   users:""
    // }

    this.allmessages = [];

    this.editor = ace.edit('editor');
    this.editor.setTheme('ace/theme/eclipse');
    this.resetEditor();

    document.getElementsByTagName('textarea')[0].focus();                         // how to use focus()?

    // this.collaboration.init(this.showmessages, this.editor, this.sessionId);
    this.collaboration.init(this.allmessages, this.editor, this.sessionId);

    this.editor.lastAppliedChange = null;
    // register change callback
    this.editor.on('change', e => {
      console.log('editor changed: ' + JSON.stringify(e));
      if (this.editor.lastAppliedChange != e) {
        this.collaboration.change(JSON.stringify(e));
      }
    });

    // register cursor movementcallback
    this.editor.getSession().getSelection().on('changeCursor', () => {
      const cursor = this.editor.getSession().getSelection().getCursor();
      console.log('curser move', JSON.stringify(cursor) );
      this.collaboration.cursorMove(JSON.stringify(cursor));
    });

    this.collaboration.restoreBuffer();
  }

  setLanguage(language: string): void {
    this.language = language;
    this.resetEditor();
  }

  resetEditor(): void {
    console.log('Resseting editor...');
    this.editor.getSession().setMode(`ace/mode/${this.language.toLowerCase()}`);
    this.editor.setValue(this.defaultContent[this.language]);
    this.output = '';
  }

  submit() {
    // TODO
    // const userCodes = this.editor.getValue();
    // console.log(userCodes);
    this.output = '';
    const userCodes = this.editor.getValue();
    const codes = {
      userCodes: userCodes,
      lang: this.language.toLocaleLowerCase()
    };
    this.data.buildAndRun(codes)
    .then(res => this.output = res.text);
  }

  sendMessage() {
    console.log("current showmessages: "+this.showmessages);
    console.log("this.inputMessage:"+this.inputMessage);
    // this.showmessages = this.showmessages + this.inputMessage;
    this.allmessages.push({user:'myself',info:this.inputMessage});
    this.collaboration.sendMessage(this.inputMessage);
  }

}
