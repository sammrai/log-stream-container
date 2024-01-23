const fs = require('fs');
const http = require('http');
const { Server } = require("socket.io");
const readLastLines = require('read-last-lines');
const logFilePath = '/log/arbZkf2.log'; // ログファイルのパスを指定
const linesToRead = 10; // 初期表示行数

const server = http.createServer((req, res) => {
    if (req.url === '/') {
        fs.readFile('index.html', (err, data) => {
            if (err) {
                res.writeHead(404);
                res.end(JSON.stringify(err));
                return;
            }
            res.writeHead(200);
            res.end(data);
        });
    }
});

const io = new Server(server);

io.on('connection', (socket) => {
    // 接続時に最後のN行を送信
    readLastLines.read(logFilePath, linesToRead)
        .then((lines) => {
            socket.emit('initial log', lines);
        });

    // ファイルの変更を監視
    let lastSize = fs.statSync(logFilePath).size;
    fs.watch(logFilePath, (eventType, filename) => {
        if (eventType === 'change') {
            let newSize = fs.statSync(logFilePath).size;
            if (newSize > lastSize) {
                fs.createReadStream(logFilePath, {
                    start: lastSize,
                    end: newSize
                }).on('data', (newData) => {
                    socket.emit('log update', newData.toString());
                });
    
                lastSize = newSize;
            }
        }
    });
});

server.listen(3000, () => {
    console.log('listening on *:3000');
});
