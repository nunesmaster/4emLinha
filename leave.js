const updater = require('./update');

module.exports.leaveGame = function(data, callback){
    
    let answer = {};
    console.log('Objeto no pedido:  ' + JSON.stringify(data));
    
    let state = updater.leaveUpdate(data.game, data.nick);

    if(state == 0){
        
        answer.status = 200;
        answer.style = 'plain';
        answer.message = {};
    }
    
    else if(state == 1){
        
        answer.status = 400;
        answer.style = 'plain';
        answer.message = {error:'algo correu mal'};
    }
    console.log('Objeto na resposta:  ' + JSON.stringify(answer));
	callback(answer);
}