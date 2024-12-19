const {createServer} =require('http')
const {Server} =require('socket.io')

const httpServer = createServer()
const io = new Server(httpServer,{
    cors:{
        origin:'*',
        method:['GET','POST'

        ],

    }
})

io.on('connection', async(socket)=>{
    console.log(socket.id,'Hit From backend');

    socket.emit('user_list', '1');

    // Listen for new user registrations
    socket.on('new_user', (userData) => {
      io.emit('user_list', '1'); // Broadcast updated user list
    });

})

httpServer.listen(5000, ()=>{
    console.log('Server listing the port 5000')
})

