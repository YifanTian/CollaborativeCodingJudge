import { Injectable } from '@angular/core';
import { Problem } from '../models/problem';
import { Game } from '../models/game';
import { PROBLEMS } from '../mock-problems';
import { GAMES } from '../mock-games';

import { Http, Response, Headers } from '@angular/http';
import { BehaviorSubject, Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class DataService {

  // problems: Problem[] = PROBLEMS;
  games: Game[] = GAMES;

  private _problemSource = new BehaviorSubject<Problem[]>([]);

  constructor(private http:Http) { }

  // getProblems(): Problem[] {
  //   console.log(this.problems);
  //   return this.problems;
  // }

  getProblems(): Observable<Problem[]> {
    this.http.get('api/v1/problems')
    .toPromise()
    .then((res: Response) => {
      this._problemSource.next(res.json());
    })
    .catch(this.handleError);
    return this._problemSource.asObservable();
  }

  // getProblem(id: number): Problem {
  //   return this.problems.find( (problem) => (problem.id === id) );
  // }

  // getProblem(id:number): Promise<Problem> {
  //   return this.http.get(`api/v1/problem/${id}`)
  //   .toPromise()
  //   .then((res:Response) => res.json())
  //   .catch(this.handleError)
  // }

  getProblem(id: number): Promise<Problem> {
    // return PROBLEMS.find((problem) => problem.id === id );
    //return this.problems.find((problem) => problem.id === id );
    return this.http.get(`api/v1/problems/${id}`)
      .toPromise()
      .then((res:Response) => res.json())
      .catch(this.handleError);
}

  addProblem(newProblem:Problem) {
    const headers = new Headers({
      'content-type': 'application/json'
    });
    return this.http.post('api/v1/problems', newProblem, headers)
    .toPromise()
    .then((res:Response) => {
      this.getProblems();
      res.json();
    })
    .catch(this.handleError)
  }

  buildAndRun(data:any): Promise<Object> {
    const headers = new Headers({'conent-type': 'application/json'});
    return this.http.post('/api/v1/build_and_run', data, headers)
    .toPromise()
    .then((res: Response) => {
      console.log('in client side build and run', res);
      return res.json();
    })
    .catch(this.handleError);
  }



  getGames(): Game[] {
    return this.games;
  }

  getGame(id: number): Game {
    return this.games.find( (game) => (game.id === id) );
  }

  getGameByPlayers(num): Game[] {
    return this.games.filter( (game) => (game.players === num) );
  }

  private handleError(error:any):Promise<any> {
    console.error('An error happemed', error);
    return Promise.reject(error.body||error);
  }

}
