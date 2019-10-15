
var count = 0;
var arrayDiv = new Array();
var colunas = 0;
var linhas = 0;
var opponent = 0;
var matriz = new Array();
var firstTime = 0;
var l2 = 0;
var user1Points = 0;
var user2Points = 0;
var player = 0;
var dificulty = 0;
var gameHash = 0;
var endGame = false;
var firstPlayer = '';
var secondPlayer = '';
var beginning = true;
var x = 1;
var y = 2
var bin = 1;
var firstPlayerColor = '';
var secondPlayerColor = '';
var winnerGame = 0;
var firstMove = true;
var inGame = false;
var quit = false;
var url = "http://localhost:8132/";
var nick = '';
var pass = '';
var wrongTurn = false;
var timer;
var timeLeft;
var online = false;
var local = false;var users=0;
var pontosantes=0;
var jogosantes=0;



function registo() {
    
    // variaveis que guardam o nick e a pass do user
    nick = document.getElementById("nick").value;
    for (var i=0; i< localStorage.length; i++){
        let user2 = localStorage.key(i);
        if(user2==nick){
            users+=1;
            pontosantes=JSON.parse(localStorage.getItem(user2)).vitorias
;
            console.log(pontosantes);
            jogosantes=JSON.parse(localStorage.getItem(user2)).jogos;
        }
    }
    pass = document.getElementById("password").value;
    
    console.log(nick + " " + pass);
    
    // chama a função para registar o jogador
    register(nick, pass);
}


function register(nick, pass){
    
    let jsonObj = {
        
        "nick": nick, 
        "pass": pass
    };
    
    // converte o objeto JSON em string para enviar ao Server
    let jsonStr = JSON.stringify(jsonObj);
    
    console.log(jsonStr);
    
    // envia ao Server o nick e a pass 
    fetch(url+'register', {
        method: 'post',
        body: jsonStr
    })
    
    .then(response => {
        
        // registo ocorreu sem problemas
        if(response.ok){
    
            console.log("Registo bem sucedido!");
            
            // mostra o jogo 
            game(tabela, mainMenu, mainPage);
        }
        else{
            
            // registo errado
            return response.json();
        }
          
    })
    
    .then(data => {
        
            alert(data.error);
    })

}


function join(group, nick, pass, size){
    
    // variaveis que guardam o valor das colunas e linhas
    let l = parseInt(size.linhas);
    let cl = parseInt(size.colunas);
    
    let jsonObj = {
        
        "group": group, 
        "nick": nick, 
        "pass": pass,
        "size": {
            "rows": l,
            "columns": cl
        }
    };
    
    // converte Json em string 
    let jsonStr = JSON.stringify(jsonObj);
    
    console.log(jsonStr);
    
    
    fetch(url+'join', {
        
        method: 'post',
        body: jsonStr
    })
    
    .then(response => {
        
        // foi colocado num jogo (em espera ou num jogo já existente)
        if(response.ok){
            
            console.log("Foi colocado num jogo!");
            return response.json();
        }
        else{
            
            // ocorreu um erro
            console.log(response);
            alert("try again");
            unblock();
        }
    })
    
    // é criada uma gameHash para o jogo
    .then(data => {

        gameHash = data.game;
        console.log("A game Hash do jogo é " + gameHash);
        
        update(nick, gameHash);
        
    })
}

function sair() {
    
    leave(nick, pass, gameHash);    
}

function leave(nick, pass, game){
    
    // jogador quer abandonar o jogo
    quit = true;
    
    let jsonObj = {
        
        "nick": nick, 
        "pass": pass,
        "game": game
    };
    
    let jsonStr = JSON.stringify(jsonObj);
    fetch(url+'leave', {
         
        method: 'post',
        body: jsonStr
    })
    
    .then(response => {
        if(response.ok){
                
            console.log("O jogador " + nick + " abandonou o jogo!");
        }
        
        else{ 
            console.log(response);
            return response.json();
        }
    })
    
    .then(error => {
         
        if(error != null){
            console.log(error.error);
        }
    })
}

function reboot(){
    
    
    player = 0;
    beginning = true;
    quit = false;
    firstMove = true;
    inGame = false;
    end = 0;
    document.getElementById("player1").innerHTML = '';
    document.getElementById("player2").innerHTML = ''; 
    document.getElementById("player1").style.visibility = 'hidden'; 
    document.getElementById("player2").style.visibility = 'hidden' ;
    document.getElementById("player1Span").style.visibility = 'hidden'; 
    document.getElementById("player2Span").style.visibility = 'hidden' ;
    document.getElementById('jogar').innerHTML = 'Jogar';
    endGame = false;
    unblock();
}


function notify(nick, pass, game, column){
        
    console.log("truuuuuuuuufsdf");
    let jsonObj = {
        
        "nick": nick, 
        "pass": pass,
        "game": game,
        "column": column
    };
    
    let jsonStr = JSON.stringify(jsonObj);
    
    fetch(url+'notify', {   
        
        method:'post',
        body: jsonStr
    })
    
    .then(response => {
        
        if(response.ok) {
            
            console.log("O jogador " + nick + " jogou na coluna " + column);
        }
        
        else{
            console.log("truuuuuuuuufsdf");
            return response.json();
        }
    })
    
    .then(error => {
         
        if(error != null){
            wrongTurn = true;
            alert(error);
        }
    })
    
    
}

