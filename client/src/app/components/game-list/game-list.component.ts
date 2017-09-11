import { Component, OnInit, Inject } from '@angular/core';
import { Game } from '../../models/game';
import { GAMES } from '../../mock-games';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css']
})
export class GameListComponent implements OnInit {

  games: Game[];
  constructor( @Inject('data') private data ) { }

  ngOnInit() {
    this.getGames();
  }

  filterGameByPlayers(num: number) {
    this.games =  this.data.getGameByPlayers(num);
  }

  getGames():void {
    this.games =  this.data.getGames();
  }

}
