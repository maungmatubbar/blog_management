import JWT from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import User from "../models/User";
export interface IGetUserAuthInfoRequest extends Request {
  user: any; // or any other type
}
class AuthMiddleware {
  // constructor(private allowedRoles: string[]) {}
  public async requireSignIn(
    req: IGetUserAuthInfoRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const token = req.headers.authorization;
      if (!token) {
         res.status(401)
          .json({ error: "Unauthorized: No token provided" });
      }
      const decode = JWT.verify(token, process.env.JWT_SECRET ?? "");
      req.user = decode;
      next();
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in requireSignIn',
            error
        })
    }
  }
  public async IsAdmin(
    req: IGetUserAuthInfoRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const user = await User.findOne({ _id: req?.user?._id ?? "" });
      if (user?.role !== 1) {
        res.status(401).send({
          success: false,
          message: "Unauthorized Access",
        });
      } else {
        next();
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error in Admin middleware",
        error,
      });
    }
  }
  /*async checkRole(req: Request, res: Response, next: NextFunction) {
        // Assuming you have a user object with a "role" property
        const userRole = req.user?.role;
    
        if (!userRole || !this.allowedRoles.includes(userRole)) {
          return res.status(403).json({ error: { status: 403, message: 'Access denied.' } });
        }
    
        next();
    }*/
}

export default new AuthMiddleware();
