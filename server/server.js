var path = require('path');
var loopback = require('loopback');
var boot = require('loopback-boot');
var bodyParser = require('body-parser');

var app = module.exports = loopback();
app.middleware('initial', bodyParser.urlencoded({ extended: true }));


boot(app, __dirname);
app.set('view engine', 'ejs'); // LoopBack comes with EJS out-of-box
app.set('json spaces', 2); // format json responses for easier viewing

// must be set to serve views properly when starting the app via `slc run` from
// the project root
app.set('views', path.resolve(__dirname, 'views'));

app.start = function() {
  // start the web server
  return app.listen(function() {
    app.emit('started');
    var baseUrl = app.get('url').replace(/\/$/, '');
    console.log('Web server listening at: %s', app.get('url'));
    if (app.get('loopback-component-explorer')) {
      var explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
  });
};
if (require.main === module) {
  app.start();
}
// app.use('/', function(req, res, next) {
//   app.models.Customer.findOne({where: {name: 'Customer A'}}, function(err, customer) {
//     if (err) return next(err);
//     res.render('index', {customer: customer});
//   });
// });

var router = app.loopback.Router();

  router.get('/', function(req, res, next) {
    app.models.Customer.findOne({where: {name: 'Customer A'}}, function(err, customer) {
    if (err) return next(err);
    res.render('index', {customer: customer});
  });
  });

app.use(router);