const fs = require('fs');
const updater = require('./update');


module.exports.notifyMove = function (data, callback){
     
    var answer = {};
    
    console.log('Objeto no pedido:  ' + JSON.stringify(data));
    
    var state = updater.playerMove(data.game, data.nick, data.column);
    
    if(state == 0){
        
        answer.status = 200;
        answer.style = 'plain';
        answer.message = {};
    }
    
    else if(state == 1){
        
        answer.status = 400;
        answer.style = 'plain';
        answer.message = {error: "Not your turn to play"};
    }
    else if(state == 2){
        
        answer.status = 400;
        answer.style = 'plain';
        answer.message = {error: "Column cannot be negative"};
    }
    else if(state == 3){
        
        answer.status = 400;
        answer.style = 'plain';
        answer.message = {error: "Column size bigger than board"};
    }
    else{
        
        answer.status = 400;
        answer.style = 'plain';
        answer.message = {error: "Game not found"};
    }
    
    console.log('Objeto na resposta ' + JSON.stringify(answer));
    callback(answer);
}