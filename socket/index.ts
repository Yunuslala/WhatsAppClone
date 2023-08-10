import http from 'http';
import { Socket, Server } from 'socket.io';


const server = http.createServer();
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000'
    }
});

const users:any=[];

const addactiveuser=(userData:any,socketId:any)=>{
    console.log("socketid",socketId)
!users.some((user:any)=>user.id===userData.id) && users.push({...userData,socketId})
}


const getUser=(userId:any)=>{
    return  users.find((user:any)=> user.id==userId)
}


io.on("connection", (socket: Socket) => {
    console.log("user connected");
    socket.emit("server","hello from server");
    socket.on("addusers",(user:any)=>{
        addactiveuser(user,socket.id);
        console.log(socket.id)
        console.log(users)
        io.emit("getActiveUser",users)
    });
    socket.on("sendMessage",(data:any)=>{
        console.log("recivedMessages",data)
        const user=getUser(data.textId);
        console.log("getuser",user)
        io.to(user.socketId).emit("getMessage",data)
    })
});
console.log(users)
const PORT = 9000;
server.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
