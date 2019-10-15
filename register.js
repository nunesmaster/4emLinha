const fs = require('fs');
const crypto = require('crypto');

module.exports.registerGame = function(data, callback) {
    
    var answer = {};
    
    var obj = {
        user: []
    };
    
    var decodeHash;
    var state = 0;
    
    console.log('Objeto no pedido:  ' + JSON.stringify(data));
    
    fs.readFile('dados.json', function(err, data2){
        
        if(!err){
            
            obj = JSON.parse(data2);
            
            const decodeHash = crypto
            
               .createHash('md5')
               .update(data.pass)
               .digest('hex');
            
            for(var i = 0; i < obj.user.length; i++){
                
                if(data.nick === obj.user[i].nick){
                    
                    if(decodeHash !== obj.user[i].pass){
                        
                        console.log('pass errada amigo');
                        state = 1;
                        answer.status = 401;
                        answer.style = 'plain';
                        answer.message = {"error": "User registered with a different password"};
                        break;
                    }
                    else{
                        
                        answer.status = 200;
                        answer.message = {};
                        answer.style = 'plain';
                        state = 1;
                    }
                }       
            }
            
            var value = data.pass;
                
            const hash = crypto
               .createHash('md5')
               .update(value)
               .digest('hex');
            
            data.pass =  hash;
            obj.user.push(data);
            
            if(state == 0){

                var json = JSON.stringify(obj);
                
                fs.writeFile('dados.json', json, 'utf-8', (err) => {
                    if(err) console.log('erro');
                }); 
            
                
            answer.status = 200;
            answer.message = {};
            answer.style = 'plain';
            }
        }
        
        console.log('Objeto na resposta ' + JSON.stringify(answer) + '\n');
        callback(answer);
    });
    
}