import { Component, OnInit, Inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  title: string = 'OJ'
  profile: any;
  constructor(private auth: AuthService) { 
    this.auth.userProfile.subscribe(
      profile => this.profile = profile
    );
  }

  ngOnInit() {
  }

  login():void {
    this.auth.login();
  }

  logout():void {
    this.auth.logout();
  }

}
