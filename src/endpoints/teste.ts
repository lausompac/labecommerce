import { Request, Response } from "express";

export const teste = async (req: Request, res: Response) => {
    let errorCode = 400;
    try {
        res.status(200).send({ message: "Endpoint funcionando" })
    } catch (error) {
        res.status(errorCode).send({ message: error.message })
    }
}