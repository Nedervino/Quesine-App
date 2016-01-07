var ah = require("../stubs/ah");
var restify = require('restify');

module.exports = function (server) {
  server.use(restify.queryParser());
  server.get('/recipes', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); 
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Allow-Methods", "*");
    var q = req.query;
		console.dir('BWAAAH!!');
    var data = ah.getRecipes(
      parseFloat(q.energy),
      parseFloat(q.carbs),
      parseFloat(q.proteins),
      parseFloat(q.fats),
      parseFloat(q.satfats),
      parseFloat(q.natrium),
      parseFloat(q.fibers),
      parseInt(q.page),
      parseInt(q.limit)
    );
    console.dir(data[0]);
    res.json(200,data);
    return next();
  });
};