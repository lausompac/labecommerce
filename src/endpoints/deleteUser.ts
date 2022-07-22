import { Request, Response } from "express";
import connection from "../database/connections";
import { TABLE_USERS } from "../database/tableNames";

export const deleteUser = async (req: Request, res: Response) => {
    let errorCode = 400
    try {
        const user_id = req.params.user_id

        const userExists = await connection(TABLE_USERS)
            .select()
            .where("id", "=", `${user_id}`)

        if (userExists.length === 0) {
            errorCode = 404
            throw new Error("User not found")
        }

        await connection(TABLE_USERS)
            .delete()
            .where({
                id: user_id
            })

        res.status(200).send({ message: "User deleted" })

    } catch (error) {
        res.status(errorCode).send({ message: error.message })
    }

}