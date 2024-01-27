import "dotenv/config";
import express from "express";
import userRoutes from './routers/userRoutes';
import connectDB from "./config/db";
import { json } from 'body-parser'

//Database config
connectDB();


//rest object
const app = express();
// Middleware
app.use(json());

app.use('/user', userRoutes);
app.get("/",(req: express.Request,res: express.Response)=>{
    res.send({
        message: "Welcome to ecommerce app"
    });
});

//PORT
const PORT = process.env.PORT || 8080;

//run listen
app.listen(PORT, () => {
    console.log(`Server Running mode ${process.env.DEV_MODE} port on ${PORT}`);
});