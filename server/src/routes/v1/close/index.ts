import {Request, Response, NextFunction} from "express";

export default (request: Request, res: Response, next: NextFunction) => {
    next();
};
