const crypto = require('crypto');
const fs = require('fs');
const http = require('http');
const path = require('path');
const url  = require('url');
const register = require('./register');
const join = require('./join');
const updater = require('./update');
const ranking = require('./ranking');
const notify = require('./notify');
const leave = require('./leave');
const conf = require('./conf');


const server = http.createServer(function (request, response) {
    
    const headers = {
        plain: {
            'Content-Type': 'application/javascript',
            'Cache-Control': 'no-cache',
            'Access-Control-Allow-Origin': '*'        
        },
        sse: {    
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            'Access-Control-Allow-Origin': '*',
            'Connection': 'keep-alive'
        }
    };
    
    var adr = url.parse(request.url, true);
    var query = adr.query;
    var pathname = adr.pathname;
    let answer = {};
    let body = '';
    console.log(request.method + ' ' + pathname);
    switch(request.method) {
            
        case 'GET':
            
            //console.log(query);
            request
            .on('data', (chunk) => { body += chunk;})
            .on('end', () => {
                    try { 
                        
                        doGet(pathname, response,request, query, function(answer) {
                                             
                            console.log('hello');
                        });

                    }
                
                    catch(err) {  console.log(err);}
            })
    
            .on('error', (err) => { console.log(err.message); });
            break;
            
        case 'POST':
            
            request
            .on('data', (chunk) => { body += chunk;})
            .on('end', () => {
                    try { 
                        
                        query = JSON.parse(body);
                        doPost(pathname, query, function(answer) {
                                             
                            if(answer.style == 'plain'){
                                response.writeHead(answer.status, headers.plain);
                                response.end(JSON.stringify(answer.message));
                            }
                        });
                        

                    }
                
                    catch(err) {  console.log(err);}
            })
            .on('error', (err) => { console.log(err.message); });
            
        default:
            
            answer.status = 400;
    }
    
    
}).listen(conf.port);

