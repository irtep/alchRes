import express from 'express';
import { ErrorClass } from '../errors/errorHandler';
import { PrismaClient } from '@prisma/client';

const prisma: PrismaClient = new PrismaClient();

const apiResearchRouter: express.Router = express.Router();

apiResearchRouter.use(express.json());

apiResearchRouter.delete("/:id", async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.log('delete with key: ', req.params.id);
    if (await prisma.note.count({
        where: {
            id: Number(req.params.id)
        }
    })) {
        try {

            await prisma.note.delete({
                where: {
                    id: Number(req.params.id)
                }
            });

            res.json(await prisma.note.findMany());

        } catch (e: any) {
            next(new ErrorClass())
        }
    } else {
        next(new ErrorClass(400, "invalid id"));
    }

});

/*
apiResearchRouter.put("/:id", async (req: express.Request, res: express.Response, next: express.NextFunction) => {

    if (await prisma.note.count({
        where: {
            id: Number(req.params.id)
        }
    })) {
        if (req.body.tuote?.length > 0 && (req.body.poimittu === true || req.body.poimittu === false)) {

            try {

                await prisma.note.update({
                    where: {
                        id: Number(req.params.id)
                    },
                    data: {
                        organ: req.body.organ,
                        metal: req.body.metal,
                        herb: req.body.herb,
                        alche: req.body.alche,
                        status: req.body.status,
                        result: req.body.result
                    }
                });

                res.json(await prisma.note.findMany());

            } catch (e: any) {
                next(new ErrorClass())
            }

        } else {
            next(new ErrorClass(400, "invalid body of request"));
        }
    } else {
        next(new ErrorClass(400, "invalid id"));
    }

});
*/
apiResearchRouter.post("/", async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.log('post from alch: ', req.body.alche);
    if (req.body.tuote?.length > 0) {

        try {

            await prisma.note.create({
                data: {
                    organ: req.body.organ,
                    metal: req.body.metal,
                    herb: req.body.herb,
                    alche: req.body.alche,
                    status: req.body.status,
                    result: req.body.result
                }
            });

            res.json(await prisma.note.findMany());

        } catch (e: any) {
            next(new ErrorClass())
        }

    } else {
        next(new ErrorClass(400, "invalid body of request"));
    }

});
/*
apiResearchRouter.get("/:id", async (req: express.Request, res: express.Response, next: express.NextFunction) => {

    try {

        if (await prisma.note.count({
            where: {
                id: Number(req.params.id)
            }
        }) === 1) {
            res.json(await prisma.note.findUnique({
                where: {
                    id: Number(req.params.id)
                }
            }))
        } else {
            next(new ErrorClass(400, "ErrorClasselinen id"));
        }

    } catch (e: any) {
        next(new ErrorClass());
    }
});
*/
apiResearchRouter.get("/", async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.log('get received');
    try {
        res.json(await prisma.note.findMany());
    } catch (e: any) {
        next(new ErrorClass());
    }

});

export default apiResearchRouter;