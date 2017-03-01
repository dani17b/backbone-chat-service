var express = require('express'),
    http = require('http'),
    bodyParser = require('body-parser'),
    validator = require('jsonschema').Validator,
    cors = require('cors'),
    fs = require('fs');
var app = express();

// Read chats file
var chats = JSON.parse(fs.readFileSync('./data/chats.json', 'utf8'));

app.use(cors());
app.use(bodyParser.json());

/*
 * Returns user list from /data/users.json file
 * ex : (GET) http://localhost:8081/users
 */
app.get("/users", function(req, res) {
    // Send response
    res.writeHead(200, {
        'Content-Type': 'application/json'
    });

    // Read users file
    var users = JSON.parse(fs.readFileSync('./data/users.json', 'utf8'));

    res.end(JSON.stringify(users));
});

/*
 * Returns an user which matches with path param id. User must be contain into
 * users.json file
 * ex : (GET) http://localhost:8081/users/1
 */
app.get("/users/:id", function(req, res) {

    var userId = req.params.id;

    // Send response
    res.writeHead(200, {
        'Content-Type': 'application/json'
    });

    // Read users file
    var users = JSON.parse(fs.readFileSync('./data/users.json', 'utf8'));
    var user = {};

    for(var i = 0; i < users.length; i++){
      if(users[i].id == userId){
        user = users[i];
      }
    }

    res.end(JSON.stringify(user));
});

/*
 * Returns a chat list stored in memory as chats global var
 * NOTE : This list restarts every time is server restarted.
 * So if you want to get a list of default chats at startup,
  * It is necessary to write the chats by default in the chats.json file so
  * Similar to users.json, since it is initially initialized with that data
 * var chats = JSON.parse(fs.readFileSync('./data/chats.json', 'utf8'));
 * ex : (GET) http://localhost:8081/chats
 *
 * Parameters
 * - start : This attribute allows you to specify the element from which
 *           want to get chats for incremental requests
 *           the value of this element is the element id, which will match
 *           with the order you have in the collection.
 */
app.get("/chats", function(req, res) {

    // Send response
    res.writeHead(200, {
        'Content-Type': 'application/json'
    });

    var chatsResponse = chats;
    if(typeof req.query.start != "undefined"){
        if(chatsResponse.length < req.query.start){
          chatsResponse = [];
        }else{
          chatsResponse = chatsResponse.slice(req.query.start, chats.length);
        }
    }

    res.end(JSON.stringify(chatsResponse));
});

/*
 * Allows you to register a new chat in the system. This will be saved in the variable
 * Global chats and will not persist in the file chats.json
 * To register a new chat it is necessary to specify the message and the owner
 * And the function will be responsible for assigning a registration date and an identifier.
 * ex : (POST) http://localhost:8081/chats
 *      {
 *        "msg": "Test msg",
 *        "owner" : 1
 *      }
 */
app.post("/chats", function(req, res) {
    var chatItem = req.body;
    chatItem.id = chats.length +1;
    chatItem.date = new Date().getTime();

    chats.push(chatItem);

    // Send response
    res.writeHead(200, {
        'Content-Type': 'application/json'
    });

    res.end(JSON.stringify(chatItem));
});

app.use(function(req, res) {
    res.status(404).send("Not found");
});

app.listen(process.env.PORT || 8081);
