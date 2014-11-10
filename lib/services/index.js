  var services = {
    'travis' : require('./travis'),
    'circle' : require('./circle'),
    'codeship' : require('./codeship'),
    'drone' : require('./drone'),
    'jenkins' : require('./jenkins'),
    'semaphore' : require('./semaphore'),
    'git' : require('./localGit'),

  };
  var config;
/*module.exports = function(callback){
  var config;
  var token = (process.env.codecov_token || process.env.CODECOV_TOKEN);
  var found=false;
  for (var name in services){
    if(found){
      break;
    }
    services[name].detect(process.env, function(data){
      console.log(name, "DETECTED", data, (data && !found));
      if(data && !found){
        console.log("found", name);
        found=!found;
        console.log("configuration", name);
        services[name].configuration(function(data){
          console.log(name, "DATA", data);
          config=data;
          if (!config){
            throw new Error("unknown service.  could not get configuration for "+name);
          }
          if (token){
            config.token = token;
          }
          if("function"===typeof callback){
            callback(config);
          }
        });
      }else{
          console.log(name, "not found");
          if("function"===typeof callback){
            callback();
          }
      }
    });
  }
};*/
module.exports = function(){
  var config=null;
  for (var name in services){
    if (services[name].detect()){
      config = services[name].configuration();
      break;
    }
  }
  if (!config){
    throw new Error("unknown service.  could not get configuration");
  }
  var token = (process.env.codecov_token || process.env.CODECOV_TOKEN);
  if (token){
    config.token = token;
  }
  return config;
};

