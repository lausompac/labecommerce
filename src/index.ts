import express from "express"
import cors from "cors"
import { teste } from "./endpoints/teste"
import { postUser } from "./endpoints/postUser"
import { getUsers } from "./endpoints/getUsers"
import { postProduct } from "./endpoints/postProduct"
import { getProducts } from "./endpoints/getProducts"
import { postPurchase } from "./endpoints/postPurchase"
import { getPurchases } from "./endpoints/getPurchases"
import { deleteUser } from "./endpoints/deleteUser"

const app = express()

app.use(express.json())
app.use(cors())

app.listen(process.env.PORT || 3003, () => {
    console.log(`Server started on port ${process.env.PORT || 3003}`)
})

// GET Teste
app.get("/", teste)

// POST User
app.post("/users", postUser)

// GET Users
app.get("/users", getUsers)

// POST Product
app.post("/products", postProduct)

// GET Products
app.get("/products", getProducts)

// POST Purchase
app.post("/purchases", postPurchase)

// GET Purchases
app.get("/users/:user_id/purchases", getPurchases)

// DELETE User
app.delete("/users/:user_id", deleteUser)