function update(nick, game){
    
    // inicia contacto com o Server
    const eventSource =  new EventSource(url+'update?nick='+nick+'&game='+game);
    
    let board;
    let loader = document.getElementById('loaderFullPage');
    
    console.log(url+'update?nick='+nick+'&game='+game);
    
    // estado corrente do jogo
    let state = eventSource.readyState;
    console.log(state);
    
    // se o jogador estiver à espera de um oponente aparece o loader
    if(state == 0){
        
       show(loader);
    }
    
    eventSource.onmessage = function(event){
        
        // conversão de dados vindos do servidor em JSON
        const data = JSON.parse(event.data);
        console.log(event.data);
        console.log(state);
        console.log("o estado da ligação é " + eventSource.readyState);
        console.log(endGame);
        
        // estado da ligação
        state = eventSource.readyState;
        
        // se a ligação ocorrer (algum jogador se ligar) o loader desaparece
        if(state = 1){ hide(loader); inGame = true;}
        console.log(data);
        console.log(data.winner);
        
        // indica quem é a jogar
        turn = data.turn;
        
        console.log("É a vez do jogador " + turn + " jogar!");
        
        // quando ainda não ocorreu a primeira jogada
        console.log(beginning);
        
        const connected = eventSource.readyState;
        console.log("O seu adversario jogou!");
        
        if(beginning){ 
            
            document.getElementById('timerH2').style.display = 'block';
            setTimer();
            // jogador ligou-se ao jogo
            if(connected == 1){
                console.log("O jogador " + nick + " juntou-se ao jogo!");
            }
            
            // firstPlayer vai ser igual ao jogador cuja vez é no inicio do jogo
            firstPlayer = turn;
            
            // coloca o nome do 1º jogador em baixo da sua cor vermelha
            document.getElementById("player1").innerHTML = firstPlayer; 
            document.getElementById("player1").style.visibility = 'visible'; 
            document.getElementById("player2").style.visibility = 'hidden' ;
            document.getElementById("player1Span").style.visibility = 'visible'; 
            document.getElementById("player2Span").style.visibility = 'hidden' ;
            beginning = false;
        }
        
        if(turn == firstPlayer){ player = 0;}
        else{player = 4;}
        
        if(!beginning && turn != null){
            if((firstMove) && turn != firstPlayer){
                secondPlayer = turn;
                document.getElementById("player2").innerHTML = secondPlayer; 
                firstMove = false;
            }
            updateBoard(data.column, data.board, nick, data.turn);
            setTimer();
            onlinePlayer(turn);
        }
        console.log(data.winner);
        console.log(data    );
        
        // quando há um vencedor (winner != null)
        if(data.winner != null){
            
            console.log(data);
            console.log('entrei na área onde há um vencedor');
            // update do jogo antes de acabar
            console.log(data.column);
            if(data.column != null){
                updateBoard(data.column, data.board, nick, data.turn);
            }
            // acabar o jogo
            endGame = true;
            
            // vencedor do jogo
            let win = 0;
            
            // se eu desisti
            console.log(quit);
            if(quit || (data.column == null && data.winner != nick)){
                
                console.log(data.winner);
                
                // desistiu
                alert('Desistiu do jogo');
                win = checkFirstToPlay(nick);
                if(win == 2){win = 0;}
                else{ win = 2;}
                winnerGame = 1;
                createOptions(win);
                eventSource.close();
                return;
            }
            
            // se o meu adversário desistiu
            else if(data.column == null && data.winner == nick){
                console.log(data);
                console.log(data.winner);
                alert("O seu adversario desistiu do jogo!");
                win = checkFirstToPlay(nick);
                winnerGame = 1;
                eventSource.close();
                createOptions(win);
                return;
            }
            
            // houve um vencedor sem desistencias
            else if(endGame){
                
                // se o vencedor é o user
                if(data.winner == nick){ 
                    console.log("Ganhei o jogo!!");
                    
                    // verifica o primeiro a jogar
                    win = checkFirstToPlay(nick);
                    console.log("chamei o check");
                    check(matriz, colunas-1, linhas-1, win);
                    winnerGame = 1;
                    eventSource.close();
                    return ;
                }
                
                // se o vencedor é o adversário
                else{
                    
                    win = checkFirstToPlay(data.winner);
                    console.log("chamei o check");
                    check(matriz, colunas-1, linhas-1, win);
                    winnerGame = 1;
                    eventSource.close();
                    return;
                }
            }
        }
        
        // em caso de empate ou desistencia da fila de espera
        else if((data.winner == null && data.turn == null) || (data.winner == null && data.turn == null && data.column != null && data.board != null )){
            
            console.log(data);
            console.log('entrei na zona de desistencia de fila de espera ou empate');
            
            // desistencia da fila de espera
            if(data.winner == null && data.column == null){
                
                console.log('entrei na zona de desistencia de fila de espera');
                
                reboot();
                winnerGame = 1;
                eventSource.close();
                return;
                
            }
            
            // empate
            else{
                if(data.column != null){
                    updateBoard(data.column, data.board, nick, data.turn);
                }
                
                console.log('entrei na zona de empate');
                winnerGame = 1;
                createOptions(3);
                eventSource.close();
                return;
            }
        }
        console.log(quit);
    }
}

function ranks(){
    
    let jsonObj = {
        
        "size": {
            "rows": parseInt(document.getElementById('sel4').value),
            "columns":parseInt(document.getElementById('sel3').value)
        }
    };
    ranking(jsonObj);
}

function ranking(size){

    console.log(size);
    let jsonStr = JSON.stringify(size);
    
    fetch(url+'ranking', {   
        
        method:'post',
        body: jsonStr
    })
    
    .then(response => {
        
        if(response.ok) {
            
            return response.json();
        }
        
        else{
            console.log(response.text());
        }
    })
    
    .then(data => {
         
        console.log(data);
        let size = data.ranking.length;
        console.log(size);
        let i = 0;
        let j = 1;
        var finalText = 
            "<div class='rankings'>" +
                "<table>" +
                    "<tr>" +
                        "<th>Jogador</th>" +
                        "<th>Total de Jogos</th>" +
                        "<th>Vitórias</th>" +
                        "<th>Derrotas</th>" +
                        "<th>Percentagem de Vitória</th>" +
                    "</tr>";

        while(i < size){

            finalText += 
                "<tr>" +
                    "<td>" + data.ranking[i].nick + "</td>" +
                    "<td>" + data.ranking[i].games + "</td>" +
                    "<td>" + data.ranking[i].victories + "</td>" +
                    "<td>" + (data.ranking[i].games - data.ranking[i].victories) + "</td>" +
                    "<td>" + ((data.ranking[i].victories / data.ranking[i].games)*100).toFixed(2) + "%" + "</td>";
            finalText += "</tr>";
            i++;
        }
        
        finalText += 
                "</table>" +
            "</div>";

                document.getElementById("score").innerHTML = finalText;

    })
    
}

