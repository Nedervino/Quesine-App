var calories = require("./data/caloriesBurnt");
var heartrate = require("./data/heartrates");

module.exports = function(tkn){
	var token = tkn;
	return {
		getCaloriesBurntDay: function(){
			return calories;
		},
		getHeartRate: function(){
			return heartrate;
		}
	};
};