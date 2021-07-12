//imports
import express from 'express'
import mongoose from 'mongoose'
import Messages from './dbMessages.js'
import Cors from 'cors'
import Pusher from 'pusher'
console.log(process.env)
//app config
const app=express()
const port = process.env.PORT || 9000
const connection_url = 'mongodb+srv://admin:Ze3ZJ9iKBkimWhm5@cluster0.mpr1v.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

const pusher = new Pusher({
    appId:process.env.APPID,
    key: process.env.KEY,
    secret:process.env.SECRET,
    cluster:process.env.CLUSTER,
    useTLS: true
  });

//middleware
app.use(express.json());
app.use(Cors());


//DB config
mongoose.connect(connection_url, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
});


//api routes
const db = mongoose.connection;

db.once('open', () => {
    console.log('DB connected');

    const msgCollection = db.collection("whatsappmessages");
    const changeStream = msgCollection.watch();

    changeStream.on('change', (change) => {
        console.log('change: ',change);

        if (change.operationType === "insert") {
            const messageDetails = change.fullDocument;
            pusher.trigger("messages","inserted",{
                name: messageDetails.name,
                message: messageDetails.message,
                timestamp: messageDetails.timestamp,
                received : messageDetails.received
            });
        } else {
            console.log("Error triggering Pusher");
        }
    })
})



app.get("/",(req,res) => res.status(200).send("Whatsapp clone"))


app.get('/messages/sync', (req, res) => {
    Messages.find((err, data) => { 
    
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send(data)
        }
    })
})



app.post('/messages/new', (req, res) => {
    const dbMessage = req.body;

    Messages.create(dbMessage, (err, data) => {
        if (err) {
            res.status(500).send(err);
        }else{
            res.status(201).send(data);
        }
    })
})

//listen
app.listen(port,() => console.log(`Listening on localhost: ${port}`))