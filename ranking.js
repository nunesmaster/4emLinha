const fs = require('fs');


module.exports.tabela = function (data, callback){
    
    var resposta={
        "ranking":[]
    };
  
    console.log('Objeto no pedido:  ' + JSON.stringify(data));
    var answer = {};
    if(data.size == undefined){
        
        console.log('aqui')
        
        var resposta={
            
            "error":"Undefined size"};
        
        callback(resposta);     
    }
    
    var ficheiro = '';
 
        
        if (data.size.rows==3 && data.size.columns==4){
            ficheiro='tresxquatro'}
        else if (data.size.rows==4 && data.size.columns==4){
            ficheiro='quatroxquatro'}
        else if (data.size.rows==5 && data.size.columns==4){
            ficheiro='cincoxquatro'}
        else if (data.size.rows==6 && data.size.columns==4){
            ficheiro='cincoxquatro'}
        else if (data.size.rows==7 && data.size.columns==4){
            ficheiro='setexquatro'}
        else if (data.size.rows==8 && data.size.columns==4){
            ficheiro='oitoxquatro'}
        else if (data.size.rows==3 && data.size.columns==5){
            ficheiro='tresxcinco'}
        else if (data.size.rows==4 && data.size.columns==5){
            ficheiro='quatroxcinco'}
        else if (data.size.rows==5 && data.size.columns==5){
            ficheiro='cincoxcinco'}
        else if (data.size.rows==6 && data.size.columns==5){
            ficheiro='seisxcinco'}
        else if (data.size.rows==7 && data.size.columns==5){
            ficheiro='setexcinco'}
        else if (data.size.rows==8 && data.size.columns==5){
            ficheiro='oitoxcinco'}
        else if (data.size.rows==3 && data.size.columns==6){
            ficheiro='tresxseis'}
        else if (data.size.rows==4 && data.size.columns==6){
            ficheiro='quatroxseis'}
        else if (data.size.rows==5 && data.size.columns==6){
            ficheiro='cincoxseis'}
        else if (data.size.rows==6 && data.size.columns==6){
            ficheiro='seisxseis'}
        else if (data.size.rows==7 && data.size.columns==6){
            ficheiro='setexseis'}
        else if (data.size.rows==8 && data.size.columns==6){
            ficheiro='oitoxseis'}
        else if (data.size.rows==3 && data.size.columns==7){
            ficheiro='tresxsete'}
        else if (data.size.rows==4 && data.size.columns==7){
            ficheiro='quatroxsete'}
        else if (data.size.rows==5 && data.size.columns==7){
            ficheiro='cincoxsete'}
        else if (data.size.rows==6 && data.size.columns==7){
            ficheiro='seisxsete'}
        else if (data.size.rows==7 && data.size.columns==7){
            ficheiro='setexsete'}
        else if (data.size.rows==8 && data.size.columns==7){
            ficheiro='oitoxsete'}
        else if (data.size.rows==3 && data.size.columns==8){
            ficheiro='tresxoito'}
        else if (data.size.rows==4 && data.size.columns==8){
            ficheiro='quatroxoito'}
        else if (data.size.rows==5 && data.size.columns==8){
            ficheiro='cincoxoito'}
        else if (data.size.rows==6 && data.size.columns==8){
            ficheiro='seisxoito'}
        else if (data.size.rows==7 && data.size.columns==8){
            ficheiro='setexoito'}
        else if (data.size.rows==8 && data.size.columns==8){
            ficheiro='oitoxoito'}
        else {
            var resposta={
                "error":"Invalid Size"};
                callback(resposta);
            }
        
        fs.readFile(ficheiro+'.json', function(err, data2){
            
        var obj = JSON.parse(data2);
            
        if(!err){
            
            var ordem = [];
            var exists = false;
            
            for (var i = 0; i < obj.ranking.length; i++){
                
                ordem.push(obj.ranking[i].victories);
            }
            ordem.sort();
            //console.log(JSON.stringify(ordem));
            
            for(var j = ordem.length - 1; j > -1; j--){
                
                if (resposta.ranking.length == 10){
                    break
                };
                
                for (var k = 0; k < obj.ranking.length; k++){
                    
                    exists = false;
                    if (obj.ranking[k].victories == ordem[j]){
                        
                        resposta.ranking.push({nick:obj.ranking[k].nick, victories: obj.ranking[k].victories.toString(), games:obj.ranking[k].games.toString()});
                        /*console.log(JSON.stringify(obj));
                        console.log(JSON.stringify(resposta));*/
                        obj.ranking.splice(k, 1);
                    }
                    if (resposta.ranking.length == 10){
                        break
                    };
                
                }       
            }
            answer.status = 200;
            answer.message = resposta;
            answer.style = 'plain';
                     
            
            console.log('Objeto na resposta ' + JSON.stringify(answer));
            callback(answer);
        }
                
        });   
    } 

