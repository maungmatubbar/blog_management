import { Request, Response } from "express";
import User, { IUser } from "../models/User";
import AuthHelper from '../helpers/AuthHelper';
//import DataStatus from '../utils/dataStatus';
import JWT from "jsonwebtoken";
class UserController {
  async getAllUsers(req: Request, res: Response): Promise<void> {
    try {
      const users = await User.find();
      res.status(200).send(users);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async register(req: Request, res: Response): Promise<void> {
    try {
      const { name, email, password, phone, address, role }: IUser = req.body;
      // res.send(req.body);
      if (!name) {
        res.send({ error: "Name is required" });
      }
      if (!email) {
        res.send({ error: "Email is required" });
      }
      if (!password) {
        res.send({ error: "Password is required" });
      }
      if (!phone) {
        res.send({ error: "Phone no is required" });
      }
      if (!address) {
        res.send({ error: "Address is required" });
      }

      //check user
      const existingUser = await User.findOne({ email: email });
      // existing user
      if (existingUser) {
        res.status(200).send({
          success: true,
          message: "Already Register please login",
        });
      }
      //Register User
      const hashedPassword = await AuthHelper.hasPassword(password)
      //Save
      const newUser = await new User({
        name,
        email,
        phone,
        address,
        password: hashedPassword,
        role: role??0,
      }).save();
      res.status(201).send({
        success: true,
        message: "User registered successfully!",
        data: newUser,
      });
    } catch (error) {
      res.status(500).send({
        success: false,
        message: "Error in Registration",
        error,
      });
    }
  }
  async userlogin(req: Request, res: Response) {
    // res.send(req.body)
    try {
      const { email, password }: IUser = req.body;
      if (!email || !password) {
        res.status(404).send({
          success: false,
          message: "Email & Password are required.",
        });
      }
      //check user
      const user = await User.findOne({ email: email });
        if (!user) {
          res.status(404).send({
            success: false,
            message: "You are not registered.",
          });
        }
        const hashPass = user?.password as string;
        const matchPassword = await AuthHelper.comparePassword({
          password: password,
          hashedPassword: hashPass
        });
        if (!matchPassword) {
          res.status(200).send({
            success: false,
            message: "Your password not match our record",
          });
      }
        const jwtSecret =  process?.env?.JWT_SECRET as string;
        const token = await JWT.sign({ _id: user?._id },jwtSecret, {
          expiresIn: "7d",
        });
        res.status(200).send({
          success: true,
          message: "Login successfully!",
          user: {
            name: user?.name,
            email: user?.email,
            phone: user?.phone,
            address: user?.address,
          },
          token,
        });
    } catch (error) {
      res.status(500).send({
        success: false,
        message: "Error in Login",
        error,
      });
    }
  }
  async testFunc(req: Request, res: Response) {
    try{
      res.status(200).send({
        success: true,
        message: "Protected route Sucess",
       
      });
    }
    catch(error){
      res.status(500).send({
        success: false,
        message: "Error in test",
        error,
      });
    }
  }
}
export default new UserController();
