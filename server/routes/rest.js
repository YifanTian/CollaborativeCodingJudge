/**
 * Created by yifantian on 5/7/17.
 */

var express = require('express');
var router = express.Router();
var problemService = require('../services/problemService');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

const nodeRestClient = require('node-rest-client').Client;
const restClient = new nodeRestClient();

const EXECUTOR_SERVER_URL = 'http://executor/build_and_run';

// registering remote methods
restClient.registerMethod('build_and_run',EXECUTOR_SERVER_URL,'POST');

// get /api/v1/problems/
router.get('/problems', function (req,res) {
    problemService.getProblems()
        .then(problems => res.json(problems));
});

// get /api/v1/problems/2
router.get('/problems/:id', function(req, res) {
    var id = req.params.id;
    problemService.getProblem(+id)                          // + convert string to number
        .then(problem => res.json(problem));
});

// post /api/v1/problems
router.post('/problems', jsonParser, function(req,res) {
    problemService.addProblem(req.body)
    .then(problem => {
        res.json(problem);
    },
    error => {
        res.status(400).send('already exists!');
    });
});


// build and run
router.post('/build_and_run',jsonParser,function(req,res) {
    const userCodes = req.body.userCodes;
    const lang = res.body.lang;
    console.log(lang + ' ' + userCodes);
    restClient.methods.build_and_run(
        {
            data: {
                code: userCodes,
                lang: lang
            },
            headers: {
                'Content-Type': 'application/json'
            }
        },
            (data, response) => {
                console.log('received response from executor server');
                const text = `Build output ${data['build']} Execute output: ${data['run']}`;
                console.log('text is ...', text);
                data['text'] = text;
                res.json(data);
            }

    )
});

module.exports = router;
