import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Problem } from '../../models/problem';


@Component({
  selector: 'app-problem-detail',
  templateUrl: './problem-detail.component.html',
  styleUrls: ['./problem-detail.component.css']
})

export class ProblemDetailComponent implements OnInit {
  
  problem: Problem;

  constructor(private route: ActivatedRoute,
  @Inject('data') private data) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.data.getProblem(+params['id'])
      .then(problem => this.problem = problem);
    });
  }

    function($scope, $location, $anchorScroll) {
      $scope.gotoBottom = function() {
        // set the location.hash to the id of
        // the element you wish to scroll to.
        $location.hash('bottom');

        // call $anchorScroll()
        $anchorScroll();
      };
    }

}
