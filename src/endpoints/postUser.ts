import { Request, Response } from "express";
import connection from "../database/connections";
import { TABLE_USERS } from "../database/tableNames";
import { User } from "../models/User";


export const postUser = async (req: Request, res: Response) => {
    let errorCode = 400;
    try {
        const { email, password } = req.body;

        if(!email || !password) {
            errorCode = 422;
            throw new Error("Inform email and password");
        }

        if (typeof email !== "string") {
            errorCode = 422;
            throw new Error("Email must be a string");
        }

        if (typeof password !== "string") {
            errorCode = 422;
            throw new Error("Password must be a string");
        }

        if (password.length < 6) {
            errorCode = 422;
            throw new Error("Password must be at least 6 characters");
        }

        if (!email.includes("@")) {
            errorCode = 422;
            throw new Error("Email must be a valid email");
        }

        const newUser: User = {
            id: Date.now().toString(),
            email,
            password
        }

        await connection(TABLE_USERS)
            .insert( {
                id: newUser.id,
                email: newUser.email,
                password: newUser.password
            })

        res.status(200).send({ user: newUser, message: "Usuário criado com sucesso" })
            

    } catch (error) {
        res.status(errorCode).send({ message: error.message })        
    }
}