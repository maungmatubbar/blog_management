import { NextFunction, Request,Response, } from "express";
import Category from "../models/Category";
import ResponseStatus from "../utils/responseStatus";
class CategoryController {
    async getAllCategory (req:Request,res:Response,next:NextFunction):Promise<void>
    {
        try {
            const categories = await Category.find().exec();
            res.status(ResponseStatus.OK).json({
                data: categories,
                status: 'success',
                error: false
            });
          } catch (error) {
            next(error)
          }
    }
    async createCategory (req:Request,res:Response,next:NextFunction):Promise<void>
    {
        try{
            const category = await Category.create(req.body);
            res.status(ResponseStatus.CREATE).json({
                data: category,
                status: 'success',
                error: false
            });
        }
        catch(error){
            next(error);
        }
    }
    
}

export default new CategoryController;