function resultadospc(){
    
     var texto = 
            "<div >" +
                "<table >" +
                    "<tr>" +
                        "<th>Jogador </th>" +
                        "<th> Total de jogos</th>" +
                        "<th>Vitórias</th>" + 
                        "<th>Derrotas</th>" +
                        "<th>Percentagem de Vitória</th>" +
                    "</tr>";
    for (var i=0; i< localStorage.length; i++){
        let user = localStorage.key(i);
        console.log(user);
        pontuacao=JSON.parse(localStorage.getItem(user)).vitorias;
;       
        console.log(pontuacao);
        let jogostodos=JSON.parse(localStorage.getItem(user)).jogos;
        let derrotas = jogostodos - pontuacao;
        let percent = ((pontuacao/jogostodos)*100).toFixed(2);
        texto += 
            "<tr>" +
            "<td>" + user + "</td>" +
            "<td>" + jogostodos + "</td>" +
            "<td>" + pontuacao + "</td>" +  
            "<td>" + derrotas + "</td>" + 
            "<td>" + percent + "%   " + "</td>" + 
            "</tr>";
        }
        
    texto += 
        "</table>" +
            "</div>";

    document.getElementById("score2").innerHTML = texto;
  
}

function onlinePlayer(turn){
        
    if(turn == firstPlayer){
        document.getElementById("player1").style.visibility = 'visible'; 
        document.getElementById("player2").style.visibility = 'hidden' ;
        document.getElementById("player1Span").style.visibility = 'visible'; 
        document.getElementById("player2Span").style.visibility = 'hidden' ;
    }
    else{
        document.getElementById("player2").style.visibility = 'visible'; 
        document.getElementById("player1").style.visibility = 'hidden' ;
        document.getElementById("player2Span").style.visibility = 'visible'; 
        document.getElementById("player1Span").style.visibility = 'hidden' ;
    }
}

function setTimer(){      
    
	timeLeft = 120000;
	clearInterval(timer);
    console.log("hello");
	timer = setInterval(function() {

    // Time calculations for days, hours, minutes and seconds
    var minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    // Display the result in the element with id="demo"
    document.getElementById("timerH2").innerHTML = minutes + "m " + seconds + "s ";
    if (timeLeft <= 0) {
        clearInterval(timer);
        if(opponent == 1)
            document.getElementById("timerH2").innerHTML = "Tempo para jogar excedido!";
        else
            document.getElementById("timerH2").innerHTML = "Tempo de espera para encontrar um jogador excedido!";
        /*document.getElementById("leaveGameDiv").style.display = "none";
        if(document.getElementById("boardDiv")!=null)
            document.getElementById("boardDiv").style.display = "none";
        gameInProgress = false;
        leaveGame();*/
    }    
    timeLeft = timeLeft - 1000;
    }, 1000);
        
}

function checkFirstToPlay(nick) {
    
    if(nick == firstPlayer){
        return 0;
    }
    else { return 2;}
}

function updateBoard(column, board, nick, turn) {
 
    let l = linhas-1;
    let end = 0;
    
    if(nick == turn) {
        
        while(matriz[column][l] != 0){
            l--;
        }
    }
    
    else{
        while(matriz[column][l] != 0){
            l--;
        }
    }
    if(board[column][l] == firstPlayer){
        
            arrayDiv[column][l].style.backgroundColor = "red";
            matriz[column][l] = 1;
            console.log(matriz);
    }
    
    else{
            
            arrayDiv[column][l].style.backgroundColor = "yellow";
            matriz[column][l] = 2;
            console.log(matriz);
    }
}

function dificuldade(level) {
    
    dificulty = level;
    
    if(level == 0) {
        
        document.getElementById('easy').style.backgroundColor =  'rgb(0,200,100);'
    }
    else if(level == 1){
        
        document.getElementById('medium').style.backgroundColor = 'rgb(250,200,40);'
    }
    
    else{
        
        document.getElementById('medium').style.backgroundColor = 'rgb(250,200,40);'
    }
}


function block() {
    
    
    console.log('blocked');
    document.getElementById('jogar1').setAttribute("onclick", null);
    document.getElementById('person').setAttribute("onclick", null);
    document.getElementById('computer').setAttribute("onclick", null);
    document.getElementById('p1First').setAttribute("onclick", null);
    document.getElementById('p2First').setAttribute("onclick", null);
    document.getElementById('easy').setAttribute("onclick", null);
    document.getElementById('medium').setAttribute("onclick", null);
    document.getElementById('dificil').setAttribute("onclick", null);
}

function unblock() {
    
    
    console.log('unblocked');
    document.getElementById('jogar1').onclick = function(){
        createTable();
    }
    document.getElementById('person').onclick = function(){
        lightUp(person, computer);
    }
    document.getElementById('computer').onclick = function(){
        lightUp(computer, person);
    }
    document.getElementById('p1First').onclick = function(){
        firstToplay(1, 0);
    }
    document.getElementById('p2First').onclick = function(){
        firstToplay(2, 1);
    }
    document.getElementById('easy').onclick = function(){
        dificuldade(0);
    }
    document.getElementById('medium').onclick = function(){
        dificuldade(1);
    }
    document.getElementById('dificil').onclick = function(){
        dificuldade(2);
    }
}

