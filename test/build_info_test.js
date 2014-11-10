var getConfiguration = require("../lib/services");
var expect = require("expect.js");
/*global describe, it */
describe("getConfiguration", function(){

  it ("can get a token passed via env variable (uppercase)", function(){
    process.env.TRAVIS = "true";
    process.env.TRAVIS_JOB_ID = '1234';
    process.env.TRAVIS_COMMIT = '5678';
    process.env.TRAVIS_JOB_NUMBER = '91011';
    process.env.TRAVIS_BRANCH = 'master';
    expect(getConfiguration()).to.eql({
      service : 'travis',
      buildId :  '1234',
      commitId : '5678',
      build : '91011',
      branch : 'master'
    });
  });
  it ("can get a token passed via env variable (lowercase)", function(){
    process.env.TRAVIS = "true";
    process.env.TRAVIS_JOB_ID = '1234';
    process.env.TRAVIS_COMMIT = '5678';
    process.env.TRAVIS_JOB_NUMBER = '91011';
    process.env.TRAVIS_BRANCH = 'master';
    expect(getConfiguration()).to.eql({
      service : 'travis',
      buildId :  '1234',
      commitId : '5678',
      build : '91011',
      branch : 'master'
    });
  });

});
console.log("BUILD_INFO", global["BUILD_INFO"]);
