var fs = require('fs');
var recipes = require('./data/recepten.json');

function compareScore(a,b) {
	if (a.score < b.score) return -1;
	if (a.score > b.score) return 1;
	return 0;
}

module.exports = {
	getRecipes: function(energy, carbs, proteins, fats, satfats, natrium, fibers, page, limit) {
		page = page | 0;
		limit = limit | 100;
		var start = page*limit;
		var end = start+limit;

		console.dir(recipes.length);
		var c = 0;
		return recipes.map(function(item) {
			var current = item;
			var fields = [];

			current.recept_energie = current.recept_energie.replace(',','.');
			current.recept_koolhydraten = current.recept_koolhydraten.replace(',','.');
			current.recept_eiwitten = current.recept_eiwitten.replace(',','.');
			current.recept_vetten = current.recept_vetten.replace(',','.');
			current.recept_verzadigd = current.recept_verzadigd.replace(',','.');
			current.recept_natrium = current.recept_natrium.replace(',','.');
			current.recept_vezels = current.recept_vezels.replace(',','.');

			if (current.recept_energie && current.recept_energie !== 'onbekend' && current.recept_energie !== 0 && current.recept_energie !== '') {
				fields.push(Math.abs((energy - current.recept_energie)/energy));
			}
			if (current.recept_koolhydraten && current.recept_koolhydraten !== 'onbekend' && current.recept_koolhydraten !== 0 && current.recept_koolhydraten !== '') {
				fields.push(Math.abs((carbs - current.recept_koolhydraten)/carbs));
			}
			if (current.recept_eiwitten && current.recept_eiwitten !== 'onbekend' && current.recept_eiwitten !== '') {
				fields.push(Math.abs((proteins - current.recept_eiwitten)/proteins)); 
			}
			if (current.recept_vetten && current.recept_vetten !== '') {
				fields.push(Math.abs((fats - current.recept_vetten)/fats));
			}
			if (current.recept_verzadigd && current.recept_verzadigd !== '') {
				fields.push(Math.abs((satfats - current.recept_verzadigd)/satfats));
			} 
			if (current.recept_natrium && current.recept_natrium !== '') {
				fields.push(Math.abs((natrium - current.recept_natrium)/natrium));
			}
			if (current.recept_vezels && current.recept_vezels !== '') {
				fields.push(Math.abs((fibers - current.recept_vezels)/fibers));
			}
			if(fields.length>0){
				var sum = fields.reduce(function(total, score){
					return total+score;
				});
				current.score = sum/fields.length;
			}else{
				current.score = 1000;
			}
			return current;
		}).sort(compareScore).slice(start,end);
	}
};