function ondejogar(c, l){
    
    var jogadas = new Array(c);
    for(var i = 0; i < c; i++){
        
        jogadas[i] = i;
    }
    
    var meio = 1;
    
    for (var i =0; i < c; i++){
        
        var contar = 0;
        for (var j = 0; j < l; j++){
            
            if (matriz[i][j] == 0 && (matriz[i][j+1]!=0 || j == (l-1))){
                
                contar = contar + 1;
                matriz[i][j] = 1;
                
                if (check1(c,l) == 1){
                    matriz[i][j] = 0;
                    return i;
                }
                
                else{
                    
                    matriz[i][j] = 2;
                    
                    if (check1(c,l) == 1){
                        matriz[i][j] = 0;
                        return i;
                    }
                    else{
                        if(j > 0){
                            matriz[i][j-1] = 1;
                        }
                        if (check1(c,l) == 1){
                            
                            var ind = jogadas.indexOf(i);
                            jogadas.splice(ind,1);

                            if (i == Math.round((c-1)/2) && j == (l-1)){
                                meio=0;
                            }
                        
                        }  
                        
                    if(j > 0){
                        matriz[i][j-1] = 0;
                    }
                    matriz[i][j] = 0;
                    }
                  
               
                }

            }    
        }
        if (contar == 0){
            var ind2 = jogadas.indexOf(i);
            jogadas.splice(ind2,1)
        }

    }
    
    // 2 seguidas
    
    for (var i = 0; i < c; i++){
        for (var j=0; j < l; j++){
            if (matriz[i][j] == 0 && (matriz[i][j+1]!=0 || j==(l-1))){
                matriz[i][j] = 1;
                if (check2(c,l) == 1 && l != 0 && i != 0 && i != (c-1)){
                        matriz[i][j] = 0;
                    
                    return i;
                }
            matriz[i][j] = 0;
            }
        }
    }
    
    for (var i = 0; i < c; i++){
        for (var j=0; j < l; j++){
            if (matriz[i][j] == 0 && (matriz[i][j+1]!=0 || j==(l-1))){
                matriz[i][j] = 2;
                if (check2(c,l) == 1 && l != 0 && i != 0 && i != (c-1)){
                        matriz[i][j] = 0;
                    
                    return i;
                }
            matriz[i][j] = 0;
            }
        }
    }
    
    // jogar no meio
    if (meio == 1){
        var t = Math.round((c-1)/2);
        if(matriz[t][l-1] == 0){ return t;} 
    }
    
    for (var j = 0; j < l; j++){
        // jogar no meio do array das jogadas -1
        var p = 0;
        var jogada = Math.round(jogadas.length/2);
                console.table(jogadas); 
        while(p == 0){
            if(matriz[jogada][0] == 0){ p = 1;}
            else{
                console.table(jogadas);
                jogadas.splice(jogada,1);
                console.table(jogadas);
                if(jogadas.length > 1){
                    jogada = Math.round(jogadas.length/2);
                }
                else{jogada = jogadas[0];}
            }
        }

    }
    return jogada;
}

// 3 seguidos iguais 
function check2(c,l){      	/*#verifica se a ultima jogada fez 4 em linha e devolve o valor 1 se SIM ou o valor 0 em caso de empate*/
    for(var j = l-1; j >= 0; j--){
        for(var i = 0; i < c-3; i++){
            // horizontal
            if((matriz[i][j] ==  matriz[i+1][j] && matriz[i][j] == matriz[i+2][j] ) && (matriz[i][j]!=0) && (matriz[i+3][j]==0)) {
                return 1;
            }
        }
    } 
    for(var i = 0; i <= c-1; i++){
        for(var j = l-1; j >= 3; j--){
            if((matriz[i][j] == matriz[i][j-1] && matriz[i][j] ==  matriz[i][j-2] )  && matriz[i][j]!=0 && (matriz[i][j-3]==0)) {
                return 1;
            }
        }
    }
     
    for(var i = c-4; i <=0 ; i--){              // diagonal direita
        for(var j = l-1; j >= 0; j--){
            if((matriz[i][j] ==  matriz[i+1][j-1] && matriz[i][j]==  matriz[i+2][j-2]  )  && matriz[i][j]!=0){
                return 1;
            }
        }
    }
    for(var i = 3; i < c - 1; i++){
        for(var j = l-1; j >= 0; j--){

            // diagonal esquerda
             if((matriz[i][j] == matriz[i-1][j-1] && matriz[i][j] == matriz[i-2][j-2] )  && matriz[i][j]!=0 ){
                 return 1;
            }
        }
    }
    var contar= 0;
    for (var i=0; i < c; i++){
    	for (var j=0; j <l; j++){
    		if (matriz[i][j]!=0){
    			contar+=1
    		}
    	}
    }
    if (contar==(c*l)){
    	return 0
    }
    else {
        return -1
    }
}



