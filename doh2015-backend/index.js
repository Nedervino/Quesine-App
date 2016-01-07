/*jslint node: true, indent: 2 */
'use strict';
var restify, bunyan, routes, log, server, port;

restify = require('restify');
bunyan  = require('bunyan');
routes  = require('./routes/');

port = process.env.PORT || 5000;

log = bunyan.createLogger({
  name        : 'doh2015',
  level       : process.env.LOG_LEVEL || 'info',
  stream      : process.stdout,
  serializers : bunyan.stdSerializers
});

server = restify.createServer({
  name : 'doh2015',
  log  : log,
  formatters : {
    'application/json' : function (req, res, body) {
      res.setHeader('Cache-Control', 'must-revalidate');

      // Does the client *explicitly* accepts application/json?
      var sendPlainText = (req.header('Accept').split(/, */).indexOf('application/json') === -1);

      // Send as plain text
      if (sendPlainText) {
        res.setHeader('Content-Type', 'text/plain; charset=utf-8');
      }

      // Send as JSON
      if (!sendPlainText) {
        res.setHeader('Content-Type', 'application/json; charset=utf-8');
      }
      return JSON.stringify(body);
    }
  }
});
restify.CORS.ALLOW_HEADERS.push('Access-Control-Allow-Origin');
restify.CORS.ALLOW_HEADERS.push('philipstoken');
restify.CORS.ALLOW_HEADERS.push('patientid');
restify.CORS.ALLOW_HEADERS.push('authorization');

server.use(restify.CORS());
server.use(restify.bodyParser({ mapParams: false }));
server.use(restify.queryParser());
server.use(restify.gzipResponse());
server.pre(restify.pre.sanitizePath());
server.use(restify.fullResponse());

/*jslint unparam:true*/
// Default error handler. Personalize according to your needs.
server.on('uncaughtException', function (req, res, err) {
  console.log('Error! everything has breaked');
  console.log(err);
  res.send(500, { success : false });
});
/*jslint unparam:false*/

server.on('after', restify.auditLogger({ log: log }));
routes(server);

console.log('Server started.');
server.listen(port, function () {
  log.info('%s listening at %s', server.name, server.url);
});

