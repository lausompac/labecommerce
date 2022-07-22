import { Request, Response } from "express";
import connection from "../database/connections";
import { TABLE_PURCHASES } from "../database/tableNames";

export const deletePurchase = async (req: Request, res: Response) => {
    let errorCode = 400
    try {
        const purchase_id = req.params.purchase_id

        const purchaseExists = await connection(TABLE_PURCHASES)
            .select()
            .where("id", "=", `${purchase_id}`)

        if (purchaseExists.length === 0) {
            errorCode = 404
            throw new Error("Purchase not found")
        }

        await connection(TABLE_PURCHASES)
            .delete()
            .where({
                id: purchase_id
            })

        res.status(200).send({ message: "Purchase deleted" })

    } catch (error) {
        res.status(errorCode).send({ message: error.message })
    }
}