function check1(c,l){      	/*#verifica se a ultima jogada fez 4 em linha e devolve o valor 1 se SIM ou o valor 0 em caso de empate*/
    for(var j = l-1; j >= 0; j--){
        for(var i = 0; i < c-3; i++){
            // horizontal
            if((matriz[i][j] ==  matriz[i+1][j] && matriz[i][j] == matriz[i+2][j] && matriz[i][j] ==  matriz[i+3][j] ) && (matriz[i][j]!=0) ) {
                return 1;
            }
        }
    } 
    for(var i = 0; i <= c-1; i++){
        for(var j = l-1; j >= 3; j--){
            if((matriz[i][j] == matriz[i][j-1] && matriz[i][j] ==  matriz[i][j-2] && matriz[i][j] ==  matriz[i][j-3] )  && matriz[i][j]!=0) {
                return 1;
            }
        }
    }
    for(var i = c-4; i <=0 ; i--){              // diagonal direita
        for(var j = l-1; j >= 0; j--){
            console.log(matriz);
            console.log(i + ' ' + j);
            if((matriz[i][j] ==  matriz[i+1][j-1] && matriz[i][j]==  matriz[i+2][j-2] && matriz[i][j]== matriz[i+3][j-3] )  && matriz[i][j]!=0){
                return 1;
            }
        }
    }
    for(var i = 3; i < c - 1; i++){
        for(var j = l-1; j >= 0; j--){

            // diagonal esquerda
             if((matriz[i][j] == matriz[i-1][j-1] && matriz[i][j] == matriz[i-2][j-2] && matriz[i][j]==  matriz[i-3][j-3] )  && matriz[i][j]!=0 ){
                 return 1;
            }
        }
    }
    var contar= 0;
    for (var i=0; i < c; i++){
    	for (var j=0; j <l; j++){
    		if (matriz[i][j]!=0){
    			contar+=1
    		}
    	}
    }
    if (contar==(c*l)){
    	return 0
    }
    else {
        return -1
    }
}

function medium(c,l){
    var jogadaspc=0
    for (var i =0; i < c; i++){
        for (var j = 0; j < l; j++){
            if (matriz[i][j]==2){
                jogadaspc+=1
            }
        }
    }
    if (Math.pow(-1,jogadaspc)==1){
        return ondejogar(c,l)
    }
    else{
        var items = new Array();
    for(var i = 0; i < c; i++){
        items[i] = i;
    }
    var item = items[Math.floor(Math.random()*items.length)];
    l = l-1;
    var p = 0;

    while (p == 0){
        if(l < 0){
            items.splice(item, 1);
            l = l - 1;
            item = items[Math.floor(Math.random()*items.length)];
        }
        if(matriz[item][l] == 0){

            return item
            p = 1;
        }

        l = l - 1;
    }
  
    }     
}
    
function firstToplay(el1, nr1) {
    
    
    var count = 0;
    for(var i = 0; i < colunas; i++){
         for(var j = 0; j < linhas; j++){
            if(matriz[i][j] != 0) {
                count++;
            }
        }   
    }   
    cl = (colunas*linhas);
    if(count == cl && cl != 0) {
            
        return;
    }
    if(el1 == 1){
        
        document.getElementById('p1First').style.backgroundColor = 'rgb(100,200,200)';
        document.getElementById('p2First').style.backgroundColor = 'yellow';
    }
    else{
        
        document.getElementById('p2First').style.backgroundColor = 'rgb(100,200,200)';
        document.getElementById('p1First').style.backgroundColor = 'red';
    }
    player = nr1;
}

function fillArray(){
    matriz = new Array(colunas);

        for(var i = 0; i < colunas; i++){
            matriz[i] = new Array(linhas);
            for(var j = 0; j < linhas; j++){
                matriz[i][j] = 0;
            }
    }
}

function show(element) {

    element.style.display = 'block';
}
/*
function resultados() {
    
    var score_container = document.createElement('div');
        score_container.style.padding = '1px';
        score_container.style.width = '45%';
        score_container.style.height = '37%';
        score_container.style.backgroundColor = "rgb(174, 227,217)";
        score_container.style.position ='absolute';
        score_container.style.margin = "300px 0 0 200px";
        score_container.style.zIndex = '6';
        score_container.style.borderRadius = '20px';
    
    var score = document.createElement('div');
        score.style.width = '95%';
        score.innerHTML = 'Resultados';
        score.style.textAlign = 'center';
        score.style.fontSize = '20px';
        score.style.height = '90%';
        score.style.backgroundColor = "white";
        score.style.position ='absolute';
        score.style.margin = "10px 0 0 10px";
        score.style.zIndex = '6';
        score.style.borderRadius = '20px';
    
    var fechar = document.createElement('img');
        fechar.style.width = '40px';
        fechar.style.height = '40px';
        fechar.style.position = 'absolute';
        fechar.style.marginTop = '-15px';
        fechar.style.marginLeft = '-20px';
        fechar.style.backgroundColor = 'white';
        fechar.style.borderRadius = '50%';
        fechar.src = 'https://image.flaticon.com/icons/svg/291/291202.svg';
    
    var user1 = document.createElement('h1');
        user1.innerHTML = 'P1';
        user1.style.float = 'left';
        user1.style.marginLeft = '50px';
    
    var user2 = document.createElement('h1');
        user2.innerHTML = 'P2';
        user2.style.float = 'right';
        user2.style.marginRight = '50px';
    
    var pointsUser1 = document.createElement('h1');
        pointsUser1.innerHTML = user1Points;
        pointsUser1.style.fontSize = '40px';
        pointsUser1.style.marginLeft = '-30px';
        pointsUser1.style.marginTop = '100px';
        pointsUser1.style.float = 'left';
    
    
    var pointsUser2 = document.createElement('h1');
        pointsUser2.innerHTML = user2Points;
        pointsUser2.style.fontSize = '40px';
        pointsUser2.style.marginRight = '-30px';
        pointsUser2.style.marginTop = '100px';
        pointsUser2.style.float = 'right';
    
        fechar.onclick = function() {
            
            score_container.style.display = 'none';
        }
        
        fechar.onmouseover = function() {
            
            fechar.style.width = '45px';
            fechar.style.height = '45px';
        }
        
        fechar.onmouseout = function() {
            
            fechar.style.width = '40px';
            fechar.style.height = '40px';
        }
    
    score.appendChild(user1);
    score.appendChild(user2);
    score.appendChild(pointsUser1);
    score.appendChild(pointsUser2);
    score_container.appendChild(fechar);
    score_container.appendChild(score);
    tabela.appendChild(score_container);
        
}*/

