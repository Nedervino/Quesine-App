var philipsGenerator = require("../connections/philips");

module.exports = function (server) {
  server.get('/heartrate', function (req, res, next) {
  	res.header("Access-Control-Allow-Origin", "*"); 
  	res.header("Access-Control-Allow-Headers", "*");
  	res.header("Access-Control-Allow-Methods", "*");
  	if(req.header('philipsToken')){
  		var philips  = philipsGenerator(req.header('philipsToken'));
  		
  		philips.getHeartRate().then(function (data) {
			res.json(200,data);
	    })
	    .catch(function (err) {
	        res.send(500, {x:'itbroke','err':err});
	    })
	    .finally(function(){
	    	return next();
	    });
	    
  	}else{
  		res.send(418, "I'm a teapot");
  		return next();
  	}
  });
};