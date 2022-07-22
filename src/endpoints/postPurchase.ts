import { Request, Response } from "express";
import connection from "../database/connections";
import { TABLE_PRODUCTS, TABLE_PURCHASES, TABLE_USERS } from "../database/tableNames";
import { Purchase } from "../models/Purchase";

export const postPurchase = async (req: Request, res: Response) => {
    let errorCode = 400
    try {
        const user_id = req.body.user_id
        const product_id = req.body.product_id
        const quantity = req.body.quantity

        const checkUser = await connection(TABLE_USERS)
            .select("*")
            .where("id", user_id)

        if (checkUser.length === 0) {
            errorCode = 404
            throw new Error("User not found")
        }

        const checkProduct = await connection(TABLE_PRODUCTS)
            .select("*")
            .where("id", product_id)

        if (checkProduct.length === 0) {
            errorCode = 404
            throw new Error("Product not found")
        }

        if (quantity < 1) {
            errorCode = 422
            throw new Error("Quantity must be greater than 0")
        }

        const total_price = checkProduct[0].price * quantity

        const newPurchase: Purchase = {
            id: Date.now().toString(),
            user_id,
            product_id,
            quantity,
            total_price

        }

        await connection(TABLE_PURCHASES)
            .insert({
                id: newPurchase.id,
                user_id: newPurchase.user_id,
                product_id: newPurchase.product_id,
                quantity: newPurchase.quantity,
                total_price: newPurchase.total_price
            })

        return res.status(200).send({ purchase: newPurchase })


    } catch (error) {
        res.status(errorCode).send({ message: error.message })
    }

}