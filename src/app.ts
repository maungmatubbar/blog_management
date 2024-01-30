import "dotenv/config";
import express,{Request,Response,NextFunction} from "express";
import userRoutes from './routers/userRoutes';
import categoryRoutes from './routers/categoryRoutes';
import connectDB from "./config/db";
import morgan from "morgan";
import createHttpError, {isHttpError} from "http-errors";
import ResponseStatus from "./utils/responseStatus";
//import { json } from 'body-parser'

//Database config
connectDB();


//rest object
const app = express();
// Middleware
app.use(express.json());
app.use(morgan('dev'));

//Use Routes
app.get("/",(req: express.Request,res: express.Response)=>{
    res.send({
        message: "Welcome to ecommerce app"
    });
});
app.use('/api/category', categoryRoutes);
app.use('/api/user', userRoutes);

app.use((req:Request,res:Response,next:NextFunction)=>{
    next(createHttpError(ResponseStatus.NOT_FOUND,"End point not found"));
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error:unknown,req:Request,res:Response,next:NextFunction)=>{
    console.error(error);
    let errorMessage = "An Unknown error occurred";
    let statusCode = ResponseStatus.SERVER_NOT_FOUND;
    if(isHttpError(error)){
        statusCode = error.status,
        errorMessage = error.message;
    }
   // if(error instanceof Error) errorMessage = error.message;
    res.status(statusCode).json({error:errorMessage});
});

//PORT
const PORT = process.env.PORT || 8080;

//run listen
app.listen(PORT, () => {
    console.log(`Server Running mode ${process.env.DEV_MODE} port on ${PORT}`);
});