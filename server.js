var express = require("express");
var app     = express();

app.set( "views", __dirname + "/src/views" );
app.use( express.static( __dirname + "/dist") );

app.get('/',function(req,res){
  res.sendFile(__dirname + '/src/views/pages/index.html');
});

app.listen(8080);

console.log("Running at Port 8080");
