module.exports = function (server) {
  server.get('/nutrition', function (req, res, next) {
  	res.header("Access-Control-Allow-Origin", "*"); 
  	res.header("Access-Control-Allow-Headers", "*");
  	res.header("Access-Control-Allow-Methods", "*");
  	if(true){
  		res.send(200, "no");
  	}else{
  		res.send(418, "I'm a teapot");
  	}
  });
};