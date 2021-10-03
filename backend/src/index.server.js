const dotenv =require('dotenv');
const express=require('express');
const app=express();
const mongoose=require('mongoose');
const authRoutes=require("./routes/auth");
const adminRoutes=require('./routes/admin/auth');
const categoryRoutes=require('./routes/category');
const ProductRoutes=require("./routes/products");
const cartRoutes=require('./routes/cart');
const initialData=require('./routes/admin/initialData');
const pageRouter=require('./routes/admin/page');
const path=require('path');
const cors=require('cors');

dotenv.config();

mongoose.connect(
    `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@cluster0.g7mtt.mongodb.net/${process.env.MONGODB_DATABASE}?retryWrites=true&w=majority`, 
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex:true,
        useFindAndModify:false
        
    }).then(()=>console.log("Database Connectted"));

app.use(cors())
app.use(express.json());
app.use('/public',express.static(path.join(__dirname, 'uploads')));
app.use('/api',adminRoutes);
app.use("/api",authRoutes);
app.use('/api',categoryRoutes);
app.use('/api',ProductRoutes);
app.use('/api',cartRoutes);
app.use('/api',initialData);
app.use('/api',pageRouter)



app.listen(process.env.PORT,()=>console.log(`running port ${process.env.PORT}`));