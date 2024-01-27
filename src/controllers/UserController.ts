import { Request, Response } from 'express';
import User, { IUser } from '../models/User';
//import AuthHelper from '../helpers/AuthHelper';
//import DataStatus from '../utils/dataStatus';
import bcrypt from 'bcrypt';
class UserController {
  async getAllUsers(req: Request, res: Response): Promise<void> {
    try {
      const users = await User.find();
      res.status(200).send(users);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async createUser(req: Request, res: Response): Promise<void> {
    try {
      const { name, email, password, phone, address }:IUser = req.body;
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
    const hashedPassword = await bcrypt.hash(password,10);
    const newUser = await new User({
      name,
      email,
      phone,
      address,
      password: hashedPassword
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
}
export default new UserController();