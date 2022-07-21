import { Request, Response } from "express";
import connection from "../database/connections";
import { TABLE_PRODUCTS, TABLE_PURCHASES, TABLE_USERS } from "../database/tableNames";
import { Purchase } from "../models/Purchase";

export const getPurchases = async (req: Request, res: Response) => {
    
}