function game(tabela, mainMenu, main_page) {
    
    show(tabela);
    show(mainMenu);
    hide(main_page)
    if(firstTime != 0){
        
        document.getElementById('tabela').removeChild(document.getElementById('tabela_box'));
    }
    main_page.style.height = '0';
}


function hide(element) {

    element.style.display = 'none';
}

function config(el1, el2) {

    show(el1);
    hide(el2);
}

function view (element){
    
    element.style.visibility = 'visible';
}

function unview (element){
    
    element.style.visibility = 'hidden';
}

function lightUp(el1, el2) {

    var cmp = el1.id;
    if(cmp == 'person'){ 
        
        opponent = 1;                    
        el1.style.backgroundColor = "#00BFFF";
        el2.style.backgroundColor = "white";
    }
    else { 
        
        opponent = 0;
        winnerGame = 0;
        el1.style.backgroundColor = "#00BFFF";
        el2.style.backgroundColor = "white";
    }
}

function easy() {

    var items = new Array();
    for(var i = 0; i < colunas; i++){
        items[i] = i;
    }
    var item = items[Math.floor(Math.random()*items.length)];
    var l = linhas-1;
    var p = 0;
    let contador = 0;
    while (p == 0){
        if(l < 0){
            if(contador == 40){
                return;
            }

            console.log(items);
            items.splice(item, 1);
            l = linhas - 1;

            item = items[Math.floor(Math.random()*items.length)];
            contador++;
        }
        if(matriz[item][l] == 0){

            p = 1;
        }

        l = l - 1;
    }
    return item;
}

function algorithm() {
    
    document.getElementById('player1').innerHTML = nick;
    document.getElementById("player1").style.visibility = 'visible'; 
    document.getElementById("player2").style.visibility = 'hidden' ;
    document.getElementById("player1Span").style.visibility = 'visible'; 
    document.getElementById("player2Span").style.visibility = 'hidden';
    
    if(dificulty == 0){
        var item = easy();
    }
    else if(dificulty == 1){
        var item = medium(colunas, linhas);
    }
    else{
        
        var item = ondejogar(colunas, linhas);
    }
    var l = linhas-1;
    var p = 0;
    while (p == 0){

        if(matriz[item][l] == 0){

            arrayDiv[item][l].style.backgroundColor = 'yellow';
            p = 1;
            matriz[item][l]=2;
            console.log("chamei o check");
            check(matriz, colunas-1, linhas-1, 1);
        }

        l = l - 1;
    }

}


function undoOptions() {
    
    
    document.getElementById("teste1").style.height = '100%';
    document.getElementById("teste2").style.height = '100%';
    document.getElementById("winner1").style.display = 'none';
    document.getElementById("winner2").style.display = 'none';
}
function createOptions(winner){

    console.log("fui chamado");
    firstTime = 2;
    if(winner == 0){ user1Points = user1Points + 1;}
    else if(winner == 1 || winner == 10){ user2Points = user2Points + 1;}
    else { user1Points = user1Points ; user2Points = user2Points ;}
    show(caixa_win);
    unblock();
    console.log(winner);
    if(opponent == 0){
        console.log(user1Points + " " + user2Points)
        let pontos=user1Points;
        let total= user1Points+user2Points;
        let obj={
            jogos:total, 
            vitorias:user1Points
        }
        let objstr = JSON.stringify(obj);
        // se o nick for novo
        if (users==0){     
            localStorage.setItem(nick,objstr) 
        }
        // se o nick ja existir
        else {
            let pontos2=user1Points+pontosantes;
            let total2= total + jogosantes;
            let obj2={
                jogos:total2,
                vitorias:pontos2
            }
            let objstr2 = JSON.stringify(obj2);
            localStorage.setItem(nick,objstr2); 
        }
    }
    document.getElementById("desistir").setAttribute("onclick", null);
    for(var i = 0; i < colunas; i++){
        for(var j = 0; j < linhas; j++){

            arrayDiv[i].setAttribute("onclick", null);
            arrayDiv[i].setAttribute("onmouseover", null);
        }
    }
    if(winner == 0) {
        document.getElementById("teste1").style.height = '50%';
        document.getElementById("teste2").style.height = '75%';
        document.getElementById("winner1").style.display = 'inline-block';
    }
    else if(winner == 1){
        document.getElementById("winner2").style.display = 'inline-block';
        document.getElementById("teste2").style.height = '50%';
        document.getElementById("teste1").style.height = '75%';
    }
    else if(winner == 2 || winner == 10){
        document.getElementById("winner2").style.display = 'inline-block';
        document.getElementById("teste2").style.height = '50%';
        document.getElementById("teste1").style.height = '75%';
    }
    
    else{
        document.getElementById("winner1").style.display = 'inline-block';
        document.getElementById("winner2").style.display = 'inline-block';
        document.getElementById("teste2").style.height = '50%';
        document.getElementById("teste1").style.height = '50%';
    }
    
}

