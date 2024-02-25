import { NextFunction, Request,Response, } from "express";
import Category from "../models/Category";
import ResponseStatus from "../utils/responseStatus";
import mongoose from "mongoose";
import createHttpError from "http-errors";

class CategoryController {
    async getAllCategory (req:Request,res:Response,next:NextFunction):Promise<void>
    {
        const page:number = parseInt(req.query.page as string) || 1;
        const limit:number = parseInt(req.query.limit as string) || 3;
        const skip:number = (page - 1) * limit;
        try {
            const totalRecords:number = await Category.countDocuments();
            const categories = await Category.find().skip(skip).limit(limit);
            res.status(ResponseStatus.OK).send({
                data: categories,
                status: 'success',
                error: false,
                currentPage: page,
                totalPages: Math.ceil(totalRecords / limit)
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
    async getCategory(req:Request,res:Response,next:NextFunction):Promise<void>
    {
        const categoryId = req?.params?.categoryId;
        try {
            if(!mongoose.isValidObjectId(categoryId)){
                throw createHttpError(ResponseStatus.BAD_REQUEST,"Invalid category Id");
            }
            const category = await Category.findById(categoryId).exec();
            res.status(ResponseStatus.OK).json({
                data: category,
                status: 'success',
                error: false
            });
          } catch (error) {
            next(error)
          }
    }
    async updateCategory(req:Request,res:Response,next:NextFunction):Promise<void>
    {
        const categoryId = req.params?.categoryId;
        const catName = req.body?.name;
        try{
            if(!mongoose.isValidObjectId(categoryId)){
                throw createHttpError(ResponseStatus.BAD_REQUEST,"Invalid category Id");
            }
            if(!catName){
                throw createHttpError(ResponseStatus.BAD_REQUEST,"Category must have a name");
            }
            const category = await Category.findById(categoryId).exec();
            if(!category){
                throw createHttpError(ResponseStatus.NOT_FOUND,"Category not found");
            }

            category.name = catName;
            const updateCategory = await category.save();

            res.status(ResponseStatus.OK).json({
                data: updateCategory,
                status: 'success',
                error: false
            });
        }
        catch(error){
            next(error);
        }
    }
    async deleteCategory(req:Request,res:Response,next:NextFunction):Promise<void>
    {
        const categoryId = req.params?.categoryId;
        try{
            if(!mongoose.isValidObjectId(categoryId)){
                throw createHttpError(ResponseStatus.BAD_REQUEST,"Invalid category Id");
            }
           const category = await Category.findById(categoryId).exec();
           if(!category){
            throw createHttpError(ResponseStatus.NOT_FOUND,"Category not found");
            }
           await category.deleteOne();
            res.status(ResponseStatus.OK).json({
                data: '',
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