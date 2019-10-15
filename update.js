const ranking = require('./ranking');

let responses = [];

module.exports.remember = function(group, nick, size, hash){
    
    let c = size.columns;
    let l = size.rows;
    let board = createBoard(c,l);
    
    let timeout = setTimeout(function() {
		waitPeriod(hash);
	}, 120000);    

	responses.push({group: group, size: size, player1: nick, player2: null, hash: hash, timeout: timeout, responses: {answerp1: null, answerp2: null}, board: board, turn: null, active: false});
    
}

module.exports.playerWaiting = function(group, size){
    
	for(var i = 0; i < responses.length; i++){
        
		if(responses[i].group == group && responses[i].size.columns == size.columns && responses[i].size.rows == size.rows && responses[i].active == false){
        
            console.log('PlayerWaiting\n');
			return true;
        }
	}

	return false;
}


module.exports.joinGame = function(group, nick, size){
    
	for(var i = 0; i < responses.length; i++){
        
		if(responses[i].group == group && responses[i].size.columns == size.columns && responses[i].size.rows == size.rows && responses[i].active == false){
            
			responses[i].player2 = nick;

			return responses[i].hash;
		}
	}
	return null;
}


module.exports.respond = function(hash, nick, response){
    
	for(var i = 0; i < responses.length; i++){
        
		if(responses[i].hash == hash){
            
			if(responses[i].player1 == nick && responses[i].responses.answerp1 == null){
                
				responses[i].responses.answerp1 =  response;
                
				response.writeHead(200, {
                    'Content-Type': 'text/event-stream',
                    'Cache-Control': 'no-cache',
                    'Access-Control-Allow-Origin': '*',
                    'Connection': 'keep-alive'
                });
                
				return true;
			}
			else if(responses[i].player2 == nick && responses[i].responses.answerp2 == null){
                
				responses[i].responses.answerp2 =  response;
                
				response.writeHead(200, {
                    'Content-Type': 'text/event-stream',
                    'Cache-Control': 'no-cache',
                    'Access-Control-Allow-Origin': '*',
                    'Connection': 'keep-alive'
                });
                
				responses[i].active = true;
				startGame(i);
				return true;
			}
			break;
		}
	}

	return false;
}

module.exports.playerMove = function(hash, nick, column){
    
	for(var i = 0; i < responses.length; i++){
        
		if(responses[i].hash == hash && responses[i].active == true){
            
			clearTimeout(responses[i].timeout);
			if(responses[i].turn != nick){ return 1; }
            
			else if(column < 0){ return 2; }
            
			else if(column >= responses[i].board.size.columns){ return 3; }
            
			else{
                
                let l = responses[i].board.size.rows - 1;

                if(nick == responses[i].turn) {

                    while(responses[i].board.board[column][l] != null){
                        l--;
                    }
                }

                else{
                    
                    while(responses[i].board.board[column][l] != null){
                        l--;
                    }
                }
                if(nick == responses[i].player1){

                    responses[i].board.board[column][l] = responses[i].player1;
                }

                else{

                    responses[i].board.board[column][l] = responses[i].player2;
                }
                
				if(check(responses[i].board.board, responses[i].board.size.columns-1, responses[i].board.size.rows-1, responses[i].player1, responses[i].player2) == true){
                    
					update(JSON.stringify({winner: nick, board: responses[i].board.board, column: column}), responses[i].responses.answerp1, responses[i].responses.answerp2);
					responses[i].responses.answerp1.end();
					responses[i].responses.answerp2.end();
                    
					if(responses[i].player1 == nick){
				
                        ranking.updateRanking(responses[i].player1, responses[i].player2, responses[i].board.size, function(answer){
                    
                            console.log('answer');
                        });
                    }
					else{
                        
                        ranking.updateRanking(responses[i].player2, responses[i].player1, responses[i].board.size, function(answer){
                    
                            console.log('answer');
                        });
                    }
                    
					responses.splice(i,1); 
				}
				else{
                    
					if(responses[i].turn == responses[i].player1){
                        
						responses[i].turn = responses[i].player2;
                    }
                    
					else{
                        
						responses[i].turn = responses[i].player1;
                    }
                    
                    let timeout = setTimeout(function() {
                        waitPeriod(hash);
                    }, 120000);
                    
                    console.log(timeout + 'timeout1');
					responses[i].timeout = timeout;
                
                   update(JSON.stringify({column: column, board: responses[i].board.board, turn: responses[i].turn}), responses[i].responses.answerp1, responses[i].responses.answerp2);
                }
                return 0;
			}
		}
	}

	return 4;
}

