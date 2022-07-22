import { Request, Response } from "express";
import connection from "../database/connections";
import { TABLE_PRODUCTS } from "../database/tableNames";
import { Product } from "../models/Product";

export const postProduct = async (req: Request, res: Response) => {
    let errorCode = 400
    try {
        const { name, price } = req.body

        if (!name || !price) {
            errorCode = 422
            throw new Error("Missing parameters")
        }

        if (typeof name !== "string") {
            errorCode = 422
            throw new Error("Name must be a string")
        }

        if (typeof price !== "number") {
            errorCode = 422
            throw new Error("Price must be a number")
        }

        if (price < 1) {
            errorCode = 422
            throw new Error("Price must be greater than 0")
        }

        if (name.length < 3) {
            errorCode = 422
            throw new Error("Name must at least 3 characters")
        }


        const newProduct: Product = {
            id: Date.now().toString(),
            name,
            price
        }

        await connection(TABLE_PRODUCTS)
            .insert({
                id: newProduct.id,
                name: newProduct.name,
                price: newProduct.price
            })

        return res.status(200).send({ product: newProduct, message: "Product created" })

    } catch (error) {
        res.status(errorCode).send({ message: error.message })
    }
}