var jenkins = require("../../lib/services/jenkins");
var expect = require("expect.js");

describe("jenkins service", function(){

  it ("can detect jenkins", function(){
    process.env.JENKINS_URL = "http://jenkins.jenkins.example/";

    jenkins.detect(function(detected){
      expect(detected).to.be(true);
    })
  });

  it ("can get service env info", function(){
    process.env.BUILD_NUMBER = '1234';
    process.env.BUILD_URL = 'http://asdf/';
    process.env.GIT_COMMIT = '5678';
    process.env.GIT_BRANCH = 'master';
    process.env.WORKSPACE = '/var/lib/jenkins/workspace';
    jenkins.configuration(function(config){
      expect(config).to.eql({
        service : 'jenkins',
        buildId :  '1234',
        buildUrl :  'http://asdf/',
        commitId : '5678',
        root : '/var/lib/jenkins/workspace',
        branch : 'master'
      });
    });
  });
});
