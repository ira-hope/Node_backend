const variable = require('http');
let users = [];
const server = variable.createServer(function(req, res){
    if(req.url === '/' && req.method === 'GET'){
        res.statusCode = 200;
        res.writeHead({'Content-Type': 'application/json'});
        res.end(JSON.stringify(users));
        
    } else if(req.url === '/' && req.method === 'POST'){
        let body = '';
        req.on('data', chunk =>{
            body += chunk;
        });
        req.on('end', () =>{
            const user = JSON.parse(body);
            users.push(user);
            res.statusCode = 200;
            res.writeHead({'Content-Type': 'application/json'});
            res.end(JSON.stringify({message: 'User added'}));
        });
    } else if(req.url === '/user/' && req.method === 'PATCH'){
        const id = req.url.split('/')[2];
        let body = '';
        req.on('data', chunk =>{
            body += chunk;
        });
        req.on('end', () =>{
            const edit = JSON.parse(body);
            const userIdx = users.findIndex(user => user.id === id);
            if(userIdx !== -1){
                users[userIdx] = {...users[userIdx], ...edit};
                res.statusCode = 200;
                res.writeHead({'Content-Type': 'application/json'});
                res.end(JSON.stringify({message: 'User edited'}));
            } else {
                res.statusCode = 404;
                res.writeHead({'Content-Type': 'application/json'});
                res.end(JSON.stringify({message: 'Failed to edit the user!'}));
            }
        });
    } else {
        res.statusCode = 404;
        res.end('User not found!');
    }
});

server.listen(1000, () =>{
    console.log("1000 is the server's port");
});