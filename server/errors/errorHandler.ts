import express from 'express';

export class ErrorClass extends Error {
    status : number
    message : string
    constructor(status? : number, message? : string) {
        super();
        this.status = status || 500;
        this.message = message || "Unexpected error on server.";
    }

}

const errorhandler = (err : ErrorClass, req : express.Request, res : express.Response, next : express.NextFunction) => {

    res.status(err.status).json({message : err.message});

    next();

}

export default errorhandler;