var spawnSync = require('child_process').spawnSync || require('spawn-sync');
    spawn = require('child_process').spawn,
    status = spawnSync('git', ['config', '--get', 'remote.origin.url']),
    branch = spawnSync('git', ['rev-parse', '--abbrev-ref', 'HEAD']),
    commit = spawnSync('git', ['rev-parse', '--verify', 'HEAD']);
module.exports = {

  detect : function(env){
    return (status.status===0)?true:false;
  },

  configuration : function(env){
    if (!env) env = process.env;
    return {
      service : 'localGit',
      buildId :  (commit.status===0)?String(commit.stdout):'unknown',
      commitId : (commit.status===0)?String(commit.stdout):'unknown',
      build : (commit.status===0)?String(commit.stdout):'unknown',
      branch : (branch.status===0)?String(branch.stdout):'unknown'
    };
  }
};


