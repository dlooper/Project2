var mysql = require('mysql'); 

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection({
    host:       'cwolf.cs.sonoma.edu',
    user:       'dlooper',
    password:   '3944023'
});

// create the ExampleDB if it does not exist.
var dbToUse = 'dlooper'
var createDatabaseQry = 'CREATE DATABASE IF NOT EXISTS ' + dbToUse;
connection.query(createDatabaseQry, function (err) {
    if(err) throw err;

    var useDatabaseQry = 'USE ' + dbToUse;

    connection.query(useDatabaseQry, function(err) {
        if(err) throw err;

        var createTableQry = 'CREATE TABLE IF NOT EXISTS User('
            + 'UserID INT AUTO_INCREMENT PRIMARY KEY'
            + ',Email VARCHAR(256)'
            + ',Password VARCHAR(50)'
            + ')';
        connection.query(createTableQry, function (err) {
            if (err) throw err;
        });
    });
});

exports.GetAll = function(callback) { 
    connection.query('select UserID, Email from User', 
		     function (err, result) { 
			 if(err) { 
			     console.log(err); 
			     callback(true); 
			     return; 
			 } 
			 callback(false, result); 
		     } 
		    ); 
} 

exports.Insert = function(userInfo, callback) {
    connection.query('INSERT INTO User SET ?', userInfo,
        function (err, result) {
            if(err) {
                console.log(err);
                callback(true);
                return;
            }
            callback(false, result);
        }
    );
}

exports.GetOne = function(UserID, callback) {
   
    var query = 'SELECT UserID, Email FROM User WHERE UserID = ' + UserID;
    console.log(query);

    connection.query(query,
        function (err, result) {
            if(err) {
                console.log(err);
                callback(true);
                return;
            }
            callback(false, result);
        }
    );
}

exports.GetInfo = function(Email, callback) {
    console.log(Email);

    connection.query('select Email, Password, Name from User where Email = "' + Email + '"',
        function (err, result) {
            if(err) {
                console.log(err);
                callback(true);
                return;
            }
            callback(false, result);
        }
    );
}

exports.NewsFeed = function(callback) {
    connection.query('SELECT * FROM MessageFeedView',
        function (err, result) {
            if(err) {
                console.log(err);
                callback(true);
                return;
            }
            callback(false, result);
        }
    );
}

exports.ChangeEmail = function(Name, Email, callback) {
    connection.query('UPDATE User SET Email = "' + Email + '" WHERE Name = ' + Name,
        function (err, result) {
            if(err) {
                console.log(err);
                callback(true);
                return;
            }
            callback(false, result);
        }
    );
}
