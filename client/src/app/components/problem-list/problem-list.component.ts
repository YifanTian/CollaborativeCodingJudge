import { Component, OnInit, Inject } from '@angular/core';
import { Problem } from '../../models/problem';

import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-problem-list',
  templateUrl: './problem-list.component.html',
  styleUrls: ['./problem-list.component.css']
})
export class ProblemListComponent implements OnInit {

  problems: Problem[];
  subscriptionProblem = Subscription;
  constructor(@Inject('data') private data) { }

  ngOnInit() {
    this.getProblems();
  }

  sortProblemsByDifficulty(order: number) {

    const dict = {};
    dict['easy'] = 1;
    dict['medium'] = 2;
    dict['hard'] = 3;
    dict['super'] = 4;

    function compare1(a, b) {
      if (dict[a.difficulty] < dict[b.difficulty])
        return -1;
      if (dict[a.difficulty] > dict[b.difficulty])
        return 1;
      return 0;
    }
    
    function compare2(a, b) {
      if (dict[a.difficulty] > dict[b.difficulty])
        return -1;
      if (dict[a.difficulty] < dict[b.difficulty])
        return 1;
      return 0;
    }

     order === 1 ? this.problems.sort(compare1) : this.problems.sort(compare2);
  }

  getProblems(): void {
    // this.problems = this.dataService.getProblems();
    this.subscriptionProblem = this.data.getProblems()
    .subscribe(problems => this.problems = problems);
  }

}
