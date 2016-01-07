var https = require('https');
var rp = require('request-promise');

var philipsConnection = function(tkn, pttid){
	var token = tkn;
	var patientid = pttid;
	return {
		getCaloriesBurntDay: function(){
			var uri = {
				host: 'https://www.measuretomotivate.philips.com/',
				path: 'api/fhir/Observation'
			}
			var options = {
				uri: uri.host+uri.path,
				qs: {
					'patient.id': patientid,
					type: 'calories',
					start: '2014-10-16T00:01',
					end: '2014-10-16T17:00',
					access_token: token
				},
				headers: {
					'User-Agent': 'Request-Promise'
				},
				json: true
			};
			return rp(options);
		},
		getCaloriesBurntWeek: function(){
			var uri = {
				host: 'https://www.measuretomotivate.philips.com/',
				path: 'api/fhir/Observation'
			}
			var options = {
				uri: uri.host+uri.path,
				qs: {
					'patient.id': patientid,
					type: 'calories',
					start: '2014-10-10T00:01',
					end: '2014-10-15T23:59',
					access_token: token
				},
				headers: {
					'User-Agent': 'Request-Promise'
				},
				json: true
			};
			return rp(options);
		},
		getCaloriesEatenDay: function(){
			var uri = {
				host: 'https://www.measuretomotivate.philips.com/',
				path: 'api/fhir/Observation'
			}
			var options = {
				uri: uri.host+uri.path,
				qs: {
					'patient.id': patientid,
					type: 'energyintake',
					start: '2014-10-16T00:01',
					end: '2014-10-16T17:00',
					access_token: token
				},
				headers: {
					'User-Agent': 'Request-Promise'
				},
				json: true
			};
			return rp(options);
		},
		getHeartRate: function(){
			var uri = {
				host: 'https://www.measuretomotivate.philips.com/',
				path: 'api/fhir/Observation'
			};

			var options = {
			    uri: uri.host+uri.path,
			    qs: {
			        'patient.id': patientid,
			        type: 'heartrate',
			        start: '2014-12-21T00:00',
			        end : '2014-12-21T17:00',
			        access_token: token
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

module.exports = philipsConnection;
