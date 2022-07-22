import { Request, Response } from "express";
import connection from "../database/connections";
import { TABLE_PRODUCTS } from "../database/tableNames";

export const deleteProduct = async (req: Request, res: Response) => {
    let errorCode = 400
    try {
        const product_id = req.params.product_id

        const productExists = await connection(TABLE_PRODUCTS)
            .select()
            .where("id", "=", `${product_id}`)

        if (productExists.length === 0) {
            errorCode = 404
            throw new Error("Product not found")
        }

        await connection(TABLE_PRODUCTS)
            .delete()
            .where({
                id: product_id
            })

        res.status(200).send({ message: "Product deleted" })

    } catch (error) {
        res.status(errorCode).send({ message: error.message })
    }
}