const crypto = require('crypto');
const fs = require('fs');
const updater = require('./update');

var gameInfo;
var gameHash;

module.exports.joinGame = function (data, callback){
    
    
    var answer = {};
    
    console.log('Objeto no pedido:  ' + JSON.stringify(data));
    
    if(updater.playerWaiting(data.group, data.size) == true){
        
        var hash = updater.joinGame(data.group, data.nick, data.size);
            
        answer.status = 200;
        answer.message = {"game": gameHash};
        answer.style = 'plain';
        console.log('Objeto na resposta ' + JSON.stringify(answer) + '\n');
        callback(answer);
    }
    
            
    else{
        
        var d = new Date();

        var value = data.group + (data.size.rows).toString() + (data.size.columns).toString() + d;
        const hash = crypto

           .createHash('md5')
           .update(value)
           .digest('hex');

        updater.remember(data.group, data.nick, data.size, hash);

        gameHash = hash;

        answer.status = 200;
        answer.message = {"game": gameHash};
        answer.style = 'plain';
        console.log('Objeto na resposta ' + JSON.stringify(answer) + '\n');
        callback(answer);
    }
}