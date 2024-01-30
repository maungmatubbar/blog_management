import { NextFunction, Request,Response, } from "express";
import Category from "../models/Category";
import ResponseStatus from "../utils/responseStatus";
import mongoose from "mongoose";
import createHttpError from "http-errors";
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