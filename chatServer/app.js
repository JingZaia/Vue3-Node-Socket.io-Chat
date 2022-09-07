const { log } = require("console");

const app = require("express")();
const http = require('http').Server(app);
const io = require("socket.io")(http, {
    cors: {
        origin: "*",
        methods: ['GET', "HTTP"]
    }
});
let userList = [{
    uid: '183144b61110a92beb2057c5e',
    name: '公共群聊',
    img: 'https://img1.baidu.com/it/u=2801025461,2053743915&fm=253&fmt=auto&app=138&f=JPEG?w=501&h=500'
}]
let privateChat = []
let publicChat = []
io.on('connection', socket => {
    console.log('有人进来了');
    io.emit('load', "Hello")
    socket.on('login', (data, callback) => {
        let status = true;
        for (const iss of userList) {
            console.log(iss.name == data.name, iss.name);
            if (iss.name == data.name) {
                status = false;
            }
        }
        if (status) {
            //生成唯一uid
            let time = (new Date().getTime()).toString(16);
            let r = time + ((Math.random()).toString(16)).replace('.', '');
            data.uid = r;
            socket.name = data.uid;
            userList.push(data)
            console.log(`${data.name}登录了`, data);
            callback(true, data)
            // socket.broadcast.emit('upPublicMsgData', publicChat)
            io.emit('GetList', userList);
        } else {
            callback(false)
        }
    })
    //公共群聊
    socket.on('publicChat', data => {
        if (!data) {
            console.log('login', publicChat);
            socket.broadcast.emit('upPublicMsgData', publicChat)
        } else {
            publicChat.push(data);
            socket.broadcast.emit('upPublicMsgData', publicChat)
        }
    })
    //私聊
    socket.on('privateChat', (data) => {
        io.sockets.sockets.forEach(iss => {
            if (iss.name == data.receiver) {
                privateChat.push(data);
                io.to(iss.id).emit('updataMsg', privateChat);
            }
        });
    })

    socket.on('disconnect', () => {
        privateChat = privateChat.filter(item => item.uid != socket.name);
        publicChat = publicChat.filter(item => item.uid != socket.name);
        console.log(socket.name + "离开了", privateChat);
        let i = userList.findIndex(item => item.uid == socket.name);
        if (i != -1) {
            userList.splice(i, 1)
            io.emit('GetList', userList);
            io.emit('dct', socket.name);
        }
    })
})

http.listen(3005, () => {
    console.log("服务器开启成功");
})