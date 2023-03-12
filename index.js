const http = require("http");
const express = require("express");
const cors = require("cors");
const socketIO = require("socket.io");

const app = express();


app.use(express.static(path.join(__dirname, "chatbotapp/build")));

    app.get("*", function (req, res) {
        res.sendFile(path.join(__dirname, "./chatbotapp/build/index.html"));
    });


const PORT=4500 || process.env.PORT;

const users=[{}];

app.use(cors());

app.get("/", (req,res) => {
    res.send("Bro is it working");
    console.log("bro is it working");
});

const server = http.createServer(app);

const io=socketIO(server);

io.on("connection", (socket)=> {
    console.log("New Connection");

    socket.on('joined', ({user})=>{
        users[socket.id]=user;
        console.log(`${user} has joined`);
        socket.broadcast.emit('userJoined',{user:"Admin",message:`${users[socket.id]} has joined`});
        socket.emit('welcome',{user:"Admin",message:`Welcome to the Chat, ${users[socket.id]}`}) //idhr tab upper h

    })

    socket.on('message',({message, id})=>{
        io.emit('sendMessage',{user:users[id],message,id});

    })

    socket.on('disconnect',()=>{
        socket.broadcast.emit('leave',{user:"Admin",message:`${users[socket.id]} has left`});
        console.log(`user left`);
    })


});


server.listen(PORT, ()=>{
    console.log(`server running on http://localhost:${PORT}`); //backtick h vo invrtd coma nhi h
});

