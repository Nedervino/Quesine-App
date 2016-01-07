module.exports = function (server) {
  server.get('/teapot', function (req, res, next) {
  	res.header('Access-Control-Allow-Origin', '*');
  	res.send(418, "I'm a teapot");
  });

  server.put('/teapot', function (req, res, next) {
  	res.header('Access-Control-Allow-Origin', '*');
  	res.send(418, "I'm a teapot");
  });

  server.post('/teapot', function (req, res, next) {
  	res.header('Access-Control-Allow-Origin', '*');
  	res.send(418, "I'm a teapot");
  });

};