
const ProblemModel = require('../models/problemModel');

var getProblems = function() {
    return new Promise((resolve, reject) => {
        ProblemModel.find({},function(err,problems){
            if (err) {
                reject(err);
            } else {
                resolve(problems);
            }
        })
    });
}

var getProblem = function(idNumber) {
    return new Promise((resolve, reject) => {
            // resolve(problems.find(problem => problem.id === id ));
            ProblemModel.findOne({id: idNumber}, function(err, problem) {
            if (err) {
                reject(err);
            } else {
                resolve(problem);
            }
        });
});
}

const addProblem = function(newProblem) {
    return new Promise((resolve,reject) => {
        ProblemModel.findOne({name: newProblem.name}, function(error,data) {
           if(data) {
               reject('Problem already exists!');
           } else {
               ProblemModel.count({}, function(err,num) {
                   newProblem.id = num + 1;
                   var mongoProblem = new ProblemModel(newProblem);
                   mongoProblem.save();
                   resolve(mongoProblem);
               })
           }
        })
    })
}

module.exports = {
    getProblems: getProblems,
    getProblem: getProblem,
    addProblem: addProblem
}