function check(matriz, c, l, play){

    var conta = 0;
    var nrPecas = colunas*linhas;
    for(var i = 0; i < c - 2; i++){
        for(var j = l; j >= 0; j--){

            // horizontal
            if((matriz[i][j] == 1 && matriz[i+1][j] == 1 && matriz[i+2][j] == 1 && matriz[i+3][j] == 1) || (matriz[i][j] == 2 && matriz[i+1][j] == 2 && matriz[i+2][j] == 2 && matriz[i+3][j] == 2)){

                arrayDiv[i][j].style.boxShadow = '0px 0px 20px 8px cyan';
                arrayDiv[i+1][j].style.boxShadow = '0px 0px 20px 8px cyan';
                arrayDiv[i+2][j].style.boxShadow = '0px 0px 20px 8px cyan';
                arrayDiv[i+3][j].style.boxShadow = '0px 0px 20px 8px cyan';
                createOptions(play);
                endgame = true;
                winnerGame = 1;
                return 1;
            }
        }
    }

    for(var i = 0; i <= c; i++){
        for(var j = l; j >= 0; j--){

            // vertical
            if((matriz[i][j] == 1 && matriz[i][j-1] == 1 && matriz[i][j-2] == 1 && matriz[i][j-3] == 1) || (matriz[i][j] == 2 && matriz[i][j-1] == 2 && matriz[i][j-2] == 2 && matriz[i][j-3] == 2)){

                arrayDiv[i][j].style.boxShadow = '0px 0px 20px 8px cyan';
                arrayDiv[i][j-1].style.boxShadow = '0px 0px 20px 8px cyan';
                arrayDiv[i][j-2].style.boxShadow = '0px 0px 20px 8px cyan';
                arrayDiv[i][j-3].style.boxShadow = '0px 0px 20px 8px cyan';
                createOptions(play);
                endgame = 0;
                winnerGame = 1;
                return 1;
            }
        }
    }

    for(var i = 0; i < c - 2; i++){
        for(var j = l; j >= 0; j--){

            // diagonal direita
             if((matriz[i][j] == 1 && matriz[i+1][j-1] == 1 && matriz[i+2][j-2] == 1 && matriz[i+3][j-3] == 1) || (matriz[i][j] == 2 && matriz[i+1][j-1] == 2 && matriz[i+2][j-2] == 2 && matriz[i+3][j-3] == 2)){

                arrayDiv[i][j].style.boxShadow = '0px 0px 20px 8px cyan';
                arrayDiv[i+1][j-1].style.boxShadow = '0px 0px 20px 8px cyan';
                arrayDiv[i+2][j-2].style.boxShadow = '0px 0px 20px 8px cyan';
                arrayDiv[i+3][j-3].style.boxShadow = '0px 0px 20px 8px cyan';
                createOptions(play);
                endgame = true;
                winnerGame = 1;
                return 1;
            }
        }
    }

    for(var i = 0; i < c - 2; i++){
        for(var j = l; j >= 0; j--){

            // diagonal esquerda
             if((matriz[c-i][j] == 1 && matriz[c-i-1][j-1] == 1 && matriz[c-i-2][j-2] == 1 && matriz[c-i-3][j-3] == 1) || (matriz[c-i][j] == 2 && matriz[c-i-1][j-1] == 2 && matriz[c-2-i][j-2] == 2 && matriz[c-3-i][j-3] == 2)){

                arrayDiv[c-i][j].style.boxShadow = '0px 0px 20px 8px cyan';
                arrayDiv[c-i-1][j-1].style.boxShadow = '0px 0px 20px 8px cyan';
                arrayDiv[c-i-2][j-2].style.boxShadow = '0px 0px 20px 8px cyan';
                arrayDiv[c-i-3][j-3].style.boxShadow = '0px 0px 20px 8px cyan';
                createOptions(play);
                endgame = true;
                winnerGame = 1;
                return 1;
            }

        }
    }
    
    for(var i = 0; i <= c ; i++){
        for(var j = 0; j <= l; j++){

            // empate
            if(matriz[i][j] == 1 || matriz[i][j] == 2){ 
                conta++;
            }
        }
        
        if(conta == nrPecas){
            endgame = true;
            winnerGame = 1;
            createOptions(3);
        }
    }
    return 0;
}


function jogadaPC() {
    
        document.getElementById("player2").style.visibility = 'visible'; 
        document.getElementById("player1").style.visibility = 'hidden' ;
        document.getElementById("player2Span").style.visibility = 'visible'; 
        document.getElementById("player1Span").style.visibility = 'hidden' ;
        player = 0;
        var test = setTimeout(algorithm, 100);
}

