// const express = require('express'); הצורה הישנה ליבוא
//בשביל הצורה החדשה צריך להוסיף 
//"type":"module",
//מוסיפים בתוך הscript
//"start":"nodemone index.js"
//npm init -y
//npm i express body-parser mongoose cors nodemon dotenv
//HTTP Status Codes
//https://www.restapitutorial.com/httpstatuscodes.html  
//התקנות נוספות
// npm i bcryptjs jsonwebtoken
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import postRouters from './routes/posts.js';
import userRouters from './routes/user.js';


const app =express();
dotenv.config();
// app.use(bodyParser.json({limit:"30mb",extended:true}));
app.use(express.json({limit:"30mb",extended:true}));// לבדוק בהמשך אם זה עובד אמור לעבוד מגירסה 4.16.0 של אקספרס
//The extended config object key now needs to be explicitly passed, since it now has no default value.
// app.use(bodyParser.urlencoded({limit:"30mb",extended:true}));
app.use(express.urlencoded({limit:"30mb",extended:true}));// לבדוק בהמשך אם זה עובד אמור לעבוד מגירסה 4.16.0 של אקספרס

app.use(cors());

app.use('/posts',postRouters);
app.use('/user',userRouters);

app.get('/',(req,res)=>{
    res.send('Hello to Memories API');
})
const PORT=process.env.PORT || 5000;
const connectionParams = {
    useFindAndModify:true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify:false
};

mongoose.connect(process.env.CONNECTION_URL,connectionParams).then(()=>{
    console.log("conect DB");
}).catch((err)=>console.log(err.message));


app.listen(PORT, function () {
    console.log(`login`);
})