module.exports.leaveUpdate = function(hash, nick){
    
	var winner, loser;
	for(var i = 0; i < responses.length; i++){
        
        //console.log(responses[i].hash + ' ' +  hash);
		if(responses[i].hash == hash){
            
			if(responses[i].player1 != nick && responses[i].player2 != nick){
				
                return 1;
            }
            
			clearTimeout(responses[i].timeout);
			if(responses[i].player2 == null){
                
				winner = null;
			}
			else{
                
				if(responses[i].player1 == nick){
                    
					winner = responses[i].player2;
					loser = responses[i].player1;
				}
				else{
					winner = responses[i].player1;
					loser = responses[i].player2;
				}
				ranking.updateRanking(winner, loser, responses[i].board.size, function(answer){
                    
                    console.log('answer');
                });
                                
			}
            
			update(JSON.stringify({winner: winner}), responses[i].responses.answerp1, responses[i].responses.answerp2);
            
            //console.log(responses[i].responses.answerp1 + ' ' + responses[i].responses.answerp2)
			if(responses[i].responses.answerp1 != null){
                
				responses[i].responses.answerp1.end();
            }
			if(responses[i].responses.answerp2 != null){
                
				responses[i].responses.answerp2.end();
            }
			responses.splice(i, 1);
			return 0;
		}
	}

	return 1;
}

function createBoard(c, l){
        
        //console.log(board);
        var board = {

            board:[[]],
            size: {

                rows: parseInt(l),
                columns: parseInt(c)
            }
        };


        for(var i = 0; i < c; i++){

            board.board[i] =  [];
            for(var j = 0; j < l; j++){

                board.board[i][j] = null;
            }
        }

        return board;
    }

function startGame(i){
    
	responses[i].active = true;
	
	responses[i].turn = responses[i].player1;

	update(JSON.stringify({turn: responses[i].turn, board: responses[i].board}), responses[i].responses.answerp1, responses[i].responses.answerp2);
}

function check(board, c, l, player1, player2){

    var conta = 0;
    var nrPecas = (c+1)*(l+1);
    var endgame = false;
    for(var i = 0; i < c - 2; i++){
        for(var j = l; j >= 0; j--){

            // horizontal
            if((board[i][j] == player1 && board[i+1][j] == player1 && board[i+2][j] == player1 && board[i+3][j] == player1) || (board[i][j] == player2 && board[i+1][j] == player2 && board[i+2][j] == player2 && board[i+3][j] == player2)){

                endgame = true;
                return endgame;
            }
        }
    }

    for(var i = 0; i <= c; i++){
        for(var j = l; j >= 0; j--){

            // vertical
            if((board[i][j] == player1 && board[i][j-1] == player1 && board[i][j-2] == player1 && board[i][j-3] == player1) || (board[i][j] == player2 && board[i][j-1] == player2 && board[i][j-2] == player2 && board[i][j-3] == player2)){

                endgame = true;
                return endgame;
            }
        }
    }

    for(var i = 0; i < c - 2; i++){
        for(var j = l; j >= 0; j--){

            // diagonal direita
             if((board[i][j] == player1 && board[i+1][j-1] == player1 && board[i+2][j-2] == player1 && board[i+3][j-3] == player1) || (board[i][j] == player2 && board[i+1][j-1] == player2 && board[i+2][j-2] == player2 && board[i+3][j-3] == player2)){

                endgame = true;
                return endgame;
            }
        }
    }

    for(var i = 0; i < c - 2; i++){
        for(var j = l; j >= 0; j--){

            // diagonal esquerda
             if((board[c-i][j] == player1 && board[c-i-1][j-1] == player1 && board[c-i-2][j-2] == player1 && board[c-i-3][j-3] == player1) || (board[c-i][j] == player2 && board[c-i-1][j-1] == player2 && board[c-2-i][j-2] == player2 && board[c-3-i][j-3] == player2)){

                endgame = true;
                return endgame;
            }

        }
    }
    
    for(var i = 0; i <= c ; i++){
        for(var j = 0; j <= l; j++){

            // empate
            if(board[i][j] == player1 || board[i][j] == player2){ 
                conta++;
            }
        }
        
        if(conta == nrPecas){

            endgame = true;
            return endgame;
        }
    }
    return endgame;
}

function waitPeriod(hash){
    
    console.log('jimyjabs');
	for(var i = 0; i < responses.length; i++){
    
		if(responses[i].hash == hash){
            
            
			if(responses[i].player2 == null){
                
				update(JSON.stringify({winner: null}), responses[i].responses.answerp1, responses[i].responses.answerp2);
            }
            
			else if(responses[i].turn == responses[i].player1){
                				
                
                ranking.updateRanking(responses[i].player2, responses[i].player1, responses[i].board.size, function(answer){
                    
                    console.log('answer');
                });
				update(JSON.stringify({winner: responses[i].player2}), responses[i].responses.answerp1, responses[i].responses.answerp2);
            }
			else{
                
                ranking.updateRanking(responses[i].player1, responses[i].player2, responses[i].board.size, function(answer){
                    
                    console.log('answer');
                });
				update(JSON.stringify({winner: responses[i].player1}), responses[i].responses.answerp1, responses[i].responses.answerp2);
            }
			
			if(responses[i].responses.answerp1 != null){
				
                responses[i].responses.answerp1.end();
            }
			if(responses[i].responses.answerp2 != null){
                
				responses[i].responses.answerp2.end();
            }
            
			responses.splice(i, 1);
			break;
		}
	}
}


function update(message, answerp1, answerp2){
    
    console.log('aqui');
	if(answerp1 != null){
        
        console.log('enviei');
		answerp1.write("data: " + message + "\n\n");
	}
	if(answerp2 != null){
        
        console.log('enviei');
		answerp2.write("data: " + message + "\n\n");
	}
}