module.exports.updateRanking = function (winner, loser, size, callback){
    
    
    var player = {
        "ranking":[]
    };
    
    var player1 = {
        "ranking":[]
    };
    
    var player2 = {
        
        "ranking":[]
    };
  
    var answer = {};
    
    if(size == undefined){
        
        console.log('aquidsdds')
        
        var resposta={
            
            "error":"Undefined size"
        };
        callback(resposta);
    }
    
    var ficheiro = '';
 
        if (size.rows==3 && size.columns==4){
            ficheiro='tresxquatro'}
        else if (size.rows==4 && size.columns==4){
            ficheiro='quatroxquatro'}
        else if (size.rows==5 && size.columns==4){
            ficheiro='cincoxquatro'}
        else if (size.rows==6 && size.columns==4){
            ficheiro='cincoxquatro'}
        else if (size.rows==7 && size.columns==4){
            ficheiro='setexquatro'}
        else if (size.rows==8 && size.columns==4){
            ficheiro='oitoxquatro'}
        else if (size.rows==3 && size.columns==5){
            ficheiro='tresxcinco'}
        else if (size.rows==4 && size.columns==5){
            ficheiro='quatroxcinco'}
        else if (size.rows==5 && size.columns==5){
            ficheiro='cincoxcinco'}
        else if (size.rows==6 && size.columns==5){
            ficheiro='seisxcinco'}
        else if (size.rows==7 && size.columns==5){
            ficheiro='setexcinco'}
        else if (size.rows==8 && size.columns==5){
            ficheiro='oitoxcinco'}
        else if (size.rows==3 && size.columns==6){
            ficheiro='tresxseis'}
        else if (size.rows==4 && size.columns==6){
            ficheiro='quatroxseis'}
        else if (size.rows==5 && size.columns==6){
            ficheiro='cincoxseis'}
        else if (size.rows==6 && size.columns==6){
            ficheiro='seisxseis'}
        else if (size.rows==7 && size.columns==6){
            ficheiro='setexseis'}
        else if (size.rows==8 && size.columns==6){
            ficheiro='oitoxseis'}
        else if (size.rows==3 && size.columns==7){
            ficheiro='tresxsete'}
        else if (size.rows==4 && size.columns==7){
            ficheiro='quatroxsete'}
        else if (size.rows==5 && size.columns==7){
            ficheiro='cincoxsete'}
        else if (size.rows==6 && size.columns==7){
            ficheiro='seisxsete'}
        else if (size.rows==7 && size.columns==7){
            ficheiro='setexsete'}
        else if (size.rows==8 && size.columns==7){
            ficheiro='oitoxsete'}
        else if (size.rows==3 && size.columns==8){
            ficheiro='tresxoito'}
        else if (size.rows==4 && size.columns==8){
            ficheiro='quatroxoito'}
        else if (size.rows==5 && size.columns==8){
            ficheiro='cincoxoito'}
        else if (size.rows == 6 && size.columns==8){
            ficheiro='seisxoito'}
        else if (size.rows==7 && size.columns==8){
            ficheiro='setexoito'}
        else if (size.rows==8 && size.columns==8){
            ficheiro='oitoxoito'}
        else {
            var resposta = {
                "error":"Invalid Size"
            };
            callback(resposta);
        }
        
        fs.readFile(ficheiro+'.json', function(err, data2){
            
            
            var obj = JSON.parse(data2);
            var win1 = false;
            var los1 = false;
            if(!err){

                for(var i = 0; i < obj.ranking.length; i++){
                    
                    if(obj.ranking[i].nick == winner){

                        player1 = obj.ranking[i];
                        obj.ranking.splice(i, 1);
                        player1.victories += 1;
                        player1.games += 1;
                        obj.ranking.push(player1);
                        win1 = true;
                    }
                    
                    if(obj.ranking[i].nick == loser){
                        
                        player2 = obj.ranking[i];
                        obj.ranking.splice(i, 1);
                        player2.games += 1;
                        obj.ranking.push(player2);
                        los1 = true;
                    }
                }
                
                if(win1 == false) { obj.ranking.push({nick:winner, victories: 1, games: 1});}
                if(los1 == false) { obj.ranking.push({nick:loser, victories: 0, games: 1});}
                
                var json = JSON.stringify(obj);
                
                fs.writeFile(ficheiro+'.json', json, 'utf-8', (err) => {
                    if(err) console.log('adasdasd');
                }); 
            }
            
            answer = 'dasdasd';
              callback(answer);  
        });   
    }
   
    
    