function createTable() {

    block();
    
    
    colunas = document.getElementById('sel1').value;
    linhas = document.getElementById('sel2').value;
    
    let size = {
    
        "colunas": colunas,
        "linhas": linhas
    }
    
    // jogar online
    if(opponent == 1){
        setTimer();
        document.getElementById('timerH2').style.display = 'block';
        join(32, nick, pass, size);
    }
    
    // enche o array de 0
    fillArray();
    document.getElementById('jogar').innerHTML = 'Restart';
    
    console.log(firstTime + " " + opponent);
    if(firstTime == 0 && opponent != 1){
        
        document.getElementById("desistir").style.display = 'block';
    }
    
    // vs pc
    if(firstTime == 1 && opponent != 1) { 
        
        document.getElementById("desistir").onclick = function(){
            
            createOptions(10);
        }
        document.getElementById('desistir').style.display = 'block';
        document.getElementById('abandonarBotao').style.display = 'none';
        document.getElementById('timerH2').style.display = 'none';
        if(document.getElementById('tabela_box') != null){
            document.getElementById('tabela').removeChild(document.getElementById('tabela_box'));
        }
    }
    
    // vs pc
    if(firstTime == 2 && opponent != 1) { 
        
        console.log("hi");
        document.getElementById('desistir').style.display = 'block';
        document.getElementById('abandonarBotao').style.display = 'none';
        document.getElementById('timerH2').style.display = 'none';
        document.getElementById("desistir").onclick = function(){
            
            createOptions(10);
        }
        
        document.getElementById('player1').innerHTML = nick;
        document.getElementById("player1").style.visibility = 'visible'; 
        document.getElementById("player2").style.visibility = 'hidden' ;
        document.getElementById("player1Span").style.visibility = 'visible'; 
        document.getElementById("player2Span").style.visibility = 'hidden' ;
        if(document.getElementById('tabela_box') != null){
            document.getElementById('tabela').removeChild(document.getElementById('tabela_box'));
        }
        undoOptions();
        winnerGame = 0;
    }
    
    // jogo anterior foi online
    if(winnerGame != 0 || opponent == 1){ 
        
        console.log('2fsdfas');
        document.getElementById('desistir').style.display = 'none';
        document.getElementById('abandonarBotao').style.display = 'block';
        player = 0;
        endGame = false;        
        if(document.getElementById('tabela_box') != null){
            document.getElementById('tabela').removeChild(document.getElementById('tabela_box'));
        }
        reboot();
        block();
        undoOptions();
    }
    
    
    firstTime = 1;
    
    var tabela_box = document.createElement('div');
        tabela_box.id = 'tabela_box'
        tabela_box.style.height = 'auto';
        if(colunas == 4) {  tabela_box.style.marginLeft= '370px';}
        if(colunas == 5) {  tabela_box.style.marginLeft= '340px';}
        if(colunas == 6) {  tabela_box.style.marginLeft= '310px';}
        if(colunas == 7) {  tabela_box.style.marginLeft= '280px';}
        if(colunas == 8) {  tabela_box.style.marginLeft= '250px';}
        tabela_box.style.position = 'absolute';
        tabela_box.style.zIndex = '5';
    

    var x = 0;
    var end = 0;
    for(var i = 0; i < colunas; i++){
        arrayDiv[i] = new Array(colunas);
        arrayDiv[i] = document.createElement('div');
        arrayDiv[i].id = i;
        arrayDiv[i].style.display= 'inline-block';
        arrayDiv[i].style.borderRadius = '5%';
        if(linhas == 3) {  arrayDiv[i].style.marginTop= '375px';}
        if(linhas == 4) {  arrayDiv[i].style.marginTop= '320px';}
        if(linhas == 5) {  arrayDiv[i].style.marginTop= '265px';}
        if(linhas == 6) {  arrayDiv[i].style.marginTop= '210px';}
        if(linhas == 7) {  arrayDiv[i].style.marginTop= '155px';}
        if(linhas == 8) {  arrayDiv[i].style.marginTop= '100px';}
        for(var j = 0; j < linhas; j++){
            arrayDiv[i][j] = document.createElement('div');
            arrayDiv[i][j].id = j;
            arrayDiv[i][j].style.width = '50px';
            arrayDiv[i][j].style.height = '50px';
            arrayDiv[i][j].style.margin = '5px';
            arrayDiv[i][j].style.backgroundColor = 'white';
            arrayDiv[i][j].style.borderRadius = '50%';
            arrayDiv[i].appendChild(arrayDiv[i][j]);
            x++;
        }
          
        // se for o pc a jogar corre o algoritmo
        if(player == 1) {
            
            jogadaPC();
        }
        
        // quando se clica numa coluna
        arrayDiv[i].onclick = function() {
            
            var c = colunas-1;
            var l = linhas-1;
            var ip = this.id;
            var p = 0;
            
            while (p == 0){
                
                // se for o user a jogar
                if(player == 0 || player == 4){
                    
                    if(l < 0){ alert("Essa coluna já está cheia!"); p = 1;}
                    if(matriz[ip][l] == 0){
                        // se for contra o pc
                        if(opponent != 1){
                            arrayDiv[ip][l].style.backgroundColor = 'red';
                            console.log("mudei para vermelho");
                            matriz[ip][l] = 1;
                            console.log("chamei o check");
                            end = check(matriz, colunas-1, linhas-1, player);
                        }
                        if(end == 0){
                            if(opponent == 1){ 
                                
                                let nick = document.getElementById("nick").value;
                                let pass = document.getElementById("password").value;
                                console.log('chamei o notify');
                                notify(nick, pass, gameHash, ip);
                            }
                            else{ player = 1;}
                        }
                        p = 1;
                    }

                    l = l - 1;
                    
                    if(player == 1){ 

                        document.getElementById('timerH2').style.display = 'none';
                        document.getElementById('player2').innerHTML = 'PC';
                        document.getElementById("player2").style.visibility = 'visible'; 
                        document.getElementById("player1").style.visibility = 'hidden' ;
                        document.getElementById("player2Span").style.visibility = 'visible'; 
                        document.getElementById("player1Span").style.visibility = 'hidden' ;
                        player = 0;
            
                        var test = setTimeout(algorithm, 100);
                    }
                }

                else {

                    if(l < 0){ alert("Essa coluna já está cheia!"); p = 1;}
                    
                    document.getElementById('player1').innerHTML = nick;
                    document.getElementById("player1").style.visibility = 'visible'; 
                    document.getElementById("player2").style.visibility = 'hidden' ;
                    document.getElementById("player1Span").style.visibility = 'visible'; 
                    document.getElementById("player2Span").style.visibility = 'hidden';
                    if(matriz[ip][l] == 0){
                        arrayDiv[ip][l].style.backgroundColor = 'yellow';
                        matriz[ip][l] = 2;
                        p = 1;
                        console.log("chamei o check");
                        check(matriz, c, linhas-1, player);
                        player = 0;
                    }

                    l = l - 1;
                }

            }

        }

        arrayDiv[i].onmouseover = function() {
            l2 = linhas-1;
            while(matriz[this.id][l2] == 1 || matriz[this.id][l2] == 2){
                l2--;
                if(l2 < 0) {break;}   
            }
            if(arrayDiv[this.id][l2].style.backgroundColor == "white"){
                this.style.backgroundColor = "rgb(0, 200, 204)";
                arrayDiv[this.id][l2].style.backgroundColor = "rgb(250, 180, 190)";
            }
        }
  
        arrayDiv[i].onmouseout = function() {
            l2 = linhas-1;
            while(matriz[this.id][l2] == 1 || matriz[this.id][l2] == 2){
                l2--;
                if(l2 < 0) {break;}   
            }
                this.style.backgroundColor = "rgb(0, 156, 204)";
                arrayDiv[this.id][l2].style.backgroundColor = "white";
        }
        tabela_box.appendChild(arrayDiv[i]);    
        tabela.appendChild(tabela_box);
    
    }
}
