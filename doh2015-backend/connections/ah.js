var https = require('https');
var rp = require('request-promise');

var ahConnection = function(tkn, v1, v2, v3, v4, v5, v6, v7) {
	var token = tkn;
	var energy = v1;
	var carbs = v2;
	var proteins = v3;
	var fats = v4;
	var satfats = v5;
	var natrium = v6;
	var fibers = v7;
	return {
		getRecipe: function(){
			var uri = {
				host: 'https://frahmework.ah.nl/',
				path: 'ah/json/recepten'
			};

			var options = {
			    uri: uri.host+uri.path,
			    qs: {
			    	receptenergie : energy,
			    	receptkoolhydraten : carbs,
			    	recepteiwitten : proteins,
			    	receptvetten : fats,
			    	receptvetverzadigd : satfats,
			    	receptnatrium : natrium,
			    	receptvezels : fibers,
			        personalkey: token
			    },
			    headers: {
			        'User-Agent': 'Request-Promise'
			    },
			    json: true
			};
			 
			return rp(options);
		}
	};
};

module.exports = ahConnection;

/*

function getRecipe(token, energy, carbs, proteins, fats, satfats, natrium, fibers){
		var options = {

			host: 'https://frahmework.ah.nl/',
			path: 'ah/json/recepten?receptenergie='+energy+'&receptkoolhydraten='+carbs+'&recepteiwitten='+proteins+'&receptvetten='+fats+'&receptvetverzadigd='+satfats+'&receptnatrium='+natrium+'&receptvezels='+fibers+'&personalkey=' + token,
		};

		callback = function(response) {
	  		var str = '';
	  		response.on('data', function (chunk) {
	    		str += chunk;
	  		});

	  		response.on('end', function () {
	    		console.log(str);
	    		//return str;
	  		});
		}
		http.request(options.host+options.path, callback).end();
	}


function getRecipeWithVariation(token, energy, carbs, proteins, fats, satfats, natrium, fibers) {
	var result = getRecipe(token, energy, carbs, proteins, fats, satfats, natrium, fibers);
	console.log(result);
	//var recipe = JSON.parse(result);
	//console.log(JSON.parse(result));

}
