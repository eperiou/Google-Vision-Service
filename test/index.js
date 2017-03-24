var path = require('path');
var expect = require('chai').expect;
var supertest = require("supertest");
var assert = require('chai').assert
const should = require('should');

var server = require(path.join(__dirname, '..', './index.js'));
var agent = supertest.agent('http://localhost:5000');

describe('index()', function () {
  'use strict';

  it('should respond with an error because json object is required', function (done) {
    agent.post('http://localhost:8000')
      .end((err, res) => {
        err.should.not.equal(null);
        done();
      });
  });
  // Add more assertions here
});
