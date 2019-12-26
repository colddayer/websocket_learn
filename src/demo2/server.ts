import { server } from 'websocket';
import http from 'http';
import client from './client';

const httpServer =
    http
        .createServer()
        .listen(8080, () => {
            console.log('server is running on 8080...')
        })

const wsServer = new server({
    httpServer
});

wsServer.on('request', (wsRes) => {
    const connection = wsRes.accept(undefined, 'accepted-origin');
    client.receive(connection);

    connection.on('close', (code, desc) => {
       client.members.splice(client.members.indexOf(connection), 1);
    })

    connection.on('message', (msg) => {
        client.others(connection).forEach(item => {
            if (msg.utf8Data) {
                item.sendUTF(msg.utf8Data);
            }
        });
    })
});
