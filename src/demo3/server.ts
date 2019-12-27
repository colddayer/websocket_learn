import express from 'express';
import path from 'path';
import http = require('http')
import Io from 'socket.io';

const app = express()
const server = http.createServer(app);
const io = Io(server);

io.on('connection', (socket) => {
    // 向客户端发送一个事件 消息
    // socket.emit('request', )

    // 向所有客户端发送消息
    // io.emit('broadcast')
    socket.on('send', (data: string) => {
        socket.broadcast.emit('msg', {data});
    })
 });

// app.get('/', function (req, res) {
//   res.sendFile(path.join(__dirname, '/view/index.html'))
// })

server.listen(8080, () => {
    console.log('server is running on 8080');
});