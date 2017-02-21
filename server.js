var express = require("express"),
    engine = require("ejs-mate"),
    app = express();

var simplePaths = [ "/sample" ];

// https://expressjs.com/en/guide/routing.html
//let complexPaths = [];

app.engine( "ejs", engine );

app.set( "views", __dirname + "/src/views" );
app.set( "view engine", "ejs" );
app.set( "view cache", false );

app.use( express.static("dist") );

app.get( "/", function( req, res ) {
  res.render( "pages/index", { _layoutFile: "layout" } );
});

simplePaths.forEach(function( val ) {
  app.get( val, function( req, res ) {
    res.render( "pages/" + val, { _layoutFile: "layout" } );
  });
});

// TODO: do 404, 500 error pages
// https://expressjs.com/en/guide/error-handling.html

app.listen(8080);

console.log("Listening on port 8080");
