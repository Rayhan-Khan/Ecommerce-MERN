const express=require('express');
const app=express();
const mongoose=require('mongoose')

const dotenv =require('dotenv');
const userRoutes=require("./src/routes/user");
dotenv.config();

app.use(express.json());

//mongodb+srv://ecommerce:<password>@cluster0.g7mtt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
mongoose.connect(
    `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@cluster0.g7mtt.mongodb.net/${process.env.MONGODB_DATABASE}?retryWrites=true&w=majority`, 
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex:true
        
    }).then(()=>console.log("Database Connectted"));
//app.use("/api",userRoutes);

app.listen(process.env.PORT,()=>console.log(`running port ${process.env.PORT}`));