function doPost(pathname, data, callback) {
    
    var answer = {};
    
    switch(pathname) {
            
        case '/register':
            
            if(data.nick == '' || data.nick == undefined){
                
                answer.status = 400;
                answer.message = {error: 'Nick not defined'};
                answer.style = 'plain';
                callback(answer);
                break;
            }
            				
            else if(data.pass == ''|| data.pass == undefined){
					
                answer.status = 400;
                answer.message = {error: 'Pass not defined'};
                answer.style = 'plain';
                callback(answer);
				break;
            }
            
            register.registerGame(data, function (answer) {
                
                callback(answer);
            });
            break;
            
        case '/join': 
            
            if(data.group == ''|| data.group == undefined){
                
                answer.status = 400;
                answer.style = 'plain';
                answer.message = {error: 'Group not defined'};
                callback(answer);
                break;
            }
            
            else if(data.nick == ''|| data.nick == undefined){

                answer.status = 400;
                answer.style = 'plain';
                answer.message = {error: 'Nick not defined'};
                callback(answer);
                break;
            }
            else if(data.pass == ''|| data.pass == undefined){

                answer.status = 400;
                answer.style = 'plain';
                answer.message = {error: 'Pass not defined'};
                callback(answer);
                break;
            }
            else if(data.size == {} || data.size == undefined){

                answer.status = 400;
                answer.style = 'plain';
                answer.message = {error: 'Size not defined'};
                callback(answer);
                break;
            }
            
            else if(!Number.isInteger(parseInt(data.size.columns)) || !Number.isInteger(parseInt(data.size.rows))){
                
                answer.status = 400;
                answer.style = 'plain';
                answer.message = {error: 'Size not valid'};
                callback(answer);
                break;
            }
            else if(!Number.isInteger(parseInt(data.group))){
                
                answer.status = 400;
                answer.style = 'plain';
                answer.message = {error: 'Group not valid'};
                callback(answer);
                break;
            }
            
            join.joinGame(data, function (answer) {
                
                callback(answer);
            });
            break;
            
        case '/notify': 
            
            if(data.game == '' || data.game == undefined){
                
                answer.status = 400;
                answer.style = 'plain';
                answer.message = JSON.stringify({error: 'Game not defined'});
                callback(answer);
            }
    
            else if(data.nick == '' || data.nick == undefined){

                answer.status = 400;
                answer.style = 'plain';
                answer.message = JSON.stringify({error: 'Nick not defined'});
                callback(answer);
                break;
            }
            else if(data.pass == '' || data.pass == undefined){

                answer.status = 400;
                answer.style = 'plain';
                answer.message = JSON.stringify({error: 'Pass not defined'});
                callback(answer);
                break;
            }
            else if(data.column == ''|| data.column == undefined){
            
                answer.status = 400;
                answer.style = 'plain';
                answer.message = JSON.stringify({error: 'Column not defined'});
                callback(answer);
                break;
            }

            notify.notifyMove(data, function (answer) {
                
                callback(answer);
            });
            break;
            
        case '/leave':
            
            if(data.nick == '' || data.nick == undefined){

                answer.status = 400;
                answer.style = 'plain';
                answer.message = {error: 'Nick not defined'};
                callback(answer);
                break;
            }
            
            else if(data.pass == ''|| data.pass == undefined){

                answer.status = 400;
                answer.style = 'plain';
                answer.message = {error: 'Pass not defined'};
                callback(answer);
                break;
            }
            
            else if(data.game == ''|| data.game == undefined){
                
                answer.status = 400;
                answer.style = 'plain';
                answer.message = {error: 'Game not defined'};
                callback(answer);
            }

            leave.leaveGame(data, function (answer){
                
                callback(answer);
            });
            break;
            
        case '/ranking':
            
            if(data.size.rows > 8 || data.size.rows < 3 || data.size.rows == undefined){
                
                answer.status = 400;
                answer.style = 'plain';
                answer.message = {error: 'Rows to big or to low'};
                callback(answer);
            }
            
            else if(data.size.columns > 8 || data.size.columns < 3 || data.size.columns == undefined){
                
                answer.status = 400;
                answer.style = 'plain';
                answer.message = {error: 'Columns to big or to low'};
                callback(answer);
            }
            
            ranking.tabela(data, function (answer) {
                
                callback(answer);
            });
            
            break;
            
        default:
            
            answer.status = 400;
            answer.style = 'plain';
            callback(answer);  
            break;
        }
}

    
function doGet(pathname, response,request, data) {
    
    let answer = {};
    
    const cenas = getPathname(request);
    console.log(cenas);
    if(cenas != 'public_html/update'){
        console.log('entrei')
        if(cenas === null) {
            response.writeHead(403); // Forbidden
            response.end();
        } 
        else 
            fs.stat(cenas,(err,stats) => {
                if(err) {
                    response.writeHead(500); // Internal Server Error
                    response.end();
                } 
                else if(stats.isDirectory()) {
                    if(cenas.endsWith('/'))
                       doGetPathname(cenas+conf.defaultIndex,response);
                    else {
                       response.writeHead(301, // Moved Permanently
                                          {'Location': cenas+'/' });
                       response.end();
                    }
                } 
                else 
                    doGetPathname(cenas,response);
           });    
    }
    
    switch(pathname) {
            
        case '/update':

            if(data.game == '' || data.game == undefined){

                answer.status = 400;
                answer.style = 'sse';
                answer.message = {error: 'Game not defined'};
                return answer;
                break;
            }
            else if(data.nick == ''|| data.nick == undefined){

                answer.status = 400;
                answer.style = 'sse';
                answer.message = {error: 'Nick not defined'};
                return answer;
                break;
            }
            
            let realGame = updater.respond(data.game, data.nick, response);
            
            if(realGame == false){ 
                
                answer.status = 400;
                answer.style = 'plain';
                answer.message = {error: 'Game doesnt exist'};
                return answer;
            }

            break;
            
        default:
            
            answer.status = 400;
            answer.style = 'plain';
            return answer;
            break;   
    }
}


function getPathname(request) {
    const purl = url.parse(request.url);
    let pathname = path.normalize(conf.documentRoot+purl.pathname);

    if(! pathname.startsWith(conf.documentRoot))
       pathname = null;

    return pathname;
}

function doGetPathname(pathname,response) {
    const mediaType = getMediaType(pathname);
    const encoding = isText(mediaType) ? "utf8" : null;

    fs.readFile(pathname,encoding,(err,data) => {
    if(err) {
        response.writeHead(404); // Not Found
        response.end();
    } else {
        response.writeHead(200, { 'Content-Type': mediaType });
        response.end(data);
    }
  });    
}

function getMediaType(pathname) {
    const pos = pathname.lastIndexOf('.');
    let mediaType;

    if(pos !== -1) 
       mediaType = conf.mediaTypes[pathname.substring(pos+1)];

    if(mediaType === undefined)
       mediaType = 'text/plain';
    return mediaType;
}

function isText(mediaType) {
    if(mediaType.startsWith('image'))
      return false;
    else
      return true;
}