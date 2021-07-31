const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const router = require('./router');
const cors = require('cors');

const { addUser, getUser, removeUser, getUsersInRoom } = require('./users');

//PORT--------------
const PORT = process.env.PORT || 3001;
const app = express();

app.use(cors())
app.use(router)

//Create a http server to run the server.
const server = http.createServer(app);

corsOptions={
    cors: true,
    origins:["http://localhost:3000"],
   }
const io = socketio(server, corsOptions);

io.on('connection', (socket) => {
    socket.on('join', ({name,room}) => {
        const { error, user } = addUser({ id:socket.id, name, room })

        if(error) return callback(error);

        socket.emit('message', { user: 'admin', text: `${user.name}, welcome to the room ${user.room}`});
        socket.broadcast.to(user.room).emit('message', {user: 'admin', text:`${user.name}, has joined`});
    
        socket.join(user.name);
        console.log(user.name)

    })

    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id);
        console.log(user)
        io.to(user.room).emit('message', { user:user.name, text: message });

        callback();
    })

    socket.on('disconnected', ()=> {
        console.log('User had Left!!!');
    })
});


server.listen(PORT, () => console.log(`Server has started on port ${PORT}`));