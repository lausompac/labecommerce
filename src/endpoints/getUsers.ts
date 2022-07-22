import { Request, Response } from "express";
import connection from "../database/connections";
import { TABLE_USERS } from "../database/tableNames";

export const getUsers = async (req: Request, res: Response) => {
    let errorCode = 400
    try {

        const users = await connection(TABLE_USERS)
            .select("*")
            .orderBy("id", "asc")

        return res.status(200).send({ users: users })

    } catch (error) {
        res.status(errorCode).send({ message: error.message })
    }
}