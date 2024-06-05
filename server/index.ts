import express from 'express';
import cors from 'cors';
import apiResearchRouter from './routes/apiResearch';
import errorHandler from './errors/errorHandler';

const app : express.Application = express();

const port : number = Number(process.env.PORT) || 3111;

app.use(cors({
    "origin" : "http://localhost:3555"
}));
app.use("/api/research", apiResearchRouter);

app.use(errorHandler);

app.use((req : express.Request, res : express.Response, next : express.NextFunction) => {

    if (!res.headersSent) {
        res.status(404).json({ viesti : "Invalid route"});
    }

    next();
});

app.listen(port, () => {

    console.log(`online at ${port}`);

});