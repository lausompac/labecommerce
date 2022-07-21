import express from "express"
import cors from "cors"
import { teste } from "./endpoints/teste"

const app = express()

app.use(express.json())
app.use(cors())

app.listen(process.env.PORT || 3003, () => {
    console.log(`Server started on port ${process.env.PORT || 3003}`)
})

// GET Teste
app.get("/", teste)

