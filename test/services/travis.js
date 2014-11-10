/*global describe, it */
var travis = require("../../lib/services/travis");
var expect = require("expect.js");

describe("travis service", function(){

  it ("can detect travis", function(){
    process.env.TRAVIS = "true";
    expect(travis.detect()).to.be(true);
  });

  it ("can get travis env info", function(){
    process.env.TRAVIS = "true";
    process.env.TRAVIS_JOB_ID = '1234';
    process.env.TRAVIS_COMMIT = '5678';
    process.env.TRAVIS_JOB_NUMBER = '91011';
    process.env.TRAVIS_BRANCH = 'master';
    travis.configuration(function(config){
      console.log(config);
      expect(config).to.eql({
        service : 'travis',
        buildId :  '1234',
        commitId : '5678',
        build : '91011',
        branch : 'master'
      });
    });
  });
  it ("can get travis env info with a pull request", function(){
    process.env.TRAVIS = "true";
    process.env.TRAVIS_JOB_ID = '1234';
    process.env.TRAVIS_COMMIT = '5678';
    process.env.TRAVIS_JOB_NUMBER = '91011';
    process.env.TRAVIS_BRANCH = 'master';
    process.env.TRAVIS_PULL_REQUEST = 'blah';
    travis.configuration(function(config){
      console.log(config);
      expect(config).to.eql({
        service : 'travis',
        buildId :  '1234',
        commitId : '5678',
        build : '91011',
        branch : 'master',
        pullRequest : 'blah',
      });
    });
  });

});
