var express = require('express'),   // web framework
    mysql   = require('mysql'),
    ejs     = require('ejs'),
    path    = require('path'),
    connect = require('connect');   // GET and POST request parser

var app = express();                // initialize express
var routes = require('./controller/index');
var user = require('./controller/user');

//app.use(connect.bodyParser());      // initialize request parser
app.use(connect.urlencoded());
app.use(connect.json());

//app.use(express.static('public'));  // configure static directory
app.use(express.static(path.join(__dirname, 'public'))); //try dis

app.set('view engine', 'ejs');       // set .ejs as the default template extension.
app.set('views', __dirname + '/views'); //set where view templates are located

// subtitle values access via the header template
app.set('subtitle', 'Lab 19');

//app.set('port', 8012 );
app.use('/', routes);
app.use('/user',user);

//app.listen(app.get('port'));
app.listen(8012);
console.log("Express server listening on port", app.settings.env);
