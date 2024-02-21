import JWT from "jsonwebtoken";
import { NextFunction, Request,Response, } from "express";
class AuthMiddleware {
    async requireSignIn (req:Request,res:Response, next: NextFunction)
    {
        try{
            const authorization = req?.headers?.authorization??'';
            const decode = JWT.verify(authorization, process.env.JWT_SECRET??'');
            next();
        }
        catch(error){
            console.log(error)
        }
    }
}


export default new AuthMiddleware;