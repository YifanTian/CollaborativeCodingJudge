import { Component, OnInit, Inject } from '@angular/core';
import { Game } from '../../models/game';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-game-detail',
  templateUrl: './game-detail.component.html',
  styleUrls: ['./game-detail.component.css']
})
export class GameDetailComponent implements OnInit {

  game: Game;
  constructor( @Inject('data') private data,
  private route: ActivatedRoute ) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params)=>{
      this.game = this.data.getGame(+params['id']);
    });
  }

}
