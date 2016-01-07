var philipsGenerator = require("../connections/philips");
var Promise = require('bluebird');

module.exports = function (server) {
	server.get('/calories', function (req, res, next) {
		res.header("Access-Control-Allow-Origin", "*"); 
  		res.header("Access-Control-Allow-Headers", "*");
  		res.header("Access-Control-Allow-Methods", "*");
		if(req.header('philipsToken') && req.header('patientid')){
			var philips  = philipsGenerator(req.header('philipsToken'), req.header('patientid'));
			var queries = [];
			queries.push(philips.getCaloriesBurntWeek());
			queries.push(philips.getCaloriesEatenDay());
			//queries.push(philips.getCaloriesBurntDay())

			Promise.all(queries).then(function (data) {
				var week = data[0];
				var eaten = data[1];
				//var day = data[2];
				// var totalCaloriesBurntDay = day.entry.reduce(function(previousValue, item) {
				// 	return previousValue + item.content.valueQuantity.value;
				// }, 0);
				var totalCaloriesBurntWeek = week.entry.reduce(function(previousValue, item) {
					return previousValue + item.content.valueQuantity.value;
				}, 0);
				var totalCaloriesEatenDay = eaten.entry.reduce(function(previousValue, item) {
					return previousValue + item.content.valueQuantity.value;
				}, 0);

				console.log(totalCaloriesBurntWeek);
				console.log(totalCaloriesEatenDay);

				var caloriesLeft = (totalCaloriesBurntWeek / 7) - totalCaloriesEatenDay;
				var ratio = caloriesLeft / 2500;

				var carbsLeft =  250 * ratio;
				var proteinsLeft = 150 * ratio;
				var fatLeft = 100 * ratio;
				var satfatLeft = 20 * ratio;
				var natriumLeft = 5 * ratio;
				var fibersLeft = 40 * ratio;

				var data = { 
					energie: caloriesLeft,
					koolhydraten: carbsLeft,
					eiwitten: proteinsLeft,
					vet: fatLeft,
					vetverzadigd: satfatLeft,
					natrium: natriumLeft,
					vezels: fibersLeft
				 };

				res.json(200, data);
			})
			.catch(function(err) {
				res.send(500, {x:'itbroke','err':err});
			})
			.finally(function(){
				return next();
			});
		}else{
			res.send(418, "I'm a teapot");
		}
	});
};