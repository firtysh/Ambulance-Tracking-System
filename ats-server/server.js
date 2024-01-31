require('dotenv').config();
const { Server } = require('socket.io')
const http = require('http')
const app = require('./app');
const connectToMongoDB = require('./db/connection');
const User = require('./models/User')

const port = process.env.PORT || 5000;
const server = http.createServer(app);
connectToMongoDB();

const io = new Server(server, {
    cors: {
        origin: '*'
    }
})

io.on('connection', async (socket) => {
    const user_id = socket.handshake.query.user_id;
    const socket_id = socket.id
    console.log(socket_id,user_id);
    if (user_id) {
       const updated = await User.findByIdAndUpdate(user_id, { socketId: socket_id, online: true }, { new: true })
       console.log(updated);
    }
    socket.on('disconnect', async () => {
        const updated = await User.findByIdAndUpdate(user_id, { online: false }, { new: true })
        console.log(updated);
    })
})


server.listen(port, () => {
    console.log(`App running on port ${port}...`);
}
);