import { Request, Response } from "express";
import connection from "../database/connections";
import { TABLE_PRODUCTS } from "../database/tableNames";

export const getProducts = async (req: Request, res: Response) => {
    let errorCode = 400
    try {
        const name = req.query.name as string
        const sort = req.query.sort || "name"
        const order = req.query.order || "asc"
        const limit = Number(req.query.limit) || 10
        const page = Number(req.query.page) || 1
        const offset = limit * (page - 1)

        if (name){
            const products = await connection(TABLE_PRODUCTS)
                .select()
                .where("name", "LIKE", `%${name}%`)
                .orderBy(`${sort}`, `${order}`)
                .limit(limit)
                .offset(offset)

            return res.status(200).send({ products: products })
        }

        const products = await connection(TABLE_PRODUCTS)
            .select("*")
            .orderBy("id", "asc")
            .limit(limit)
            .offset(offset)
            
        return res.status(200).send({ products })
        
    } catch (error) {
        res.status(errorCode).send({ message: error.message })        
    }

}