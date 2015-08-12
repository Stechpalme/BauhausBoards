var express = require('express');
var stylus  = require('stylus');
var nib     = require('nib');

//Liberation Mono 12 :)
//http://www.onextrapixel.com/2013/06/24/creating-a-swipeable-side-menu-for-the-web/
//http://learnboost.github.io/stylus/
//http://jade-lang.com/

//define to use the express framework
var app = express();
//use nib middleware for stylus
function compile(str, path) {
  return stylus(str)
    .set('filename', path)
    .use(nib());
};
//define the folder for the jade views
app.set('views', __dirname + '/views');
//define jade to compile jade to html
app.set('view engine', 'jade');
//define a logger to log incomming requests to console
app.use(express.logger('dev'));
//define stylus to compile styl to css
app.use(stylus.middleware(
  { src: __dirname + '/public'
  , compile: compile
  }
));
//define static middleware to serve static files in /public
//this folder is then accessable on the webserver
app.use(express.static(__dirname + '/public'));


app.get('/:var(|index)', function (req, res) {
  //express provides render and renders the view
  //.render('viewname',ProbertyObject)
  res.render('index',
  { title : 'Home',
    condition : true }
  );
});
app.get('/message', function (req, res) {
  res.render('message',
  {

  });
});
app.get('/message/compose', function (req, res) {
  res.render('composeMessage',
  {

  });
});
app.get('/message/qr', function (req, res) {
  res.render('dump',
  {

  });
});
app.get('/backend', function (req, res) {
  res.render('backend',
  {

  });
});
app.get('/backend/setStatus', function (req, res) {
  res.render('backendSetStatus',
  {

  });
});
app.get('/backend/changeContent', function (req, res) {
  res.render('backendChangeContent',
  {

  });
});
app.get('/backend/viewMessages', function (req, res) {
  res.render('backendViewMessages',
  {

  });
});
app.get('/backend/settings', function (req, res) {
  res.render('backendSettings',
  {

  });
});
app.get('/backend/settings/users', function (req, res) {
  res.render('backendSettingsUsers',
  {

  });
});
app.get('/backend/settings/users/add', function (req, res) {
  res.render('dump',
  {

  });
});
app.get('/backend/settings/users/change', function (req, res) {
  res.render('dump',
  {

  });
});
app.get('/backend/settings/users/change/pass', function (req, res) {
  res.render('dump',
  {

  });
});
app.get('/backend/settings/room', function (req, res) {
  res.render('backendSettingsRoom',
  {

  });
});
app.get('/backend/settings/logs', function (req, res) {
  res.render('backendSettingsLogs',
  {

  });
});
app.listen(3000);
console.log('Server Started at 127.0.0.1:3000');